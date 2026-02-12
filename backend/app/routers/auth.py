from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.schemas import LoginRequest, TokenResponse
from app.core.security import verify_password, create_access_token, get_user_by_email

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse)
async def login(credentials: LoginRequest, db: AsyncSession = Depends(get_db)):
    # 1. Cek user di DB
    user = await get_user_by_email(db, credentials.username)
    if not user:
        raise HTTPException(status_code=401, detail="Email tidak ditemukan")
    
    # 2. Cek password hash
    if not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Password salah")
    
    # 3. Buat JWT
    # Perhatikan: Backend Python GAK PERLU mikirin cookie.
    # Dia cuma kasih string token. Next.js yang bakal bungkus jadi cookie.
    access_token = create_access_token(data={"sub": user.email, "role": user.role})
    
    return {"access_token": access_token, "token_type": "bearer"}