/**
 * Portfolio Types - Type-safe interfaces untuk portfolio data dari Strapi
 * Support untuk image & video, rich text descriptions
 */

/**
 * Strapi Block Editor Format
 * Used for rich text content (Title, Description, etc)
 */
interface BlockEditorChild {
  text: string;
  type?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface BlockEditorBlock {
  type: 'paragraph' | 'heading' | 'quote' | 'code' | 'list' | 'table' | 'image';
  children: BlockEditorChild[];
  format?: string;
  level?: number; // For headings (1-6)
}

export type BlockEditorContent = BlockEditorBlock[];

/**
 * Image/Media data from Strapi
 */
interface StrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
}

export interface StrapiImage {
  id: number | string;
  documentId?: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    large?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    small?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
  hash?: string;
  ext?: string;
  mime: string;
  size?: number;
  url: string;
  previewUrl?: string;
  provider?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

/**
 * Location component
 */
export interface PortfolioLocation {
  id: number | string;
  City?: string;
  Province?: string;
  Country?: string;
}

/**
 * Timeline/Duration component
 */
export interface PortfolioTimestamp {
  id: number | string;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  isCurrentProject?: boolean;
}

/**
 * Main Portfolio type
 * Can be image or video
 */
export interface Portfolio {
  id: number | string;
  documentId: string;
  Title: string;
  Description: BlockEditorContent; // Rich text
  Type: 'Environmental' | 'Electrical' | string;
  Image: StrapiImage; // Can be image or video
  MultipleMedia?: boolean;
  OtherImages?: StrapiImage[];
  Location?: PortfolioLocation;
  Timestamp?: PortfolioTimestamp;
  isFeatured?: boolean;
  pinnedOrder?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/**
 * Portfolio list response from Strapi
 */
export interface PortfolioListResponse {
  data: Portfolio[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Portfolio detail response from Strapi
 */
export interface PortfolioDetailResponse {
  data: Portfolio;
  meta?: Record<string, any>;
}

/**
 * Media type helper
 */
export enum MediaType {
  Image = 'image',
  Video = 'video',
  Unknown = 'unknown',
}

/**
 * Detect media type dari mime type
 */
export function getMediaType(mimeType?: string): MediaType {
  if (!mimeType) return MediaType.Unknown;
  
  if (mimeType.startsWith('image/')) return MediaType.Image;
  if (mimeType.startsWith('video/')) return MediaType.Video;
  
  return MediaType.Unknown;
}

/**
 * Get appropriate image URL (with fallback to formats)
 */
export function getPortfolioMediaUrl(media: StrapiImage | null | undefined, size: 'large' | 'medium' | 'small' | 'thumbnail' = 'medium'): string {
  if (!media) return '/images/placeholder.png';
  
  // Priority: Try specific format first, then fallback to main URL
  const formatUrl = media.formats?.[size]?.url;
  if (formatUrl) return formatUrl;
  
  // Fallback to main URL
  return media.url || '/images/placeholder.png';
}

/**
 * Format date untuk display
 */
export function formatPortfolioDate(date?: string): string {
  if (!date) return 'N/A';
  
  try {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return date;
  }
}

/**
 * Get display date range
 */
export function getPortfolioDateRange(timestamp?: PortfolioTimestamp): string {
  if (!timestamp?.startDate) return 'Dalam Proses';
  
  const start = formatPortfolioDate(timestamp.startDate);
  
  if (timestamp.isCurrentProject) return `${start} - Saat ini`;
  if (!timestamp.endDate) return start;
  
  const end = formatPortfolioDate(timestamp.endDate);
  return `${start} - ${end}`;
}
