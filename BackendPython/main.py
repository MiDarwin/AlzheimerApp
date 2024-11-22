# main.py
from fastapi import FastAPI
from config.config import Config
from routes.authRoutes import router as auth_router# routes dosyasından auth router'ı al
from routes.patientRoutes import router as patient_router
import uvicorn

# FastAPI uygulamasını başlat
app = FastAPI()

# auth router'ı ekle
app.include_router(auth_router)
app.include_router(patient_router)
# Test endpoint'i
@app.get("/")
def read_root():
    return {"message": "Uygulama çalışıyor!"}

# Uygulama başlatma
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=Config.PORT)
