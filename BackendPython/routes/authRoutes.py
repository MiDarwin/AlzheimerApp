# routes/authRoutes.py
from fastapi import APIRouter
from models.userModel import User
from controllers.authController import register_user

router = APIRouter()

@router.post("/register")
async def register(user: User):
    return await register_user(user)
