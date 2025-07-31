from fastapi import FastAPI, APIRouter, HTTPException
from models.user_model import Job, Company
from database.database import get_database, collection
from bson import ObjectId 

router = APIRouter()

@router.post("/create-job")
async def create_job(job: Job):
    db = get_database()
    result = await collection.insert_one(job.dict())
    return {"Id": str(result.inserted_id) , "Job Details": job.dict()}

