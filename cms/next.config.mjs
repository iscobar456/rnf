import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rwanda-nurture-foundation.s3.us-west-1.amazonaws.com',
        port: '',
        pathname: '/media/**',
        search: '',
      },
    ],
  },
}

export default withPayload(nextConfig)
