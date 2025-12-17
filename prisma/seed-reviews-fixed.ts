// prisma/seed-reviews-fixed.ts
// ============================================================================
// 🌟 REVIEWS OPTIMIZADAS - VERSIÓN CORREGIDA
// ============================================================================
// Crea usuarios ficticios + reviews con keywords y local SEO
// ============================================================================

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CIUDADES = ['Villa María', 'Bell Ville', 'Villa Nueva', 'San Francisco', 'Córdoba Capital', 'Río Cuarto']

const NOMBRES = [
  'María González', 'Juan Rodríguez', 'Carlos Fernández', 'Ana López', 
  'Roberto Martínez', 'Laura García', 'Diego Pérez', 'Silvia Sánchez',
  'Martín Romero', 'Paula Torres', 'Lucas Díaz', 'Claudia Moreno',
  'Fernando Álvarez', 'Andrea Ruiz', 'Gustavo Castro', 'Mónica Ramos',
  'Sebastián Flores', 'Verónica Benítez', 'Ricardo Morales', 'Patricia Silva',
  'Alejandro Vega', 'Daniela Ortiz', 'Jorge Campos', 'Carolina Núñez'
]

// ============================================================================
// CREAR USUARIOS FICTICIOS
// ============================================================================

async function crearUsuariosFicticios() {
  console.log('👥 Creando usuarios ficticios...\n')
  
  const usuarios = []
  
  for (let i = 0; i < NOMBRES.length; i++) {
    const nombre = NOMBRES[i]
    const email = `${nombre.toLowerCase().replace(/\s+/g, '.').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}${i + 1}@gmail.com`
    const ciudad = CIUDADES[i % CIUDADES.length]
    
    try {
      const usuario = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          email,
          name: nombre,
          city: ciudad,
          province: 'Córdoba',
          country: 'Argentina',
          role: 'user'
        }
      })
      
      usuarios.push(usuario)
      
    } catch (error) {
      console.log(`   ⚠️  Usuario ${email} ya existe, continuando...`)
    }
  }
  
  console.log(`   ✅ ${usuarios.length} usuarios creados/verificados\n`)
  return usuarios
}

// ============================================================================
// TEMPLATES DE REVIEWS
// ============================================================================

const REVIEWS_TEMPLATES = {
  dolor_espalda: [
    {
      rating: 5,
      title: 'Eliminó mi dolor de espalda',
      comment: 'Después de años con dolor lumbar, este colchón cambió mi vida. La firmeza es perfecta - ni muy duro ni muy blando. Ahora me levanto sin dolor y puedo trabajar todo el día sin problemas. El envío a {ciudad} fue súper rápido. Lo recomiendo 100% a cualquiera con problemas de columna.',
      verified: true
    },
    {
      rating: 5,
      title: 'Recomendado por mi traumatólogo',
      comment: 'Mi traumatólogo me recomendó cambiar el colchón por mi dolor de espalda crónico. Probé este y a la semana ya notaba la diferencia. El soporte ortopédico es excelente. En {ciudad} no hay muchas opciones así. Muy conforme con la compra.',
      verified: true
    }
  ],
  
  pareja: [
    {
      rating: 5,
      title: 'Perfecto para parejas',
      comment: 'Mi esposo se levanta varias veces de noche y yo ya no siento el movimiento. Con este colchón no se transmite nada. Es como dormir solo pero acompañado. La independencia de lechos funciona de verdad. Llegó a {ciudad} en 2 días. Excelente compra.',
      verified: true
    },
    {
      rating: 5,
      title: 'Salvó nuestro sueño',
      comment: 'Mi esposa es muy inquieta y yo sueño liviano. Este colchón fue la solución perfecta - cada uno duerme sin molestar al otro. Los resortes individuales hacen la diferencia. En {ciudad} pagamos un excelente precio. Súper recomendado para parejas.',
      verified: true
    }
  ],
  
  calidad_precio: [
    {
      rating: 5,
      title: 'Excelente relación calidad-precio',
      comment: 'Estuve viendo colchones en Córdoba Capital y este tiene mejor precio que los de allá. La calidad-precio es increíble - vale cada peso. Llegó a {ciudad} sin costo extra. Muy satisfecho con la compra.',
      verified: true
    },
    {
      rating: 4,
      title: 'Mejor que marcas caras',
      comment: 'Comparé con colchones de $500.000+ y este es superior. Por menos de la mitad, conseguí mejor calidad. En {ciudad} es difícil encontrar este nivel. La atención fue excelente. Lo recomiendo sin dudas.',
      verified: true
    }
  ],
  
  envio: [
    {
      rating: 5,
      title: 'Envío rapidísimo',
      comment: 'El envío fue súper rápido - llegó en menos de 48hs a {ciudad}. Además la instalación fue profesional, me lo dejaron en la habitación y se llevaron el viejo sin cargo. Servicio 10 puntos. El colchón excelente también.',
      verified: true
    }
  ],
  
  durabilidad: [
    {
      rating: 5,
      title: 'Sigue perfecto después de 1 año',
      comment: 'Compré este colchón hace 1 año y sigue perfecto. No se hundió ni un centímetro, mantiene la forma impecable. Pesamos los dos +80kg y aguanta sin problemas. Para {ciudad} es la mejor opción de largo plazo. Totalmente recomendado.',
      verified: true
    }
  ],
  
  general: [
    {
      rating: 5,
      title: 'Muy conforme con la compra',
      comment: 'Excelente colchón, tal cual lo esperaba. La calidad es muy buena y el precio justo. En {ciudad} encontré la mejor opción. El proceso de compra fue fácil y la atención impecable. Lo recomiendo.',
      verified: true
    },
    {
      rating: 4,
      title: 'Buena compra',
      comment: 'El colchón es muy bueno, solo que es un poco más firme de lo que esperaba (yo venía de uno muy blando). Igual mi espalda lo agradece. El envío a {ciudad} fue rápido. Conforme con la compra.',
      verified: true
    }
  ]
}

// ============================================================================
// GENERAR REVIEWS POR PRODUCTO
// ============================================================================

async function seedReviews() {
  console.log('🌟 ============================================')
  console.log('🌟 GENERANDO REVIEWS OPTIMIZADOS')
  console.log('🌟 ============================================\n')
  
  try {
    // 1. Crear usuarios ficticios
    const usuarios = await crearUsuariosFicticios()
    
    if (usuarios.length === 0) {
      console.error('❌ No se pudieron crear usuarios')
      return
    }
    
    // 2. Obtener productos
    const productos = await prisma.product.findMany({
      where: { isActive: true }
    })
    
    console.log(`📦 Productos encontrados: ${productos.length}\n`)
    
    let totalReviews = 0
    let usuarioIndex = 0
    
    for (const producto of productos) {
      console.log(`⭐ Generando reviews para: ${producto.name.substring(0, 80)}...`)
      
      // Determinar cantidad según importancia
      const cantidadBase = producto.isBestSeller ? 12 :
                          producto.isPremium ? 8 :
                          producto.isFeatured ? 10 : 6
      
      // Distribuir por categorías
      const distribucion: { [key: string]: number } = {}
      
      if (producto.category === 'colchones') {
        distribucion.dolor_espalda = 3
        distribucion.pareja = producto.name.toLowerCase().includes('matrimonial') || 
                             producto.name.toLowerCase().includes('queen') ? 2 : 1
        distribucion.calidad_precio = 2
        distribucion.envio = 1
        distribucion.durabilidad = 1
        distribucion.general = 1
      } else {
        distribucion.calidad_precio = 2
        distribucion.envio = 1
        distribucion.general = cantidadBase - 3
      }
      
      const reviewsCreadas = []
      
      for (const [categoria, cantidad] of Object.entries(distribucion)) {
        const templates = REVIEWS_TEMPLATES[categoria as keyof typeof REVIEWS_TEMPLATES]
        
        for (let i = 0; i < cantidad; i++) {
          // Seleccionar usuario rotativo
          const usuario = usuarios[usuarioIndex % usuarios.length]
          usuarioIndex++
          
          // Seleccionar template aleatorio
          const template = templates[Math.floor(Math.random() * templates.length)]
          
          // Reemplazar {ciudad} con la ciudad del usuario
          const comment = template.comment.replace('{ciudad}', usuario.city || 'Villa María')
          
          // Verificar si ya existe review de este usuario para este producto
          const existingReview = await prisma.review.findUnique({
            where: {
              userId_productId: {
                userId: usuario.id,
                productId: producto.id
              }
            }
          })
          
          if (existingReview) {
            console.log(`   ⚠️  Review de ${usuario.name} ya existe, saltando...`)
            continue
          }
          
          // Crear review
          try {
            const review = await prisma.review.create({
              data: {
                rating: template.rating,
                title: template.title,
                comment,
                verified: template.verified,
                product: {
                  connect: { id: producto.id }
                },
                user: {
                  connect: { id: usuario.id }
                }
              }
            })
            
            reviewsCreadas.push(review)
            
          } catch (error: any) {
            if (error.code === 'P2002') {
              // Constraint único violado, usuario ya tiene review para este producto
              console.log(`   ⚠️  ${usuario.name} ya tiene review, continuando...`)
            } else {
              console.error(`   ❌ Error creando review:`, error.message)
            }
          }
        }
      }
      
      // Actualizar rating promedio del producto
      if (reviewsCreadas.length > 0) {
        const avgRating = reviewsCreadas.reduce((acc, r) => acc + r.rating, 0) / reviewsCreadas.length
        
        await prisma.product.update({
          where: { id: producto.id },
          data: {
            rating: Math.round(avgRating * 10) / 10,
            reviewCount: reviewsCreadas.length
          }
        })
        
        totalReviews += reviewsCreadas.length
        console.log(`   ✅ ${reviewsCreadas.length} reviews creadas - Rating: ${avgRating.toFixed(1)}/5`)
      } else {
        console.log(`   ⚠️  No se crearon reviews (pueden ya existir)`)
      }
    }
    
    console.log('\n\n🎉 ============================================')
    console.log('🎉 REVIEWS GENERADAS EXITOSAMENTE')
    console.log('🎉 ============================================\n')
    console.log(`✅ Total productos: ${productos.length}`)
    console.log(`⭐ Total reviews: ${totalReviews}`)
    console.log(`👥 Usuarios usados: ${usuarios.length}`)
    console.log(`📍 Ciudades: ${CIUDADES.join(', ')}`)
    console.log('\n💡 Las reviews están listas para mostrar!\n')
    
  } catch (error) {
    console.error('\n❌ Error general:', error)
    throw error
  }
}

// ============================================================================
// EJECUTAR
// ============================================================================

seedReviews()
  .catch((e) => {
    console.error('❌ Error fatal:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })