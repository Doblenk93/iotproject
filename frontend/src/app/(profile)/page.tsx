import { Leaf, Zap, LineChart, Users, Award, ArrowRight, Phone } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { Testimonials } from '@/components/Testimonials';
import {
  getHomePageData,
  getStrapiImageUrl,
} from '@/services/strapiService';

export default async function HomePage() {
  let homePage: any = null;
  let portfolios: any[] = [];
  let testimonials: any[] = [];

  try {
    const data = await getHomePageData();
    
    homePage = data.homePage?.data || {};
    portfolios = data.portfolios?.data || [];
    testimonials = data.testimonials?.data || [];

    console.log("portfolios Data:", portfolios);
  } catch (err) {
    console.error('Failed to load Strapi homepage data:', err);
  }

  // 2. Mapping Data Hero
  const heroTitle = homePage?.PageH1 || 'Pakar Ekosistem Indonesia';
  const heroSubtitle = homePage?.H1Detail || 'INTEGRATED ENVIRONMENTAL SERVICE';
  
  // Gunakan objek Background langsung, fungsi getStrapiImageUrl akan urus URL-nya
  const heroBg = getStrapiImageUrl(homePage?.Background);

  // 3. Mapping Capabilities (Jika data dari Strapi kosong, pakai hardcode)
  // Di JSON abang, field-nya namanya 'Capabilities', bukan 'services'
  const capabilitiesData = homePage?.Capabilities.ValuePoints || [];

  const getIcon = (iconName: string[]) => {
    const name = iconName?.[0]?.toLowerCase();
    switch (name) {
      case 'leaf': return <Leaf className="w-12 h-12 text-green-500" />;
      case 'zap': return <Zap className="w-12 h-12 text-blue-500" />;
      case 'lightbulb': return <LineChart className="w-12 h-12 text-yellow-500" />;
      default: return <Leaf className="w-12 h-12 text-slate-400" />;
    }
  };

  const mappedTestimonials = testimonials.map((item: any) => ({
    id: item.id,
    ClientWords: item.ClientWords,
    ClientName: item.ClientName,
    ClientCompany: item.ClientCompany,
    // Proses URL gambar di server!
    ClientPicture: getStrapiImageUrl(item.ClientPicture) 
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section (data-driven) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={heroBg}
            alt={heroTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {heroTitle}
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-slate-200 max-w-2xl mx-auto">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Keahlian & Kapabilitas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {homePage?.Capabilities?.Title || 'Keahlian Kami'}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {homePage?.Capabilities?.Detail}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilitiesData.map((item: any) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-xl hover:border-green-500 transition-all group duration-300"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform origin-left">
                  {getIcon(item.IconName)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {item.Title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.Description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Proyek Terkini</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((p: any) => (
              <a key={p.id} href={`/portofolio/`} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 w-full relative">
                  <ImageWithFallback 
                    src={getStrapiImageUrl(p.Image)} 
                    alt={p.Title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{p.Title}</h3>
                  <p className="text-sm text-slate-500">{p.Type}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {homePage?.Testimonials?.Title || 'Keahlian Kami'}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {homePage?.Testimonials?.Detail}
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4">
            <Testimonials 
              items={mappedTestimonials} 
              max={homePage?.Testimonials?.DisplayedTestimonials || 10} 
              randomize={homePage?.Testimonials?.Randomize || false} 
            />
          </div>
        </div>
      </section>         

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Siap untuk Membangun Masa Depan Lingkungan Anda?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Hubungi tim ahli kami untuk konsultasi dan lihat bagaimana kami dapat membantu Anda mencapai tujuan lingkungan dan perijinan anda.
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
