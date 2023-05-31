/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
    
      {
        protocol: 'https',
        hostname: 'zapvi.in',
       
      }
    ]
  },
      output: 'export'
    
}
module.exports = nextConfig
