'use client';

import { ImageWithFallback } from '@/components/ImageWithFallback';
import { getStrapiImageUrl } from '@/services/strapiService';
import type { HomePageData } from '@/types/home';

interface HomeHeroProps {
  data?: HomePageData;
}

export function HomeHero({ data }: HomeHeroProps) {
  const title = data?.PageH1 || 'Pakar Ekosistem Indonesia';
  const subtitle = data?.H1Detail || 'INTEGRATED ENVIRONMENTAL SERVICE';
  const heroBg = getStrapiImageUrl(data?.Background);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={heroBg}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-slate-200 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
