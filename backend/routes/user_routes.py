from fastapi import FastAPI, APIRouter, HTTPException, status, Depends, Header, UploadFile, File
from models.user_model import Register, Login, JobApplication
from database.database import get_database
from utils.hash import hash_password, verify_password
from utils.jwt import create_access_token, verify_access_token
from typing import Union, List
from bson.objectid import ObjectId
from datetime import datetime
import cloudinary.uploader

user_router = APIRouter()

@user_router.post('/register')
async def register_user(user: Register):
    db = get_database()

    if await db.users.find_one({'email': user.email}):
        raise HTTPException(status_code = 400, detail = "Email already exists")
    
    user_data = user.dict()
    user_data['password'] = hash_password(user.password)

    try:        
        result = await db.users.insert_one(user_data)
        new_user_id = result.inserted_id
        access_token = create_access_token(data={'sub': str(new_user_id)})

        user_data['_id'] = str(user_data['_id'])
        user_data.pop("password")
        return {"message": "User Created Successfully", "status": 200, "userData": user_data,"token": access_token}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code = 400, detail = str(e))

@user_router.post('/login')
async def login_user(user: Login):
    db = get_database()
    try:
        user_data = await db.users.find_one({"email": user.email})

        if not user_data:
            raise HTTPException(status_code = 404, detail = "User not found")
        
        if not verify_password(user.password, user_data['password']):
            raise HTTPException(status_code = 400, detail = "Incorrect Password")
        
        access_token = create_access_token(data={'sub': str(user_data['_id'])})
        
        user_data['_id'] = str(user_data['_id'])
        user_data.pop("password")
        return {'message': "User Logged Successfully", "status": 200, "userData": user_data, "token": access_token}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code = 400, detail = str(e))

@user_router.get('/latest-jobs')
async def get_jobs():
    db = get_database()
    try:
        jobs_list = db.collection.find()
        jobs = await jobs_list.to_list(length = None)

        for job in jobs:
            job['_id'] = str(job['_id'])
            if 'companyId' in job and '_id' in job['companyId']:
                job['companyId']['_id'] = str(job['companyId']['_id'])

        return {'message': "Jobs Retrieved Successfully", "status": 200, "Jobs": jobs }
    except Exception as e:
        raise HTTPException(status_code = 400, detail = str(e))

async def get_current_user_id(authorization: str = Header(...)) -> Union[str, ObjectId]:
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")

    token = authorization.split(" ")[1]
    
    try:
        payload = verify_access_token(token)
        user_id = payload.get("sub")  # Assuming 'subject' is user_id

        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token payload")

        db = get_database()
        user = await db.users.find_one({"_id": ObjectId(user_id)})

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return str(user["_id"]) 
    except Exception:
        raise HTTPException(status_code=401, detail="Token verification failed")

@user_router.post('/apply-jobs')
async def apply_jobs(job_id: str, user_id: str = Depends(get_current_user_id)):
    db = get_database()

    try:
        existing_application = await db.job_applications.find_one({
            "job_id": ObjectId(job_id),
            "user_id": ObjectId(user_id)
        })

        if existing_application:
            raise HTTPException(status_code = 400, detail = "Already Applied for this Job.")
        
        user = await db.users.find_one({'_id': ObjectId(user_id)})
        if not user or 'resume_url' not in user:
            raise HTTPException(status_code = 400, detail = "Resume not found")

        result = await db.job_applications.insert_one({
            "job_id": ObjectId(job_id),
            "user_id": ObjectId(user_id),
            "applied_at": datetime.utcnow(),
            "status": "Pending",
            "isApplied": True,
            "resume_url": user['resume_url']
        })
        
        return {"Message": "Job Applied Successfully","application_id": str(result.inserted_id) , "job_id": job_id, "user_id": user_id, "isApplied": True}
    
    except Exception as e:
        raise HTTPException(status_code = 401, detail = str(e))

@user_router.get('/check-application/{job_id}')
async def check_application(job_id: str, user_id: str = Depends(get_current_user_id)):
    db = get_database()
    try:
        existing_application = await db.job_applications.find_one({
            'job_id': ObjectId(job_id),
            'user_id': ObjectId(user_id)
        })
        return {"isApplied": bool(existing_application)}
    except Exception as e:
        raise HTTPException(status_code = 400, detail = str(e))

@user_router.get("/get-applied-jobs", response_model=List[JobApplication])
async def get_applied_jobs(user_id: str = Depends(get_current_user_id)):
    db = get_database()

    try:
        applied_jobs = await db.job_applications.find({"user_id": ObjectId(user_id)}).to_list(None)

        response: List[JobApplication] = []

        for app in applied_jobs:
            job = await db.collection.find_one({"_id": app["job_id"]})
            if not job:
                continue

            company = job.get("companyId", {})

            job_data = JobApplication(
                logo=company.get("image", ""),
                company_name=company.get("name", ""),
                title=job.get("title", ""),
                location=job.get("location", ""),
                date=app.get("applied_at", datetime.now()),
                status=app.get("status", "Pending")
            )

            response.append(job_data)
        
        return response

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@user_router.post('/upload-resume')
async def upload_resume(resume: UploadFile = File(...),  user_id: str = Depends(get_current_user_id)):
    db = get_database()

    if resume.content_type != 'application/pdf':
        raise HTTPException(status_code = 400, detail = "Only PDF's are allowed")

    try:
        file_bytes = await resume.read()

        result = cloudinary.uploader.upload(
            file_bytes,
            resource_type = "raw",
            folder = "resumes",
            overwrite = True,
            public_id=f"resume_{user_id}"
        )

        await db.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"resume_url": result["secure_url"]}},
            upsert=True
        )

        return {
            "message": "Resume uploaded successfully",
            "secure_url": result.get("secure_url"),
            "public_id": result.get("public_id"),
            "user_id": user_id
        }
    
    except CloudinaryError as e:
        raise HTTPException(status_code = 500, detail = f"Cloudinary error: {str(e)}")

@user_router.get("/uploaded-resume")
async def get_uploaded_resume(user_id: str = Depends(get_current_user_id)):
    db = get_database()
    try:
        resume_url = await db.users.find_one({'_id': ObjectId(user_id)}, {"resume_url": 1})
        return {"resume_url": resume_url.get('resume_url')}
    except Exception as e:
        raise HTTPException(status_code = 400, detail = str(e))