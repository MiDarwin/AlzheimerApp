# models/userModel.py
from pydantic import BaseModel,Field
from typing import Optional

class User(BaseModel):
    _id: str
    first_name: str
    last_name: str
    email: str = Field(..., description="E-posta '@gmail.com' veya '@hotmail.com' uzantılı olmalıdır.")
    password: str
