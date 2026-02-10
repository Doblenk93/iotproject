// src/app/(profile)/layout.tsx
import { Header } from '@/components/ui/profile/Header';
import { Footer } from '@/components/ui/profile/Footer'; // Asumsi kamu punya komponen Footer

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header akan muncul di Home, About, Contact, dll */}
      <Header /> 
      
      <main className="flex-1 pt-16">
        {children}
      </main>

      <Footer />
    </div>
  );
}