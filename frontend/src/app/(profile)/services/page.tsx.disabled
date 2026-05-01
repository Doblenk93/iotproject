import { 
  Leaf, 
  Zap, 
  LineChart, 
  Wind, 
  Battery, 
  Sun,
  ArrowRight,
  CheckCircle2,
  FileSearch,
  Settings,
  TrendingUp,
  Shield
} from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: <Leaf className="w-12 h-12 text-[#22c55e]" />,
      title: 'Environmental Assessments',
      description: 'Comprehensive environmental impact studies and sustainability audits for your projects.',
      features: [
        'Site evaluation and analysis',
        'Carbon footprint calculation',
        'Compliance reporting',
        'Sustainability recommendations',
      ],
    },
    {
      icon: <Zap className="w-12 h-12 text-[#3b82f6]" />,
      title: 'Electrical System Design',
      description: 'Innovative electrical solutions designed for efficiency and environmental responsibility.',
      features: [
        'Power distribution systems',
        'Energy-efficient infrastructure',
        'Load calculations',
        'Safety compliance',
      ],
    },
    {
      icon: <LineChart className="w-12 h-12 text-[#22c55e]" />,
      title: 'Energy Optimization',
      description: 'Data-driven strategies to reduce energy consumption and maximize renewable integration.',
      features: [
        'Energy audits',
        'Consumption analysis',
        'Cost reduction strategies',
        'Performance monitoring',
      ],
    },
    {
      icon: <Sun className="w-12 h-12 text-[#3b82f6]" />,
      title: 'Solar Solutions',
      description: 'End-to-end solar power system design, installation, and maintenance services.',
      features: [
        'Solar panel installation',
        'Grid integration',
        'Battery storage systems',
        'ROI analysis',
      ],
    },
    {
      icon: <Wind className="w-12 h-12 text-[#22c55e]" />,
      title: 'Renewable Energy Integration',
      description: 'Seamless integration of wind, hydro, and other renewable energy sources.',
      features: [
        'Hybrid system design',
        'Grid connectivity',
        'Energy storage solutions',
        'Regulatory compliance',
      ],
    },
    {
      icon: <Battery className="w-12 h-12 text-[#3b82f6]" />,
      title: 'Smart Grid & Storage',
      description: 'Advanced grid technologies and energy storage for maximum efficiency.',
      features: [
        'Smart meter integration',
        'Battery management systems',
        'Demand response',
        'Real-time monitoring',
      ],
    },
  ];

  const processSteps = [
    {
      icon: <FileSearch className="w-10 h-10" />,
      number: '01',
      title: 'Assessment',
      description: 'Comprehensive evaluation of your needs, site conditions, and energy goals.',
    },
    {
      icon: <Settings className="w-10 h-10" />,
      number: '02',
      title: 'Design & Planning',
      description: 'Custom solution development with detailed technical specifications.',
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      number: '03',
      title: 'Implementation',
      description: 'Expert installation and integration with minimal disruption.',
    },
    {
      icon: <Shield className="w-10 h-10" />,
      number: '04',
      title: 'Monitoring & Support',
      description: 'Ongoing maintenance, optimization, and performance tracking.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Specialized Services in Environment & Electrical Applications
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            From initial assessment to ongoing support, we provide comprehensive solutions 
            that combine environmental expertise with electrical engineering excellence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Our Service Portfolio
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Tailored solutions to meet your unique environmental and electrical needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-xl hover:border-[#22c55e] transition-all group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-[#22c55e] text-white px-6 py-3 rounded-lg hover:bg-[#16a34a] transition-colors font-semibold inline-flex items-center justify-center gap-2">
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-slate-600">
              A proven methodology for delivering exceptional results
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-16 left-0 right-0 h-1 bg-slate-300">
                <div className="h-full bg-[#22c55e] w-0 transition-all duration-1000" style={{ width: '100%' }} />
              </div>

              <div className="grid grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Circle */}
                    <div className="flex justify-center mb-8">
                      <div className="w-16 h-16 bg-[#22c55e] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
                      <div className="flex justify-center mb-4 text-[#22c55e]">
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 text-center">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 text-center">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#22c55e] rounded-full flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
                    {step.number}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="w-1 h-full bg-slate-300 my-2" />
                  )}
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-[#22c55e]">{step.icon}</div>
                    <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-slate-600">
              Delivering specialized solutions across diverse sectors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Manufacturing',
              'Healthcare',
              'Education',
              'Commercial Real Estate',
              'Government',
              'Agriculture',
              'Hospitality',
              'Technology',
            ].map((industry, index) => (
              <div
                key={index}
                className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center hover:bg-[#22c55e] hover:text-white transition-all group"
              >
                <span className="font-semibold">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start? Schedule a Consultation
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Let our experts assess your needs and design a custom solution that meets 
            your environmental and electrical goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#22c55e] px-8 py-4 rounded-lg hover:bg-slate-100 transition-colors font-semibold inline-flex items-center justify-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#22c55e] transition-colors font-semibold">
              Download Services Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
