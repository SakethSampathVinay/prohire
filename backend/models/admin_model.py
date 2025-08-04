from fastapi import FastAPI
from database.database import get_database
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
class CompanyRegister(BaseModel):
    name: str 
    email: EmailStr
    password: str
    image: str 

class CompanyLogin(BaseModel):
    email: EmailStr
    password: str

class CompanyModelResponse(BaseModel):
    id: Optional[str] = None
    name: str 
    email: EmailStr
    image: str

class CompanyWithToken(BaseModel):
    access_token: str
    company: CompanyModelResponse

class PostJob(BaseModel):
    title: str 
    location: str 
    level: str 
    companyId: Optional[CompanyModelResponse] = None
    description: str 
    salary: str
    date: datetime = Field(default_factory = datetime.now)
    category: str
    isVisible: Optional[bool] = True