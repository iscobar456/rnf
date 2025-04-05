import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  reactStrictMode: true,
  output: 'export',
  eslint: {
    ignoreDuringBuilds: process.env.SERVER === "true",
  },
  typescript: {
    ignoreBuildErrors: process.env.SERVER === "true",
  },
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
