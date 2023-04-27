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
        basePath: false,
        has: [
          {
            type: 'host',
            value: 'pipergpt.clayte.xyz',
          },
        ],
        destination: '/pipergpt/:path*',
      },
    ];
  },
};
