/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.pngitem.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.prokerala.com',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig