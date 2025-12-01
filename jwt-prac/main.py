from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import SQLModel
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from passlib.context import CryptContext
import bcrypt


SECRET_KEY = "5c6edaa223b67a3086a5d22877c33dd993d012c78479599009dbdb104d2be98a"  # used openssl rand -hex 32
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


fake_db = {
    "tim": {
        "username": "tim",
        "full_name": "Tim Ruscica",
        "email": "tim@gmail.com",
        "hashed_password": "",
        "disabled": False,
    }
}


class Token(SQLModel):
    access_token: str
    token_type: str


class TokenData(SQLModel):
    username: str | None = None


class User(SQLModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserInDB(User):
    hashed_password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, username: str):
    if username in db:
        user_data = db[username]
        return UserInDB(**user_data)


def authenticate_user(db, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False

    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth_2_scheme)):
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="could not validate credentials", headers={"WWW-Authenticate": "Bearer"})

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credential_exception

        token_data = TokenData(username=username)

    except JWTError:
        raise credential_exception

    user = get_user(fake_db, username=token_data.username)
    if user is None:
        raise credential_exception
    
    return user

async def get_current_active_user(user: UserInDB = Depends(get_current_user)):
    if user.disabled:
        raise HTTPException(status_code=400, detial="inactive user")



app = FastAPI()

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, details="Incorrect username or password", headers={"WWW-Authenticate": "Bearer"})

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)

    return {"access_token": access_token, "token_type": "bearer"}
