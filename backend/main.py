from fastapi import FastAPI 
from routes.user_routes import user_router
from routes.admin_routes import admin_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:4200",
    "https://prohire-seven.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          
    allow_credentials=True,
    allow_methods=["*"],            
    allow_headers=["*"],            
)


app.include_router(user_router)
app.include_router(admin_router)


@app.get('/')
def read_root():
    return {"message": "Welcome to ProHire Backend!!!"}