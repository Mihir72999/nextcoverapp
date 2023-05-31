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
      output: 'npm export'
    
}
module.exports = nextConfig
