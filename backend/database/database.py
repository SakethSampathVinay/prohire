from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os 
from config import settings

client = AsyncIOMotorClient(settings.MONGO_URL)
db: AsyncIOMotorDatabase = client[settings.DB_Name]
collection = db['jobs']
user_collections = db['users']
admin_collections = db['admins']

def get_database() -> AsyncIOMotorDatabase:
    return db