import { ImageWithFallback } from '@/components/ImageWithFallback';
import { getStrapiImageUrl } from '@/services/strapiService';
import type { AboutPageData } from '@/types/about';

interface AboutIntroProps {
  data?: AboutPageData;
}

export function AboutIntro({ data }: AboutIntroProps) {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={getStrapiImageUrl(data?.Background) || 'images/placeholder.png'}
          alt="Tentang Kami"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/40" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-2xl sm:text-5xl font-bold mb-6">
          {data?.PageH1 || 'Mengenal PT Pakar Ekosistem Indonesia'}
        </h1>
        <p className="text-md sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
          {data?.H1Detail ||
            'PT Pakar Ekosistem Indonesia (PEI) adalah perusahaan yang berdedikasi untuk menyediakan solusi pengelolaan limbah industri yang inovatif dan berkelanjutan. Dengan pengalaman lebih dari satu dekade, kami telah menjadi mitra terpercaya bagi berbagai sektor industri dalam mengelola limbah mereka secara efektif dan ramah lingkungan.'}
        </p>
      </div>
    </section>
  );
}
