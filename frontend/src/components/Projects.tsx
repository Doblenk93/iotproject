"use client";

import { useState } from 'react';
import { ArrowRight, Filter } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';

export function Projects() {
    const [activeFilter, setActiveFilter] = useState('All');
    
      const filters = ['All', 'Environmental', 'Electrical', 'Renewable'];
    
      const projects = [
        {
          image: 'https://images.unsplash.com/photo-1726866672851-5b99c837603c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBzb2xhciUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3NzAyMTcwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          title: 'Commercial Solar Installation',
          category: 'Renewable',
          description: '500kW rooftop solar system for retail complex, reducing energy costs by 45%.',
        },
        {
          image: 'https://images.unsplash.com/photo-1630450364945-0c1ec2c449cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwZmFybSUyMHJlbmV3YWJsZSUyMGVuZXJneXxlbnwxfHx8fDE3NzAyOTY5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          title: 'Wind Farm Development',
          category: 'Renewable',
          description: '50MW wind farm providing clean energy to 15,000 homes annually.',
        },
        {
          image: 'https://images.unsplash.com/photo-1649518811431-48cb38252f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGJ1aWxkaW5nJTIwc3VzdGFpbmFibGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcwMjEyMzkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          title: 'LEED Platinum Office Building',
          category: 'Environmental',
          description: 'Sustainable electrical design achieving net-zero energy certification.',
        },
        {
          image: 'https://images.unsplash.com/photo-1672542128826-5f0d578713d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHZlaGljbGUlMjBjaGFyZ2luZyUyMHN0YXRpb258ZW58MXx8fHwxNzcwMjE3MDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          title: 'EV Charging Network',
          category: 'Electrical',
          description: 'City-wide installation of 50 electric vehicle charging stations.',
        },
        {
          image: 'https://images.unsplash.com/photo-1758797899821-46e9aa667409?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZW5lcmd5JTIwZWZmaWNpZW5jeXxlbnwxfHx8fDE3NzAyOTY5Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          title: 'Manufacturing Energy Audit',
          category: 'Environmental',
          description: 'Comprehensive energy assessment resulting in 30% consumption reduction.',
        },
        {
          image: 'https://images.unsplash.com/photo-1768245076807-00a286f0a7b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhY3RvcnklMjBzb2xhciUyMHBhbmVsc3xlbnwxfHx8fDE3NzAyOTY5Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          title: 'Industrial Solar Array',
          category: 'Renewable',
          description: '2MW ground-mounted solar installation for manufacturing facility.',
        },
        {
          image: 'https://images.unsplash.com/photo-1766507679641-51002768af6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGdyaWQlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MDI1NTI0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          title: 'Smart Grid Implementation',
          category: 'Electrical',
          description: 'Advanced metering infrastructure for 10,000 residential units.',
        },
        {
          image: 'https://images.unsplash.com/photo-1770219792143-1586d82a7101?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwbW9uaXRvcmluZyUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzAyOTY5Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          title: 'Environmental Monitoring System',
          category: 'Environmental',
          description: 'Real-time air quality and emissions tracking for industrial site.',
        },
        {
          image: 'https://images.unsplash.com/photo-1765883958852-786edf3ca505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBwcm9qZWN0JTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc3MDI3NjM2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          title: 'Renewable Energy Campus',
          category: 'Renewable',
          description: 'Hybrid solar-wind system powering university campus.',
        },
      ];
    
      const filteredProjects =
        activeFilter === 'All'
          ? projects
          : projects.filter((project) => project.category === activeFilter);
    
      const featuredProject = {
        image: 'https://images.unsplash.com/photo-1756511332583-99fc0d4bf7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGdyZWVuJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MDI5Njc4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        title: 'Mega Solar Park Project',
        category: 'Renewable Energy',
        description:
          'Our largest project to date: a 100MW solar farm spanning 500 acres, providing clean energy to over 30,000 homes and businesses.',
        stats: [
          { label: 'Capacity', value: '100 MW' },
          { label: 'CO₂ Saved', value: '80,000 tons/year' },
          { label: 'Homes Powered', value: '30,000+' },
          { label: 'Project Duration', value: '18 months' },
        ],
        quote:
          'This project represents a major milestone in our region\'s transition to renewable energy. Pakar Ekosistem Indonesia\'s expertise made it possible.',
        author: 'John Williams, City Energy Director',
      };
    return (
    <div>
        <section className="bg-white border-b border-slate-200 py-6 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-slate-500" />
              <span className="font-semibold text-slate-700 mr-2">Filter:</span>
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-[#22c55e] text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>  

        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                      <button className="bg-white text-slate-900 px-6 py-2 rounded-lg font-semibold inline-flex items-center gap-2">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-[#22c55e] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                    <p className="text-slate-600 text-sm">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>  
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-600 text-lg">No projects found for this category.</p>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Featured Case Study
              </h2>
              <p className="text-lg text-slate-600">
                A closer look at one of our most impactful projects
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="h-96 lg:h-auto">
                  <ImageWithFallback
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-block">
                    <span className="bg-[#22c55e] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                      {featuredProject.category}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">
                    {featuredProject.title}
                  </h3>
                  <p className="text-slate-600 mb-6 text-lg">{featuredProject.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {featuredProject.stats.map((stat, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-slate-200">
                        <div className="text-2xl font-bold text-[#22c55e] mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white border-l-4 border-[#22c55e] p-6 rounded-r-lg">
                    <p className="text-slate-700 italic mb-3">
                        {`"${featuredProject.quote}"`}
                    </p>
                    <p className="text-sm font-semibold text-slate-900">{featuredProject.author}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
    )
}