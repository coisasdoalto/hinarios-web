import serwist from '@serwist/next';
import { readFileSync } from 'fs';
import { nanoid } from 'nanoid';
import { PHASE_PRODUCTION_BUILD } from 'next/constants.js';

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

const buildId = nanoid();
const revision = buildId;

export default async (phase, { defaultConfig }) => {
  const pathsForPrecache = JSON.parse(readFileSync('./tmp/pathsForPrecache.json'));

  const withSerwist = serwist({
    swSrc: './sw.ts',
    swDest: 'public/sw.js',
    maximumFileSizeToCacheInBytes: 7355608,
    disable: phase !== PHASE_PRODUCTION_BUILD,
    additionalPrecacheEntries: [
      { url: '/sobre/', revision },
      ...pathsForPrecache.map((url) => ({ url, revision })),
    ],
  });

  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    reactStrictMode: false,
    experimental: { scrollRestoration: true },
    trailingSlash: true,
    generateBuildId: () => buildId,
  };

  return withSerwist(nextConfig);
};
