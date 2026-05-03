import DashboardClient from './dashboard-client';
import { redirect } from 'next/navigation';
import { fetchDashboardAuthData } from '@/services/authService';

export default async function DashboardPage() {
  const authData = await fetchDashboardAuthData();

  if (!authData) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen">
      <DashboardClient />
    </div>
  );
}