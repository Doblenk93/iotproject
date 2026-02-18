import { Phone } from 'lucide-react';
import { Contacts } from '@/components/Contacts';

export default function ContactPage() {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Hubungi Kami untuk Proyek Anda Selanjutnya</h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            Punya pertanyaan atau siap untuk memulai? 
            Tim ahli kami siap membantu Anda mencapai tujuan lingkungan dan kelistrikan Anda.
          </p>
        </div>
      </section>

      <Contacts />

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Butuh Layanan Cepat?</h2>
          <p className="text-lg mb-6 opacity-90">
            Tim kami siap membantu Anda dengan layanan darurat. Jangan ragu untuk menghubungi kami kapan saja!
          </p>
          <a
            href="tel:6281380126377"
            className="bg-white text-[#22c55e] px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-2 font-semibold"
          >
            <Phone className="w-5 h-5" />
            Kontak: (+62) 813-8012-6377 (Olin)
          </a>
        </div>
      </section>
    </div>
  );
}
