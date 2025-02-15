/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://iscc.org', // Base URL of the website
  generateRobotsTxt: true, // Generate robots.txt file
  sitemapSize: 5000, // Maximum number of URLs per sitemap file
  outDir: 'public', // Output directory for sitemap files
  changefreq: 'daily', // Default change frequency for all pages
  priority: 0.7, // Default priority for all pages
  generateIndexSitemap: true, // Generate a sitemap index file
  exclude: ['/404', '/500'], // Exclude error pages from the sitemap
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://iscc.org/sitemap-0.xml', // Example additional sitemap
    ],
  },
};

module.exports = config;/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://iscc.org', // Base URL of the website
  generateRobotsTxt: true, // Generate robots.txt file
  sitemapSize: 5000, // Maximum number of URLs per sitemap file
  outDir: 'public', // Output directory for sitemap files
  changefreq: 'daily', // Default change frequency for all pages
  priority: 0.7, // Default priority for all pages
  generateIndexSitemap: true, // Generate a sitemap index file
  exclude: ['/404', '/500'], // Exclude error pages from the sitemap
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://iscc.org/sitemap-0.xml', // Example additional sitemap
    ],
  },
};

module.exports = config;