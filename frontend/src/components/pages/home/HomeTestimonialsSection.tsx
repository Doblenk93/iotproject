'use client';

import { Testimonials } from '@/components/Testimonials';
import type { HomePageTestimonialItem } from '@/types/home';

interface HomeTestimonialsSectionProps {
  title?: string;
  detail?: string;
  items?: HomePageTestimonialItem[];
  max?: number;
  randomize?: boolean;
}

export function HomeTestimonialsSection({
  title,
  detail,
  items = [],
  max = 10,
  randomize = false,
}: HomeTestimonialsSectionProps) {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {title || 'Kesaksian Pelanggan'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{detail}</p>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <Testimonials items={items} max={max} randomize={randomize} />
        </div>
      </div>
    </section>
  );
}
