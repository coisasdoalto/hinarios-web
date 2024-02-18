// import pathsForPrecache from './tmp/pathsForPrecacheV2.json'

const pathsForPrecache = require('./tmp/pathsForPrecacheV2.json');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const revision = '2';

const withSerwist = require('@serwist/next').default({
  swSrc: './sw.ts',
  swDest: 'public/sw.js',
  maximumFileSizeToCacheInBytes: 7355608,
  additionalPrecacheEntries: [{ url: '/sobre/', revision }, ...pathsForPrecache],
});

module.exports = withSerwist({
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  experimental: { scrollRestoration: true },
  trailingSlash: true,
});
