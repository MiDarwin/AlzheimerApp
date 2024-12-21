from fastapi import APIRouter, HTTPException, Depends
from controllers.patientController import validate_user_id, create_patient, get_patient_by_user_id
from models.patientModel import PatientModel
from authMiddleware import JWTBearer

router = APIRouter()


# POST isteği: Hasta oluştur
@router.post("/patients", dependencies=[Depends(JWTBearer())])
async def add_patient(
    patient_data: dict,  # Raw JSON verisini al
    payload: dict = Depends(JWTBearer())  # Token'den gelen veriyi al
):
    # Token'den user_id'yi al
    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Geçersiz token. Kullanıcı ID bulunamadı.")

    # Gelen veriye token'den alınan user_id'yi ekle
    patient_data["user_id"] = user_id

    # Veriyi PatientModel'e dönüştür
    try:
        patient = PatientModel(**patient_data)
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Model oluşturulurken hata oluştu: {str(e)}")

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
