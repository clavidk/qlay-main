/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  rewrites: async () => [
    {
      source: "/qlay.xyz",
      destination: "/",
    },
    {
      source: "/pipergpt.qlay.xyz",
      destination: "/piper",
    },
  ]
}

module.exports = nextConfig;