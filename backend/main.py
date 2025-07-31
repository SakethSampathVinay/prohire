from fastapi import FastAPI 
from routes.user_routes import router as user_router 
from routes.login_routes import login_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # You can also use ["*"] to allow all origins
    allow_credentials=True,
    allow_methods=["*"],            # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],            # Allows all headers
)


app.include_router(user_router)
app.include_router(login_router)


@app.get('/')
def read_root():
    return {"message": "Welcome to ProHire Backend!!!"}