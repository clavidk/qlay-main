/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/pipergpt',
        destination: '/pipergpt',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'pipergpt.clayte.xyz',
          },
        ],
        destination: '/pipergpt/:path*',
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'pipergpt.clayte.xyz',
          },
        ],
        destination: '/pipergpt',
      },
    ];
  },
};
