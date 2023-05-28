const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withBundleAnalyzer(
  withPWA({
    reactStrictMode: false,
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: { scrollRestoration: true },
  })
);
