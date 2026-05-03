import { getStrapiImageUrl } from '@/services/strapiService';
import type { HomePageTestimonialItem } from '@/types/home';

export function normalizeHomeTestimonials(items: any[] = []): HomePageTestimonialItem[] {
  return items.map((item) => ({
    id: item.id,
    ClientWords: item.ClientWords,
    ClientName: item.ClientName,
    ClientCompany: item.ClientCompany,
    ClientPicture: getStrapiImageUrl(item.ClientPicture),
  }));
}

export function getHomePageHeroText(data: any) {
  return {
    title: data?.PageH1 || 'Pakar Ekosistem Indonesia',
    subtitle: data?.H1Detail || 'INTEGRATED ENVIRONMENTAL SERVICE',
  };
}
