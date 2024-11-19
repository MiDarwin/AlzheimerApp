# Kayıt olma, giriş
# controllers/authController.py
from fastapi import HTTPException
from models.userModel import User
from db import users_collection


# Kayıt oluşturma işlemi
async def register_user(user: User):
    existing_user = await users_collection.find_one({"first_name": user.first_name, "last_name": user.last_name})
    if existing_user:
        raise HTTPException(status_code=400, detail="Kullanıcı zaten kayıtlı.")

    new_user = await users_collection.insert_one(user.dict())
    return {"msg": "Kullanıcı başarıyla eklendi!", "id": str(new_user.inserted_id)}
