import { getIcon } from '@/components/ui/ItemComponents';
import type { HomePageCapability } from '@/types/home';

interface HomeCapabilitiesProps {
  title?: string;
  detail?: string;
  items?: HomePageCapability[];
}

export function HomeCapabilities({ title, detail, items = [] }: HomeCapabilitiesProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{title || 'Keahlian Kami'}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{detail}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-xl hover:border-green-500 transition-all group duration-300"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform origin-left">
                {getIcon(item.IconName)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{item.Title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.Description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
