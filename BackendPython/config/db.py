# db.py
from motor.motor_asyncio import AsyncIOMotorClient

# MongoDB bağlantısını başlat
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["alzheimer_app"]  # Veritabanı adı

# users_collection adlı bir koleksiyon oluştur
users_collection = db["users"]
