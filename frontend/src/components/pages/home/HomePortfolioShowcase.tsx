import { VideoThumbnailExtractor } from '@/components/VideoThumbnailExtractor';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { getStrapiImageUrl } from '@/services/strapiService';
import { isVideo } from '@/utils/mediaHandler';
import type { HomePortfolioItem } from '@/types/home';

interface HomePortfolioShowcaseProps {
  items?: HomePortfolioItem[];
}

export function HomePortfolioShowcase({ items = [] }: HomePortfolioShowcaseProps) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8">Proyek Terkini</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((project) => (
            <a
              key={project.id}
              href="/portofolio/"
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 w-full relative">
                {isVideo(project.Image) ? (
                  <VideoThumbnailExtractor
                    videoUrl={getStrapiImageUrl(project.Image)}
                    timeOffset={0.1}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageWithFallback
                    src={getStrapiImageUrl(project.Image)}
                    alt={project.Title || 'Portfolio image'}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{project.Title}</h3>
                <p className="text-sm text-slate-500">{project.Type}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
