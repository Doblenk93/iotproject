"use client";

import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

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
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#22c55e]">Pakar Ekosistem Indonesia</h3>
            <p className="text-slate-300 text-sm mb-4">
              Leading the way in sustainable electrical solutions for a greener tomorrow.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#22c55e] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#22c55e] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#22c55e] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#22c55e] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-slate-300 hover:text-[#22c55e] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-slate-300 hover:text-[#22c55e] transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="/portofolio" className="text-slate-300 hover:text-[#22c55e] transition-colors">
                  Portofolio
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-[#22c55e] transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#22c55e]" />
                <span>123 Green Street, Eco City, EC 12345</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#22c55e]" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#22c55e]" />
                <span>info@PakarEkosistemIndonesia.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-slate-300 text-sm mb-4">
              Subscribe for updates on sustainable solutions.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-[#22c55e] transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#22c55e] text-white px-4 py-2 rounded-lg hover:bg-[#16a34a] transition-colors"
              >
                Subscribe
              </button>
              {subscribed && (
                <p className="text-[#22c55e] text-sm">Thank you for subscribing!</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 text-center text-sm text-slate-400">
          <p>&copy; 2026 Pakar Ekosistem Indonesia. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
