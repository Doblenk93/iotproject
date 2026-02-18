import { Leaf, Zap, LineChart, Users, Award, ArrowRight, Phone } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { Testimonials } from '@/components/Testimonials';

export default function HomePage() {
  const services = [
    {
      color: '#22c55e',
      icon: <Leaf className="w-12 h-12 text-[#22c55e]" />,
      title: 'Environmental Assessments',
      description:
        'Comprehensive environmental impact studies and sustainability audits for your projects.',
      link: '/services/environmental-assessments',
    },
    {
      color: '#3b82f6',
      icon: <Zap className="w-12 h-12 text-[#3b82f6]" />,
      title: 'Electrical Engineering',
      description:
        'Innovative electrical solutions designed for efficiency and environmental responsibility.',
      link: '/'
    },
    {
      color: '#f59e0b',
      icon: <LineChart className="w-12 h-12 text-[#f59e0b]" />,
      title: 'Energy Optimization',
      description:
        'Data-driven strategies to reduce energy consumption and maximize renewable integration.',
      link: '/'
    },
  ];

  const stats = [
    { icon: <Leaf className="w-8 h-8" />, value: '50%', label: 'CO₂ Reduction' },
    { icon: <Zap className="w-8 h-8" />, value: '100+', label: 'Projects Completed' },
    { icon: <Users className="w-8 h-8" />, value: '85+', label: 'Happy Clients' },
    { icon: <Award className="w-8 h-8" />, value: '15+', label: 'Industry Awards' },
  ];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1756511332583-99fc0d4bf7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGdyZWVuJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MDI5Njc4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Solar panels in green landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/50" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Pelopor Solusi Kelistrikan Terbarukan
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-slate-200 max-w-2xl mx-auto">
            Mengurangi limbah karbon dengan teknologi lingkungan inovatif
          </p>
          <a
            href="/services" 
            className="bg-[#22c55e] text-white px-8 py-4 rounded-lg hover:bg-[#16a34a] transition-all 
            transform inline-flex items-center gap-2 text-lg font-semibold"
          >
            Pelajari selengkapnya
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Keahlian Kami
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Dari penilaian dampak lingkungan hingga solusi rekayasa listrik, tim ahli kami siap memberikan hasil yang terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <a
                key={index}
                href={service.link}
                className={`bg-white border border-slate-200 rounded-xl p-8 hover:shadow-xl hover:border-[#87c55e] transition-all group duration-300`}
              >
                <div className="mb-6 w-12 h-12 flex justify-start items-center transform group-hover:scale-110 transition-transform origin-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                <div
                  className={`text-[${service.color}] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all`}
                >
                  Selengkapnya
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-[#22c55e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />            

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Siap untuk Membangun Masa Depan Energi Anda?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Hubungi tim ahli kami hari ini untuk konsultasi gratis dan lihat bagaimana kami dapat membantu Anda mencapai tujuan lingkungan dan kelistrikan Anda.
          </p>
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
    </div>
  );
}
