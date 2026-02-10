"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy Auth - Nanti hubungkan ke API Python
    if (form.username === "admin" && form.password === "admin123") {
      router.push("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">HMI Portal</h2>
          <p className="mt-2 text-sm text-slate-500">Industry Class Monitoring System</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                required
                className="block w-full rounded-lg border border-slate-300 pl-10 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="password"
                required
                className="block w-full rounded-lg border border-slate-300 pl-10 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}