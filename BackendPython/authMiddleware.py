from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer
import jwt
from config.config import SECRET_KEY

class JWTBearer(HTTPBearer):
    async def __call__(self, request: Request):
        credentials = await super().__call__(request)
        if credentials:
            try:
                payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
                return payload  # Token içeriğini döndür
            except jwt.ExpiredSignatureError:
                raise HTTPException(status_code=401, detail="Token süresi dolmuş.")
            except jwt.InvalidTokenError:
                raise HTTPException(status_code=401, detail="Geçersiz token.")
        else:
            raise HTTPException(status_code=403, detail="Yetkilendirme bilgisi eksik.")
