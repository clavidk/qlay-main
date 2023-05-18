/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/pipergpt',
        destination: 'https://pipergpt.qlay.xyz',
        permanent: true,
      },
    ]
  },
};