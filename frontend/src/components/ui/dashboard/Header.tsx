"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Hook untuk tahu kita lagi di halaman mana

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portofolio', href: '/portofolio' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b-2 border-[#22c55e]/30">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image 
                src="/favicon.ico" 
                alt="PEI Logo" 
                width={40} 
                height={40} 
                className="rounded-lg object-contain"
              />
            </div>
            <span className="text-sm lg:text-lg font-bold text-slate-900 leading-tight">
             Pakar Ekosistem Indonesia
           </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative transition-colors font-medium test-sm xl:text-base ${
                  isActive(item.href)
                    ? 'text-[#22c55e]'
                    : 'text-slate-700 hover:text-[#22c55e]'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute -bottom-6 left-0 right-0 h-0.5 bg-[#22c55e]" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href="/app"
            className="bg-[#22c55e] text-white px-5 py-2 rounded-lg hover:bg-[#16a34a] transition-colors font-medium text-sm xl:text-base hidden lg:inline-flex items-center justify-center"
          >
            Dashboard
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#22c55e] focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
                <X className={`w-6 h-6 absolute transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
                <Menu className={`w-6 h-6 absolute transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
          <div 
            className={`
              lg:hidden absolute top-16 left-0 right-0 
              bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl 
              overflow-hidden transition-all duration-150 ease-in-out origin-top
              ${mobileMenuOpen 
                ? 'opacity-100 translate-y-0 max-h-[400px] pointer-events-auto' 
                : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none'
              }
            `}
          >
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)} // Tutup menu saat diklik
                  style={{ transitionDelay: `${index * 50}ms` }}
                    className={`
                      block px-4 py-3 rounded-lg font-medium transition-all duration-150
                      ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                      ${isActive(item.href)
                        ? 'bg-[#22c55e]/10 text-[#22c55e]'
                        : 'text-slate-700 hover:bg-slate-50 hover:pl-6' // Efek geser pas hover
                      }
                    `}
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-px bg-slate-100 my-2" />
              <Link
                href="/app"
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  block w-full text-center bg-[#22c55e] text-white px-6 py-3 rounded-lg 
                  hover:bg-[#16a34a] font-medium transition-all duration-150 delay-50
                  ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}
              >
                Dashboard
              </Link>
            </nav>
          </div>
      </div>
    </header>
  );
}