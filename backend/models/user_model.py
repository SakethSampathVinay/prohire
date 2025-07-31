from pydantic import BaseModel
from typing import Optional

class Company(BaseModel):
    name: str
    email: str
    image: Optional[str] = None


class Job(BaseModel):
    title: str
    location: str
    level: str
    companyId: Company
    description: str
    salary: int
    date: int
    category: str

