// app/sitemap.ts - FINAL OPTIMIZED ✅ - Azul Colchones Villa María
import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

// ============================================================================
// CONFIGURATION
// ============================================================================
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

// ✅ ISR: Regenerate every 1 hour (3600 seconds)
export const revalidate = 3600

// ✅ Dynamic rendering
export const dynamic = 'force-dynamic'

// ============================================================================
// SITEMAP GENERATOR - OPTIMIZED FOR YOUR SCHEMA ✅
// ============================================================================
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const now = new Date()
    
    // ========================================
    // PARALLEL DATA FETCHING
    // ========================================
    const [products, categories] = await Promise.all([
      // ✅ Products with stock (via variants)
      prisma.product.findMany({
        where: { 
          isActive: true,
          variants: {
            some: {
              isActive: true,
              stock: { gt: 0 }
            }
          }
        },
        select: { 
          slug: true, 
          updatedAt: true,
          isBestSeller: true,
          isFeatured: true,
          isNew: true,
          category: true,
        },
        orderBy: [
          { isBestSeller: 'desc' },
          { isFeatured: 'desc' },
          { updatedAt: 'desc' }
        ],
        take: 1000,
      }).catch(() => []),
      
      // ✅ Categories - Simple query (category is NOT NULL in schema)
      prisma.product.findMany({
        where: { 
          isActive: true,
        },
        select: { 
          category: true,
          updatedAt: true 
        },
        distinct: ['category'],
        orderBy: { category: 'asc' }
      }).catch(() => []),
    ])

    // ✅ Filter empty categories (just in case)
    const validCategories = categories.filter(cat => 
      cat.category && cat.category.trim() !== ''
    )

    console.log(`✅ [SITEMAP] Generated with ${products.length} products, ${validCategories.length} categories`)

    // ========================================
    // BUILD SITEMAP ENTRIES
    // ========================================
    const entries: MetadataRoute.Sitemap = [
      // ================================================================
      // 1. HOME PAGE - Máxima prioridad
      // ================================================================
      {
        url: BASE_URL,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 1.0,
      },

      // ================================================================
      // 2. CATALOG PAGE - Alta prioridad
      // ================================================================
      {
        url: `${BASE_URL}/catalogo`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.9,
      },

      // ================================================================
      // 3. CATEGORIES - Dinámicas desde DB
      // ================================================================
      ...validCategories.map(cat => ({
        url: `${BASE_URL}/catalogo?category=${encodeURIComponent(cat.category)}`,
        lastModified: cat.updatedAt || now,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
      })),

      // ================================================================
      // 4. PRODUCTS - Prioridad diferenciada
      // ================================================================
      ...products.map(prod => {
        // ✅ Dynamic priority based on product status
        let priority = 0.8 // Base priority
        
        if (prod.isBestSeller) priority = 0.95
        else if (prod.isFeatured) priority = 0.90
        else if (prod.isNew) priority = 0.85
        
        return {
          url: `${BASE_URL}/producto/${prod.slug}`,
          lastModified: prod.updatedAt,
          changeFrequency: 'weekly' as const,
          priority,
        }
      }),

      // ================================================================
      // 5. LOCAL SEO PAGES - Villa María
      // ================================================================
      {
        url: `${BASE_URL}/villa-maria`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      },

      // ================================================================
      // 6. INSTITUTIONAL PAGES
      // ================================================================
      {
        url: `${BASE_URL}/nosotros`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      },

      // ================================================================
      // 7. CUSTOMER SERVICE - Alta utilidad para SEO
      // ================================================================
      {
        url: `${BASE_URL}/contacto`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/preguntas-frecuentes`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75, // ✅ Alta (featured snippets)
      },
      {
        url: `${BASE_URL}/envios`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/devoluciones`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65,
      },
      {
        url: `${BASE_URL}/garantia`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65,
      },
      {
        url: `${BASE_URL}/financiacion`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75, // ✅ Alta (importante para conversión)
      },

      // ================================================================
      // 8. GUIDES & RESOURCES (si tenés estas páginas)
      // ================================================================
      {
        url: `${BASE_URL}/guia-compra`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/como-elegir-colchon`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/medidas-colchones`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      },

      // ================================================================
      // 9. LEGAL PAGES - Baja prioridad pero necesarias
      // ================================================================
      {
        url: `${BASE_URL}/defensa-consumidor`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.4,
      },
      {
        url: `${BASE_URL}/boton-arrepentimiento`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.4,
      },
      {
        url: `${BASE_URL}/privacidad`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${BASE_URL}/terminos`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${BASE_URL}/condiciones-compra`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${BASE_URL}/cookies`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${BASE_URL}/aviso-legal`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
    ]

    // ✅ Remove duplicates (previene errores)
    const uniqueEntries = entries.filter((entry, index, self) => 
      index === self.findIndex(e => e.url === entry.url)
    )

    // ✅ Sort by priority (highest first)
    return uniqueEntries.sort((a, b) => (b.priority || 0) - (a.priority || 0))

  } catch (error) {
    console.error('❌ [SITEMAP] Error generating sitemap:', error)
    
    // ========================================
    // FALLBACK SITEMAP - Graceful degradation
    // ========================================
    const now = new Date()
    
    return [
      {
        url: BASE_URL,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/catalogo`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/villa-maria`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/contacto`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/preguntas-frecuentes`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75,
      },
      {
        url: `${BASE_URL}/financiacion`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75,
      },
      {
        url: `${BASE_URL}/nosotros`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      },
    ]
  }
}