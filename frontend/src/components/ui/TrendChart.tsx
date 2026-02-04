"use client"; // Wajib di Next.js App Router untuk komponen interaktif
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SensorData } from '@/types/sensor';

interface Props {
  data: SensorData[];
}

export default function TrendChart({ data }: Props) {
  return (
    <div className="h-[300px] w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-slate-600 font-semibold mb-4">Live Temperature Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(str) => new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            fontSize={12}
            tick={{fill: '#64748b'}}
          />
          <YAxis fontSize={12} tick={{fill: '#64748b'}} unit="°C" />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Line 
            type="monotone" 
            dataKey="temperature" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            dot={false}
            isAnimationActive={false} // Matikan animasi agar update realtime tidak 'melompat'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}