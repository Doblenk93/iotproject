"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import axiosInstance from "@/config/axiosConfig";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(form);

    try {
      await axiosInstance.post('/auth/login', payload);
      router.replace('/dashboard');
      router.refresh();
    /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) { 
      setError(err.detail || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">IOT Dashboard</h2>
          <p className="mt-1 text-sm text-slate-500">test</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="space-y-4">
            <FormInput 
              name="username"
              type="text"
              placeholder="Username"
              icon={User}
              required
            />
            <FormInput 
              name="password"
              type="password"
              placeholder="Password"
              icon={Lock}
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}