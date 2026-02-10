import DashboardClient from "./dashboard-client";

// Ini adalah Server Component (default)
export default function DashboardPage() {
  // Nantinya, kamu bisa fetch data awal (initial data) dari Python API di sini
  // const initialData = await fetch('http://vps-api/history').then(res => res.json());

  return (
    <div className="min-h-screen">
      {/* Kita panggil Client Component untuk bagian interaktifnya */}
      <DashboardClient />
    </div>
  );
}