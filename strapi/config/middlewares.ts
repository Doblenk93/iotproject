import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'script-src':[
            'https://cdnjs.cloudflare.com'
          ],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'ik.imagekit.io',
            'https://cdnjs.cloudflare.com'
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'ik.imagekit.io',
            'https://cdnjs.cloudflare.com'
          ],
          'frame-src': [
            "'self'",
            'https://eml.imagekit.io',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000',
        'https://www.pakarekosistemindonesia.com',
        'https://pakarekosistemindonesia.com',
      ],
      credentials: true,
    },
  }
];

export default config;
