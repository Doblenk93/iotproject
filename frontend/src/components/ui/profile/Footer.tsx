"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* 1. Company Info & Socials */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Pakar Ekosistem Indonesia
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Leading the way in sustainable electrical solutions for a greener, smarter tomorrow.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Instagram, label: 'Instagram' },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400 hover:bg-[#22c55e] hover:text-white transition-all duration-300 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 lg:mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Our Services', href: '/services' },
                { name: 'Portofolio', href: '/portofolio' },
                { name: 'Careers', href: '#' }, // Opsional link
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="hover:text-[#22c55e] transition-colors inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 lg:mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  123 Green Street, <br />Eco City, EC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-white transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
                <a href="mailto:info@pakarekosistemindonesia.com" className="hover:text-white transition-colors break-all">
                  info@pakarekosistemindonesia.com
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 lg:mb-6">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-4">
              Subscribe for latest updates on green energy.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full pl-4 pr-12 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-all text-sm"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#22c55e] text-white p-2 rounded-md hover:bg-[#16a34a] transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {/* Success Message Animation */}
              <div className={`mt-2 text-xs text-[#22c55e] font-medium transition-all duration-300 ${subscribed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                Successfully subscribed!
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Pakar Ekosistem Indonesia. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}