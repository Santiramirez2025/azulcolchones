// prisma/fix-slugs-with-accents.ts
// ============================================================================
// 🔧 FIX: SLUGS CON TILDES Y CARACTERES ESPECIALES
// ============================================================================
// Elimina tildes y caracteres raros de todos los slugs
// ⚡ Ejecutar: npx tsx prisma/fix-slugs-with-accents.ts
// ============================================================================

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function limpiarSlug(slug: string): string {
  return slug
    .toLowerCase()
    // Normalizar y eliminar tildes
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Reemplazar ñ por n
    .replace(/ñ/g, 'n')
    // Eliminar cualquier carácter que no sea letra, número o guión
    .replace(/[^a-z0-9-]/g, '-')
    // Eliminar guiones múltiples
    .replace(/-+/g, '-')
    // Eliminar guiones al inicio y final
    .replace(/^-|-$/g, '')
    // Limitar a 100 caracteres
    .substring(0, 100)
}

async function fixSlugsConAcentos() {
  console.log('🔧 ============================================')
  console.log('🔧 FIX: SLUGS CON TILDES')
  console.log('🔧 ============================================\n')

  try {
    // Obtener todos los productos
    const productos = await prisma.product.findMany({
      select: { id: true, name: true, slug: true }
    })

    console.log(`📦 Total productos: ${productos.length}\n`)

    let corregidos = 0
    let yaCorrecto = 0
    const slugsMap = new Map<string, string[]>() // Para detectar duplicados

    for (const producto of productos) {
      const slugLimpio = limpiarSlug(producto.slug)

      // Verificar si tiene caracteres problemáticos
      const tieneProblemas = producto.slug !== slugLimpio

      if (tieneProblemas) {
        console.log(`⚠️  CORRIGIENDO: ${producto.name}`)
        console.log(`   Antes: ${producto.slug}`)
        console.log(`   Después: ${slugLimpio}`)

        // Verificar si el nuevo slug ya existe
        const existeDuplicado = await prisma.product.findFirst({
          where: { 
            slug: slugLimpio,
            NOT: { id: producto.id }
          }
        })

        let slugFinal = slugLimpio

        // Si existe duplicado, agregar ID corto
        if (existeDuplicado) {
          slugFinal = `${slugLimpio}-${producto.id.substring(0, 6)}`
          console.log(`   ⚠️  Slug duplicado, usando: ${slugFinal}`)
        }

        // Actualizar
        await prisma.product.update({
          where: { id: producto.id },
          data: { slug: slugFinal }
        })

        console.log(`   ✅ Corregido\n`)
        corregidos++
      } else {
        yaCorrecto++
      }

      // Guardar en mapa para detectar duplicados potenciales
      if (!slugsMap.has(slugLimpio)) {
        slugsMap.set(slugLimpio, [])
      }
      slugsMap.get(slugLimpio)!.push(producto.id)
    }

    // Verificar duplicados
    const duplicados = Array.from(slugsMap.entries())
      .filter(([_, ids]) => ids.length > 1)

    if (duplicados.length > 0) {
      console.log('\n⚠️  SLUGS DUPLICADOS ENCONTRADOS:')
      for (const [slug, ids] of duplicados) {
        console.log(`   - "${slug}": ${ids.length} productos`)
        
        // Corregir duplicados
        for (let i = 1; i < ids.length; i++) {
          const nuevoSlug = `${slug}-${ids[i].substring(0, 6)}`
          
          await prisma.product.update({
            where: { id: ids[i] },
            data: { slug: nuevoSlug }
          })
          
          console.log(`      ✅ Corregido ${ids[i]} → ${nuevoSlug}`)
        }
      }
    }

    console.log('\n\n✅ ============================================')
    console.log('✅ FIX COMPLETADO')
    console.log('✅ ============================================\n')
    console.log(`   ✅ Slugs corregidos: ${corregidos}`)
    console.log(`   ✅ Ya correctos: ${yaCorrecto}`)
    console.log(`   ⚠️  Duplicados resueltos: ${duplicados.length}`)

    // Mostrar ejemplos de slugs corregidos
    console.log('\n📋 EJEMPLOS DE SLUGS LIMPIOS:\n')
    
    const ejemplos = await prisma.product.findMany({
      select: { name: true, slug: true },
      take: 5
    })

    ejemplos.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.name}`)
      console.log(`      → ${p.slug}\n`)
    })

    console.log('💡 PRÓXIMOS PASOS:')
    console.log('   1. Reiniciar servidor: npm run dev')
    console.log('   2. Hard refresh: Cmd+Shift+R')
    console.log('   3. Probar URL: /producto/colchon-relax-espuma-1-plaza-villa-maria')
    console.log('\n')

  } catch (error) {
    console.error('\n❌ Error:', error)
    throw error
  }
}

fixSlugsConAcentos()
  .catch(console.error)
  .finally(() => prisma.$disconnect())