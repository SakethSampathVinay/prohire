from fastapi import FastAPI, APIRouter, HTTPException, status
from models.user_login import Register, Login 
from database.database import get_database
from utils.hash import hash_password, verify_password
from utils.jwt import create_access_token, verify_access_token

login_router = APIRouter()

@login_router.post('/register')
async def register_user(user: Register):
    db = get_database()

    if await db.users.find_one({'email': user.email}):
        raise HTTPException(status_code = 400, detail = "Email already exists")

    user_data = user.dict()
    user_data['password'] = hash_password(user.password)

    try:
        result = await db.users.insert_one(user_data)
        access_token = create_access_token(data= {'sub': user.email}) #Generate Token
        return {"message": "User Created Successfully", "status": 200, "User Data": str(user_data), "Token": access_token}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code = 400, detail = str(e))

@login_router.post('/login')
async def login_user(user: Login):
    db = get_database()
    try:
        user_data = await db.users.find_one({"email": user.email})

        if not user_data:
            raise HTTPException(status_code = 404, detail = "User not found")
        
        if not verify_password(user.password, user_data['password']):
            raise HTTPException(status_code = 400, detail = "Incorrect Password")
        
        access_token = create_access_token(data={"sub": user.email}) #Generate Token
        
        user_data['_id'] = str(user_data['_id'])
        user_data.pop("password")
        return {'message': "User Logged Successfully", "status": 200, "User Data": user_data, "Token": access_token}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code = 400, detail = str(e))