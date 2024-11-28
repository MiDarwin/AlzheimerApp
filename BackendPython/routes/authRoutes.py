# routes/authRoutes.py
from fastapi import APIRouter,Depends
from pydantic import BaseModel
from controllers.authController import register_user, login_user
from models.userModel import User
from authMiddleware import JWTBearer
from controllers.authController import get_user_by_id
router = APIRouter()
# Giriş işlemi için bir Pydantic model oluştur
class LoginRequest(BaseModel):
    email:str
    password: str
@router.post("/register")
async def register(user: User):
    return await register_user(user)


@router.post("/login")
async def login(login_request: LoginRequest):
    return await login_user(
        login_request.email,
        login_request.password
    )
@router.get("/user", dependencies=[Depends(JWTBearer())])
async def get_user_data(payload: dict = Depends(JWTBearer())):
    user_id = payload.get("user_id")
    return await get_user_by_id(user_id)