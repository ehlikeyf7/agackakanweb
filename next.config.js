/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: 'export', // Removed to enable server-side image optimization
  // distDir: 'out',   // Default build directory '.next' will be used
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;