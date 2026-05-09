import type { NextConfig } from 'next';

// The blog is intended to be served under /plugin-blog on policyengine.org via
// Vercel multi-zone rewrites. Next applies basePath to all routes and assets.
const nextConfig: NextConfig = {
  basePath: '/plugin-blog',
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
