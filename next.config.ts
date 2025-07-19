/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'tr', 'ar'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
