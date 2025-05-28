/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/wish-help-platform' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/wish-help-platform/' : '',
}

module.exports = nextConfig 