from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

class Register(BaseModel):
    name: str
    email: EmailStr
    password: str
    

class Login(BaseModel):
    email: EmailStr 
    password: str

class JobApplication(BaseModel):
    logo: str
    company_name: str
    title: str
    location: str
    date: datetime = Field(default_factory = datetime.now)
    status: str
