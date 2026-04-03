/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/happypaws',
  assetPrefix: '/happypaws/',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
