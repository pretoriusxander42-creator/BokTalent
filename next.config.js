/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Required for Supabase auth
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'referrer-policy',
            value: 'no-referrer-when-downgrade'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
