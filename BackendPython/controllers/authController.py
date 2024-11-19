# Kayıt olma, giriş
# controllers/authController.py
import secrets
from fastapi import HTTPException
from models.userModel import User
from db import users_collection
from bcrypt import hashpw, gensalt
from bcrypt import checkpw

# Kayıt oluşturma işlemi
async def register_user(user: User):
    # 5 haneli rastgele ID oluştur
    random_id = str(secrets.randbelow(10 ** 5)).zfill(5)  # 00001 - 99999 arasında değer

    # Kullanıcı zaten var mı kontrol et
    existing_user = await users_collection.find_one({"_id": random_id})
    if existing_user:
        raise HTTPException(status_code=400, detail="Bu kullanıcı ID'si zaten var.")

    # Şifreyi hashle
    hashed_password = hashpw(user.password.encode('utf-8'), gensalt())

    # Kullanıcı kaydını oluştur
    user_data = user.dict()
    user_data["_id"] = random_id  # Rastgele ID ata
    user_data["password"] = hashed_password.decode('utf-8')

    await users_collection.insert_one(user_data)
    return {"message": "Kullanıcı başarıyla oluşturuldu!", "user_id": random_id}

# Giriş yapma işlemi

async def login_user(first_name: str, last_name: str, password: str):
    # Kullanıcıyı bul
    user = await users_collection.find_one({"first_name": first_name, "last_name": last_name})
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı.")

    # Şifreyi doğrula
    if not checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
        raise HTTPException(status_code=401, detail="Şifre yanlış.")

    # Token olarak kullanıcı ID'sini döndür
    token = user["_id"]  # Kullanıcı ID'si artık token olarak kullanılacak
    return {"token": token, "message": "Giriş başarılı!"}

async def get_user_by_id(user_id: str):
    user = await users_collection.find_one({"_id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı.")
    return {"first_name": user["first_name"], "last_name": user["last_name"], "age": user["age"]}
