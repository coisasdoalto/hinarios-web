const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa');

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

  /**
   * @type { import("next-pwa").PWAConfig }
   */
  const pwaConfig = {
    dest: 'public',
    dynamicStartUrl: false, // precache home page instead of storing it in runtime cache by default
    // register: false,
    // skipWaiting: false,
    buildExcludes: [/middleware-manifest\.json$/], // for Next 12, see https://github.com/shadowwalker/next-pwa/issues/288
    maximumFileSizeToCacheInBytes: 1000000,
  };

  console.log('phase', phase);

  if (phase === PHASE_PRODUCTION_BUILD) {
    // Attributes generateBuildId and additionalManifestEntries are only needed
    // for the build and calculating their value is time-consuming.
    // So we add them here, just for the build.
    const getBuildId = require('./util/buildid.js');
    const getStaticPrecacheEntries = require('./util/staticprecache.js');
    const getGeneratedPrecacheEntries = require('./util/precache.js');

    const buildId = getBuildId();

    config.generateBuildId = getBuildId;
    pwaConfig.additionalManifestEntries = [
      ...getStaticPrecacheEntries({
        // exclude icon-related files from the precache since they are platform specific
        // note: no need to pass publicExcludes to next-pwa, it's not used for anything else
        publicExcludes: ['!*.png', '!*.ico', '!browserconfig.xml'],
      }),
      ...(await getGeneratedPrecacheEntries(buildId)),
    ];
  }

  console.log('pwaConfig.additionalManifestEntries');
  console.log(JSON.stringify(pwaConfig.additionalManifestEntries, null, 2));

  // return config
  return withPWA(pwaConfig)(config);
};
