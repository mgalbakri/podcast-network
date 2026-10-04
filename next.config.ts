import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  outputFileTracingExcludes: { '*': ['./media/**', './public/audio/**'] },
};

export default nextConfig;
