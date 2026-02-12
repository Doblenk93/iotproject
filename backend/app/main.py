from fastapi import FastAPI
from app.routers import auth, sensors
from app.services.mqtt_client import start_mqtt, last_message
from app.core.database import engine, Base

app = FastAPI(title="IoT Project Backend")

app.include_router(auth.router)
app.include_router(sensors.router)

@app.on_event("startup")
async def startup_event():
    # Buat tabel di database (jika belum ada)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    # Start MQTT Client
    global mqtt_client
    mqtt_client = start_mqtt()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/last-message")
def get_last_message():
    return last_message

@app.get("/")
def read_root():
    return {"message": "Welcome to the IoT Project Backend!"}
