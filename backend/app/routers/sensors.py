from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user # Fungsi validasi JWT
from app.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.models import SensorData

router = APIRouter(prefix="/sensors", tags=["IoT Data"])

# Endpoint Protected (Butuh Token)
@router.get("/latest")
async def get_latest_data(
    current_user: dict = Depends(get_current_user), # <-- Middleware Auth
    db: AsyncSession = Depends(get_db)
):
    # Query TimeScaleDB
    # Logic: Ambil data terakhir
    query = select(SensorData).order_by(SensorData.timestamp.desc()).limit(1)
    result = await db.execute(query)
    data = result.scalars().first()
    
    if not data:
        return {"status": "nodata"}
        
    return data