import { getIcon } from '@/components/ui/ItemComponents';
import type { AboutPagePoint } from '@/types/about';

interface AboutAdvantagesProps {
  title?: string;
  detail?: string;
  items?: AboutPagePoint[];
}

export function AboutAdvantages({
  title,
  detail,
  items = [],
}: AboutAdvantagesProps) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
          {title || 'Keunggulan Kami'}
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">{detail}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((point) => (
            <div key={point.id} className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-md transition-transform group-hover:scale-110">
                {getIcon(point.IconName)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{point.Title}</h3>
              <p className="text-slate-600">{point.Description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
