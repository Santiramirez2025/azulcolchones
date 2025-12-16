// prisma/fix-catalog-simple.ts
// ============================================================================
// 🔧 FIX SIMPLE: VERIFICAR POR QUÉ CATÁLOGO ESTÁ VACÍO
// ============================================================================
// Diagnóstico rápido sin bugs
// ⚡ Ejecutar: npx tsx prisma/fix-catalog-simple.ts
// ============================================================================

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function diagnosticoRapido() {
  console.log('\n🔍 DIAGNÓSTICO RÁPIDO DEL CATÁLOGO\n')
  
  try {
    // 1. Productos totales
    const total = await prisma.product.count()
    console.log(`✅ Total productos: ${total}`)
    
    // 2. Productos activos
    const activos = await prisma.product.count({
      where: { isActive: true }
    })
    console.log(`✅ Activos: ${activos}`)
    
    // 3. Con stock
    const conStock = await prisma.product.count({
      where: { 
        isActive: true,
        inStock: true,
        stock: { gt: 0 }
      }
    })
    console.log(`✅ Con stock: ${conStock}`)
    
    // 4. Test query real del catálogo
    console.log('\n📦 Test query real del catálogo:\n')
    
    const productos = await prisma.product.findMany({
      where: {
        isActive: true,
        stock: { gt: 0 }
      },
      include: {
        variants: {
          where: {
            isActive: true,
            stock: { gt: 0 }
          },
          take: 1
        }
      },
      take: 5
    })
    
    console.log(`✅ Query devolvió: ${productos.length} productos\n`)
    
    if (productos.length > 0) {
      console.log('📋 Primeros 3 productos:')
      productos.slice(0, 3).forEach((p, i) => {
        console.log(`\n   ${i + 1}. ${p.name}`)
        console.log(`      Slug: ${p.slug}`)
        console.log(`      Precio: $${p.price / 100}`)
        console.log(`      Stock: ${p.stock}`)
        console.log(`      Variantes: ${p.variants.length}`)
      })
    }
    
    // 5. Verificar slugs
    console.log('\n\n🔗 Verificando slugs...')
    const slugsVacios = await prisma.product.count({
      where: {
        slug: ''
      }
    })
    console.log(`   Slugs vacíos: ${slugsVacios}`)
    
    // 6. Variantes
    console.log('\n📦 Variantes:')
    const totalVariantes = await prisma.productVariant.count()
    const variantesActivas = await prisma.productVariant.count({
      where: { isActive: true }
    })
    console.log(`   Total: ${totalVariantes}`)
    console.log(`   Activas: ${variantesActivas}`)
    
    // ═══════════════════════════════════════════════════════════════════
    // CONCLUSIÓN
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📊 RESUMEN')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    if (productos.length > 0) {
      console.log('✅ LA BASE DE DATOS ESTÁ CORRECTA')
      console.log('\n💡 Si el catálogo sigue vacío, el problema está en:')
      console.log('\n   1️⃣ FRONTEND - Verificar:')
      console.log('      • /app/productos/page.tsx')
      console.log('      • /lib/api/products.ts')
      console.log('      • /app/api/products/route.ts')
      console.log('\n   2️⃣ CACHE:')
      console.log('      • Hard refresh: Ctrl+Shift+R (Mac: Cmd+Shift+R)')
      console.log('      • Reiniciar servidor: npm run dev')
      console.log('      • Borrar .next folder: rm -rf .next')
      console.log('\n   3️⃣ VARIABLES DE ENTORNO:')
      console.log('      • Verificar DATABASE_URL en .env')
      console.log('      • Verificar que apunta a la DB correcta')
      
      console.log('\n\n🔍 SIGUIENTE PASO:')
      console.log('   Mostrame el código de:')
      console.log('   • /app/productos/page.tsx')
      console.log('   • /lib/api/products.ts')
      console.log('   Para identificar el problema exacto\n')
      
    } else {
      console.log('⚠️  PROBLEMA ENCONTRADO: Query devuelve 0 productos')
      console.log('\n🔧 Ejecutando fix automático...\n')
      
      // Fix: Activar todos
      await prisma.product.updateMany({
        data: { 
          isActive: true,
          inStock: true
        }
      })
      
      await prisma.productVariant.updateMany({
        where: { stock: { gt: 0 } },
        data: { 
          isActive: true,
          inStock: true
        }
      })
      
      console.log('✅ Fix aplicado - Reinicia el servidor y prueba de nuevo')
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error)
  }
}

diagnosticoRapido()
  .catch(console.error)
  .finally(() => prisma.$disconnect())