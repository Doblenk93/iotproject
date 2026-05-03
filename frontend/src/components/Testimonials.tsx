"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { ImageWithFallback } from '@/components/ImageWithFallback';

interface TestimonialItem {
  id?: string | number;
  ClientPicture?: string;
  ClientName?: string;
  ClientWords?: string;
  ClientCompany?: string;
}

interface TestimonialProps {
  items: TestimonialItem[];
  max?: number;
  randomize?: boolean;
}

const DEFAULT_MAX_TESTIMONIALS = 10;

function createDeterministicSeed(items: TestimonialItem[], max: number) {
  return items.reduce((seed, item) => {
    const idPart = item.id?.toString() ?? '';
    const namePart = item.ClientName ?? '';
    return seed + idPart.length + namePart.length;
  }, max);
}

function seededShuffle<T>(items: T[], seed: number) {
  const result = [...items];
  let value = seed;

  for (let i = result.length - 1; i > 0; i--) {
    value = (value * 9301 + 49297) % 233280;
    const j = Math.floor((value / 233280) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function Testimonials(
  { 
    items = [], 
    max = 3, 
    randomize = false 
  }: TestimonialProps ) {
  const displayedTestimonials = useMemo(() => {
    const processedData = randomize
      ? seededShuffle([...items], createDeterministicSeed(items, max))
      : [...items];

    // 2. Logika Max (Ambil sesuai prop max, tapi JANGAN LEBIH dari 10)
    const finalMax = Math.min(max, DEFAULT_MAX_TESTIMONIALS);
    
    // 3. Potong array sesuai max
    return processedData.slice(0, finalMax);
  }, [items, max, randomize]);

  // State baru untuk animasi dan deteksi kursor (hover)
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const activeTestimonialIndex = displayedTestimonials.length
    ? Math.min(currentTestimonial, displayedTestimonials.length - 1)
    : 0;

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
    changeTestimonial((currentTestimonial + 1) % displayedTestimonials.length);
  }, [changeTestimonial, currentTestimonial, displayedTestimonials.length]);

  const prevTestimonial = useCallback(() => {
    changeTestimonial((currentTestimonial - 1 + displayedTestimonials.length) % displayedTestimonials.length);
  }, [changeTestimonial, currentTestimonial, displayedTestimonials.length]);

  // Efek Timer Auto-play
  useEffect(() => {
    if (isHovered || displayedTestimonials.length <= 1) return; // Jangan auto-play jika data cuma 1

    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentTestimonial, isHovered, nextTestimonial, displayedTestimonials.length]);

  if (displayedTestimonials.length === 0) return null;

  return (
    <section suppressHydrationWarning className="py-10 bg-slate-50">
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
                  src={displayedTestimonials[activeTestimonialIndex]?.ClientPicture} 
                  alt={displayedTestimonials[activeTestimonialIndex]?.ClientName} 
                  className="w-full h-full object-cover" 
                />
              </div>
                  
              <div className="p-12 grid grid-rows-[auto_1fr_auto] flex flex-col justify-center h-full col-span-2">
                <div className="text-3xl md:text-4xl text-[#22c55e] mb-2 leading-none">
                  {'"'}
                </div>
                
                <div className="flex flex-grow overflow-hidden items-center">
                  <p className="text-base md:text-lg text-slate-700 italic cursor-default break-words line-clamp-6 md:line-clamp-none overflow-wrap-anywhere w-full">
                    {displayedTestimonials[activeTestimonialIndex]?.ClientWords}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200"> {/* mt-auto mendorong nama author ke bawah jika teks pendek */}
                  <div className="font-bold text-slate-900">
                    {displayedTestimonials[activeTestimonialIndex]?.ClientName}
                  </div>
                  <div className="text-sm text-slate-600">
                    {displayedTestimonials[activeTestimonialIndex]?.ClientCompany}
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