# models/userModel.py
from pydantic import BaseModel,EmailStr
from typing import Optional

class User(BaseModel):
    _id: str
    first_name: str
    last_name: str
    email: EmailStr  # Email doğrulama için Pydantic'in EmailStr tipini kullandık
    password: str
