import { Projects } from '@/components/Projects';
import { ImageWithFallback } from '@/components/ImageWithFallback';

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

      {/* Projects Showcase */}
      <Projects />

      {/* CTA */}
      {/*
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            {"Let's"} discuss how we can bring your vision to life with sustainable solutions.
          </p>
          <button className="bg-[#22c55e] text-white px-8 py-4 rounded-lg hover:bg-[#16a34a] transition-all transform hover:scale-105 inline-flex items-center gap-2 text-lg font-semibold">
            Contact Our Team
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
      */}
    </div>
  );
}
