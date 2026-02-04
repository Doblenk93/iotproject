"use client";
import { useState, useEffect } from 'react';
import TrendChart from '@/components/ui/TrendChart';
import { SensorData } from '@/types/sensor';

export default function DashboardPage() {
  const [history, setHistory] = useState<SensorData[]>([]);
  const [isOn, setIsOn] = useState(false);

  // Simulasi Data Masuk (Nanti diganti WebSocket/SWR)
  useEffect(() => {
    const interval = setInterval(() => {
      const newData: SensorData = {
        deviceId: "Sns-01",
        temperature: 25 + Math.random() * 5,
        humidity: 60 + Math.random() * 10,
        timestamp: new Date().toISOString(),
      };
      setHistory((prev) => [...prev.slice(-20), newData]); // Simpan 20 data terakhir
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleToggle = async () => {
    // Logic kirim perintah ke Python Backend
    setIsOn(!isOn);
    console.log(`Sending command: ${!isOn ? 'START' : 'STOP'}`);
  };

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Industrial HMI</h1>
            <p className="text-slate-500">Monitoring & Control System</p>
          </div>
          <button 
            onClick={() => window.location.href = '/api/export-csv'} // Placeholder
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Export Report (.CSV)
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card Statistik */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">Current Temp</p>
            <p className="text-4xl font-bold text-blue-600">
              {history[history.length - 1]?.temperature.toFixed(1) || '0'}°C
            </p>
          </div>

          {/* Control Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <p className="text-sm text-slate-500 font-medium">Machine Status</p>
            <div className="flex items-center gap-4">
              <span className={`h-3 w-3 rounded-full ${isOn ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className="font-bold uppercase tracking-wider">{isOn ? 'Running' : 'Stopped'}</span>
            </div>
            <button 
              onClick={handleToggle}
              className={`mt-4 py-2 rounded-lg font-bold transition-all ${
                isOn ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'
              }`}
            >
              {isOn ? 'EMERGENCY STOP' : 'START SYSTEM'}
            </button>
          </div>
        </div>

        <TrendChart data={history} />
      </div>
    </main>
  );
}