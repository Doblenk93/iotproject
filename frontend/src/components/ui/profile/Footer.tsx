"use client";

//import { useState } from 'react';
//import Link from 'next/link';
import { Youtube, Music2, Instagram, Mail, Phone, MapPin, /*Send*/ } from 'lucide-react';

export function Footer() {
  /*const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };
  */

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Footer (Berubah dari Grid menjadi Flexbox) */}
        <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-8 mb-12">
          
          {/* 1. Company Info & Socials (Di Kiri) */}
          <div className="space-y-4 md:max-w-sm"> 
            {/* md:max-w-sm menjaga agar teks paragraf tidak melebar tak berujung di layar besar */}
            <h3 className="text-xl font-bold text-white tracking-tight">
              Pakar Ekosistem Indonesia
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Pelopor solusi ramah lingkungan untuk masa depan yang lebih baik.
            </p>
            
            {/* Social Icons */}
            <div className="flex flex-col gap-3 pt-2">
              {[
                { icon: Youtube, label: 'YouTube', handle: 'Pakar Ekosistem Indonesia', href: 'https://www.youtube.com/pakarekosistemindonesia' },
                { icon: Music2, label: 'TikTok', handle: '@pakarekosistem', href: 'https://tiktok.com/pakarekosistem' },
                { icon: Instagram, label: 'Instagram', handle: '@pakarekosistemindonesia', href: 'https://www.instagram.com/pakarekosistemindonesia' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 w-fit"
                  aria-label={social.label}
                >
                  {/* Box Icon */}
                  <div className="w-9 h-9 bg-slate-800/50 rounded-lg flex items-center justify-center group-hover:bg-[#22c55e] group-hover:text-white transition-all duration-300">
                    <social.icon className="w-4 h-4" />
                  </div>

                  {/* Nama Akun / Label */}
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-[#22c55e] transition-colors">
                      {social.label}
                    </span>
                    <span className="text-sm">
                      {social.handle}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* 2. Contact Info (Di Kanan) */}
          <div className="md:max-w-md xl:max-w-lg">
            <h3 className="text-lg font-semibold text-white mb-4 lg:mb-6">Hubungi Kami</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Trusmiland Rumah Ningrat Blok B No 48, 
                  Desa Cracas Kec. Cilimus, 
                  Kuningan Jawa Barat, 45556
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
                <a href="tel:+6281380126377" className="hover:text-white transition-colors">
                  (+62) 813-8012-6377 (Olin)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
                <a href="mailto:pakar.ekosistem@gmail.com" className="hover:text-white transition-colors break-all">
                  pakar.ekosistem@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex items-center justify-center text-xs text-slate-500">
          <p className="text-center">
            &copy; {new Date().getFullYear()} Pakar Ekosistem Indonesia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}