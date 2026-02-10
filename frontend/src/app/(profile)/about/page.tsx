'use client';
import { Leaf, Lightbulb, Users, Target, Award, Shield, Linkedin } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';

export default function AboutPage() {
  const team = [
    {
      image: 'https://images.unsplash.com/photo-1762290264887-b8b1370a462d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZW5naW5lZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcwMjk2ODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Dr. James Mitchell',
      role: 'CEO & Founder',
      bio: 'Environmental engineer with 20+ years leading sustainable electrical initiatives.',
      linkedin: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1768542920419-d4f9c631a1bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwZW5naW5lZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcwMjk2ODU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Sarah Chen',
      role: 'Chief Technology Officer',
      bio: 'Expert in renewable energy systems and smart grid technologies.',
      linkedin: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1616804947838-6646ae0e423d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW1lcmljYW4lMjBtYW4lMjBidXNpbmVzcyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzAyOTY4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Marcus Thompson',
      role: 'Director of Operations',
      bio: 'Specialist in project management and sustainable infrastructure development.',
      linkedin: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1727299781147-c7ab897883a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXNwYW5pYyUyMHdvbWFuJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcwMjk2ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Maria Rodriguez',
      role: 'Head of Environmental Affairs',
      bio: 'Environmental scientist focused on compliance and sustainability strategies.',
      linkedin: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1580983218547-8333cb1d76b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBlbmdpbmVlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzAyNjI3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Emily Watson',
      role: 'Lead Electrical Engineer',
      bio: 'Electrical systems expert with focus on energy-efficient design.',
      linkedin: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1764438246710-83c535cada80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwMjg0MzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'David Park',
      role: 'Senior Sustainability Consultant',
      bio: 'Advisor on green building certifications and energy audits.',
      linkedin: '#',
    },
  ];

  const certifications = [
    { name: 'LEED', icon: <Award className="w-8 h-8" /> },
    { name: 'ISO 14001', icon: <Shield className="w-8 h-8" /> },
    { name: 'IEEE', icon: <Lightbulb className="w-8 h-8" /> },
    { name: 'Energy Star', icon: <Leaf className="w-8 h-8" /> },
    { name: 'WELL', icon: <Users className="w-8 h-8" /> },
    { name: 'B Corp', icon: <Target className="w-8 h-8" /> },
  ];

  const values = [
    {
      icon: <Leaf className="w-10 h-10 text-[#22c55e]" />,
      title: 'Sustainability',
      description: 'Committed to reducing environmental impact in every project.',
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-[#3b82f6]" />,
      title: 'Innovation',
      description: 'Pioneering cutting-edge solutions for complex challenges.',
    },
    {
      icon: <Users className="w-10 h-10 text-[#22c55e]" />,
      title: 'Collaboration',
      description: 'Working together with clients to achieve shared goals.',
    },
    {
      icon: <Target className="w-10 h-10 text-[#3b82f6]" />,
      title: 'Excellence',
      description: 'Delivering the highest quality in every aspect of our work.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Intro Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwdGVhbSUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzcwMjk2Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Environmental team in laboratory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/40" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Our Mission: Greening Electrical Innovation
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            At Pakar Ekosistem Indonesia, we bridge the gap between cutting-edge electrical engineering and environmental stewardship. 
            Our team of experts is dedicated to creating sustainable solutions that power a better tomorrow while 
            protecting our planet for future generations.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg leading-relaxed">
                To deliver innovative electrical and environmental solutions that reduce carbon emissions, 
                optimize energy efficiency, and create lasting positive impact for our clients and communities.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg leading-relaxed">
                &ldquo;To be the world&rsquo;s leading provider of sustainable electrical solutions, setting the standard for 
                environmental responsibility and technological excellence in every project we undertake.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-md">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A diverse group of professionals united by passion for sustainability and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-[#22c55e] font-semibold mb-3">{member.role}</p>
                  <p className="text-slate-600 text-sm mb-4">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#2563eb] transition-colors"
                    aria-label={`${member.name} LinkedIn profile`}
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm font-semibold">Connect</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Certifications & Accreditations
            </h2>
            <p className="text-lg text-slate-300">
              Recognized for excellence and commitment to industry standards
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
              >
                <div className="text-[#22c55e] mb-3">{cert.icon}</div>
                <span className="font-semibold text-center">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Join Us in Building a Sustainable Future
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Explore career opportunities or partner with us on your next project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#22c55e] px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors font-semibold">
              View Open Positions
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-[#22c55e] transition-colors font-semibold">
              Partner With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
