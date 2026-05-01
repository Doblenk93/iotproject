/**
 * Strapi Common Types
 */

// Strapi Image/Media type
export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        path?: string;
        width: number;
        height: number;
        size: number;
        url: string;
      };
      small?: {
        url: string;
        width: number;
        height: number;
      };
      medium?: {
        url: string;
        width: number;
        height: number;
      };
      large?: {
        url: string;
        width: number;
        height: number;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: unknown;
    createdAt: string;
    updatedAt: string;
  };
}

// Strapi Pagination
export interface StrapiFetchResponse<T> {
  data: T[];
  meta?: {
    pagination: {
      start: number;
      limit: number;
      total: number;
      pageCount?: number;
      page?: number;
      pageSize?: number;
    };
  };
}

export interface StrapiFetchSingleResponse<T> {
  data: T;
  meta?: unknown;
}

// Company Info Type
export interface CompanyInfo {
  id: number;
  attributes: {
    companyName: string;
    description: string;
    address: string;
    email: string;
    phone: string;
    logo: {
      data: StrapiImage | null;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Team Member Type
export interface TeamMember {
  id: number;
  attributes: {
    name: string;
    position: string;
    bio?: string;
    email?: string;
    socialLinks?: Array<{
      id: number;
      platform: string;
      url: string;
    }>;
    photo: {
      data: StrapiImage | null;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Service Type
export interface Service {
  id: number;
  attributes: {
    title: string;
    description: string;
    shortDescription?: string;
    icon?: string;
    image: {
      data: StrapiImage | null;
    };
    order?: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Project/Portfolio Type
export interface Project {
  id: number;
  attributes: {
    title: string;
    description: string;
    shortDescription?: string;
    category?: string;
    slug: string;
    technologies?: string;
    link?: string;
    images: {
      data: StrapiImage[];
    };
    featuredImage: {
      data: StrapiImage | null;
    };
    order?: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Testimonial Type
export interface Testimonial {
  id: number;
  attributes: {
    clientName: string;
    content: string;
    rating: number; // 1-5
    position?: string;
    company?: string;
    photo: {
      data: StrapiImage | null;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Page Type (untuk dinamis content pages)
export interface Page {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    metaDescription?: string;
    metaKeywords?: string;
    featuredImage: {
      data: StrapiImage | null;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Contact Message Type (untuk form submissions)
export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}
