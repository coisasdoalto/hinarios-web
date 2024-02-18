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

const { PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = async (phase, { defaultConfig }) => {
  const config = {
    ...defaultConfig,
    eslint: {
      ignoreDuringBuilds: true,
    },
    reactStrictMode: false,
    experimental: { scrollRestoration: true },
    trailingSlash: true,
  };

  return config;
};
