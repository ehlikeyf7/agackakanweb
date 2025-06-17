/** @type {import('next').NextConfig} */

const i18n = {
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
};

const nextConfig = {
  // output: 'export', // Removed to enable server-side image optimization
  // distDir: 'out',   // Default build directory '.next' will be used
  images: {
    // unoptimized: true, // Image optimization is now enabled by default
  },
  i18n,
};

module.exports = nextConfig;
module.exports.i18n = i18n; // Export for middleware