import json
import paho.mqtt.client as mqtt

last_message = {}

def on_connect(client, userdata, flags, rc):
    print("Connected to MQTT with result code", rc)
    client.subscribe("water/+/+")

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
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect("mqtt", 1883, 60)
    client.loop_start()
    return client
