// src/app/(profile)/layout.tsx
import { Header } from '@/components/ui/profile/Header';
import { Footer } from '@/components/ui/profile/Footer'; // Asumsi kamu punya komponen Footer
import { getGeneralInfoHeader, getGeneralInfoFooter } from '@/services/strapiService';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let headerData: any = null;
  let footerData: any = null;

  try {
    const header = await getGeneralInfoHeader();
    const footer = await getGeneralInfoFooter(); // Ganti dengan getGeneralInfoFooter() jika kamu buat service khusus untuk footer

    headerData = header?.data;
    footerData = footer?.data;

  } catch (err) {
    console.error('Failed to load Strapi header/footer data:', err);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header akan muncul di Home, About, Contact, dll */}
      <Header data={headerData} /> 
      
      <main className="flex-1 pt-16">
        {children}
      </main>

      <Footer data={footerData} />
    </div>
  );
}