const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    // Enable Turbopack
    turbo: {
      // Enable Turbopack's build cache
      buildCache: true,
      // Enable Turbopack's resolve cache
      resolveCache: true,
    },
    // Enable optimizations for server components
    serverActions: true,
    // Enable optimizations for static pages
    optimizeCss: true,
    // Enable module optimization
    optimizePackageImports: ['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
  },
  // Configure images for optimization
  images: {
    domains: ['localhost'],
    // Enable blur placeholder
    minimumCacheTTL: 60,
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Enable SWC minification
  swcMinify: true,
  // Configure webpack for better performance
  webpack: (config, { dev, isServer }) => {
    // Optimize CSS
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: /\.(css|scss)$/,
        chunks: 'all',
        enforce: true,
      }
    }
    return config
  },
  devServer: {
    port: 3001, // or any other port number you prefer
  },
}

module.exports = withBundleAnalyzer(nextConfig)