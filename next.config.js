const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// module.exports = withBundleAnalyzer(
//   withPWA({
//     reactStrictMode: false,
//     eslint: {
//       ignoreDuringBuilds: true,
//     },
//     experimental: { scrollRestoration: true },
//   })
// );

const revision = '2';

const withSerwist = require('@serwist/next').default({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: './sw.ts',
  swDest: 'public/sw.js',
  maximumFileSizeToCacheInBytes: 7355608,
  additionalPrecacheEntries: [
    { url: '/sobre/', revision },
    { url: '/corinhos-e-canticos-de-salvacao/1-Ele-E-Exaltado!/', revision },
  ],
});

module.exports = withSerwist({
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  experimental: { scrollRestoration: true },
  trailingSlash: true,
});
