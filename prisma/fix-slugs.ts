// prisma/fix-slugs.ts
// ============================================================================
// 🔧 FIX: SLUGS DUPLICADOS Y MAL FORMADOS
// ============================================================================
// Limpia y regenera todos los slugs correctamente
// ⚡ Ejecutar: npx tsx prisma/fix-slugs.ts
// ============================================================================

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ============================================================================
// HELPER: GENERAR SLUG LIMPIO
// ============================================================================

function generateCleanSlug(name: string, category: string): string {
  // 1. Tomar solo el nombre del producto (sin duplicados)
  let slug = name
    .toLowerCase()
    .trim()
    
  // 2. Normalizar caracteres especiales
  slug = slug
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/ñ/g, 'n')
    
  // 3. Limpiar caracteres no permitidos
  slug = slug
    .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
    .replace(/\s+/g, '-')          // Espacios a guiones
    .replace(/-+/g, '-')           // Múltiples guiones a uno solo
    .replace(/^-|-$/g, '')         // Remover guiones al inicio/final
    
  // 4. Limitar longitud (máximo 80 caracteres)
  slug = slug.substring(0, 80)
  
  // 5. Remover guión final si quedó
  slug = slug.replace(/-$/, '')
  
  return slug
}

// ============================================================================
// MAIN: LIMPIAR TODOS LOS SLUGS
// ============================================================================

async function fixAllSlugs() {
  console.log('\n🔧 ============================================')
  console.log('🔧 LIMPIANDO SLUGS DE PRODUCTOS')
  console.log('🔧 ============================================\n')

  try {
    // Obtener todos los productos
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        category: true
      }
    })

    console.log(`📦 Productos encontrados: ${products.length}\n`)

    let fixed = 0
    let skipped = 0
    const usedSlugs = new Set<string>()

    for (const product of products) {
      const oldSlug = product.slug
      
      // Generar slug limpio
      let newSlug = generateCleanSlug(product.name, product.category)
      
      // Verificar si el slug ya existe
      let finalSlug = newSlug
      let counter = 1
      
      while (usedSlugs.has(finalSlug)) {
        finalSlug = `${newSlug}-${counter}`
        counter++
      }
      
      usedSlugs.add(finalSlug)
      
      // Solo actualizar si cambió
      if (oldSlug !== finalSlug) {
        await prisma.product.update({
          where: { id: product.id },
          data: { slug: finalSlug }
        })
        
        console.log(`✅ ${product.name}`)
        console.log(`   Antes: ${oldSlug}`)
        console.log(`   Ahora: ${finalSlug}`)
        console.log(`   Longitud: ${oldSlug.length} → ${finalSlug.length}\n`)
        
        fixed++
      } else {
        skipped++
      }
    }

    console.log('\n🎉 ============================================')
    console.log('🎉 SLUGS LIMPIADOS')
    console.log('🎉 ============================================\n')
    console.log(`✅ Slugs corregidos: ${fixed}`)
    console.log(`⏭️  Slugs sin cambios: ${skipped}`)
    console.log(`📦 Total productos: ${products.length}\n`)
    
    // Verificar duplicados
    console.log('🔍 Verificando duplicados...')
    const allProducts = await prisma.product.findMany({
      select: { slug: true }
    })
    
    const slugCounts = new Map<string, number>()
    allProducts.forEach(p => {
      slugCounts.set(p.slug, (slugCounts.get(p.slug) || 0) + 1)
    })
    
    const duplicates = Array.from(slugCounts.entries())
      .filter(([_, count]) => count > 1)
    
    if (duplicates.length > 0) {
      console.log(`⚠️  Encontrados ${duplicates.length} slugs duplicados:`)
      duplicates.forEach(([slug, count]) => {
        console.log(`   - "${slug}" (${count} veces)`)
      })
    } else {
      console.log('✅ No hay slugs duplicados\n')
    }
    
    console.log('💡 Próximos pasos:')
    console.log('   1. Reiniciar servidor: npm run dev')
    console.log('   2. Borrar cache: rm -rf .next')
    console.log('   3. Probar catálogo: http://localhost:3000/catalogo\n')

  } catch (error) {
    console.error('\n❌ Error:', error)
    throw error
  }
}

// ============================================================================
// EJECUTAR
// ============================================================================

fixAllSlugs()
  .catch((error) => {
    console.error('💥 Error fatal:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })