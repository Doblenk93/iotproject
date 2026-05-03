import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      sizeLimit: 104857600,
      tmpdir: process.cwd() + '/tmp',
      security: {
        // Validasi tipe file
        fileFilter: {
          allowedMimes: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml',
          ],
        },
      },
    },
  },
  imagekit: {
    enabled: true,
    config: {
      // Basic Configuration
      publicKey: env("IMAGEKIT_PUBLIC_KEY"),
      privateKey: env("IMAGEKIT_PRIVATE_KEY"),
      urlEndpoint: env("IMAGEKIT_URL_ENDPOINT"),

      // Delivery Configuration
      enabled: true,
      useTransformUrls: true,
      useSignedUrls: false,
      expiry: 3600, // URL expiry time in seconds when useSignedUrls is true

      // Upload Configuration
      uploadEnabled: true,

      // Upload Options
      uploadOptions: {
        folder: "/strapi-uploads/",
        tags: ["strapi", "media"],
        overwriteTags: false,
        checks: "", // Example: '"file.size" <= "5MB"'
        isPrivateFile: false,
      },
    },
  },
  email: {
    enabled: true,
    config: {
      provider: 'strapi-provider-email-resend',
      providerOptions: {
        apiKey: env('RESEND_API_KEY'), // Required
      },
      settings: {
        defaultFrom: 'admin@pakarekosistemindonesia.com',
        defaultReplyTo: 'admin@pakarekosistemindonesia.com',
      },
    }
  }  
});

export default config;
