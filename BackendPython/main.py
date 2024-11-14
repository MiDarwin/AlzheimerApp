# main.py
from fastapi import FastAPI, HTTPException
from config.config import Config
from db import users_collection  # db.py dosyasından kullanıcı koleksiyonunu al
from models.userModel import User  # userModel.py dosyasından User modelini al
import uvicorn

# FastAPI uygulamasını başlat
app = FastAPI()


# Kayıt oluşturma endpoint'i
@app.post("/register")
async def register_user(user: User):
    existing_user = await users_collection.find_one({"first_name": user.first_name, "last_name": user.last_name})
    if existing_user:
        raise HTTPException(status_code=400, detail="Kullanıcı zaten kayıtlı.")

    new_user = await users_collection.insert_one(user.dict())
    return {"msg": "Kullanıcı başarıyla eklendi!", "id": str(new_user.inserted_id)}


# Test endpoint'i
@app.get("/")
def read_root():
    return {"message": "Uygulama çalışıyor!"}


# Uygulama başlatma
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=Config.PORT)
