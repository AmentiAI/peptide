import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow MDX pages to import from content directory
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],

  experimental: {},

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'vercel-blob.vercel.app',
      },
    ],
  },
}

export default nextConfig
