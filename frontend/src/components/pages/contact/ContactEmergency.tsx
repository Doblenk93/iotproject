import { Phone } from 'lucide-react';
import { formatPhoneNumber } from '@/utils/formatter';
import type { ContactDetails } from '@/types/contact';

interface ContactEmergencyProps {
  contactDetails?: ContactDetails;
}

export function ContactEmergency({ contactDetails }: ContactEmergencyProps) {
  const phone = contactDetails?.Contacts?.[0]?.Phone;
  const name = contactDetails?.Contacts?.[0]?.Name;

  return (
    <section className="py-16 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Butuh Layanan Cepat?</h2>
        <p className="text-lg mb-6 opacity-90">
          Tim kami siap membantu Anda dengan layanan darurat. Jangan ragu untuk menghubungi kami kapan saja!
        </p>
        <a
          href={`tel:${phone}`}
          className="bg-white text-[#22c55e] px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-2 font-semibold"
        >
          <Phone className="w-5 h-5" />
          Kontak: {formatPhoneNumber(phone || '', name || '')}
        </a>
      </div>
    </section>
  );
}
