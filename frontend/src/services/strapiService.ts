/**
 * Strapi API Service Layer with Optimized Queries
 * Menggunakan Query Builder untuk efficient data fetching
 * 
 * Features:
 * - Minimal data transfer (selective populate & fields)
 * - Error handling dengan fallback
 * - Response caching recommendations
 * - Type-safe dengan TypeScript
 */

import {
  GENERAL_INFO_QUERIES,
  HOME_PAGE_QUERIES,
  ABOUT_PAGE_QUERIES,
  CONTACT_PAGE_QUERIES,
  PORTFOLIO_QUERIES,
  TESTIMONIAL_QUERIES,
  /*buildQuery,
  buildPaginatedQuery,
  buildFilteredQuery,
  type QueryOptions,*/
} from '@/utils/queryBuilder';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Base fetch function dengan optimasi
 * Di development: cache disabled untuk real-time data
 * Di production: ISR dengan revalidate 1 jam & tagging untuk manual revalidation
 */
async function fetchFromStrapi<T = any>(
  endpoint: string,
  queryString: string = ''
): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}${queryString}`;
  const isDev = process.env.NODE_ENV === 'development';

  try {
    const response = await fetch(url, {
      next: {
        tags: ['strapi-data'], // Tag untuk manual revalidation
        revalidate: isDev ? 0 : 3600, // Dev: real-time, Prod: 1 jam cache
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

/**
 * ============================================
 * GENERAL INFO SERVICES (Single Type)
 * ============================================
 */

export async function getGeneralInfoHeader() {
  return fetchFromStrapi('/general-info', GENERAL_INFO_QUERIES.header);
}

export async function getGeneralInfoFooter() {
  return fetchFromStrapi('/general-info', GENERAL_INFO_QUERIES.footer);
}

export async function getGeneralInfoContact() {
  return fetchFromStrapi('/general-info', GENERAL_INFO_QUERIES.contactForm);
}

export async function getGeneralInfoComplete() {
  return fetchFromStrapi('/general-info', GENERAL_INFO_QUERIES.complete);
}

/**
 * ============================================
 * HOME PAGE SERVICES (Single Type)
 * ============================================
 */

// export async function getHomePageHero() {
  // return fetchFromStrapi('/home-page', HOME_PAGE_QUERIES.hero);
// }

export async function getHomePageComplete() {
  return fetchFromStrapi('/home-page', HOME_PAGE_QUERIES.complete);
}

/**
 * ============================================
 * ABOUT PAGE SERVICES (Single Type)
 * ============================================
 */

// export async function getAboutPageMinimal() {
  // return fetchFromStrapi('/about-page', ABOUT_PAGE_QUERIES.minimal);
// }

export async function getAboutPageComplete() {
  return fetchFromStrapi('/about-page', ABOUT_PAGE_QUERIES.complete);
}

/**
 * ============================================
 * CONTACT PAGE SERVICES (Single Type)
 * ============================================
 */

export async function getContactPageMinimal() {
  return fetchFromStrapi('/contact-page', CONTACT_PAGE_QUERIES.minimal);
}

export async function getContactPageComplete() {
  return fetchFromStrapi('/contact-page', CONTACT_PAGE_QUERIES.complete);
}

/**
 * ============================================
 * PORTFOLIO SERVICES (Collection Type)
 * ============================================
 */

interface PortfolioListOptions {
  page?: number;
  pageSize?: number;
  includeDescription?: boolean;
}

/**
 * Get featured portfolios (untuk homepage showcase)
 */
export async function getFeaturedPortfolios(limit = 3) {
  const query = PORTFOLIO_QUERIES.featured(limit);
  return fetchFromStrapi('/portofolios', query);
}

/**
 * Get paginated portfolio list (untuk portfolio page)
 */
export async function getPortfolioList({ page = 1, pageSize = 12, includeDescription = true } = {}) {
  const query = PORTFOLIO_QUERIES.paginatedList(page, pageSize, includeDescription);
  return fetchFromStrapi('/portofolios', query);
}

/**
 * Get portfolio by type dengan pagination
 */
export async function getPortfolioByType(type: 'Environmental' | 'Electrical', page = 1, pageSize = 12) {
  return fetchFromStrapi('/portofolios', PORTFOLIO_QUERIES.filterByType(type, page, pageSize));
}

/**
 * Get single portfolio detail (untuk modal)
 */
export async function getPortfolioDetail(id: string | number): Promise<any> {
  const query = PORTFOLIO_QUERIES.detail;
  return fetchFromStrapi(`/portofolios/${id}`, query);
}

/**
 * Search portfolio dengan pagination
 */
export async function searchPortfolio(searchTerm: string, page = 1, pageSize = 12) {
  return fetchFromStrapi('/portofolios', PORTFOLIO_QUERIES.search(searchTerm, page, pageSize));
}

/**
 * ============================================
 * TESTIMONIAL SERVICES (Collection Type)
 * ============================================
 */

interface TestimonialListOptions {
  page?: number;
  pageSize?: number;
  includeReviews?: boolean;
  isActiveOnly?: boolean;
}

export async function getTestimonialList({ page = 1, pageSize = 5, includeReviews = false, isActiveOnly = false } = {}) {
  const query = TESTIMONIAL_QUERIES.paginatedList(page, pageSize, includeReviews, isActiveOnly);
  return fetchFromStrapi('/testimonials', query);
}

export async function getTestimonialDetail(id: string | number): Promise<any> {
  const query = TESTIMONIAL_QUERIES.complete;
  return fetchFromStrapi(`/testimonials/${id}`, query);
}

export async function getAllTestimonials() {
  return fetchFromStrapi('/testimonials', TESTIMONIAL_QUERIES.all);
}
/**
 * ============================================
 * UTILITY FUNCTIONS
 * ============================================
 */

export function getStrapiImageUrl(imageData: any): string {
  // 1. Jika data kosong sama sekali
  if (!imageData) return '/images/placeholder.png';

  // 2. Cek semua kemungkinan path URL (v4, v5, atau direct link)
  // Di JSON abang, URL ada di imageData.url langsung
  const path = 
    imageData.url || 
    imageData.attributes?.url || 
    imageData.data?.attributes?.url;

  if (!path) {
    console.warn("Gambar tidak memiliki URL:", imageData);
    return '/images/placeholder.png';
  }

  // 3. Jika sudah absolute URL (ImageKit/Cloudinary)
  if (path.startsWith('http')) {
    return path;
  }

  // 4. Jika masih path lokal Strapi
  return `${STRAPI_URL}${path}`;
}

export function extractBlockContent(blocksData: any): string {
  if (!blocksData) return '';

  if (Array.isArray(blocksData)) {
    return blocksData
      .map((block: any) => {
        if (block.type === 'paragraph') {
          return block.children?.map((child: any) => child.text).join('') || '';
        }
        return '';
      })
      .join(' ');
  }

  return String(blocksData);
}

export function formatLocationData(
  location: any
): { lat: number; lng: number; name: string } | null {
  if (!location) return null;

  return {
    lat: location.latitude || 0,
    lng: location.longitude || 0,
    name: location.locationName || '',
  };
}

export function formatProjectPeriod(
  period: any
): { startDate: string; endDate: string } | null {
  if (!period) return null;

  return {
    startDate: period.startDate || '',
    endDate: period.endDate || '',
  };
}

export function extractContactInfo(
  contacts: any[]
): Record<string, string> {
  if (!Array.isArray(contacts)) return {};

  return contacts.reduce(
    (acc, contact) => {
      if (contact.type && contact.value) {
        acc[contact.type] = contact.value;
      }
      return acc;
    },
    {} as Record<string, string>
  );
}

export function extractSocialLinks(
  socials: any[]
): Array<{ platform: string; url: string; icon: string }> {
  if (!Array.isArray(socials)) return [];

  return socials
    .filter(social => social.platform && social.url)
    .map(social => ({
      platform: social.platform,
      url: social.url,
      icon: social.icon || '🔗',
    }));
}

/**
 * ============================================
 * BATCH OPERATIONS (untuk optimize multiple requests)
 * ============================================
 */

export async function getHomePageData() {
  try {
    const [homePage, portfolios, testimonials] = await Promise.all([
      getHomePageComplete(),
      getPortfolioList({ pageSize: 3 }),
      getTestimonialList({ pageSize: 10, includeReviews: true, isActiveOnly: true }),
    ]);

    return {
      homePage,
      portfolios,
      testimonials,
    };

  } catch (error) {
    console.error('Error fetching homepage data:', error);
    throw error;
  }
}

export async function getLayoutData() {
  try {
    const generalInfo = await getGeneralInfoFooter();
    return generalInfo;
  } catch (error) {
    console.error('Error fetching layout data:', error);
    throw error;
  }
}
