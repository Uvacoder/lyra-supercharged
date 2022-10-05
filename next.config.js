/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.shields.io'],
    minimumCacheTTL: 60
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false
    };
    return config;
  },
};

module.exports = nextConfig;
