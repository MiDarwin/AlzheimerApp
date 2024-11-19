# routes/authRoutes.py
from fastapi import APIRouter
from pydantic import BaseModel
from controllers.authController import register_user, login_user
from models.userModel import User

router = APIRouter()
# Giriş işlemi için bir Pydantic model oluştur
class LoginRequest(BaseModel):
    first_name: str
    last_name: str
    password: str
@router.post("/register")
async def register(user: User):
    return await register_user(user)


@router.post("/login")
async def login(login_request: LoginRequest):
    return await login_user(
        login_request.first_name,
        login_request.last_name,
        login_request.password
    )
@router.get("/user/{user_id}")
async def get_user(user_id: str):
    return await get_user_by_id(user_id)
