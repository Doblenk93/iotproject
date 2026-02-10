"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const testimonials = [
    {
      image: 'https://images.unsplash.com/photo-1626793369994-a904d2462888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc29sYXIlMjBwYW5lbCUyMHByb2plY3R8ZW58MXx8fHwxNzcwMjk2ODE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      quote: 'Pakar Ekosistem Indonesia transformed our facility with sustainable energy solutions that cut costs by 40%.',
      author: 'Sarah Johnson',
      company: 'GreenTech Industries',
    },
    {
      image: 'https://images.unsplash.com/photo-1765874324922-a97370f7a969?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGVuZXJneSUyMGluZnJhc3RydWN0dXJlfGVufDF8fHx8MTc3MDI5NjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      quote: 'Professional, innovative, and committed to environmental excellence. Highly recommended!',
      author: 'Michael Chen',
      company: 'Sustainable Solutions Corp',
    },
    {
      image: 'https://images.unsplash.com/photo-1756511332583-99fc0d4bf7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGdyZWVuJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MDI5Njc4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      quote: 'Their expertise in electrical and environmental integration is unmatched in the industry.',
      author: 'Emily Rodriguez',
      company: 'EcoCity Development',
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

    return (
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Client Success Stories
            </h2>
            <p className="text-lg text-slate-600">
              Hear from companies {"we've"} helped achieve their sustainability goals
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="h-64 md:h-auto relative">
                  <ImageWithFallback
                    src={testimonials[currentTestimonial].image}
                    alt="Project"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="text-6xl text-[#22c55e] mb-4">{'"'}</div>
                  <p className="text-lg text-slate-700 mb-6 italic">
                    {testimonials[currentTestimonial].quote}
                  </p>
                  <div>
                    <div className="font-bold text-slate-900">
                      {testimonials[currentTestimonial].author}
                    </div>
                    <div className="text-slate-600">{testimonials[currentTestimonial].company}</div>
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
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial
                        ? 'bg-[#22c55e] w-8'
                        : 'bg-slate-300 hover:bg-slate-400'
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