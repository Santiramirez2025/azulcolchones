// prisma/seed-ropa-cama.ts
// ============================================================================
// SEED ROPA DE CAMA - AZUL COLCHONES
// ============================================================================
// Sábanas, covers y cubre colchones
// ⚠️ PRECIOS EN CENTAVOS (multiplicar por 100)
// ============================================================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedRopaCama() {
  console.log('🚀 Iniciando seed de ropa de cama...');

  // ============================================================================
  // 🛏️ CATEGORÍA: SÁBANAS
  // ============================================================================

  // ────────────────────────────────────────────────────────────────────────────
  // 📋 LÍNEA CLASSIC - Percal 144 hilos
  // ────────────────────────────────────────────────────────────────────────────
  const sabanasClassic = await prisma.product.create({
    data: {
      name: 'Juego de Sábanas Classic',
      slug: 'sabanas-classic-percal-144',
      subtitle: 'Percal 144 hilos - 100% algodón',
      description: 'Juego de sábanas lisas con guarda de la línea Classic. Confeccionadas en percal de 144 hilos 100% algodón. Incluye sábana ajustable, sábana superior y fundas de almohada.',
      
      price: 10000000, // Base FULL
      
      stock: 5, // Total: 3+1+1
      inStock: true,
      
      category: 'ropa-cama',
      subcategory: 'sabanas',
      tags: ['sabanas', 'classic', 'percal', 'algodon'],
      
      images: [
        '/images/products/sabanas-classic-1.jpg',
        '/images/products/sabanas-classic-2.jpg',
      ],
      
      firmness: 'TEXTIL',
      firmnessValue: 50,
      height: 0,
      
      warranty: 1,
      trialNights: 0,
      
      features: [
        'Percal 144 hilos',
        '100% algodón peinado',
        'Diseño liso con guarda',
        'Juego completo 4 piezas'
      ],
      techFeatures: [
        'Material: 100% algodón',
        'Hilos: 144',
        'Tipo: Percal',
        'Piezas: 4 (ajustable, plana, 2 fundas)'
      ],
      highlights: [
        'Suavidad natural',
        'Durabilidad garantizada',
        'Fácil mantenimiento'
      ],
      materials: ['Algodón 100% peinado', 'Percal 144 hilos'],
      
      hypoallergenic: true,
      washable: true,
      
      transpirability: 95,
      satisfaction: 90,
      rating: 4.5,
      reviewCount: 28,
      
      isActive: true,
      
      mainColor: '#ffffff',
      gradient: 'from-blue-50 to-cyan-50',
      
      metaTitle: 'Juego de Sábanas Classic Percal 144 | 100% Algodón',
      metaDescription: 'Sábanas Classic en percal 144 hilos. 100% algodón peinado. Suavidad y calidad garantizada.',
      metaKeywords: ['sabanas classic', 'percal 144', 'sabanas algodon'],
      
      variants: {
        create: [
          {
            sku: 'SAB-CLASSIC-FULL',
            size: 'FULL',
            dimensions: '140x190x0',
            width: 140,
            length: 190,
            height: 0,
            price: 10000000,
            stock: 3,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'SAB-CLASSIC-QUEEN',
            size: 'QUEEN',
            dimensions: '160x190x0',
            width: 160,
            length: 190,
            height: 0,
            price: 11000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'SAB-CLASSIC-KING',
            size: 'KING',
            dimensions: '200x200x0',
            width: 200,
            length: 200,
            height: 0,
            price: 13000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📋 LÍNEA SUPREME - 200 hilos
  // ────────────────────────────────────────────────────────────────────────────
  const sabanasSupreme = await prisma.product.create({
    data: {
      name: 'Juego de Sábanas Supreme',
      slug: 'sabanas-supreme-200-hilos',
      subtitle: '200 hilos - Guarda lino / Lisa blanca',
      description: 'Juego de sábanas premium de la línea Supreme con 200 hilos. 100% algodón de primera calidad con diseño guarda lino y lisa blanca. Suavidad superior y acabado de lujo.',
      
      price: 20000000, // KING
      stock: 2,
      inStock: true,
      
      category: 'ropa-cama',
      subcategory: 'sabanas-premium',
      tags: ['sabanas', 'supreme', '200 hilos', 'premium'],
      
      images: [
        '/images/products/sabanas-supreme-1.jpg',
        '/images/products/sabanas-supreme-2.jpg',
        '/images/products/sabanas-supreme-3.jpg',
      ],
      
      firmness: 'TEXTIL',
      firmnessValue: 50,
      height: 0,
      
      warranty: 2,
      trialNights: 0,
      
      features: [
        '200 hilos - Premium',
        '100% algodón peinado',
        'Diseño guarda lino',
        'Lisa blanca elegante',
        'Suavidad superior'
      ],
      techFeatures: [
        'Material: 100% algodón egipcio',
        'Hilos: 200',
        'Tipo: Percal premium',
        'Piezas: 4 (ajustable, plana, 2 fundas)'
      ],
      highlights: [
        'Calidad hotelera',
        'Máxima suavidad',
        'Durabilidad excepcional'
      ],
      materials: ['Algodón egipcio 100%', 'Percal 200 hilos'],
      certifications: ['100% Algodón Certificado'],
      
      hypoallergenic: true,
      washable: true,
      isPremium: true,
      
      transpirability: 98,
      satisfaction: 96,
      rating: 4.9,
      reviewCount: 15,
      
      isActive: true,
      isFeatured: true,
      badge: 'PREMIUM',
      
      mainColor: '#f8f9fa',
      gradient: 'from-gray-50 to-blue-50',
      
      metaTitle: 'Juego de Sábanas Supreme 200 Hilos | Premium',
      metaDescription: 'Sábanas Supreme 200 hilos. Algodón egipcio premium. Calidad hotelera para tu descanso.',
      metaKeywords: ['sabanas supreme', '200 hilos', 'sabanas premium'],
      
      variants: {
        create: [
          {
            sku: 'SAB-SUPREME-KING',
            size: 'KING',
            dimensions: '200x200x0',
            width: 200,
            length: 200,
            height: 0,
            price: 20000000,
            stock: 2,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  // ============================================================================
  // 🛏️ CATEGORÍA: COVERS - LÍNEA PREMIUM
  // ============================================================================

  // ────────────────────────────────────────────────────────────────────────────
  // 🎨 COVERS TUSOR LISO
  // ────────────────────────────────────────────────────────────────────────────
  const coverTusorLiso = await prisma.product.create({
    data: {
      name: 'Cover Tusor Liso Premium',
      slug: 'cover-tusor-liso',
      subtitle: 'Elegancia minimalista para tu cama',
      description: 'Cover premium en tusor liso con acabado sedoso. Incluye funda de edredón y fundas de almohada. Diseño minimalista y elegante que se adapta a cualquier decoración.',
      
      price: 15000000, // Base QUEEN
      
      stock: 2, // Total: 1+1
      inStock: true,
      
      category: 'ropa-cama',
      subcategory: 'covers',
      tags: ['cover', 'tusor', 'liso', 'premium'],
      
      images: [
        '/images/products/cover-tusor-liso-1.jpg',
        '/images/products/cover-tusor-liso-2.jpg',
      ],
      
      firmness: 'TEXTIL',
      firmnessValue: 50,
      height: 0,
      
      warranty: 2,
      trialNights: 0,
      
      features: [
        'Tusor de alta calidad',
        'Acabado sedoso',
        'Diseño minimalista',
        'Fácil colocación'
      ],
      techFeatures: [
        'Material: Tusor premium',
        'Tipo: Liso',
        'Incluye: Funda edredón + fundas almohada',
        'Cierre: Botones ocultos'
      ],
      highlights: [
        'Elegancia atemporal',
        'Textura sedosa',
        'Combinable con todo'
      ],
      materials: ['Tusor premium', 'Microfibra suave'],
      
      washable: true,
      isPremium: true,
      
      transpirability: 85,
      satisfaction: 93,
      rating: 4.7,
      reviewCount: 12,
      
      isActive: true,
      
      mainColor: '#ecf0f1',
      gradient: 'from-slate-50 to-gray-50',
      
      metaTitle: 'Cover Tusor Liso Premium | Elegancia Minimalista',
      metaDescription: 'Cover premium en tusor liso con acabado sedoso. Diseño elegante y atemporal.',
      metaKeywords: ['cover tusor', 'cover liso', 'tusor premium'],
      
      variants: {
        create: [
          {
            sku: 'COVER-TUSOR-LISO-QUEEN',
            size: 'QUEEN',
            dimensions: '160x190x0',
            width: 160,
            length: 190,
            height: 0,
            price: 15000000,
            stock: 1,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'COVER-TUSOR-LISO-KING',
            size: 'KING',
            dimensions: '200x200x0',
            width: 200,
            length: 200,
            height: 0,
            price: 18000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 🎨 COVERS TUSOR ESTAMPADO
  // ────────────────────────────────────────────────────────────────────────────
  const coverTusorEstampado = await prisma.product.create({
    data: {
      name: 'Cover Tusor Estampado Premium',
      slug: 'cover-tusor-estampado',
      subtitle: 'Diseños exclusivos que transforman tu dormitorio',
      description: 'Cover premium en tusor con estampados exclusivos. Diseños modernos y elegantes que aportan personalidad a tu habitación. Incluye funda de edredón y fundas de almohada.',
      
      price: 20000000, // QUEEN
      stock: 2,
      inStock: true,
      
      category: 'ropa-cama',
      subcategory: 'covers-premium',
      tags: ['cover', 'tusor', 'estampado', 'diseño'],
      
      images: [
        '/images/products/cover-tusor-estampado-1.jpg',
        '/images/products/cover-tusor-estampado-2.jpg',
        '/images/products/cover-tusor-estampado-3.jpg',
      ],
      
      firmness: 'TEXTIL',
      firmnessValue: 50,
      height: 0,
      
      warranty: 2,
      trialNights: 0,
      
      features: [
        'Estampados exclusivos',
        'Tusor de alta calidad',
        'Diseños modernos',
        'Colores vibrantes',
        'Reversible'
      ],
      techFeatures: [
        'Material: Tusor premium estampado',
        'Incluye: Funda edredón + fundas almohada',
        'Diseño: Reversible',
        'Cierre: Botones forrados'
      ],
      highlights: [
        'Diseño exclusivo',
        'Transforma tu habitación',
        'Calidad premium'
      ],
      materials: ['Tusor estampado premium', 'Microfibra'],
      
      washable: true,
      isPremium: true,
      
      transpirability: 85,
      satisfaction: 95,
      rating: 4.8,
      reviewCount: 18,
      
      isActive: true,
      isFeatured: true,
      badge: 'DISEÑO EXCLUSIVO',
      
      mainColor: '#3498db',
      gradient: 'from-blue-100 to-purple-100',
      
      metaTitle: 'Cover Tusor Estampado Premium | Diseños Exclusivos',
      metaDescription: 'Cover premium con estampados exclusivos en tusor. Diseños modernos que transforman tu dormitorio.',
      metaKeywords: ['cover estampado', 'tusor diseño', 'cover moderno'],
      
      variants: {
        create: [
          {
            sku: 'COVER-TUSOR-EST-QUEEN',
            size: 'QUEEN',
            dimensions: '160x190x0',
            width: 160,
            length: 190,
            height: 0,
            price: 20000000,
            stock: 2,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  // ============================================================================
  // 🛏️ CATEGORÍA: CUBRE COLCHONES
  // ============================================================================

  // ────────────────────────────────────────────────────────────────────────────
  // 🛡️ CUBRE COLCHÓN MATELASEADO
  // ────────────────────────────────────────────────────────────────────────────
  const cubreColchonMatelaseado = await prisma.product.create({
    data: {
      name: 'Cubre Colchón Matelaseado',
      slug: 'cubre-colchon-matelaseado',
      subtitle: 'Protección acolchada para tu colchón',
      description: 'Cubre colchón matelaseado que protege y prolonga la vida útil de tu colchón. Acolchado suave que agrega una capa extra de confort. Ajuste perfecto con elásticos en las esquinas.',
      
      price: 6500000, // Base 2 plazas
      
      stock: 8, // Total: 6+2
      inStock: true,
      
      category: 'accesorios',
      subcategory: 'protectores',
      tags: ['cubre', 'matelaseado', 'protector', 'acolchado'],
      
      images: [
        '/images/products/cubre-matelaseado-1.jpg',
        '/images/products/cubre-matelaseado-2.jpg',
      ],
      
      firmness: 'TEXTIL',
      firmnessValue: 50,
      height: 2,
      
      warranty: 1,
      trialNights: 0,
      
      features: [
        'Acolchado matelaseado',
        'Protege el colchón',
        'Ajuste con elásticos',
        'Fácil colocación',
        'Lavable'
      ],
      techFeatures: [
        'Material: Microfibra acolchada',
        'Tipo: Matelaseado',
        'Ajuste: Elásticos en esquinas',
        'Grosor: 2cm aprox'
      ],
      highlights: [
        'Prolonga vida del colchón',
        'Confort adicional',
        'Fácil mantenimiento'
      ],
      materials: ['Microfibra', 'Relleno acolchado'],
      
      hypoallergenic: true,
      washable: true,
      
      transpirability: 75,
      satisfaction: 88,
      rating: 4.4,
      reviewCount: 34,
      
      isActive: true,
      isBestSeller: true,
      
      mainColor: '#95a5a6',
      
      metaTitle: 'Cubre Colchón Matelaseado | Protección con Confort',
      metaDescription: 'Cubre colchón matelaseado que protege y agrega confort. Ajuste perfecto y fácil lavado.',
      metaKeywords: ['cubre colchon', 'matelaseado', 'protector colchon'],
      
      variants: {
        create: [
          {
            sku: 'CUBRE-MATE-140X190',
            size: '2 plazas',
            dimensions: '140x190x2',
            width: 140,
            length: 190,
            height: 2,
            price: 6500000,
            stock: 6,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'CUBRE-MATE-200X200',
            size: 'Super King',
            dimensions: '200x200x2',
            width: 200,
            length: 200,
            height: 2,
            price: 10000000,
            stock: 2,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 🛡️ CUBRE COLCHÓN IMPERMEABLE
  // ────────────────────────────────────────────────────────────────────────────
  const cubreColchonImpermeable = await prisma.product.create({
    data: {
      name: 'Cubre Colchón Impermeable',
      slug: 'cubre-colchon-impermeable',
      subtitle: 'Protección total contra líquidos',
      description: 'Cubre colchón con capa impermeable que protege completamente tu colchón contra derrames y líquidos. Ideal para niños o adultos mayores. Superficie suave y transpirable.',
      
      price: 6500000,
      stock: 4,
      inStock: true,
      
      category: 'accesorios',
      subcategory: 'protectores-impermeables',
      tags: ['cubre', 'impermeable', 'protector', 'niños'],
      
      images: [
        '/images/products/cubre-impermeable-1.jpg',
        '/images/products/cubre-impermeable-2.jpg',
      ],
      
      firmness: 'TEXTIL',
      firmnessValue: 50,
      height: 1,
      
      warranty: 1,
      trialNights: 0,
      
      features: [
        'Capa impermeable',
        'Protección total',
        'Superficie transpirable',
        'Silencioso (no cruje)',
        'Ajuste perfecto'
      ],
      techFeatures: [
        'Material: Microfibra + PU impermeable',
        'Tipo: Barrera líquidos',
        'Ajuste: Elásticos perimetrales',
        'Certificado: Libre de tóxicos'
      ],
      highlights: [
        'Ideal para niños',
        'Protección 100%',
        'No altera el confort'
      ],
      materials: ['Microfibra suave', 'Poliuretano impermeable'],
      certifications: ['Libre de ftalatos'],
      
      hypoallergenic: true,
      washable: true,
      
      transpirability: 70,
      satisfaction: 92,
      rating: 4.6,
      reviewCount: 41,
      
      isActive: true,
      isBestSeller: true,
      
      mainColor: '#3498db',
      
      metaTitle: 'Cubre Colchón Impermeable | Protección Total',
      metaDescription: 'Protector impermeable para colchón. Ideal para niños. Protección completa y transpirable.',
      metaKeywords: ['cubre impermeable', 'protector liquidos', 'colchon niños'],
      
      variants: {
        create: [
          {
            sku: 'CUBRE-IMP-100X190',
            size: '1 1/2 plaza',
            dimensions: '100x190x1',
            width: 100,
            length: 190,
            height: 1,
            price: 6500000,
            stock: 4,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  console.log('✅ Seed de ropa de cama completado!');
  console.log('📊 Resumen:');
  console.log('- Sábanas: 2 productos');
  console.log('- Covers: 2 productos');
  console.log('- Cubre Colchones: 2 productos');
  console.log('- Total: 6 productos de ropa de cama');
}

export default seedRopaCama;

// Si se ejecuta directamente
if (require.main === module) {
  seedRopaCama()
    .catch((e) => {
      console.error('❌ Error en seed de ropa de cama:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}