const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src', 'common', 'css')],
  },
  experimental: {
    esmExternals: true,
  },
  // Uncomment the following lines if you need to add custom webpack config
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   // Add your custom webpack configurations here
  //   return config;
  // },
  // Uncomment if you need to add headers
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         // Add your custom headers here
  //       ],
  //     },
  //   ];
  // },
  // Uncomment if you need to add redirects
  // async redirects() {
  //   return [
  //     // Add your redirects here
  //   ];
  // },
  // Add other Next.js specific configurations as needed
}

module.exports = nextConfig
