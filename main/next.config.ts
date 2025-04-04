import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rwanda-nurture-foundation.s3.us-west-1.amazonaws.com',
        port: '',
        pathname: '/media/**',
        search: '',
      },
    ],
  }
};

export default nextConfig;
