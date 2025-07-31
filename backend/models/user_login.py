from pydantic import BaseModel, EmailStr
from typing import Optional

class Register(BaseModel):
    name: str
    email: EmailStr
    password: str

class Login(BaseModel):
    email: EmailStr 
    password: str