import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  distDir: 'public',
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default nextConfig
