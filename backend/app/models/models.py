from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, TIMESTAMP
from sqlalchemy.sql import func
from app.core.database import Base

# Tabel User
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    role = Column(String, default="user") # admin / user
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

# Tabel Data Sensor (IoT)
class SensorData(Base):
    __tablename__ = "sensor_data"

    # Di TimescaleDB, timestamp adalah komponen utama primary key (hypertable)
    # Tapi untuk setup simpel SQLAlchemy, kita pakai ID dulu.
    # Nanti perlu convert table ini jadi hypertable via SQL command manual/migration.
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    timestamp = Column(TIMESTAMP(timezone=True), server_default=func.now(), index=True)
    
    topic = Column(String, index=True) # misal: "iot/suhu/ruang1"
    device_id = Column(String, index=True)
    
    # Value sensor
    temperature = Column(Float, nullable=True)
    humidity = Column(Float, nullable=True)
    voltage = Column(Float, nullable=True)
    
    # Simpan raw payload json kalau perlu debugging
    raw_payload = Column(String, nullable=True)