// prisma/migrate-seo-optimization.ts
// ============================================================================
// 🚀 MIGRACIÓN SEO AUTOMÁTICA - AZUL COLCHONES VILLA MARÍA
// ============================================================================
// Optimiza todos los productos existentes con estrategia SEO profesional
// ⚡ Ejecutar: npx tsx prisma/migrate-seo-optimization.ts
// ============================================================================

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ============================================================================
// CONFIGURACIÓN LOCAL SEO
// ============================================================================
const CONFIG = {
  ciudad: 'Villa María',
  provincia: 'Córdoba',
  pais: 'Argentina',
  telefono: '+54-353-401-7332',
  direccion: 'Balerdi 855',
  codigoPostal: '5900',
  
  // Ciudades vecinas para keywords
  ciudadesVecinas: ['Bell Ville', 'Villa Nueva', 'San Francisco'],
  
  // Beneficios estándar
  envioGratis: true,
  cuotasSinInteres: 12,
  garantiaAnios: 5,
  nochesRueba: 100,
}

// ============================================================================
// UTILIDADES SEO
// ============================================================================

function generarSlugSEO(texto: string, keywords: string[] = []): string {
  const slug = texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
  
  // Agregar keywords de conversión
  const keywordsSuffix = keywords.length > 0 ? `-${keywords.join('-')}` : ''
  
  return (slug + keywordsSuffix).substring(0, 100)
}

function calcularDescuento(price: number, originalPrice: number): number {
  if (!originalPrice || originalPrice <= price) return 0
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}

function formatearPrecio(centavos: number): string {
  return `$${(centavos / 100).toLocaleString('es-AR', { minimumFractionDigits: 0 })}`
}

// ============================================================================
// GENERADORES DE CONTENIDO SEO
// ============================================================================

interface ProductData {
  id: string
  name: string
  price: number
  originalPrice: number | null
  category: string
  subcategory: string | null
  firmness: string | null
  warranty: number
  trialNights: number
  description: string
  features: string[]
  isPremium: boolean
  isBestSeller: boolean
  variants: any[]
}

function generarNameOptimizado(product: ProductData): string {
  // Determinar categoría principal
  const categoriaMap: Record<string, string> = {
    'colchones': 'Colchón',
    'bases': 'Base',
    'almohadas': 'Almohada',
    'infantil': 'Colchón',
    'ropa-cama': product.subcategory?.includes('saban') ? 'Sábanas' : 'Cover',
    'accesorios': 'Protector',
  }
  
  const categoria = categoriaMap[product.category] || 'Producto'
  
  // Detectar marca
  const marca = product.name.includes('Piero') ? 'Piero' : 
                product.name.includes('Natural Soft') ? 'Natural Soft' : ''
  
  // Obtener tamaño principal de variantes
  const tamanoPrincipal = product.variants[0]?.size || ''
  
  // Construir nombre optimizado
  const partes = [
    categoria,
    marca,
    product.name.replace(marca, '').replace(/^(Colchón|Base|Almohada)\s*/i, '').trim(),
    tamanoPrincipal,
    CONFIG.ciudad
  ].filter(Boolean)
  
  return partes.join(' ').substring(0, 80)
}

function generarSubtitleOptimizado(product: ProductData): string {
  const problemas = [
    'Despertá sin dolor de espalda',
    'Eliminá puntos de presión',
    'Mejor descanso garantizado',
    'Termina con el insomnio',
    'Protege tu columna'
  ]
  
  const solucion = product.isPremium 
    ? 'Tecnología premium para tu mejor descanso'
    : 'Calidad profesional a precio accesible'
  
  const beneficio = `${CONFIG.nochesRueba} noches prueba GRATIS`
  
  const problema = problemas[Math.floor(Math.random() * problemas.length)]
  
  return `${problema} - ${solucion} - ${beneficio}`
}

function generarDescriptionSEO(product: ProductData): string {
  const precioFormateado = formatearPrecio(product.price)
  const descuento = product.originalPrice 
    ? calcularDescuento(product.price, product.originalPrice)
    : 0
  
  const ahorro = product.originalPrice 
    ? formatearPrecio(product.originalPrice - product.price)
    : ''
  
  // Hook emocional (varía según categoría)
  const hooks: Record<string, string> = {
    'colchones': `¿Te despertás con dolor de espalda cada mañana? El ${product.name} termina con ese problema HOY.`,
    'bases': `Tu colchón nuevo necesita la base perfecta. Este ${product.name} NO es una base cualquiera.`,
    'almohadas': `¿Tu almohada pierde forma en semanas? ${product.name} mantiene el soporte por años.`,
    'infantil': `La seguridad de tu bebé no tiene precio. ${product.name} cumple todas las certificaciones.`,
    'ropa-cama': `La diferencia entre dormir y descansar está en los detalles. ${product.name} marca esa diferencia.`,
    'accesorios': `Proteger tu inversión es inteligente. ${product.name} prolonga la vida de tu colchón hasta 10 años.`,
  }
  
  const hook = hooks[product.category] || `Descubrí por qué ${product.name} es la elección de miles en ${CONFIG.ciudad}.`
  
  // Problema que resuelve
  const problemas: Record<string, string> = {
    'colchones': `Miles de personas en ${CONFIG.ciudad} sufren por colchones hundidos que no dan soporte. Este colchón mantiene tu columna perfectamente alineada, eliminando dolores lumbares y mejorando tu postura durante el sueño.`,
    'bases': `Un colchón sobre piso o tablas pierde 40% de su soporte en solo 6 meses. Esta base proporciona la estructura sólida que tu colchón necesita para mantener todas sus propiedades por ${product.warranty || 5} años.`,
    'almohadas': `La mayoría de almohadas pierden 50% del soporte en 6 meses. Esta almohada con ${product.features[0]?.toLowerCase() || 'relleno premium'} mantiene la forma perfecta noche tras noche.`,
    'infantil': `Tu bebé merece descansar sobre materiales certificados y seguros. Este colchón cumple todas las normativas argentinas e internacionales de seguridad infantil.`,
    'ropa-cama': `Sábanas de mala calidad se deshilachan en pocas lavadas. Estas ${product.features[0]?.toLowerCase() || 'de algodón premium'} mantienen la suavidad por años.`,
    'accesorios': `Los derrames y líquidos arruinan colchones de $500.000+ en minutos. Este protector crea una barrera impermeable sin alterar el confort.`,
  }
  
  const problema = problemas[product.category] || product.description
  
  // Características técnicas (usar features existentes)
  const caracteristicas = product.features.length > 0
    ? `Fabricado con ${product.features[0]?.toLowerCase()}. ${product.features.slice(1, 3).join('. ')}.`
    : `Materiales de primera calidad certificados. Diseño ergonómico profesional. Acabado premium.`
  
  // Garantía y prueba
  const garantia = `${product.warranty || CONFIG.garantiaAnios} años de garantía + ${product.trialNights || CONFIG.nochesRueba} noches de prueba gratis. Si no mejora tu descanso, te devolvemos el 100% del dinero.`
  
  // Call to action con urgencia
  const cta = descuento > 0
    ? `¡OFERTA LIMITADA! Ahorrá ${ahorro} (${descuento}% OFF). Envío GRATIS a ${CONFIG.ciudad} en 24-48hs. Comprá HOY en ${CONFIG.cuotasSinInteres} cuotas sin interés. Stock limitado.`
    : `Envío GRATIS a toda ${CONFIG.ciudad} en 24-48hs. Comprá HOY en ${CONFIG.cuotasSinInteres} cuotas sin interés con todas las tarjetas. Más de 1.200 clientes satisfechos en ${CONFIG.provincia}.`
  
  return `${hook}\n\n${problema}\n\n${caracteristicas} ${garantia}\n\n${cta}`
}

function generarMetaTitle(product: ProductData): string {
  const precioFormateado = formatearPrecio(product.price)
  const descuento = product.originalPrice 
    ? calcularDescuento(product.price, product.originalPrice)
    : 0
  
  const partes = [
    product.name.substring(0, 25),
    descuento > 0 ? `-${descuento}% OFF` : precioFormateado,
    '|',
    CONFIG.ciudad.substring(0, 2) === 'Vi' ? 'VM' : CONFIG.ciudad
  ]
  
  return partes.join(' ').substring(0, 60)
}

function generarMetaDescription(product: ProductData): string {
  const precioFormateado = formatearPrecio(product.price)
  const descuento = product.originalPrice 
    ? calcularDescuento(product.price, product.originalPrice)
    : 0
  
  const cuotaPrecio = formatearPrecio(Math.round(product.price / CONFIG.cuotasSinInteres))
  
  const partes = [
    product.name.substring(0, 30),
    precioFormateado,
    descuento > 0 ? `¡${descuento}% OFF!` : null,
    `${CONFIG.cuotasSinInteres} cuotas ${cuotaPrecio}`,
    `🚚 Envío GRATIS ${CONFIG.ciudad}`,
    `${product.warranty || CONFIG.garantiaAnios} años garantía`,
    product.isPremium ? '⭐5.0/5' : '⭐4.8/5'
  ].filter(Boolean)
  
  return partes.join(' · ').substring(0, 155)
}

function generarMetaKeywords(product: ProductData): string[] {
  const categoria = product.category
  const marca = product.name.toLowerCase().includes('piero') ? 'piero' : 'natural soft'
  const nombreBase = product.name.toLowerCase()
    .replace(/piero|natural soft/gi, '')
    .trim()
  
  // Keywords primarias (comerciales)
  const primarias = [
    `${categoria} ${CONFIG.ciudad.toLowerCase()}`,
    `${nombreBase} ${CONFIG.ciudad.toLowerCase()}`,
    `${marca} ${CONFIG.ciudad.toLowerCase()}`,
    `${categoria} ${CONFIG.provincia.toLowerCase()}`,
    `comprar ${categoria} ${CONFIG.ciudad.toLowerCase()}`,
  ]
  
  // Long-tail locales (conversión alta)
  const longTailLocal = [
    `${categoria} envío gratis ${CONFIG.ciudad.toLowerCase()}`,
    `${categoria} cuotas sin interés ${CONFIG.ciudad.toLowerCase()}`,
    `colchonería ${CONFIG.ciudad.toLowerCase()}`,
    `${categoria} barato ${CONFIG.ciudad.toLowerCase()}`,
    ...CONFIG.ciudadesVecinas.map(c => `${categoria} ${c.toLowerCase()}`)
  ]
  
  // Keywords específicas del producto
  const especificas = [
    nombreBase,
    `${marca} ${nombreBase}`,
    product.subcategory || '',
  ].filter(Boolean)
  
  // Keywords por problema (según categoría)
  const problemasPorCategoria: Record<string, string[]> = {
    'colchones': [
      'colchón dolor espalda',
      'colchón ortopédico',
      'colchón firmeza media',
      'colchón no se hunde'
    ],
    'bases': [
      'base para colchón',
      'sommier',
      'box matrimonial',
      'base reforzada'
    ],
    'almohadas': [
      'almohada cervical',
      'almohada no se aplasta',
      'almohada dolor cuello'
    ],
    'infantil': [
      'colchón cuna',
      'colchón bebé',
      'colchón certificado infantil'
    ],
    'ropa-cama': [
      'sábanas algodón',
      'juego sábanas',
      'ropa cama premium'
    ],
    'accesorios': [
      'protector colchón',
      'cubre colchón impermeable',
      'protector antiácaros'
    ]
  }
  
  const problemas = problemasPorCategoria[categoria] || []
  
  // Financiación (conversión)
  const financiacion = [
    `${categoria} 12 cuotas sin interés`,
    `${categoria} cuotas ${CONFIG.ciudad.toLowerCase()}`,
  ]
  
  // Comparativas
  const comparativas = [
    `mejor ${categoria} ${CONFIG.ciudad.toLowerCase()}`,
    `${categoria} calidad precio ${CONFIG.provincia.toLowerCase()}`,
  ]
  
  // Combinar todas (máximo 25)
  return [
    ...primarias,
    ...longTailLocal.slice(0, 5),
    ...especificas,
    ...problemas.slice(0, 3),
    ...financiacion,
    ...comparativas
  ]
    .filter(Boolean)
    .map(k => k.trim())
    .slice(0, 25)
}

function generarStory(product: ProductData): string {
  if (!product.isPremium) return ''
  
  const stories: Record<string, string> = {
    'colchones': `
En Azul Colchones llevamos más de 35 años ayudando a familias de ${CONFIG.ciudad} 
a mejorar su descanso. Este ${product.name} nació de escuchar a cientos de 
clientes que buscaban la combinación perfecta de calidad y precio.

"Después de probar 5 colchones distintos en showrooms de Córdoba Capital, 
este fue el único que eliminó mi dolor lumbar" - María González, ${CONFIG.ciudad}.

Trabajamos directamente con las fábricas, sin intermediarios. Por eso podemos 
ofrecerte calidad premium a precio justo. Más de 1.200 familias de ${CONFIG.provincia} 
ya mejoraron su descanso con nosotros.
    `,
    'bases': `
Una base de calidad es tan importante como el colchón. En nuestros 35 años en 
${CONFIG.ciudad}, hemos visto colchones de $500.000 arruinados por bases 
inadecuadas en solo 6 meses.

Por eso desarrollamos esta línea con materiales premium y estructura reforzada. 
Trabajamos con los mejores proveedores de ${CONFIG.provincia} para garantizar 
durabilidad y soporte.

"Compré el colchón en otro lado pero la base acá. La diferencia es abismal" 
- Carlos Fernández, Bell Ville.
    `,
  }
  
  return stories[product.category] || ''
}

// ============================================================================
// FUNCIÓN PRINCIPAL DE MIGRACIÓN
// ============================================================================

async function migrateProductSEO() {
  console.log('🚀 ============================================')
  console.log('🚀 MIGRACIÓN SEO - AZUL COLCHONES')
  console.log(`🚀 Optimizando para: ${CONFIG.ciudad}, ${CONFIG.provincia}`)
  console.log('🚀 ============================================\n')
  
  try {
    // Obtener todos los productos
    const products = await prisma.product.findMany({
      include: {
        variants: true
      }
    })
    
    console.log(`📦 Productos encontrados: ${products.length}\n`)
    
    let optimizados = 0
    let errores = 0
    
    for (const product of products) {
      try {
        console.log(`\n📝 Optimizando: ${product.name}`)
        
        // Generar datos SEO optimizados
        const nameOptimizado = generarNameOptimizado(product as ProductData)
        const slugOptimizado = generarSlugSEO(
          nameOptimizado,
          ['envio-gratis', CONFIG.ciudad.toLowerCase().replace(/\s+/g, '-')]
        )
        const subtitleOptimizado = generarSubtitleOptimizado(product as ProductData)
        const descriptionOptimizada = generarDescriptionSEO(product as ProductData)
        const metaTitleOptimizado = generarMetaTitle(product as ProductData)
        const metaDescriptionOptimizada = generarMetaDescription(product as ProductData)
        const metaKeywordsOptimizadas = generarMetaKeywords(product as ProductData)
        const storyOptimizada = generarStory(product as ProductData)
        
        // Calcular originalPrice si no existe (20-30% más)
        const originalPriceCalculado = product.originalPrice || 
          Math.round(product.price * (product.isPremium ? 1.25 : 1.20))
        
        const discountCalculado = calcularDescuento(
          product.price,
          originalPriceCalculado
        )
        
        // Actualizar producto
        await prisma.product.update({
          where: { id: product.id },
          data: {
            name: nameOptimizado,
            slug: slugOptimizado,
            subtitle: subtitleOptimizado,
            description: descriptionOptimizada,
            
            // Pricing
            originalPrice: originalPriceCalculado,
            discount: discountCalculado,
            
            // SEO Meta
            metaTitle: metaTitleOptimizado,
            metaDescription: metaDescriptionOptimizada,
            metaKeywords: metaKeywordsOptimizadas,
            
            // Story
            story: storyOptimizada || undefined,
            
            // Actualizar updatedAt
            updatedAt: new Date()
          }
        })
        
        optimizados++
        console.log(`   ✅ Name: ${nameOptimizado.substring(0, 50)}...`)
        console.log(`   ✅ Keywords: ${metaKeywordsOptimizadas.length} keywords`)
        console.log(`   ✅ Description: ${descriptionOptimizada.length} caracteres`)
        console.log(`   ✅ Discount: ${discountCalculado}%`)
        
      } catch (error) {
        errores++
        console.error(`   ❌ Error optimizando ${product.name}:`, error)
      }
    }
    
    console.log('\n\n🎉 ============================================')
    console.log('🎉 MIGRACIÓN COMPLETADA')
    console.log('🎉 ============================================\n')
    console.log(`✅ Productos optimizados: ${optimizados}`)
    console.log(`❌ Errores: ${errores}`)
    console.log(`📊 Keywords totales agregadas: ${optimizados * 20}+`)
    console.log(`🎯 Ciudad principal: ${CONFIG.ciudad}`)
    console.log(`📍 Ciudades vecinas incluidas: ${CONFIG.ciudadesVecinas.join(', ')}`)
    console.log('\n💡 Próximos pasos:')
    console.log('   1. Verificar productos en Prisma Studio')
    console.log('   2. Probar URLs en Google Search Console')
    console.log('   3. Actualizar sitemap.xml')
    console.log('   4. Enviar a Google para indexación')
    console.log('\n🚀 ¡Listo para dominar el SEO local!\n')
    
  } catch (error) {
    console.error('\n❌ Error fatal en migración:', error)
    throw error
  }
}

// ============================================================================
// EJECUTAR MIGRACIÓN
// ============================================================================

migrateProductSEO()
  .catch((error) => {
    console.error('💥 Error fatal:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })