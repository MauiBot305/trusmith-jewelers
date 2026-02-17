/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Image Optimization ─────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },

  // ── Compiler options ────────────────────────────────────────────────────────
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ── HTTP Headers ────────────────────────────────────────────────────────────
  async headers() {
    return [
      // Static assets — long-lived cache
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|svg|gif|webp|avif|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // 3D models — long-lived cache
      {
        source: '/models/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Security headers — all routes
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },

  // ── Redirects ───────────────────────────────────────────────────────────────
  async redirects() {
    return [
      { source: '/builder', destination: '/build', permanent: true },
      { source: '/ring-builder', destination: '/build', permanent: true },
    ];
  },

  // ── Experimental ────────────────────────────────────────────────────────────
  experimental: {
    // Typed routes — catches broken links at compile time
    typedRoutes: true,
  },
};

module.exports = nextConfig;
