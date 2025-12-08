/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================================================
  // TURBOPACK CONFIG - ✅ NECESARIO PARA NEXT.JS 16
  // ============================================================================
  turbopack: {
    // Configuración básica para silenciar warnings
    // Las optimizaciones de webpack se manejan automáticamente
  },

  // Optimizaciones de producción
  reactStrictMode: true,
  poweredByHeader: false,

  // ✅ Output standalone para mejor performance en Vercel
  output: 'standalone',

  // ============================================================================
  // CONFIGURACIÓN DE IMÁGENES
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
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 días
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ============================================================================
  // HEADERS DE SEGURIDAD
  // ============================================================================
  async headers() {
    return [
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
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { 
            key: 'Permissions-Policy', 
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' 
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // ============================================================================
  // COMPILER OPTIONS
  // ============================================================================
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Configuración de compresión
  compress: true,

  // ============================================================================
  // EXPERIMENTAL FEATURES
  // ============================================================================
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // ✅ NUEVO: Prisma como paquete externo
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },

  // ============================================================================
  // REDIRECTS
  // ============================================================================
  async redirects() {
    return [
      // Agregar redirects si es necesario
    ]
  },

  // ============================================================================
  // WEBPACK CONFIG - ⚠️ COMENTADO PARA TURBOPACK
  // ============================================================================
  // Si necesitas webpack, usa: npm run build -- --webpack
  // O fuerza webpack en package.json: "build": "next build --webpack"
  
  // webpack: (config, { dev, isServer }) => {
  //   if (!dev && !isServer) {
  //     config.optimization = {
  //       ...config.optimization,
  //       moduleIds: 'deterministic',
  //       splitChunks: {
  //         chunks: 'all',
  //         cacheGroups: {
  //           default: false,
  //           vendors: false,
  //           vendor: {
  //             name: 'vendor',
  //             chunks: 'all',
  //             test: /node_modules/,
  //             priority: 20,
  //           },
  //           framer: {
  //             name: 'framer',
  //             test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
  //             priority: 30,
  //           },
  //           common: {
  //             name: 'common',
  //             minChunks: 2,
  //             priority: 10,
  //             reuseExistingChunk: true,
  //             enforce: true,
  //           },
  //         },
  //       },
  //     }
  //   }
  //   return config
  // },
}

module.exports = nextConfig