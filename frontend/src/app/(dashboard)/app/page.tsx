import DashboardClient from "./dashboard-client";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  // Request Server-to-Server (Next.js ke Python)
  const res = await fetch('http://URL_BACKEND_PYTHON_KAMU/api/dashboard-data', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Gagal ambil data');
  }

  return res.json();
}

export default async function DashboardPage() {
  const authData = checkAuth();

  if (authData === null) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen">
      <DashboardClient />
    </div>
  );
}