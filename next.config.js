const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const { env } = require('./src/lib/env');

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
  // Validate environment variables
  env: (() => {
    try {
      return env;
    } catch (error) {
      console.error('Environment variable validation failed:', error.message);
      throw new Error('Invalid environment variables. Please check your .env configuration.');
    }
  })(),
}

nextConfig.env = {
  ANALYZE: env.ANALYZE,
  NEXT_PUBLIC_API_URL: env.NEXT_PUBLIC_API_URL,
  DATABASE_URL: env.DATABASE_URL,
  SECRET_KEY: env.SECRET_KEY,
  NODE_ENV: env.NODE_ENV,
  EMAIL_SERVICE_API_KEY: env.EMAIL_SERVICE_API_KEY,
  EMAIL_FROM: env.EMAIL_FROM,
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  NEXT_PUBLIC_SENTRY_DSN: env.NEXT_PUBLIC_SENTRY_DSN,
  STRIPE_PUBLIC_KEY: env.STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KEY: env.STRIPE_SECRET_KEY,
  AWS_ACCESS_KEY_ID: env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: env.AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME: env.AWS_S3_BUCKET_NAME,
  AWS_REGION: env.AWS_REGION,
};

module.exports = withBundleAnalyzer(nextConfig);