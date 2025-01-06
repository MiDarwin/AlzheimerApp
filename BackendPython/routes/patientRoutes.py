from fastapi import APIRouter, HTTPException, Depends
from controllers.patientController import validate_user_id, create_patient, get_patient_by_user_id,check_existing_patient
from authMiddleware import JWTBearer
from db import patients_collection

from models.patientModel import PatientModel
router = APIRouter()
import re

def clean_text(input_text: str) -> str:
    """
    Verilen metinden özel karakterleri temizler.
    """
    return re.sub(r"[^a-zA-ZçÇğĞıİöÖşŞüÜ0-9\s]", "", input_text).strip()


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

    # Hasta kontrolü: Kullanıcı zaten bir hasta eklemiş mi?
    existing_patient = await check_existing_patient(user_id)
    if existing_patient:
        raise HTTPException(status_code=400, detail="Her kullanıcı sadece bir hasta ekleyebilir.")

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

@router.get("/questions", dependencies=[Depends(JWTBearer())])
async def get_questions():
    """
    Hastaya yöneltilecek soruları döner.
    """
    return {
        "questions": [
            {"id": 1, "question": "Çocuğunuzun adı nedir?"},
            {"id": 2, "question": "Kaç çocuğunuz var?"},
            {"id": 3, "question": "Hangi ilçede yaşıyorsunuz?"}
        ]
    }

@router.post("/validate-answer", dependencies=[Depends(JWTBearer())])
async def validate_answer(
    answer: dict,  # Örn: {"question_id": 1, "answer": "Ali"}
    payload: dict = Depends(JWTBearer())  # Token'den gelen user_id
):
    """
    Kullanıcının verdiği cevabı kontrol eder.
    """
    # Token'den user_id'yi al
    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Geçersiz token. Kullanıcı ID bulunamadı.")

    # Kullanıcıya ait hasta bilgilerini al
    patient = await patients_collection.find_one({"user_id": user_id})
    if not patient:
        raise HTTPException(status_code=404, detail="Hasta bilgisi bulunamadı.")

    # Soruyu belirle ve cevabı kontrol et
    question_id = answer.get("question_id")
    user_answer = clean_text(answer.get("answer", ""))  # Özel karakterleri temizle

    if question_id == 1:  # Çocuk ismi sorusu
        correct_answer = patient.get("children_names", [])
        if user_answer in correct_answer:
            return {"message": "Doğru cevap!"}
        return {"message": "Yanlış cevap."}

    elif question_id == 2:  # Çocuk sayısı sorusu
        correct_answer = str(patient.get("child_count", ""))
        if user_answer == correct_answer:
            return {"message": "Doğru cevap!"}
        return {"message": "Yanlış cevap."}

    elif question_id == 3:  # Yaşadığı yer sorusu
        correct_answer = clean_text(patient.get("district", ""))
        if user_answer == correct_answer:
            return {"message": "Doğru cevap!"}
        return {"message": "Yanlış cevap."}

    raise HTTPException(status_code=400, detail="Geçersiz soru ID.")
