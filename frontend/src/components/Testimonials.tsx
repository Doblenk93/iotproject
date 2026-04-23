"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { ImageWithFallback } from '@/components/ImageWithFallback';

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // State baru untuk animasi dan deteksi kursor (hover)
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      image: 'https://images.unsplash.com/photo-1626793369994-a904d2462888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc29sYXIlMjBwYW5lbCUyMHByb2plY3R8ZW58MXx8fHwxNzcwMjk2ODE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      quote: 'Pakar Ekosistem Indonesia membantu mengurangi jejak karbon kami secara signifikan dengan solusi inovatif mereka. Layanan mereka sangat profesional dan berdedikasi.',
      author: 'Doblenk Clockers',
      company: 'Susah Senang Berkarya',
    },
    {
      image: 'https://images.unsplash.com/photo-1765874324922-a97370f7a969?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGVuZXJneSUyMGluZnJhc3RydWN0dXJlfGVufDF8fHx8MTc3MDI5NjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      quote: 'Profesional, responsif, dan sangat berpengetahuan. Pakar Ekosistem Indonesia benar-benar memahami kebutuhan kami dan memberikan solusi yang melebihi harapan kami.',
      author: 'Azhari Blanker',
      company: 'PT. Energi Hijau Nusantara',
    },
    {
      image: 'https://images.unsplash.com/photo-1756511332583-99fc0d4bf7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGdyZWVuJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MDI5Njc4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      quote: 'Pakar Ekosistem Indonesia memberikan layanan yang luar biasa dari awal hingga akhir proyek kami. Mereka sangat berkomitmen untuk keberlanjutan dan hasilnya terlihat dalam setiap aspek pekerjaan mereka.',
      author: 'Aditia Pratama',
      company: 'PT. Solusi Energi Terbarukan',
    },
  ];

  // Fungsi transisi dengan jeda waktu untuk animasi
  const changeTestimonial = useCallback((newIndex: number) => {
    if (isAnimating || newIndex === currentTestimonial) return; // Cegah spam klik
    
    setIsAnimating(true); // Mulai fade out
    
    setTimeout(() => {
      setCurrentTestimonial(newIndex); // Ganti data saat elemen transparan
      setIsAnimating(false); // Mulai fade in
    }, 300); // 300ms sesuai dengan duration-300 di Tailwind
  }, [currentTestimonial, isAnimating]);

  const nextTestimonial = useCallback(() => {
    changeTestimonial((currentTestimonial + 1) % testimonials.length);
  }, [changeTestimonial, currentTestimonial, testimonials.length]);

  const prevTestimonial = useCallback(() => {
    changeTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length);
  }, [changeTestimonial, currentTestimonial, testimonials.length]);

  // Efek Timer Auto-play
  useEffect(() => {
    // Jika sedang di-hover, hentikan eksekusi kode di bawahnya (Pause)
    if (isHovered) return;

    // Set interval 5 detik (5000ms)
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);

    // Cleanup: Mengulang timer setiap kali currentTestimonial berubah (ketika diklik manual)
    // atau komponen di unmount
    return () => clearInterval(timer);
  }, [currentTestimonial, isHovered, nextTestimonial]);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Apa Kata Klien Kami?
          </h2>
          <p className="text-lg text-slate-600">
            Lihat bagaimana solusi kami telah membuat perbedaan nyata bagi klien kami di berbagai industri.
          </p>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)} // Deteksi mouse masuk
          onMouseLeave={() => setIsHovered(false)} // Deteksi mouse keluar
        >
          {/* Kontainer Putih: Dibuat tinggi minimal (min-h) agar tidak goyang saat transisi */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden min-h-[250px] md:min-h-[350px]">
            
            {/* Inner Wrapper untuk Animasi (Hanya kontennya yang memudar/menggeser, kotak putihnya diam) */}
            <div 
              className={`grid grid-cols-3 h-full transition-all duration-300 ease-in-out transform ${
                isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
              }`}
            >
              <div className="h-auto md:min-h-[350px] relative col-span-1">
                <ImageWithFallback
                  src={testimonials[currentTestimonial].image}
                  alt="Project"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-12 grid grid-rows-7 flex flex-col justify-center h-full col-span-2">
                <div className="text-3xl md:text-4xl text-[#22c55e] mb-2 leading-none row-span-1">{'"'}</div>
                
                <p className="text-base md:text-lg text-slate-700 mb-6 italic select-none cursor-default row-span-5">
                  {testimonials[currentTestimonial].quote}
                </p>
                
                <div className="mt-auto row-span-1"> {/* mt-auto mendorong nama author ke bawah jika teks pendek */}
                  <div className="font-bold text-slate-900">
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div className="text-sm text-slate-600">
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[#22c55e] hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeTestimonial(index)} // Gunakan fungsi baru dengan animasi
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-[#22c55e] w-8'
                      : 'bg-slate-300 w-2 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[#22c55e] hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}