import { Suspense } from 'react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { PortfolioGrid } from '@/components/PortfolioGrid';

export const metadata = {
  title: 'Portofolio | Pakar Ekosistem Indonesia',
  description: 'Jelajahi portofolio proyek kami yang mencakup pengolahan limbah, pemantauan lingkungan, dan solusi berkelanjutan.',
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden min-h-[60vh]">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/images/PengolahanLimbahGenerated.jpg"
            alt="Pengolahan Limbah Industri"
            className="w-full h-full object-cover"
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/50" />
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Proyek Kami: Solusi Lingkungan yang Terpercaya
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            Jelajahi portofolio proyek kami yang mencakup pengolahan limbah, pemantauan lingkungan, dan solusi berkelanjutan lainnya yang telah kami implementasikan.
          </p>
        </div>
      </section>

      {/* Portfolio Grid with Pagination & Modal */}
      <Suspense fallback={<div className="text-center py-20">Memuat portofolio...</div>}>
        <PortfolioGrid />
      </Suspense>
    </div>
  );
}
