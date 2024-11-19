# models/userModel.py
from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    first_name: str
    last_name: str
    age: int
    gender: str
    patient_number: Optional[int]  # İlişkili hasta numarası
    password: str
