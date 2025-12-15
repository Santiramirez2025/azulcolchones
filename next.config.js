/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================================================
  // CORE CONFIGURATION
  // ============================================================================
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  
  // ============================================================================
  // COMPILER OPTIMIZATIONS
  // ============================================================================
  compiler: {
    // Remove console in production (excepto error/warn)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    
    // Remove React DevTools en production
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? {
      properties: ['^data-test'],
    } : false,
  },
  
  // ============================================================================
  // COMPRESSION
  // ============================================================================
  compress: true,
  
  // ============================================================================
  // EXTERNAL PACKAGES - Prisma
  // ============================================================================
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  
  // ============================================================================
  // IMAGE OPTIMIZATION ✅
  // ============================================================================
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
    
    // AVIF primero (mejor compresión)
    formats: ['image/avif', 'image/webp'],
    
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Cache 1 año
    minimumCacheTTL: 60 * 60 * 24 * 365,
    
    // SVG handling
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Dev sin optimización (más rápido)
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // ============================================================================
  // HEADERS - SECURITY + PERFORMANCE ✅
  // ============================================================================
  async headers() {
    return [
      // Global Headers
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { 
            key: 'Strict-Transport-Security', 
            value: 'max-age=63072000; includeSubDomains; preload' 
          },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { 
            key: 'Permissions-Policy', 
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' 
          },
        ],
      },
      
      // Images cache
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      
      // Fonts cache
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      
      // Next.js static files
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      
      // Service Worker
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      
      // Manifest
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ]
  },
  
  // ============================================================================
  // REDIRECTS ✅
  // ============================================================================
  async redirects() {
    return [
      // Descomentá para redirect www → non-www
      // {
      //   source: '/:path*',
      //   has: [
      //     {
      //       type: 'host',
      //       value: 'www.azulcolchones.com',
      //     },
      //   ],
      //   destination: 'https://azulcolchones.com/:path*',
      //   permanent: true,
      // },
    ]
  },
  
  // ============================================================================
  // EXPERIMENTAL FEATURES - NEXT.JS 15 COMPATIBLE ✅
  // ============================================================================
  experimental: {
    // Optimize package imports
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-icons',
      'date-fns',
    ],
    
    // CSS optimization
    optimizeCss: true,
    
    // Server actions
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000'],
    },
  },
  
  // ============================================================================
  // WEBPACK OPTIMIZATION ✅
  // ============================================================================
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            
            // Vendor chunk
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            
            // React chunk
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 40,
              reuseExistingChunk: true,
            },
            
            // Framer Motion
            framer: {
              name: 'framer',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
            },
            
            // Lucide Icons
            icons: {
              name: 'icons',
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              priority: 35,
              reuseExistingChunk: true,
            },
            
            // Common chunk
            common: {
              name: 'common',
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      }
    }
    
    return config
  },
  
  // ============================================================================
  // OTHER SETTINGS ✅
  // ============================================================================
  
  // Trailing slash
  trailingSlash: false,
  
  // ETags
  generateEtags: true,
  
  // Page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

module.exports = nextConfig