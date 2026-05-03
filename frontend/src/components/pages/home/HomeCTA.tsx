import { ArrowRight, Phone } from 'lucide-react';

interface HomeCTAProps {
  title?: string;
  description?: string;
}

export function HomeCTA({
  title = 'Siap untuk Membangun Masa Depan Lingkungan Anda?',
  description = 'Hubungi tim ahli kami untuk konsultasi dan lihat bagaimana kami dapat membantu Anda mencapai tujuan lingkungan dan perijinan anda.',
}: HomeCTAProps) {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">{title}</h2>
        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">{description}</p>
        <a
          href="/contact"
          className="bg-[#22c55e] text-white px-8 py-4 rounded-lg hover:bg-[#16a34a] transition-all transform hover:scale-105 inline-flex items-center gap-2 text-lg font-semibold"
        >
          Hubungi kami
          <Phone className="w-5 h-5" />
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
