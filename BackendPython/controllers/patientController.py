# Hasta işlemleri
from db import patients_collection
from models.patientModel import PatientModel
from fastapi import HTTPException
# Kullanıcı ID'sini kontrol et
def validate_user_id(user_id: str) -> bool:
    return len(user_id) == 5 and user_id.isdigit()

# Yeni hasta ekle
async def create_patient(patient: PatientModel):
    patient_data = patient.dict()
    result = await patients_collection.insert_one(patient_data)
    return str(result.inserted_id)

# Tüm hastaları getir
async def get_all_patients():
    patients = await patients_collection.find().to_list(length=100)
    return patients
# Kullanıcıya bağlı hasta var mı kontrol et
async def check_existing_patient(user_id: str) -> bool:
    existing_patient = await patients_collection.find_one({"user_id": user_id})
    return existing_patient is not None


# Kullanıcı ID'sine bağlı hasta bilgilerini getir
async def get_patient_by_user_id(user_id: str):
    patient = await patients_collection.find_one({"user_id": user_id})
    if not patient:
        return None  # Eğer kayıt bulunamazsa None döndür
    return {
        "first_name": patient["first_name"],
        "last_name": patient["last_name"],
        "child_count": patient["child_count"],
        "children_names": patient["children_names"],
        "district": patient["district"]
    }


# Hasta silme işlemi
async def delete_patient_by_user_id(user_id: str):
    """
    Belirtilen user_id'ye bağlı hastayı siler.
    """
    # Hasta bilgilerini kontrol et
    patient = await patients_collection.find_one({"user_id": user_id})
    if not patient:
        raise HTTPException(status_code=404, detail="Hasta bilgisi bulunamadı.")

    # Hasta bilgilerini sil
    delete_result = await patients_collection.delete_one({"user_id": user_id})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=500, detail="Hasta silinirken bir hata oluştu.")

    return {"message": "Hasta başarıyla silindi."}