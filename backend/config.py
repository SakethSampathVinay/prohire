from pydantic_settings import BaseSettings
import cloudinary

class Settings(BaseSettings):
    MONGO_URL: str 
    DB_Name: str 
    CLOUD_NAME: str 
    CLOUD_API_KEY: str 
    CLOUD_API_SECRET: str 
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    class Config:
        env_file = '.env'

settings = Settings()

cloudinary.config(
    cloud_name = settings.CLOUD_NAME,
    api_key = settings.CLOUD_API_KEY,
    api_secret = settings.CLOUD_API_SECRET,
    secure = True
)