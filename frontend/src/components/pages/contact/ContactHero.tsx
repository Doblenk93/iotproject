import { ImageWithFallback } from '@/components/ImageWithFallback';
import { getStrapiImageUrl } from '@/services/strapiService';
import type { ContactPageData } from '@/types/contact';

interface ContactHeroProps {
  data?: ContactPageData;
}

export function ContactHero({ data }: ContactHeroProps) {
  const heroTitle = data?.PageH1 || 'Hubungi Kami untuk Proyek Anda Selanjutnya';
  const heroSubtitle = data?.H1Detail ||
    'Punya pertanyaan atau siap untuk memulai proyek Anda? Tim ahli kami siap membantu untuk melayani kebutuhan lingkungan Anda.';

  return (
    <section className="relative text-white py-20 overflow-hidden min-h-[60vh]">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={getStrapiImageUrl(data?.Background) || '/images/placeholder.jpg'}
          alt="Hubungi Kami"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/50" />
      </div>

      <div className="absolute inset-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">{heroTitle}</h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">{heroSubtitle}</p>
      </div>
    </section>
  );
}
