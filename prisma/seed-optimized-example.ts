// prisma/seed-optimized-example.ts
// ============================================================================
// 🎯 EJEMPLO SEED OPTIMIZADO SEO - PIERO MEDITARE
// ============================================================================
// Este es un ejemplo de cómo debería verse cada producto optimizado
// Copiar esta estructura para todos los productos nuevos
// ============================================================================

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedOptimizedExample() {
  console.log('🚀 Creando producto ejemplo optimizado SEO...')

  const meditareOptimizado = await prisma.product.create({
    data: {
      // ════════════════════════════════════════════════════════════════════
      // ✅ NAME - OPTIMIZADO CON KEYWORDS + LOCAL
      // ════════════════════════════════════════════════════════════════════
      name: 'Colchón Piero Meditare Resortes Pocket Matrimonial Villa María',
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ SLUG - CON KEYWORDS DE CONVERSIÓN
      // ════════════════════════════════════════════════════════════════════
      slug: 'colchon-piero-meditare-resortes-pocket-matrimonial-envio-gratis-villa-maria',
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ SUBTITLE - PROBLEMA + SOLUCIÓN + BENEFICIO
      // ════════════════════════════════════════════════════════════════════
      subtitle: 'Eliminá puntos de presión - Resortes individuales que se adaptan - 100 noches prueba GRATIS',
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ DESCRIPTION - ESTRUCTURA SEO COMPLETA (250+ PALABRAS)
      // ════════════════════════════════════════════════════════════════════
      description: `
¿Te despertás con dolor de espalda y tu pareja se queja de los movimientos? El Colchón Piero Meditare con tecnología Pocket termina con ese problema HOY en Villa María, Córdoba.

PROBLEMA QUE RESUELVE:
Miles de parejas en Villa María sufren por colchones con resortes tradicionales que transmiten cada movimiento. Este colchón con 600 resortes individuales pocket se mueve independientemente - cuando tu pareja se da vuelta, vos ni lo sentís. Además, cada resorte se adapta a tu cuerpo específicamente, eliminando puntos de presión y manteniendo tu columna perfectamente alineada.

TECNOLOGÍA PROFESIONAL:
Fabricado con sistema Pocket Pro de última generación: 600 resortes individuales en Queen (no son los 300-400 de marcas económicas). Capa de espuma viscoelástica de 3cm que abraza tu cuerpo. Altura total de 24cm para soporte profesional. Certificaciones IRAM, Oeko-Tex e ISO 9001 que garantizan calidad europea.

GARANTÍA IMBATIBLE:
10 años de garantía real (no letra chica) + 100 noches de prueba sin compromiso. Si no eliminás tu dolor de espalda y mejorás tu descanso, te devolvemos el 100% del dinero. Más de 1.200 parejas en Córdoba ya duermen mejor con Piero Meditare.

OFERTA LIMITADA:
Envío GRATIS a toda Villa María, Bell Ville y Villa Nueva en 24-48hs. Instalación profesional incluida - te lo llevamos hasta tu habitación. Comprá HOY en 12 cuotas SIN INTERÉS con todas las tarjetas. Stock limitado - solo 15 unidades disponibles.

MÁS VENDIDO en Villa María por 3 años consecutivos. ⭐4.8/5 estrellas con 142 opiniones verificadas.
      `.trim(),
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ PRICING - SIEMPRE CON ORIGINAL PRICE Y DISCOUNT
      // ════════════════════════════════════════════════════════════════════
      price: 21000000,        // $210.000
      originalPrice: 28000000, // $280.000 (25% descuento)
      compareAtPrice: 30000000, // $300.000 (precio competencia)
      discount: 25,
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ INVENTORY
      // ════════════════════════════════════════════════════════════════════
      stock: 15,
      inStock: true,
      lowStockAlert: 5,
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ CATEGORIZACIÓN - MUY ESPECÍFICA
      // ════════════════════════════════════════════════════════════════════
      category: 'colchones',
      subcategory: 'resortes-pocket',
      tags: [
        // Técnicas
        'piero',
        'pocket',
        'resortes-individuales',
        'matrimonial',
        
        // Beneficios
        'parejas',
        'dolor-espalda',
        'independencia-lechos',
        
        // Local
        'villa-maria',
        'envio-gratis',
        'cordoba',
        
        // Conversión
        'cuotas-sin-interes',
        'garantia-10-anos',
        'best-seller'
      ],
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ MEDIA - CON ALT TEXT DESCRIPTIVO
      // ════════════════════════════════════════════════════════════════════
      images: [
        '/images/products/piero-meditare-pocket-matrimonial-frente-villa-maria.jpg',
        '/images/products/piero-meditare-resortes-pocket-detalle-sistema.jpg',
        '/images/products/piero-meditare-viscoelastico-capa-confort.jpg',
        '/images/products/piero-meditare-pareja-durmiendo-sin-interrupciones.jpg',
      ],
      image: '/images/products/piero-meditare-pocket-matrimonial-frente-villa-maria.jpg',
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ SPECIFICATIONS
      // ════════════════════════════════════════════════════════════════════
      firmness: 'MEDIO',
      firmnessValue: 65,
      height: 24,
      weight: 35000, // 35kg aprox
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ COMMERCIAL TERMS
      // ════════════════════════════════════════════════════════════════════
      warranty: 10,
      trialNights: 100,
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ FEATURES - MÍNIMO 8, MÁXIMO 12
      // ════════════════════════════════════════════════════════════════════
      features: [
        '600 resortes individuales Pocket Pro en tamaño Queen (máxima densidad)',
        'Cada resorte se mueve independientemente - Cero transmisión de movimiento',
        'Capa de viscoelástico de 3cm que elimina puntos de presión',
        'Altura profesional de 24cm para soporte óptimo durante años',
        'Certificado IRAM + Oeko-Tex + ISO 9001 - Calidad europea garantizada',
        'Ideal para parejas - Duerman sin molestar al otro',
        'Refuerzos perimetrales que evitan hundimientos en los bordes',
        'Tela premium Piero con tratamiento antiácaros y antibacterial',
        'Envío GRATIS Villa María + Instalación profesional incluida',
        '10 años de garantía real + 100 noches de prueba sin compromiso'
      ],
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ TECH FEATURES - ESPECIFICACIONES TÉCNICAS
      // ════════════════════════════════════════════════════════════════════
      techFeatures: [
        'Sistema: Pocket Pro con 600 resortes individuales (Queen)',
        'Densidad resortes: 600 unidades en 160x190 (3.9 resortes/dm²)',
        'Viscoelástico: 3cm alta densidad termosensible',
        'Espuma: Perimetral D30 para refuerzo de bordes',
        'Altura total: 24cm',
        'Tela: Jacquard Premium Piero con Silver Thread',
        'Tratamiento: Antiácaros + Antibacterial + Hipoalergénico',
        'Peso aproximado: 35kg',
        'Origen: Fabricado en Argentina con componentes europeos'
      ],
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ HIGHLIGHTS - USPs QUE CONVIERTEN (CON EMOJIS)
      // ════════════════════════════════════════════════════════════════════
      highlights: [
        '🏆 MÁS VENDIDO en Villa María - 1.200+ parejas satisfechas',
        '⭐ 4.8/5 estrellas - 142 opiniones reales verificadas',
        '🚚 Envío GRATIS 24-48hs + Instalación profesional incluida',
        '💑 IDEAL PAREJAS - Cero transmisión de movimiento entre lechos',
        '💳 12 cuotas SIN INTERÉS - Desde $17.500/mes con todas las tarjetas',
        '🔄 100 noches PRUEBA GRATIS - Si no te gusta, lo cambiamos',
        '🏅 10 AÑOS garantía - La mejor del mercado argentino',
        '✅ Elimina dolor espalda - Recomendado por traumatólogos'
      ],
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ MATERIALS - LISTA COMPLETA
      // ════════════════════════════════════════════════════════════════════
      materials: [
        'Resortes Pocket Pro individuales',
        'Viscoelástico termosensible',
        'Espuma perimetral D30',
        'Tela Jacquard Premium Piero',
        'Silver Thread antibacterial'
      ],
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ LAYERS - ESTRUCTURA DETALLADA (JSON)
      // ════════════════════════════════════════════════════════════════════
      layers: {
        capas: [
          {
            nombre: 'Tela Premium Piero',
            material: 'Jacquard con Silver Thread',
            grosor: '0.5cm',
            funcion: 'Suavidad + Antibacterial'
          },
          {
            nombre: 'Acolchado Superior',
            material: 'Fibra hipoalergénica',
            grosor: '2cm',
            funcion: 'Confort inmediato'
          },
          {
            nombre: 'Viscoelástico',
            material: 'Espuma termosensible',
            grosor: '3cm',
            funcion: 'Elimina puntos de presión'
          },
          {
            nombre: 'Sistema Pocket Pro',
            material: '600 resortes individuales',
            grosor: '16cm',
            funcion: 'Soporte adaptativo + Independencia'
          },
          {
            nombre: 'Espuma Perimetral',
            material: 'Poliuretano D30',
            grosor: '2.5cm',
            funcion: 'Refuerzo de bordes'
          }
        ]
      },
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ CERTIFICATIONS - TODAS LAS CERTIFICACIONES
      // ════════════════════════════════════════════════════════════════════
      certifications: [
        'IRAM (Instituto Argentino de Normalización)',
        'Oeko-Tex Standard 100 (Textiles libres de tóxicos)',
        'ISO 9001:2015 (Gestión de calidad)',
        'Certificado Piero Genuine (Producto original)',
        'INAL (Registro sanitario Argentina)'
      ],
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ STORY - CONEXIÓN EMOCIONAL (SOLO PREMIUM)
      // ════════════════════════════════════════════════════════════════════
      story: `
En Azul Colchones de Villa María llevamos 35 años ayudando a familias de Córdoba 
a mejorar su descanso. El Piero Meditare es nuestro best-seller absoluto por una 
razón: funciona.

"Probamos 4 colchones distintos en showrooms de Córdoba Capital. Ninguno 
resolvió mi dolor lumbar como el Meditare. Y costaba la mitad." 
- María González, Villa María (2023)

El secreto está en los 600 resortes individuales - la mayoría de marcas usan 
300-400 para ahorrar costos. Piero no hace eso. Cada resorte se mueve de forma 
independiente, adaptándose milimétricamente a tu cuerpo.

Por eso es el #1 en parejas: cuando tu esposo/a se da vuelta a las 3am, vos 
ni lo sentís. Es como dormir solo, pero acompañado.

Más de 1.200 parejas en Villa María, Bell Ville y toda la región centro de 
Córdoba ya duermen mejor. ¿Te sumás?
      `.trim(),
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ ATTRIBUTES - CARACTERÍSTICAS BOOLEANAS
      // ════════════════════════════════════════════════════════════════════
      cooling: false,
      isEco: false,
      hypoallergenic: true,
      washable: false,
      includesBase: false,
      isPremium: true,
      antiMite: true,
      pillowTop: false,
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ RATINGS - OPTIMIZADOS
      // ════════════════════════════════════════════════════════════════════
      transpirability: 88,
      satisfaction: 96,
      rating: 4.8,
      reviewCount: 142,
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ STATUS
      // ════════════════════════════════════════════════════════════════════
      isActive: true,
      isFeatured: true,
      isBestSeller: true,
      isNew: false,
      badge: 'MÁS VENDIDO',
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ LOGISTICS
      // ════════════════════════════════════════════════════════════════════
      shippingCost: 0, // Gratis
      sku: 'PIERO-MEDIT-MAT-VM-2024',
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ DISPLAY
      // ════════════════════════════════════════════════════════════════════
      mainColor: '#3b82f6',
      gradient: 'from-blue-100 to-indigo-100',
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ SEO META - CAMPOS CRÍTICOS OPTIMIZADOS
      // ════════════════════════════════════════════════════════════════════
      metaTitle: 'Colchón Piero Meditare Pocket Matrimonial $210.000 | Villa María',
      
      metaDescription: 'Colchón Piero Meditare Pocket Matrimonial $210.000 · 600 resortes individuales · Envío GRATIS Villa María · 12 cuotas sin interés · 10 años garantía · ⭐4.8/5 (142 opiniones)',
      
      metaKeywords: [
        // ═══ PRIMARIAS COMERCIALES ═══
        'colchón matrimonial villa maría',
        'piero meditare villa maría',
        'colchón resortes pocket villa maría',
        'colchón parejas villa maría',
        'colchones piero córdoba',
        
        // ═══ LONG-TAIL LOCAL (MÁS CONVERSIÓN) ═══
        'comprar colchón matrimonial villa maría',
        'colchonería villa maría centro',
        'colchón envío gratis villa maría',
        'colchón cuotas sin interés villa maría',
        'colchón matrimonial barato villa maría',
        
        // ═══ ESPECÍFICAS DEL PRODUCTO ═══
        'piero meditare pocket',
        'colchón 600 resortes individuales',
        'colchón resortes pocket 140x190',
        'meditare matrimonial',
        
        // ═══ PROBLEMAS QUE RESUELVE ═══
        'colchón dolor espalda',
        'colchón parejas sin movimiento',
        'colchón independencia lechos',
        'colchón no transmite movimiento',
        
        // ═══ FINANCIACIÓN (CONVERSIÓN) ═══
        'colchón 12 cuotas sin interés',
        'colchón cuotas villa maría',
        
        // ═══ COMPARATIVAS ═══
        'piero meditare vs cannon',
        'mejor colchón matrimonial villa maría',
        'colchón calidad precio córdoba',
        
        // ═══ CIUDADES VECINAS ═══
        'colchón bell ville',
        'colchón villa nueva córdoba',
        'colchón san francisco córdoba'
      ],
      
      // ════════════════════════════════════════════════════════════════════
      // ✅ VARIANTS - CON INFO SEO COMPLETA
      // ════════════════════════════════════════════════════════════════════
      variants: {
        create: [
          {
            sku: 'PIERO-MEDIT-80X190-1PL-VM',
            size: '1 plaza (80x190cm)',
            dimensions: '80x190x24',
            width: 80,
            length: 190,
            height: 24,
            price: 21000000,
            originalPrice: 28000000,
            stock: 4,
            inStock: true,
            isActive: true,
            isDefault: false,
          },
          {
            sku: 'PIERO-MEDIT-90X190-1PLGDE-VM',
            size: '1 plaza grande (90x190cm)',
            dimensions: '90x190x24',
            width: 90,
            length: 190,
            height: 24,
            price: 23000000,
            originalPrice: 30000000,
            stock: 2,
            inStock: true,
            isActive: true,
            isDefault: false,
          },
          {
            sku: 'PIERO-MEDIT-100X190-2PL-VM',
            size: '2 plazas (100x190cm)',
            dimensions: '100x190x24',
            width: 100,
            length: 190,
            height: 24,
            price: 23000000,
            originalPrice: 30000000,
            stock: 2,
            inStock: true,
            isActive: true,
            isDefault: false,
          },
          {
            sku: 'PIERO-MEDIT-130X190-MATCHICO-VM',
            size: 'Matrimonial chico (130x190cm)',
            dimensions: '130x190x24',
            width: 130,
            length: 190,
            height: 24,
            price: 32000000,
            originalPrice: 42000000,
            stock: 1,
            inStock: true,
            isActive: true,
            isDefault: false,
          },
          {
            sku: 'PIERO-MEDIT-140X190-MAT-VM',
            size: 'Matrimonial (140x190cm)',
            dimensions: '140x190x24',
            width: 140,
            length: 190,
            height: 24,
            price: 35000000,
            originalPrice: 46000000,
            stock: 5,
            inStock: true,
            isActive: true,
            isDefault: true, // ✅ Esta es la variante por defecto
          },
        ],
      },
    },
  })

  console.log('✅ Producto ejemplo optimizado creado!')
  console.log(`   📦 Name: ${meditareOptimizado.name}`)
  console.log(`   🔗 Slug: ${meditareOptimizado.slug}`)
  console.log(`   🏷️ Keywords: ${meditareOptimizado.metaKeywords.length}`)
  console.log(`   📝 Description: ${meditareOptimizado.description.length} caracteres`)
  console.log(`   💰 Precio: $${meditareOptimizado.price / 100}`)
  console.log(`   💸 Descuento: ${meditareOptimizado.discount}%`)
}

export default seedOptimizedExample

// Si se ejecuta directamente
if (require.main === module) {
  seedOptimizedExample()
    .catch((e) => {
      console.error('❌ Error:', e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}