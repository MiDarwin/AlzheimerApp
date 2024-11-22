from pydantic import BaseModel, Field
from typing import List, Optional

class PatientModel(BaseModel):
    user_id: str  # Kullanıcı ID'si ile bağlantı
    first_name: str
    last_name: str
    child_count: int
    children_names: Optional[List[str]] = Field(default_factory=list)  # Boş liste için default_factory kullanıyoruz
    district: str  # Oturduğu ilçe