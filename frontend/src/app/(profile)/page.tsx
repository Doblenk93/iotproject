import { getHomePageData } from '@/services/strapiService';
import { normalizeHomeTestimonials } from '@/components/pages/home/homeHelpers';
import { HomeHero } from '@/components/pages/home/HomeHero';
import { HomeCapabilities } from '@/components/pages/home/HomeCapabilities';
import { HomePortfolioShowcase } from '@/components/pages/home/HomePortfolioShowcase';
import { HomeTestimonialsSection } from '@/components/pages/home/HomeTestimonialsSection';
import { HomeCTA } from '@/components/pages/home/HomeCTA';

export default async function HomePage() {
  let homePage: any = null;
  let portfolios: any[] = [];
  let testimonials: any[] = [];

  try {
    const data = await getHomePageData();
    homePage = data.homePage?.data || {};
    portfolios = data.portfolios?.data || [];
    testimonials = normalizeHomeTestimonials(data.testimonials?.data || []);
  } catch (err) {
    console.error('Failed to load Strapi homepage data:', err);
  }

  return (
    <div className="min-h-screen">
      <HomeHero data={homePage} />
      <HomeCapabilities
        title={homePage?.Capabilities?.Title}
        detail={homePage?.Capabilities?.Detail}
        items={homePage?.Capabilities?.ValuePoints || []}
      />
      <HomePortfolioShowcase items={portfolios} />
      <HomeTestimonialsSection
        title={homePage?.Testimonials?.Title}
        detail={homePage?.Testimonials?.Detail}
        items={testimonials}
        max={Number(homePage?.Testimonials?.DisplayedTestimonials ?? 10)}
        randomize={Boolean(homePage?.Testimonials?.Randomize)}
      />
      <HomeCTA />
    </div>
  );
}
