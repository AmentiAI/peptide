import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow MDX pages to import from content directory
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // Enable experimental features for better performance
  experimental: {
    // Optimize server components
  },
}

export default nextConfig
