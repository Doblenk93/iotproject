from fastapi import FastAPI
from mqtt_client import start_mqtt, last_message

app = FastAPI()
mqtt_client = None

@app.on_event("startup")
def startup():
    global mqtt_client
    mqtt_client = start_mqtt()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/last-message")
def get_last_message():
    return last_message

@app.post("/actuator/on")
def actuator_on():
    mqtt_client.publish(
        "water/plant1/pump/set",
        '{"command": "ON"}'
    )
    return {"status": "command sent"}
