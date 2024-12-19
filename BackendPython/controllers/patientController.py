# Hasta işlemleri
from db import patients_collection
from models.patientModel import PatientModel

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
