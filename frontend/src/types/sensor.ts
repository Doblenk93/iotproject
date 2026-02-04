export interface SensorData {
  deviceId: string;
  temperature: number;
  humidity: number;
  timestamp: string; // ISO String dari Backend
}

export interface ControlState {
  deviceId: string;
  status: boolean;
}