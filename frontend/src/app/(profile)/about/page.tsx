import { AboutIntro } from '@/components/pages/about/AboutIntro';
import { AboutVisionMission } from '@/components/pages/about/AboutVisionMission';
import { AboutAdvantages } from '@/components/pages/about/AboutAdvantages';
import { getAboutPageComplete } from '@/services/strapiService';
import type { AboutPageData } from '@/types/about';

export default async function AboutPage() {
  let aboutPage: AboutPageData = {};

  try {
    const data = await getAboutPageComplete();
    aboutPage = data?.data || {};
  } catch (err) {
    console.error('Failed to load Strapi about page data:', err);
  }
  /*
  const team = [
    {
      image: 'https://images.unsplash.com/photo-1762290264887-b8b1370a462d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZW5naW5lZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcwMjk2ODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Dr. James Mitchell',
      role: 'CEO & Founder',
      bio: 'Environmental engineer with 20+ years leading sustainable electrical initiatives.',
      linkedin: '#',
    },
  ];
  */
  /*
  const certifications = [
    { name: 'LEED', icon: <Award className="w-8 h-8" /> },
    { name: 'ISO 14001', icon: <Shield className="w-8 h-8" /> },
    { name: 'IEEE', icon: <Lightbulb className="w-8 h-8" /> },
    { name: 'Energy Star', icon: <Leaf className="w-8 h-8" /> },
    { name: 'WELL', icon: <Users className="w-8 h-8" /> },
    { name: 'B Corp', icon: <Target className="w-8 h-8" /> },
  ];
  */

  /*
  const values = [
    {
      icon: <Leaf className="w-10 h-10 text-[#22c55e]" />,
      title: 'Keberlanjutan',
      description: 'Kami berkomitmen penuh pada praktik etis dan ramah lingkungan untuk melestarikan sumber daya alam bagi generasi masa depan melalui operasional bisnis yang bertanggung jawab.',
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-[#3b82f6]" />,
      title: 'Inovasi Terdepan',
      description: 'PEI terus mendorong riset dan pengembangan teknologi terbaru guna memastikan bahwa solusi inovatif kami hari ini menjadi standar kualitas di masa depan.',
    },
    {
      icon: <Users className="w-10 h-10 text-[#22c55e]" />,
      title: 'Kolaborasi Sinergis',
      description: 'Kami bekerja sama secara erat dengan klien sebagai mitra strategis, menggabungkan visi dan keahlian untuk mencapai tujuan bersama secara efektif.',
    },
    {
      icon: <Target className="w-10 h-10 text-[#3b82f6]" />,
      title: 'Kualitas Unggul',
      description: 'Memberikan hasil dengan standar kualitas tertinggi dalam setiap aspek pekerjaan adalah prioritas utama kami untuk memastikan kepuasan dan kepercayaan Anda.',
    },
  ];
  */
  /*
  const missions = [
    {
      title: 'Solusi Inovatif',
      description: 'Menghadirkan teknologi dan metode pengelolaan limbah yang efisien serta ramah lingkungan bagi setiap sektor industri.',
    },
    {
      title: 'Kemitraan Strategis',
      description: 'Membangun kolaborasi yang mendalam dengan klien untuk memberikan solusi yang tepat guna dan sesuai regulasi.',
    },
    {
      title: 'Pemberdayaan Sumber Daya',
      description: 'Terus meningkatkan kompetensi tim ahli agar selalu relevan dengan perkembangan standar lingkungan global.',
    },
    {
      title: 'Edukasi & Kesadaran',
      description: 'Mendorong kesadaran masyarakat dan pelaku industri akan pentingnya tata kelola limbah yang bertanggung jawab.',
    },
  ];
  */

  return (
    <div className="min-h-screen">
      <AboutIntro data={aboutPage} />
      <AboutVisionMission data={aboutPage} />
      <AboutAdvantages
        title={aboutPage?.Advantages?.Title}
        detail={aboutPage?.Advantages?.Detail}
        items={aboutPage?.Advantages?.ValuePoints || []}
      />
    </div>
  );
}
