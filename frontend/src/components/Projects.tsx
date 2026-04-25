"use client";

import { useState } from 'react';
import { FolderOpen, Filter, MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';

export function Projects() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeCard, setActiveCard] = useState<number | null>(null);
    
    const filters = ['All', 'Environmental', 'Electrical'];
  
    const projects = [
      {
        image: '/images/DKI_Cirebon_marikangen_(STP).jpeg',
        title: 'STP Marikangen Cirebon: Wastewater Treatment Excellence',
        category: 'Environmental',
        detail: 'Instalasi sistem STP untuk mengolah limbah cair industri di kawasan Marikangen, Cirebon.',
        tempat: 'Cirebon, Jawa Barat',
        waktu: 'Okt 2023 - Jan 2024',
      },
      {
        image: '/images/DKI_Cirebon_wadas_(STP).jpeg',
        title: 'STP Wadas Cirebon: Sustainable Waste Management',
        category: 'Environmental',
        detail: 'Pembangunan dan optimasi STP untuk pengolahan limbah cair di kawasan Wadas, Cirebon.',
        tempat: 'Cirebon, Jawa Barat',
        waktu: 'Maret 2024 - April 2024',
      },
      {
        image: '/images/AerasiMBR.jpeg',
        title: 'Aerasi MBR: Advanced Wastewater Treatment',
        category: 'Environmental',
        detail: 'Penerapan teknologi aerasi MBR untuk meningkatkan efisiensi pengolahan limbah cair di fasilitas pengolahan air limbah.',
        tempat: 'Cirebon, Jawa Barat',
        waktu: 'Maret 2024 - April 2024',
      },
      {
        image: '/images/screw_press_agrenesia_bogor.jpeg',
        title: 'Screw Press Agrenesia Bogor: Efficient Sludge Dewatering',
        category: 'Environmental',
        detail: 'Implementasi teknologi screw press untuk dewatering lumpur di fasilitas pengolahan limbah cair Agrenesia, Bogor.',
        tempat: 'Bogor, Jawa Barat',
        waktu: 'Maret 2024 - April 2024',
      },
      {
        image: '/images/Optimalisasi_panel_listrik_wwtp_agrenesia_medan.jpeg',
        title: 'Optimalisasi Panel Listrik WWTP Agrenesia Medan: Energy Efficiency',
        category: 'Electrical',
        detail: 'Optimalisasi panel listrik untuk meningkatkan efisiensi energi di fasilitas pengolahan limbah cair Agrenesia, Medan.',
        tempat: 'Medan, Sumatera Utara',
        waktu: 'Juni 2024 - Juli 2024',
      },
    ];
    
    const handleFilterChange = (newFilter: string) => {
      if (newFilter === activeFilter) return;
      setIsAnimating(true);
      setTimeout(() => {
        setActiveFilter(newFilter);
        setIsAnimating(false);
      }, 170);
    };
  
    const filteredProjects =
      activeFilter === 'All'
        ? projects
        : projects.filter((project) => project.category === activeFilter);
  
    //untuk contoh studi kasus besar
    const featuredProject = {
      image: 'https://images.unsplash.com/photo-1756511332583-99fc0d4bf7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGdyZWVuJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MDI5Njc4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Mega Solar Park Project',
      category: 'Renewable Energy',
      description:
        'Our largest project to date: a 100MW solar farm spanning 500 acres, providing clean energy to over 30,000 homes and businesses.',
      stats: [
        { label: 'Capacity', value: '100 MW' },
        { label: 'CO₂ Saved', value: '80,000 tons/year' },
        { label: 'Homes Powered', value: '30,000+' },
        { label: 'Project Duration', value: '18 months' },
      ],
      quote:
        'This project represents a major milestone in our region\'s transition to renewable energy. Pakar Ekosistem Indonesia\'s expertise made it possible.',
      author: 'John Williams, City Energy Director',
    };

    return (
      <div>
        <section className="bg-white border-b border-slate-200 py-6 sticky top-16 z-40 select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-slate-500" />
              <span className="font-semibold text-slate-700 mr-2">Filter:</span>
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-[#22c55e] text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>  

        {/* Section List Project */}
        <section className="py-20 bg-slate-50 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className={`transition-all duration-180 ease-in-out transform ${
                isAnimating 
                  ? 'opacity-20 scale-95 translate-y-4' 
                  : 'opacity-100 scale-100 translate-y-0'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <div
                    key={index}
                    // 1. Fungsi klik untuk Mobile: Toggle buka/tutup kartu
                    onClick={() => setActiveCard(activeCard === index ? null : index)}
                    // 2. Reset state jika kursor keluar (opsional untuk perapian di desktop)
                    onMouseLeave={() => setActiveCard(null)}
                    className="relative h-[360px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-default"
                  >
                    <div className="absolute inset-0 w-full h-full">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        // Jika aktif (di HP) ATAU di-hover (di PC), gambar membesar
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          activeCard === index ? 'scale-110' : 'group-hover:scale-110'
                        }`}
                      />
                    </div>

                    {/* Badge Kategori - Tetap terlihat */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-[#22c55e]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Gradient Bawah (Selalu ada agar judul terbaca) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10"></div>

                    {/* Overlay Hitam Penuh saat Hover / Tap */}
                    <div 
                      className={`absolute inset-0 bg-slate-900/80 transition-opacity duration-300 z-10 backdrop-blur-sm ${
                        activeCard === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    ></div>

                    {/* Konten Text */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                      
                      {/* Judul: Bergeser ke atas saat Hover / Tap */}
                      <h3 
                        className={`text-xl font-bold text-white mb-2 transform transition-all duration-500 ease-in-out ${
                          activeCard === index ? '-translate-y-4' : 'group-hover:-translate-y-4'
                        }`}
                      >
                        {project.title}
                      </h3>

                      {/* Detail: Muncul dari bawah saat Hover / Tap */}
                      <div 
                        className={`transform transition-all duration-500 ease-in-out delay-75 overflow-hidden ${
                          activeCard === index 
                            ? 'max-h-[200px] opacity-100 translate-y-0' 
                            : 'max-h-0 opacity-0 translate-y-6 group-hover:max-h-[200px] group-hover:opacity-100 group-hover:translate-y-0'
                        }`}
                      >
                        <p className="text-slate-200 text-sm mb-4 line-clamp-3">
                          {project.detail}
                        </p>

                        <div className="space-y-2">
                          <div className="flex items-center text-slate-300 text-xs">
                            <MapPin className="w-4 h-4 mr-2 text-[#22c55e]" />
                            {project.tempat}
                          </div>
                          <div className="flex items-center text-slate-300 text-xs">
                            <Calendar className="w-4 h-4 mr-2 text-[#22c55e]" />
                            {project.waktu}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
              
              {filteredProjects.length === 0 && (
                <div className="w-full h-[360px] py-16 flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-dashed border-slate-200">

                  {/* Lingkaran Ikon */}
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                    <FolderOpen className="w-8 h-8 text-slate-400" />
                  </div>

                  {/* Teks Profesional */}
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    Portofolio Sedang Diperbarui
                  </h3>
                  <p className="text-slate-500 text-center max-w-md text-sm md:text-base">
                    Kami terus mengembangkan solusi terbaik. Dokumentasi proyek untuk kategori ini akan segera kami tampilkan.
                  </p>

                  {/* Tombol Opsional untuk reset filter */}
                  <button 
                    onClick={() => setActiveFilter('All')}
                    className="mt-6 text-[#22c55e] font-medium hover:text-[#16a34a] transition-colors underline-offset-4 hover:underline"
                  >
                    Lihat Semua Portofolio
                  </button>

                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Case Study */}
        {/*
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Featured Case Study
              </h2>
              <p className="text-lg text-slate-600">
                A closer look at one of our most impactful projects
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="h-96 lg:h-auto">
                  <ImageWithFallback
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-block">
                    <span className="bg-[#22c55e] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                      {featuredProject.category}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">
                    {featuredProject.title}
                  </h3>
                  <p className="text-slate-600 mb-6 text-lg">{featuredProject.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {featuredProject.stats.map((stat, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-slate-200">
                        <div className="text-2xl font-bold text-[#22c55e] mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white border-l-4 border-[#22c55e] p-6 rounded-r-lg">
                    <p className="text-slate-700 italic mb-3">
                        {`"${featuredProject.quote}"`}
                    </p>
                    <p className="text-sm font-semibold text-slate-900">{featuredProject.author}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        */}
      </div>
    )
}