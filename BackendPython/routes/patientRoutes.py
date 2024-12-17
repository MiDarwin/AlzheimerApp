from fastapi import APIRouter, HTTPException, Depends
from controllers.patientController import validate_user_id, create_patient, get_patient_by_user_id
from models.patientModel import PatientModel
from authMiddleware import JWTBearer

router = APIRouter()


# POST isteği: Hasta oluştur
@router.post("/patients")
async def add_patient(patient: PatientModel):
    # Kullanıcı ID'sini kontrol et
    if not validate_user_id(patient.user_id):
        raise HTTPException(status_code=400, detail="Geçersiz kullanıcı ID'si. ID 5 haneli olmalıdır.")

    # Hasta ekleme işlemi
    result = await create_patient(patient)
    return {"message": "Hasta başarıyla eklendi.", "data": result}


# GET isteği: Token'deki user_id'ye göre hasta bilgilerini getir
@router.get("/patients", dependencies=[Depends(JWTBearer())])
async def get_patients_by_token(payload: dict = Depends(JWTBearer())):
    user_id = payload.get("user_id")  # Token'den user_id'yi al
    if not user_id:
        raise HTTPException(status_code=401, detail="Geçersiz token. Kullanıcı ID bulunamadı.")

    # Kullanıcı ID'sine bağlı hasta bilgilerini al
    patient = await get_patient_by_user_id(user_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Kullanıcıya bağlı hasta bilgisi bulunamadı.")

    return {"data": patient}
