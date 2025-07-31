from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os 

MONGO_URL = "mongodb+srv://sakethsampath2006:oZea1yBIJfmBO5we@cluster0.ue2hzgm.mongodb.net/"
DB_Name = "prohire"

client = AsyncIOMotorClient(MONGO_URL)
db: AsyncIOMotorDatabase = client[DB_Name]
collection = db['jobs']
user_collections = db['users']

def get_database() -> AsyncIOMotorDatabase:
    return db