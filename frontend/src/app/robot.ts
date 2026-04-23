import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Contoh jika ada folder yang ingin disembunyikan
    },
    sitemap: 'https://www.pakarekosistemindonesia.com/sitemap.xml',
  }
}