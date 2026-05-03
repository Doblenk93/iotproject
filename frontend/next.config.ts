import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.pakarekosistemindonesia.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io', // Domain ImageKit abang
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  //cacheComponents: true,
};

export default nextConfig;
