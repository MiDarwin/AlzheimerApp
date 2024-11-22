from fastapi import APIRouter, HTTPException
from controllers.patientController import validate_user_id, create_patient, get_all_patients
from models.patientModel import PatientModel

router = APIRouter()

# GET isteği: Tüm hastaları getir
@router.get("/patients")
async def get_patients():
    patients = await get_all_patients()
    return {"data": patients}

# POST isteği: Hasta oluştur
@router.post("/patients")
async def add_patient(patient: PatientModel):
    # Kullanıcı ID'sini kontrol et
    if not validate_user_id(patient.user_id):
        raise HTTPException(status_code=400, detail="Geçersiz kullanıcı ID'si. ID 5 haneli olmalıdır.")

    # Hasta ekleme işlemi
    result = await create_patient(patient)
    return {"message": "Hasta başarıyla eklendi.", "data": result}
