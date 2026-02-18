"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, ChevronUp } from 'lucide-react';

export function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const faqs = [
    {
      question: 'What is the typical timeline for a project?',
      answer:
        'Project timelines vary based on scope and complexity. Small installations may take 2-4 weeks, while larger commercial projects can take 3-6 months. We provide detailed timelines during our initial consultation.',
    },
    {
      question: 'Do you offer financing options?',
      answer:
        'Yes, we partner with leading financial institutions to offer flexible financing options for renewable energy projects. We can help you explore tax credits, rebates, and loan programs.',
    },
    {
      question: 'What areas do you serve?',
      answer:
        'We serve clients across the United States, with a focus on the West Coast, Southwest, and Northeast regions. Contact us to discuss your specific location and project needs.',
    },
    {
      question: 'How do I get started with a sustainability assessment?',
      answer:
        'Simply fill out the contact form or call us directly. We\'ll schedule a free initial consultation to understand your goals and provide recommendations for next steps.',
    },
  ];

  return (
    <div>
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
                
                {submitted && (
                  <div className="bg-[#22c55e]/10 border border-[#22c55e] text-[#22c55e] px-4 py-3 rounded-lg mb-6">
                    Thank you! {"We'll"} get back to you within 24 hours.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all"
                        placeholder="(62) 896-1234-5678"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-2">
                        Service Interest *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all bg-white"
                      >
                        <option value="">Select a service</option>
                        <option value="environmental">Environmental Assessment</option>
                        <option value="electrical">Electrical Engineering</option>
                        <option value="solar">Solar Solutions</option>
                        <option value="renewable">Renewable Energy</option>
                        <option value="audit">Energy Audit</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#22c55e] text-white px-8 py-4 rounded-lg hover:bg-[#16a34a] transition-all transform hover:scale-[1.02] font-semibold inline-flex items-center justify-center gap-2"
                  >
                    Send Message
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Informasi Kontak</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#22c55e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#22c55e]" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Alamat</p>
                      <p className="text-sm text-slate-600">
                        Trusmiland Rumah Ningrat Blok B No 48 <br />
                        Desa Cracas Kec. Cilimus<br />
                        Kuningan Jawa Barat<br />
                        45556
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#3b82f6]" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Kontak</p>
                      <a 
                        href="https://wa.me/6281380126377?text=Halo,%20saya%20ingin%20bertanya....." 
                        className="text-sm text-slate-600 hover:text-[#22c55e] transition-colors"
                      >
                        (+62) 813-8012-6377 (Olin)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#22c55e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#22c55e]" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Email</p>
                      <a 
                        href="mailto:pakar.ekosistem@gmail.com?subject=Halo&body=Apa%kabar" 
                        className="text-sm text-slate-600 hover:text-[#22c55e] transition-colors"
                      >
                        pakar.ekosistem@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#3b82f6]" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Jam Kerja</p>
                      <p className="text-sm text-slate-600">
                        Senin - {"Jum'at"}: 8:00 AM - 6:00 PM<br />
                        Sabtu: 9:00 AM - 4:00 PM<br />
                        Minggu: Tutup
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-slate-200 h-64 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/20 to-[#3b82f6]/20" />
                  <div className="relative text-center">
                    <MapPin className="w-12 h-12 text-[#22c55e] mx-auto mb-2" />
                    <p className="text-slate-600 font-semibold">Interactive Map</p>
                    <p className="text-sm text-slate-500">Trusmiland Rumah Ningrat Blok B No 48, Desa Cracas Kec. Cilimus, Kuningan Jawa Barat, 45556</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
};