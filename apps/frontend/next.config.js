/** @type {import('next').NextConfig} */
const nextConfig = {
  port: 3300,
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  images: {
    domains: ['localhost', 'your-domain.com'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig