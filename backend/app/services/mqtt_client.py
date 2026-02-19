import json
import os
import paho.mqtt.client as mqtt

MQTT_HOST = os.getenv("MQTT_HOST", "mqtt")
MQTT_PORT = int(os.getenv("MQTT_PORT", 1883))

last_message = {}

def on_connect(client, userdata, flags, rc, properties=None): # Sesuaikan parameter untuk versi baru
    print("Connected to MQTT with result code", rc)
    client.subscribe("iot/sensors/#")

def on_message(client, userdata, msg):
    global last_message
    try:
        payload = json.loads(msg.payload.decode())
    except json.JSONDecodeError:
        payload = msg.payload.decode()

    last_message = {
        "topic": msg.topic,
        "payload": payload
    }
    print("Received:", last_message)

def start_mqtt():
    # Gunakan Callback API Version 2 (wajib untuk paho-mqtt terbaru)
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2) 
    client.on_connect = on_connect
    client.on_message = on_message
    
    # Gunakan variabel env agar dinamis, bukan hardcode "mqtt"
    client.connect(MQTT_HOST, MQTT_PORT, 60) 
    client.loop_start()
    return client