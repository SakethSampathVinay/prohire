from fastapi import FastAPI, APIRouter, HTTPException, status, Depends, Header, Path, File, UploadFile, Form
from database.database import get_database
from models.admin_model import CompanyLogin, CompanyModelResponse, CompanyWithToken, PostJob
from utils.hash import hash_password, verify_password
from utils.jwt import create_access_token, verify_access_token
from bson.objectid import ObjectId
import cloudinary
import cloudinary.uploader

cloudinary.config(
    cloud_name = "dgtfgihga",
    api_key = "989581749653354",
    api_secret = "3Q5RzmOns5KJG2VRc0v28laS5_U",
    secure = True
)

admin_router = APIRouter(prefix = "/admin")

@admin_router.post("/register", response_model = CompanyWithToken)
async def admin_register(name: str = Form(...), email: str = Form(...), password: str = Form(...), image: UploadFile = File(...)):
    db = get_database()

    exisiting_email = await db.admin_collections.find_one({"email": email})
    if exisiting_email:
        raise HTTPException(status_code = 400, detail = "Email already exists")
    
    try:
        upload_image = cloudinary.uploader.upload(image.file)
        image_url = upload_image.get("secure_url")

        hashed_pw = hash_password(password)
        data = {
            "name": name,
            "email": email,
            "password": hashed_pw,
            "image": image_url
        }

        result = await db.admin_collections.insert_one(data)
        token = create_access_token({"sub": email})

        return CompanyWithToken(
            access_token = token,
            company = CompanyModelResponse(
                id = str(result.inserted_id),
                name = name,
                email = email,
                password = password,
                image = image_url,
            )
        )

    except Exception as e:
        raise HTTPException(status_code = 400, detail = str(e))


@admin_router.post("/login", response_model = CompanyWithToken)
async def admin_login(company: CompanyLogin):
    db = get_database()

    if not (company.email and company.password):
        raise HTTPException(status_code = 500, detail = "Missing required fields.")
    
    email_find = await db.admin_collections.find_one({"email": company.email})
    if not email_find:
        raise HTTPException(status_code = 404, detail = "Email not found")
    
    try:
        if verify_password(company.password, email_find['password']):
            access_token = create_access_token(data = {"subject": company.email})
            print(access_token)
            return {
                "access_token": access_token,
                "company": CompanyModelResponse(
                    id = str(email_find["_id"]),
                    name = email_find["name"],
                    email = email_find["email"],
                    image = email_find["image"]
            )}
        else:
            raise HTTPException(status_code = 401, detail = "Invalid password")
    except Exception as e:
        raise HTTPException(status_code = 400, detail = str(e))
    
async def get_current_company(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code = 401, detail = "Invalid token format")
    
    token = authorization.split(" ")[1]
    try:
        payload = verify_access_token(token)
        email = payload.get("subject")
        if not email:
            raise HTTPException(status_code = 401, detail = "Invalid token")
        
        db = get_database()
        company = await db.admin_collections.find_one({"email": email})
        if not company:
            raise HTTPException(status_code = 404, detail = "Company not found")
        return company
    except Exception as e:
        raise HTTPException(status_code = 401, detail = "Token verification failed")

@admin_router.post("/post-job", status_code=status.HTTP_201_CREATED)
async def post_job(job: PostJob, current_company: dict = Depends(get_current_company)):
    db = get_database()

    if not (job.title and job.location and job.level and job.description and job.salary and job.category):
        raise HTTPException(status_code=400, detail="Missing required fields")

    try:
        job_dict = job.dict()
        job_dict['companyId'] = {
            "_id": str(current_company['_id']),
            "name": current_company["name"],
            "email": current_company["email"],
            "image": current_company["image"]
        }
        result = await db.collection.insert_one(job_dict)
        job_dict["_id"] = str(result.inserted_id) 

        return {"message": "Job posted successfully", "job": job_dict}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@admin_router.get("/get-jobs/{companyId}", status_code = status.HTTP_201_CREATED)
async def get_jobs(companyId: str = Path(...), current_company: dict = Depends(get_current_company)):
    db = get_database()
    try:
        jobs = db.collection.find({'companyId._id': companyId})
        jobs_list = await jobs.to_list(length = None)
        
        
        for job in jobs_list:
            job['_id'] = str(job['_id'])
            job['companyId']['_id'] = str(job['companyId']['_id'])

            applications_count = await db.job_applications.count_documents({"job_id": ObjectId(job['_id'])})
            job['applicationsCount'] = applications_count

        return {"message": "Jobs retrieved successfully", "jobs": jobs_list}

    except Exception as e:
        raise HTTPException(status_code = 400, detail = str(e))

@admin_router.put("/update-visibility/{job_id}", status_code = status.HTTP_201_CREATED)
async def update_job_visibility(job_id: str, is_visible: bool, current_company: dict = Depends(get_current_company)):
    db = get_database()
    try:
        result = await db.collection.update_one({'_id': ObjectId(job_id), "companyId._id": str(current_company["_id"])}, {"$set": {"isVisible": is_visible}})
        if result.modified_count == 1:
            return {"message": "Visibility updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Job not found or already set")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@admin_router.get('/company-application/{companyId}')
async def get_company_applications(companyId: str, current_company: dict = Depends(get_current_company)):
    db = get_database()
    try:
        jobs = await db.collection.find({'companyId._id': companyId}).to_list(length=None)
        if not jobs:
            return {"Message": "No Jobs found in this company"}

        # Build a mapping of job_id -> full job object
        job_data = {str(job['_id']): job for job in jobs}

        # Extract all job IDs
        job_ids = list(job_data.keys())

        # Find applications for these jobs
        applications = await db.job_applications.find({
            'job_id': {'$in': [ObjectId(jid) for jid in job_ids]}
        }).to_list(length=None)

        if not applications:
            return {"applications": [], 'message': "no applications found"}

        results = []
        for app in applications:
            user = await db.users.find_one({'_id': app['user_id']})
            job = job_data.get(str(app['job_id']), {})

            result = {
                "application_id": str(app["_id"]), 
                "job_id": str(app["job_id"]),
                "title": job.get("title", "Unknown Job"),
                "username": user["name"] if user else "Unknown",
                "resumeUrl": app.get("resume_url", ""),
                "status": app.get("status", ""),
                "location": job.get("location", "Unknown"),
                "level": job.get("level", ""),
                "category": job.get("category", ""),
                "salary": job.get("salary", ""),
                "applied_at": app.get("applied_at", None)
            }
            results.append(result)

        return {
            "company_id": companyId,
            "total_applications": len(results),
            "applications": results
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@admin_router.put('/update-status/{application_id}')
async def update_application_status(application_id: str, status: str, current_company: dict = Depends(get_current_company)):
    db = get_database()
    try:
        result = await db.job_applications.update_one({'_id': ObjectId(application_id)}, {"$set": {"status": status}})
        if result.matched_count == 0:
            raise HTTPException(status_code = 404, detail = "Application Not found")
        return {"message": "Status Updated Successfully"}
    except Exception as e:
        raise HTTPException(status_code = 400, detail = str(e))