# Kayıt olma, giriş
# controllers/authController.py
import jwt
import secrets
from datetime import datetime, timedelta
from fastapi import HTTPException
from models.userModel import User
from db import users_collection
from bcrypt import hashpw, gensalt
from bcrypt import checkpw
from config.config import SECRET_KEY
# Kayıt oluşturma işlemi
async def register_user(user: User):
    # 5 haneli rastgele ID oluştur
    random_id = str(secrets.randbelow(10 ** 5)).zfill(5)  # 00001 - 99999 arasında değer

    # Kullanıcı zaten var mı kontrol et (ID ve e-posta kontrolü)
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Bu e-posta ile zaten kayıtlı bir kullanıcı var.")

    # E-posta uzantısını kontrol et
    allowed_domains = ["@gmail.com", "@hotmail.com"]
    if not any(user.email.endswith(domain) for domain in allowed_domains):
        raise HTTPException(status_code=400, detail="E-posta sadece '@gmail.com' veya '@hotmail.com' uzantılı olmalıdır.")

    # Şifreyi hashle
    hashed_password = hashpw(user.password.encode('utf-8'), gensalt())

    # Kullanıcı kaydını oluştur
    user_data = user.dict()
    user_data["_id"] = random_id  # Rastgele ID ata
    user_data["password"] = hashed_password.decode('utf-8')

    await users_collection.insert_one(user_data)
    return {"message": "Kullanıcı başarıyla oluşturuldu!", "user_id": random_id}

# Giriş yapma işlemi
async def login_user(email: str, password: str):
    # Kullanıcıyı e-posta ile bul
    user = await users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="E-posta ile kayıtlı bir kullanıcı bulunamadı.")

    # Şifreyi doğrula
    if not checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
        raise HTTPException(status_code=401, detail="Şifre yanlış.")

    # Token oluştur
    token_data = {
        "user_id": user["_id"],  # Kullanıcı ID'si
        "exp": datetime.utcnow() + timedelta(hours=1)  # Token'in süresi (1 saat)
    }
    token = jwt.encode(token_data, SECRET_KEY, algorithm="HS256")

    return {"token": f"Bearer {token}", "message": "Giriş başarılı!"}

async def get_user_by_id(user_id: str):
    user = await users_collection.find_one({"_id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı.")
    return {"first_name": user["first_name"], "last_name": user["last_name"]}
