/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Removed to enable server-side image optimization
  // distDir: 'out',   // Default build directory '.next' will be used
  images: {
    // unoptimized: true, // Image optimization is now enabled by default
  },
};

module.exports = nextConfig;