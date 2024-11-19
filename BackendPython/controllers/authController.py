# Kayıt olma, giriş
# controllers/authController.py
from fastapi import HTTPException
from models.userModel import User
from db import users_collection
from bcrypt import hashpw, gensalt
from bcrypt import checkpw

# Kayıt oluşturma işlemi
async def register_user(user: User):
    existing_user = await users_collection.find_one({"first_name": user.first_name, "last_name": user.last_name})
    if existing_user:
        raise HTTPException(status_code=400, detail="Kullanıcı zaten kayıtlı.")

    # Şifreyi hash'le
    hashed_password = hashpw(user.password.encode('utf-8'), gensalt())
    user.password = hashed_password.decode('utf-8')  # Byte'ı string'e dönüştür

    new_user = await users_collection.insert_one(user.dict())
    return {"msg": "Kullanıcı başarıyla eklendi!", "id": str(new_user.inserted_id)}


# Giriş yapma işlemi
async def login_user(first_name: str, last_name: str, password: str):
    # Kullanıcıyı bul
    user = await users_collection.find_one({"first_name": first_name, "last_name": last_name})
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı.")

    # Şifreyi kontrol et
    if not checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
        raise HTTPException(status_code=401, detail="Şifre yanlış.")

    return {"msg": "Giriş başarılı!", "user_id": str(user["_id"])}