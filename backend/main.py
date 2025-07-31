from fastapi import FastAPI 
from routes.user_routes import router as user_router 
from routes.login_routes import login_router

app = FastAPI()

app.include_router(user_router)
app.include_router(login_router)


@app.get('/')
def read_root():
    return {"message": "Welcome to ProHire Backend!!!"}