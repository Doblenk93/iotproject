import { Phone } from 'lucide-react';
import { Contacts } from '@/components/Contacts';

export default function ContactPage() {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Get in Touch for Your Next Project</h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            Have questions or ready to start? Our team of experts is here to help you achieve 
            your environmental and electrical goals.
          </p>
        </div>
      </section>

      <Contacts />

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Emergency Service?</h2>
          <p className="text-lg mb-6 opacity-90">
            Our 24/7 emergency response team is standing by for urgent electrical issues.
          </p>
          <a
            href="tel:555-911-HELP"
            className="bg-white text-[#22c55e] px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-2 font-semibold"
          >
            <Phone className="w-5 h-5" />
            Call Emergency Line: (555) 911-HELP
          </a>
        </div>
      </section>
    </div>
  );
}
