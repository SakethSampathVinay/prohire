from jose import jwt, JWTError
from datetime import datetime, timedelta 

SECRET_KEY = "saketh"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 

def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes = 60)
    data.update({"exp": expire})
    encode_jwt = jwt.encode(data, SECRET_KEY, ALGORITHM)
    return encode_jwt

def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, ALGORITHM)
        return payload
    except JWTError:
        return None

