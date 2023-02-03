/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./utils/config')
    }
    return config
  },
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    HOST: process.env.HOST,
    VERCEL_URL: process.env.VERCEL_URL,

    // Cloudinary
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
  }
}

module.exports = nextConfig
