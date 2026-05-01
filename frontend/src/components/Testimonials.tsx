"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { ImageWithFallback } from '@/components/ImageWithFallback';

interface TestimonialProps {
  items: any[];
  max?: number;
  randomize?: boolean;
}

export function Testimonials(
  { 
    items = [], 
    max = 3, 
    randomize = false 
  }: TestimonialProps ) {
  const [displayedTestimonials, setDisplayedTestimonials] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // State baru untuk animasi dan deteksi kursor (hover)
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = items;
  if (!testimonials || testimonials.length === 0) return null;

  useEffect(() => {
    let processedData = [...items];

    // 1. Logika Randomize (menggunakan Fisher-Yates Shuffle agar benar-benar acak)
    if (randomize) {
      for (let i = processedData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [processedData[i], processedData[j]] = [processedData[j], processedData[i]];
      }
    }

    // 2. Logika Max (Ambil sesuai prop max, tapi JANGAN LEBIH dari 10)
    const finalMax = Math.min(max, 10) + 1;
    
    // 3. Potong array sesuai max
    setDisplayedTestimonials(processedData.slice(0, finalMax));
    
    // Tandai bahwa komponen sudah di-mount di klien
    setMounted(true);
  }, [items, max, randomize]);

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
    if (isHovered || displayedTestimonials.length <= 1) return; // Jangan auto-play jika data cuma 1

    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentTestimonial, isHovered, nextTestimonial, displayedTestimonials.length]);

  // CEGAH RENDER SEBELUM MOUNTED ATAU JIKA DATA KOSONG
  if (!mounted || displayedTestimonials.length === 0) return null;

  return (
    <section className="py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)} // Deteksi mouse masuk
          onMouseLeave={() => setIsHovered(false)} // Deteksi mouse keluar
        >
          {/* Kontainer Putih: Dibuat tinggi minimal (min-h) agar tidak goyang saat transisi */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[420px] md:h-[350px] min-h-[250px] md:min-h-[350px]">
            
            {/* Inner Wrapper untuk Animasi (Hanya kontennya yang memudar/menggeser, kotak putihnya diam) */}
            <div 
              className={`grid grid-cols-3 h-full transition-all duration-300 ease-in-out transform ${
                isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
              }`}
            >
              <div className="h-full md:min-h-[350px] relative col-span-1">
                <ImageWithFallback 
                  src={testimonials[currentTestimonial].ClientPicture} 
                  alt={testimonials[currentTestimonial].ClientName} 
                  className="w-full h-full object-cover" 
                />
              </div>
                  
              <div className="p-12 grid grid-rows-[auto_1fr_auto] flex flex-col justify-center h-full col-span-2">
                <div className="text-3xl md:text-4xl text-[#22c55e] mb-2 leading-none">
                  {'"'}
                </div>
                
                <div className='flex flex-grow overflow-hidden items-center'>
                  <p className="text-base md:text-lg text-slate-700 italic cursor-default 
                    break-words line-clamp-6 md:line-clamp-none overflow-wrap-anywhere w-full">
                    {testimonials[currentTestimonial].ClientWords}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200"> {/* mt-auto mendorong nama author ke bawah jika teks pendek */}
                  <div className="font-bold text-slate-900">
                    {testimonials[currentTestimonial].ClientName}
                  </div>
                  <div className="text-sm text-slate-600">
                    {testimonials[currentTestimonial].ClientCompany}
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Carousel Controls (Hanya tampil jika data > 1) */}
          {displayedTestimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[#22c55e] hover:text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {displayedTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => changeTestimonial(index)} 
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
          )}
        </div>
      </div>
    </section>
  );
}