/**
 * Portfolio Media Handler
 * Utility untuk handle image/video, thumbnail extraction, etc
 */

import { StrapiImage, MediaType, getMediaType } from '@/types/portfolio';

/**
 * Video format yang support di browser
 */
const SUPPORTED_VIDEO_FORMATS = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];

/**
 * Strapi server URL - ensure media URLs point to correct server
 */
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Normalize media URL - convert relative paths to full URLs pointing to Strapi server
 * Strapi API returns relative paths like /uploads/... 
 * but Next.js frontend needs full URLs to resolve correctly
 */
function normalizeMediaUrl(url: string | undefined | null): string {
  if (!url) return '';
  
  // Already a full URL (http://, https://, etc)
  if (url.match(/^https?:\/\//)) {
    return url;
  }
  
  // Relative path - prepend Strapi URL
  if (url.startsWith('/')) {
    return `${STRAPI_URL}${url}`;
  }
  
  return url;
}

/**
 * Cek apakah media adalah video
 */
export function isVideo(media: StrapiImage | null | undefined): boolean {
  if (!media) return false;
  return getMediaType(media.mime) === MediaType.Video;
}

/**
 * Cek apakah media adalah image
 */
export function isImage(media: StrapiImage | null | undefined): boolean {
  if (!media) return false;
  return getMediaType(media.mime) === MediaType.Image;
}

/**
 * Get thumbnail URL dari media
 * Untuk video: coba formats.thumbnail, atau fallback ke image format
 * Untuk image: use medium/small format untuk thumbnail view
 */
export function getMediaThumbnail(
  media: StrapiImage | null | undefined,
  options: {
    fallbackSize?: 'small' | 'medium' | 'thumbnail';
    fallbackImage?: string;
  } = {}
): string {
  const { fallbackSize = 'thumbnail', fallbackImage = '/images/placeholder.png' } = options;

  if (!media) return fallbackImage;

  // Priority order untuk thumbnail
  const priorityFormats = [
    media.formats?.thumbnail?.url,
    media.formats?.small?.url,
    media.formats?.medium?.url,
    media.url,
  ];

  for (const url of priorityFormats) {
    if (url) return normalizeMediaUrl(url);
  }

  return fallbackImage;
}

/**
 * Get media URL untuk display (full size atau optimal)
 * Digunakan untuk modal/detail view
 */
export function getMediaDisplayUrl(
  media: StrapiImage | null | undefined,
  size: 'small' | 'medium' | 'large' = 'large'
): string {
  if (!media) return '/images/placeholder.png';

  // Untuk video, gunakan medium format (lebih optimal)
  if (isVideo(media)) {
    const url = media.formats?.medium?.url || media.url;
    return url ? normalizeMediaUrl(url) : '/images/placeholder.png';
  }

  // Untuk image, sesuaikan dengan size request
  const format = media.formats?.[size];
  const url = format?.url || media.url;
  return url ? normalizeMediaUrl(url) : '/images/placeholder.png';
}

/**
 * Extract video timestamp dalam detik
 * Bisa digunakan untuk set poster/thumbnail timing
 */
export function getVideoTimestamp(
  media: StrapiImage | null | undefined,
  defaultSeconds = 0
): number {
  if (!media || !isVideo(media)) return defaultSeconds;

  // Cek jika ada metadata di alt text atau caption
  const metadata = media.alternativeText || media.caption || '';
  const match = metadata.match(/\[(\d+(?:\.\d+)?)\s*(?:s|second|sec)?\]/i);

  return match ? parseFloat(match[1]) : defaultSeconds;
}

/**
 * Get video src attribute
 * Handle untuk different video formats/codecs
 */
export function getVideoSourceUrl(media: StrapiImage | null | undefined): string {
  if (!media || !isVideo(media)) return '';

  // Prioritas: URL dengan best quality
  const url = media.formats?.large?.url || media.formats?.medium?.url || media.url;
  return url ? normalizeMediaUrl(url) : '';
}

/**
 * Format file size untuk display
 */
export function formatFileSize(bytes?: number): string {
  if (!bytes) return 'Unknown';

  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * Get media metadata untuk display (type, size, dimensions)
 */
export interface MediaMetadata {
  type: MediaType;
  size: string;
  dimensions: string;
  mime: string;
  duration?: string; // For video
}

export function getMediaMetadata(media: StrapiImage | null | undefined): MediaMetadata {
  const type = getMediaType(media?.mime);
  const size = formatFileSize(media?.size);
  const dimensions = media?.width && media?.height ? `${media.width}×${media.height}` : 'Unknown';

  return {
    type,
    size,
    dimensions,
    mime: media?.mime || 'Unknown',
  };
}

/**
 * Generate responsive srcset untuk image
 * Gunakan di <img> tag untuk optimal loading
 */
export function getImageSrcSet(media: StrapiImage | null | undefined): string {
  if (!media || isVideo(media)) return '';

  const srcSet: string[] = [];

  if (media.formats?.small?.url) {
    srcSet.push(`${normalizeMediaUrl(media.formats.small.url)} 500w`);
  }
  if (media.formats?.medium?.url) {
    srcSet.push(`${normalizeMediaUrl(media.formats.medium.url)} 750w`);
  }
  if (media.formats?.large?.url) {
    srcSet.push(`${normalizeMediaUrl(media.formats.large.url)} 1000w`);
  }
  if (media.url) {
    srcSet.push(`${normalizeMediaUrl(media.url)} 1500w`);
  }

  return srcSet.join(', ');
}

/**
 * Cek apakah media url adalah ImageKit CDN
 */
export function isImageKitUrl(url?: string): boolean {
  return url?.includes('imagekit.io') ?? false;
}

/**
 * Get default alt text
 */
export function getMediaAltText(media: StrapiImage | null | undefined, fallback = 'Portfolio media'): string {
  return media?.alternativeText || media?.caption || fallback;
}
