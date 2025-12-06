// prisma/seed-complementarios.ts
// ============================================================================
// SEED PRODUCTOS COMPLEMENTARIOS - AZUL COLCHONES
// ============================================================================
// Bases, sommiers, almohadas, ropa de cama y accesorios
// ⚠️ PRECIOS EN CENTAVOS (multiplicar por 100)
// ============================================================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedComplementarios() {
  console.log('🚀 Iniciando seed de productos complementarios...');

  // ============================================================================
  // 📦 CATEGORÍA: BASES Y BOX
  // ============================================================================

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 BOX ECOCUERO - Base de cama con tapizado
  // ────────────────────────────────────────────────────────────────────────────
  const boxEcocuero = await prisma.product.create({
    data: {
      name: 'Box Ecocuero',
      slug: 'box-ecocuero',
      subtitle: 'Base tapizada de alta calidad',
      description: 'Box de madera con tapizado en ecocuero premium. Estructura reforzada que proporciona estabilidad y elegancia a tu dormitorio. Ideal para combinar con cualquier colchón.',
      
      price: 7500000, // Base 80x190 en centavos
      
      stock: 53, // Total: 6+9+13+5+4+5+10+1
      inStock: true,
      
      category: 'bases',
      subcategory: 'box',
      tags: ['box', 'base', 'ecocuero', 'tapizado'],
      
      images: [
        '/images/products/box-ecocuero-1.jpg',
        '/images/products/box-ecocuero-2.jpg',
      ],
      
      firmness: 'ESTRUCTURA',
      firmnessValue: 100,
      height: 25, // Altura promedio del box
      
      warranty: 2,
      trialNights: 0, // No aplica para bases
      
      features: [
        'Tapizado en ecocuero premium',
        'Estructura de madera reforzada',
        'Base ideal para cualquier colchón',
        'Fácil instalación'
      ],
      techFeatures: [
        'Altura: 25cm',
        'Material: Madera + Ecocuero',
        'Capacidad: Hasta 150kg'
      ],
      highlights: [
        'Terminación premium',
        'Gran durabilidad',
        'Múltiples medidas disponibles'
      ],
      materials: ['Madera reforzada', 'Ecocuero premium', 'Herrajes metálicos'],
      
      transpirability: 60,
      satisfaction: 88,
      rating: 4.4,
      reviewCount: 23,
      
      isActive: true,
      
      mainColor: '#8b7355',
      gradient: 'from-amber-50 to-orange-50',
      
      metaTitle: 'Box Ecocuero | Base Tapizada Premium',
      metaDescription: 'Base tapizada en ecocuero con estructura reforzada. Ideal para cualquier colchón. Múltiples medidas disponibles.',
      metaKeywords: ['box ecocuero', 'base tapizada', 'sommier'],
      
      variants: {
        create: [
          {
            sku: 'BOX-ECO-80X190',
            size: '1 plaza',
            dimensions: '80x190x25',
            width: 80,
            length: 190,
            height: 25,
            price: 7500000,
            stock: 6,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'BOX-ECO-90X190',
            size: '1 plaza grande',
            dimensions: '90x190x25',
            width: 90,
            length: 190,
            height: 25,
            price: 7500000,
            stock: 9,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'BOX-ECO-100X190',
            size: '2 plazas',
            dimensions: '100x190x25',
            width: 100,
            length: 190,
            height: 25,
            price: 7500000,
            stock: 13,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'BOX-ECO-80X200',
            size: '1 plaza',
            dimensions: '80x200x25',
            width: 80,
            length: 200,
            height: 25,
            price: 8000000,
            stock: 5,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'BOX-ECO-90X200',
            size: '1 plaza grande',
            dimensions: '90x200x25',
            width: 90,
            length: 200,
            height: 25,
            price: 8000000,
            stock: 4,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'BOX-ECO-100X200',
            size: '2 plazas',
            dimensions: '100x200x25',
            width: 100,
            length: 200,
            height: 25,
            price: 9000000,
            stock: 5,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'BOX-ECO-140X190',
            size: 'Matrimonial',
            dimensions: '140x190x25',
            width: 140,
            length: 190,
            height: 25,
            price: 9000000,
            stock: 10,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'BOX-ECO-130X190',
            size: 'Matrimonial chico',
            dimensions: '130x190x25',
            width: 130,
            length: 190,
            height: 25,
            price: 9000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 🛏️ SOMMIER OLIMPO DE TELA
  // ────────────────────────────────────────────────────────────────────────────
  const sommierOlimpo = await prisma.product.create({
    data: {
      name: 'Sommier Olimpo',
      slug: 'sommier-olimpo-tela',
      subtitle: 'Base con resortes tapizada en tela',
      description: 'Sommier con estructura de resortes y tapizado en tela resistente. Proporciona soporte adicional y prolonga la vida útil de tu colchón. Diseño clásico y duradero.',
      
      price: 8500000, // Base 80x200
      
      stock: 22, // Total: 6+12+4
      inStock: true,
      
      category: 'bases',
      subcategory: 'sommier',
      tags: ['sommier', 'resortes', 'tela', 'base'],
      
      images: [
        '/images/products/sommier-olimpo-1.jpg',
        '/images/products/sommier-olimpo-2.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 65,
      height: 20,
      
      warranty: 3,
      trialNights: 0,
      
      features: [
        'Base con resortes internos',
        'Tapizado en tela resistente',
        'Soporte uniforme',
        'Prolonga vida del colchón'
      ],
      techFeatures: [
        'Resortes bicónicos',
        'Altura: 20cm',
        'Tela antiácaros'
      ],
      highlights: [
        'Soporte adicional',
        'Mayor durabilidad del colchón',
        'Fácil mantenimiento'
      ],
      materials: ['Resortes bicónicos', 'Madera', 'Tela premium'],
      
      transpirability: 85,
      satisfaction: 90,
      rating: 4.5,
      reviewCount: 31,
      
      isActive: true,
      isBestSeller: true,
      
      mainColor: '#4a5568',
      gradient: 'from-gray-50 to-slate-50',
      
      metaTitle: 'Sommier Olimpo de Tela | Base con Resortes',
      metaDescription: 'Sommier con resortes internos y tapizado en tela. Soporte adicional para tu colchón. Calidad garantizada.',
      metaKeywords: ['sommier olimpo', 'base resortes', 'sommier tela'],
      
      variants: {
        create: [
          {
            sku: 'SOMM-OLIMPO-80X200',
            size: '1 plaza',
            dimensions: '80x200x20',
            width: 80,
            length: 200,
            height: 20,
            price: 8500000,
            stock: 6,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'SOMM-OLIMPO-90X200',
            size: '1 plaza grande',
            dimensions: '90x200x20',
            width: 90,
            length: 200,
            height: 20,
            price: 8500000,
            stock: 12,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'SOMM-OLIMPO-100X200',
            size: '2 plazas',
            dimensions: '100x200x20',
            width: 100,
            length: 200,
            height: 20,
            price: 8500000,
            stock: 4,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 🔵 SOMMIERS ORIGINALES PIERO - Premium
  // ────────────────────────────────────────────────────────────────────────────
  const sommierPieroBrown = await prisma.product.create({
    data: {
      name: 'Sommier Piero Brown',
      slug: 'sommier-piero-brown',
      subtitle: 'Base premium marca Piero',
      description: 'Sommier de la línea premium Piero con tapizado Brown elegante. Estructura reforzada con resortes de alta calidad. El complemento perfecto para colchones Piero.',
      
      price: 18000000,
      stock: 1,
      inStock: true,
      
      category: 'bases',
      subcategory: 'sommier-premium',
      tags: ['piero', 'sommier', 'premium', 'brown'],
      
      images: [
        '/images/products/sommier-piero-brown-1.jpg',
        '/images/products/sommier-piero-brown-2.jpg',
      ],
      
      firmness: 'FIRME',
      firmnessValue: 80,
      height: 22,
      
      warranty: 5,
      trialNights: 0,
      
      features: [
        'Marca Piero original',
        'Tapizado Brown premium',
        'Resortes de alta calidad',
        'Diseño exclusivo'
      ],
      techFeatures: [
        'Resortes Bonnell reforzados',
        'Altura: 22cm',
        'Tapizado premium antiácaros'
      ],
      highlights: [
        'Máxima calidad Piero',
        'Combinación perfecta con colchones Piero',
        'Terminación exclusiva'
      ],
      materials: ['Resortes Bonnell', 'Madera premium', 'Tapizado Brown'],
      certifications: ['IRAM'],
      
      isPremium: true,
      
      transpirability: 90,
      satisfaction: 96,
      rating: 4.8,
      reviewCount: 12,
      
      isActive: true,
      
      mainColor: '#8b4513',
      gradient: 'from-amber-100 to-orange-100',
      
      metaTitle: 'Sommier Piero Brown 140x190 | Base Premium',
      metaDescription: 'Sommier premium Piero con tapizado Brown. Calidad superior para tu colchón Piero.',
      metaKeywords: ['sommier piero', 'piero brown', 'base premium'],
      
      variants: {
        create: [
          {
            sku: 'SOMM-PIERO-BROWN-140',
            size: 'Matrimonial',
            dimensions: '140x190x22',
            width: 140,
            length: 190,
            height: 22,
            price: 18000000,
            stock: 1,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  const sommierPieroLegrand = await prisma.product.create({
    data: {
      name: 'Sommier Piero Legrand',
      slug: 'sommier-piero-legrand',
      subtitle: 'Elegancia y soporte premium',
      description: 'Sommier Piero Legrand con diseño sofisticado y estructura de resortes de alta gama. Ideal para colchones premium que requieren máximo soporte.',
      
      price: 18000000,
      stock: 4,
      inStock: true,
      
      category: 'bases',
      subcategory: 'sommier-premium',
      tags: ['piero', 'sommier', 'premium', 'legrand'],
      
      images: [
        '/images/products/sommier-piero-legrand-1.jpg',
        '/images/products/sommier-piero-legrand-2.jpg',
      ],
      
      firmness: 'FIRME',
      firmnessValue: 80,
      height: 22,
      
      warranty: 5,
      trialNights: 0,
      
      features: [
        'Línea Legrand exclusiva',
        'Diseño sofisticado',
        'Soporte de alta gama',
        'Calidad Piero garantizada'
      ],
      techFeatures: [
        'Resortes premium',
        'Altura: 22cm',
        'Tapizado exclusivo'
      ],
      highlights: [
        'Diseño elegante',
        'Máximo soporte',
        'Durabilidad superior'
      ],
      materials: ['Resortes Bonnell premium', 'Madera noble', 'Tapizado Legrand'],
      certifications: ['IRAM'],
      
      isPremium: true,
      
      transpirability: 90,
      satisfaction: 96,
      rating: 4.8,
      reviewCount: 8,
      
      isActive: true,
      
      mainColor: '#2c3e50',
      
      metaTitle: 'Sommier Piero Legrand | Base Premium Exclusiva',
      metaDescription: 'Sommier premium Piero Legrand. Diseño exclusivo con máximo soporte para tu colchón.',
      metaKeywords: ['sommier piero legrand', 'base premium', 'piero'],
      
      variants: {
        create: [
          {
            sku: 'SOMM-PIERO-LEGRAND',
            size: 'Matrimonial',
            dimensions: '140x190x22',
            width: 140,
            length: 190,
            height: 22,
            price: 18000000,
            stock: 4,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  const sommierPieroParaiso = await prisma.product.create({
    data: {
      name: 'Sommier Piero Paraíso Lila',
      slug: 'sommier-piero-paraiso-lila',
      subtitle: 'Diseño único en color lila',
      description: 'Sommier Piero Paraíso con exclusivo tapizado en tono lila. Combina elegancia, color y funcionalidad. Perfecto para dormitorios con personalidad.',
      
      price: 18000000,
      stock: 2,
      inStock: true,
      
      category: 'bases',
      subcategory: 'sommier-premium',
      tags: ['piero', 'sommier', 'premium', 'paraiso', 'lila'],
      
      images: [
        '/images/products/sommier-piero-paraiso-1.jpg',
        '/images/products/sommier-piero-paraiso-2.jpg',
      ],
      
      firmness: 'MEDIO-FIRME',
      firmnessValue: 75,
      height: 22,
      
      warranty: 5,
      trialNights: 0,
      
      features: [
        'Tapizado exclusivo color lila',
        'Diseño Paraíso único',
        'Estructura premium',
        'Calidad Piero'
      ],
      techFeatures: [
        'Resortes Bonnell',
        'Altura: 22cm',
        'Tapizado premium color lila'
      ],
      highlights: [
        'Diseño exclusivo',
        'Color distintivo',
        'Alta calidad Piero'
      ],
      materials: ['Resortes Bonnell', 'Madera reforzada', 'Tapizado lila premium'],
      certifications: ['IRAM'],
      
      isPremium: true,
      
      transpirability: 88,
      satisfaction: 94,
      rating: 4.7,
      reviewCount: 6,
      
      isActive: true,
      
      mainColor: '#9b59b6',
      gradient: 'from-purple-50 to-pink-50',
      
      metaTitle: 'Sommier Piero Paraíso Lila | Diseño Exclusivo',
      metaDescription: 'Sommier Piero Paraíso con tapizado lila exclusivo. Elegancia y calidad en un diseño único.',
      metaKeywords: ['sommier piero paraiso', 'sommier lila', 'piero'],
      
      variants: {
        create: [
          {
            sku: 'SOMM-PIERO-PARAISO-LILA',
            size: 'Matrimonial',
            dimensions: '140x190x22',
            width: 140,
            length: 190,
            height: 22,
            price: 18000000,
            stock: 2,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  const sommierPieroMontreux = await prisma.product.create({
    data: {
      name: 'Sommier Piero Montreux',
      slug: 'sommier-piero-montreux',
      subtitle: 'Lujo suizo para tu descanso',
      description: 'Sommier de la exclusiva línea Montreux de Piero. Inspirado en la elegancia suiza, combina diseño premium con máxima funcionalidad. El complemento perfecto para colchones de alta gama.',
      
      price: 18000000,
      stock: 4,
      inStock: true,
      
      category: 'bases',
      subcategory: 'sommier-premium',
      tags: ['piero', 'sommier', 'premium', 'montreux', 'lujo'],
      
      images: [
        '/images/products/sommier-piero-montreux-1.jpg',
        '/images/products/sommier-piero-montreux-2.jpg',
      ],
      
      firmness: 'FIRME',
      firmnessValue: 85,
      height: 22,
      
      warranty: 5,
      trialNights: 0,
      
      features: [
        'Línea Montreux exclusiva',
        'Inspiración suiza',
        'Máxima calidad Piero',
        'Diseño premium'
      ],
      techFeatures: [
        'Resortes Bonnell premium',
        'Altura: 22cm',
        'Tapizado Montreux exclusivo'
      ],
      highlights: [
        'Lujo europeo',
        'Máximo soporte',
        'Diseño exclusivo'
      ],
      materials: ['Resortes premium', 'Madera noble', 'Tapizado Montreux'],
      certifications: ['IRAM', 'Swiss Quality'],
      
      isPremium: true,
      isFeatured: true,
      
      transpirability: 92,
      satisfaction: 98,
      rating: 4.9,
      reviewCount: 11,
      
      isActive: true,
      badge: 'EXCLUSIVO',
      
      mainColor: '#c0392b',
      gradient: 'from-red-50 to-rose-50',
      
      metaTitle: 'Sommier Piero Montreux | Lujo Suizo Premium',
      metaDescription: 'Sommier exclusivo Piero Montreux inspirado en la elegancia suiza. El máximo en calidad y diseño.',
      metaKeywords: ['sommier piero montreux', 'sommier lujo', 'piero premium'],
      
      variants: {
        create: [
          {
            sku: 'SOMM-PIERO-MONTREUX',
            size: 'Matrimonial',
            dimensions: '140x190x22',
            width: 140,
            length: 190,
            height: 22,
            price: 18000000,
            stock: 4,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  // ============================================================================
  // 🧸 CATEGORÍA: COLCHONES DE CUNA
  // ============================================================================

  const colchonCunaMickey = await prisma.product.create({
    data: {
      name: 'Colchón de Cuna Mickey',
      slug: 'colchon-cuna-mickey',
      subtitle: 'Confort y seguridad para tu bebé',
      description: 'Colchón especialmente diseñado para cunas con diseño de Mickey Mouse. Espuma de alta densidad certificada para bebés, hipoalergénico y con funda lavable.',
      
      price: 5000000, // Base 97x65
      
      stock: 4, // Total: 2+1+1
      inStock: true,
      
      category: 'infantil',
      subcategory: 'cuna',
      tags: ['cuna', 'bebe', 'mickey', 'infantil'],
      
      images: [
        '/images/products/colchon-cuna-mickey-1.jpg',
        '/images/products/colchon-cuna-mickey-2.jpg',
      ],
      
      firmness: 'FIRME',
      firmnessValue: 85,
      height: 8,
      
      warranty: 2,
      trialNights: 30,
      
      features: [
        'Diseño Mickey Mouse',
        'Espuma certificada para bebés',
        'Hipoalergénico',
        'Funda lavable'
      ],
      techFeatures: [
        'Espuma D25 certificada',
        'Altura: 8cm',
        'Funda removible'
      ],
      highlights: [
        'Seguro para bebés',
        'Fácil limpieza',
        'Diseño infantil'
      ],
      materials: ['Espuma D25 certificada', 'Tela hipoalergénica'],
      certifications: ['Certificado para bebés'],
      
      hypoallergenic: true,
      antiMite: true,
      washable: true,
      
      transpirability: 75,
      satisfaction: 92,
      rating: 4.6,
      reviewCount: 18,
      
      isActive: true,
      
      mainColor: '#e74c3c',
      gradient: 'from-red-50 to-pink-50',
      
      metaTitle: 'Colchón de Cuna Mickey Mouse | Para Bebés',
      metaDescription: 'Colchón de cuna con diseño Mickey. Espuma certificada, hipoalergénico y lavable. Seguridad total para tu bebé.',
      metaKeywords: ['colchon cuna', 'mickey mouse', 'bebe'],
      
      variants: {
        create: [
          {
            sku: 'CUNA-MICKEY-97X65',
            size: 'Cuna estándar',
            dimensions: '97x65x8',
            width: 65,
            length: 97,
            height: 8,
            price: 5000000,
            stock: 2,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'CUNA-MICKEY-130X60',
            size: 'Cuna grande',
            dimensions: '130x60x8',
            width: 60,
            length: 130,
            height: 8,
            price: 5000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'CUNA-MICKEY-140X80',
            size: 'Cuna XL',
            dimensions: '140x80x8',
            width: 80,
            length: 140,
            height: 8,
            price: 6000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ============================================================================
  // 🛏️ CATEGORÍA: ALMOHADAS
  // ============================================================================

  const almohadaSensitiveStandard = await prisma.product.create({
    data: {
      name: 'Almohada Sensitive Standard',
      slug: 'almohada-sensitive-standard',
      subtitle: 'Confort clásico para tu descanso',
      description: 'Almohada con relleno de fibra siliconada que se adapta perfectamente a tu cabeza y cuello. Funda de algodón suave y respirable.',
      
      price: 3000000,
      stock: 6,
      inStock: true,
      
      category: 'almohadas',
      subcategory: 'standard',
      tags: ['almohada', 'sensitive', 'fibra'],
      
      images: [
        '/images/products/almohada-sensitive-1.jpg',
        '/images/products/almohada-sensitive-2.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 50,
      height: 12,
      
      warranty: 1,
      trialNights: 30,
      
      features: [
        'Fibra siliconada de calidad',
        'Funda de algodón',
        'Lavable en lavarropas',
        'Mantiene su forma'
      ],
      techFeatures: [
        'Relleno: Fibra siliconada',
        'Medida: 70x40cm',
        'Funda: 100% algodón'
      ],
      highlights: [
        'Confort adaptable',
        'Fácil mantenimiento',
        'Precio accesible'
      ],
      materials: ['Fibra siliconada', 'Algodón'],
      
      hypoallergenic: true,
      washable: true,
      
      transpirability: 80,
      satisfaction: 88,
      rating: 4.4,
      reviewCount: 42,
      
      isActive: true,
      isBestSeller: true,
      
      mainColor: '#3498db',
      
      metaTitle: 'Almohada Sensitive Standard | Confort Clásico',
      metaDescription: 'Almohada con fibra siliconada y funda de algodón. Lavable y cómoda. Calidad garantizada.',
      metaKeywords: ['almohada sensitive', 'almohada fibra', 'almohada standard'],
      
      variants: {
        create: [
          {
            sku: 'ALM-SENS-STD',
            size: 'Standard',
            dimensions: '70x40x12',
            width: 40,
            length: 70,
            height: 12,
            price: 3000000,
            stock: 6,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  const almohadaSensitiveKing = await prisma.product.create({
    data: {
      name: 'Almohada Sensitive King Milan',
      slug: 'almohada-sensitive-king-milan',
      subtitle: 'Tamaño King para máximo confort',
      description: 'Almohada King size de la línea Milan con relleno premium de fibra siliconada. Extra grande para quienes buscan más espacio y confort.',
      
      price: 5000000,
      stock: 7,
      inStock: true,
      
      category: 'almohadas',
      subcategory: 'king',
      tags: ['almohada', 'sensitive', 'king', 'milan'],
      
      images: [
        '/images/products/almohada-sensitive-king-1.jpg',
        '/images/products/almohada-sensitive-king-2.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 55,
      height: 15,
      
      warranty: 1,
      trialNights: 30,
      
      features: [
        'Tamaño King (extra grande)',
        'Fibra premium siliconada',
        'Línea Milan exclusiva',
        'Máximo confort'
      ],
      techFeatures: [
        'Relleno: Fibra Milan premium',
        'Medida: 90x50cm',
        'Funda: Algodón premium'
      ],
      highlights: [
        'Tamaño extra grande',
        'Confort superior',
        'Calidad premium'
      ],
      materials: ['Fibra Milan premium', 'Algodón premium'],
      
      hypoallergenic: true,
      washable: true,
      isPremium: true,
      
      transpirability: 82,
      satisfaction: 92,
      rating: 4.6,
      reviewCount: 28,
      
      isActive: true,
      
      mainColor: '#2980b9',
      
      metaTitle: 'Almohada Sensitive King Milan | Tamaño Extra Grande',
      metaDescription: 'Almohada King size premium con fibra Milan. Máximo confort y espacio para tu descanso.',
      metaKeywords: ['almohada king', 'sensitive milan', 'almohada grande'],
      
      variants: {
        create: [
          {
            sku: 'ALM-SENS-KING-MILAN',
            size: 'King',
            dimensions: '90x50x15',
            width: 50,
            length: 90,
            height: 15,
            price: 5000000,
            stock: 7,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  const almohadaDarling = await prisma.product.create({
    data: {
      name: 'Almohada Darling',
      slug: 'almohada-darling',
      subtitle: 'Suavidad y precio accesible',
      description: 'Almohada económica con excelente relación calidad-precio. Ideal para habitaciones de invitados o como segunda almohada.',
      
      price: 1500000,
      stock: 9,
      inStock: true,
      
      category: 'almohadas',
      subcategory: 'economica',
      tags: ['almohada', 'darling', 'economica'],
      
      images: [
        '/images/products/almohada-darling-1.jpg',
        '/images/products/almohada-darling-2.jpg',
      ],
      
      firmness: 'SUAVE',
      firmnessValue: 40,
      height: 10,
      
      warranty: 1,
      trialNights: 15,
      
      features: [
        'Precio accesible',
        'Suave y cómoda',
        'Funda de algodón',
        'Buena calidad'
      ],
      techFeatures: [
        'Relleno: Fibra',
        'Medida: 70x40cm',
        'Lavable'
      ],
      highlights: [
        'Mejor precio',
        'Calidad garantizada',
        'Ideal para invitados'
      ],
      materials: ['Fibra', 'Algodón'],
      
      hypoallergenic: true,
      washable: true,
      
      transpirability: 75,
      satisfaction: 85,
      rating: 4.2,
      reviewCount: 56,
      
      isActive: true,
      isBestSeller: true,
      
      mainColor: '#f39c12',
      
      metaTitle: 'Almohada Darling | Precio Accesible',
      metaDescription: 'Almohada económica con buena calidad. Suave y cómoda. Ideal para invitados.',
      metaKeywords: ['almohada economica', 'darling', 'almohada barata'],
      
      variants: {
        create: [
          {
            sku: 'ALM-DARLING',
            size: 'Standard',
            dimensions: '70x40x10',
            width: 40,
            length: 70,
            height: 10,
            price: 1500000,
            stock: 9,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  const almohadaConfortPlus70 = await prisma.product.create({
    data: {
      name: 'Almohada Confort Plus 70',
      slug: 'almohada-confort-plus-70',
      subtitle: 'Confort mejorado para tu descanso',
      description: 'Almohada de la línea Confort Plus con relleno de fibra mejorada que proporciona mejor soporte y adaptabilidad. Ideal para quienes buscan un equilibrio entre suavidad y firmeza.',
      
      price: 3000000,
      stock: 9,
      inStock: true,
      
      category: 'almohadas',
      subcategory: 'confort',
      tags: ['almohada', 'confort plus', 'fibra mejorada'],
      
      images: [
        '/images/products/almohada-confort-plus-1.jpg',
        '/images/products/almohada-confort-plus-2.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 60,
      height: 12,
      
      warranty: 1,
      trialNights: 30,
      
      features: [
        'Fibra mejorada Confort Plus',
        'Mejor soporte cervical',
        'Funda premium',
        'Mantiene forma por más tiempo'
      ],
      techFeatures: [
        'Relleno: Fibra Confort Plus',
        'Medida: 70x40cm',
        'Funda antiácaros'
      ],
      highlights: [
        'Mayor soporte',
        'Durabilidad superior',
        'Confort mejorado'
      ],
      materials: ['Fibra Confort Plus', 'Algodón premium'],
      
      hypoallergenic: true,
      antiMite: true,
      washable: true,
      
      transpirability: 82,
      satisfaction: 90,
      rating: 4.5,
      reviewCount: 34,
      
      isActive: true,
      
      mainColor: '#16a085',
      
      metaTitle: 'Almohada Confort Plus 70 | Soporte Mejorado',
      metaDescription: 'Almohada con fibra Confort Plus. Mayor soporte y durabilidad. Ideal para tu descanso.',
      metaKeywords: ['almohada confort plus', 'almohada soporte', 'confort plus'],
      
      variants: {
        create: [
          {
            sku: 'ALM-CONFORT-PLUS-70',
            size: 'Standard',
            dimensions: '70x40x12',
            width: 40,
            length: 70,
            height: 12,
            price: 3000000,
            stock: 9,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  const almohadaConfortPlus80 = await prisma.product.create({
    data: {
      name: 'Almohada Confort Plus 80',
      slug: 'almohada-confort-plus-80',
      subtitle: 'Tamaño grande con confort mejorado',
      description: 'Versión grande de la línea Confort Plus con 80cm de largo. Mayor espacio y confort para quienes prefieren almohadas más amplias.',
      
      price: 4000000,
      stock: 3,
      inStock: true,
      
      category: 'almohadas',
      subcategory: 'confort',
      tags: ['almohada', 'confort plus', 'grande', '80cm'],
      
      images: [
        '/images/products/almohada-confort-plus-80-1.jpg',
        '/images/products/almohada-confort-plus-80-2.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 60,
      height: 13,
      
      warranty: 1,
      trialNights: 30,
      
      features: [
        'Tamaño extra (80cm)',
        'Fibra Confort Plus mejorada',
        'Mayor espacio',
        'Soporte cervical óptimo'
      ],
      techFeatures: [
        'Relleno: Fibra Confort Plus',
        'Medida: 80x40cm',
        'Altura: 13cm'
      ],
      highlights: [
        'Tamaño grande',
        'Confort superior',
        'Durabilidad garantizada'
      ],
      materials: ['Fibra Confort Plus', 'Algodón premium'],
      
      hypoallergenic: true,
      antiMite: true,
      washable: true,
      
      transpirability: 82,
      satisfaction: 91,
      rating: 4.6,
      reviewCount: 19,
      
      isActive: true,
      
      mainColor: '#1abc9c',
      
      metaTitle: 'Almohada Confort Plus 80 | Tamaño Grande',
      metaDescription: 'Almohada Confort Plus de 80cm. Mayor espacio y confort mejorado. Calidad garantizada.',
      metaKeywords: ['almohada 80cm', 'confort plus grande', 'almohada amplia'],
      
      variants: {
        create: [
          {
            sku: 'ALM-CONFORT-PLUS-80',
            size: 'Grande',
            dimensions: '80x40x13',
            width: 40,
            length: 80,
            height: 13,
            price: 4000000,
            stock: 3,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  const almohadaCuore = await prisma.product.create({
    data: {
      name: 'Almohada Cuore',
      slug: 'almohada-cuore',
      subtitle: 'Diseñada con amor para tu descanso',
      description: 'Almohada de la línea Cuore con diseño ergonómico que se adapta perfectamente a la forma de tu cabeza y cuello. Equilibrio perfecto entre suavidad y soporte.',
      
      price: 2500000,
      stock: 17,
      inStock: true,
      
      category: 'almohadas',
      subcategory: 'ergonomica',
      tags: ['almohada', 'cuore', 'ergonomica'],
      
      images: [
        '/images/products/almohada-cuore-1.jpg',
        '/images/products/almohada-cuore-2.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 55,
      height: 11,
      
      warranty: 1,
      trialNights: 30,
      
      features: [
        'Diseño ergonómico',
        'Adaptación perfecta',
        'Fibra de calidad',
        'Confort equilibrado'
      ],
      techFeatures: [
        'Diseño ergonómico Cuore',
        'Medida: 70x40cm',
        'Relleno adaptable'
      ],
      highlights: [
        'Ergonómica',
        'Gran stock disponible',
        'Excelente relación precio-calidad'
      ],
      materials: ['Fibra ergonómica', 'Algodón suave'],
      
      hypoallergenic: true,
      washable: true,
      
      transpirability: 78,
      satisfaction: 89,
      rating: 4.5,
      reviewCount: 67,
      
      isActive: true,
      isBestSeller: true,
      
      mainColor: '#e91e63',
      gradient: 'from-pink-50 to-rose-50',
      
      metaTitle: 'Almohada Cuore | Diseño Ergonómico',
      metaDescription: 'Almohada ergonómica Cuore. Adaptación perfecta para tu descanso. Gran stock disponible.',
      metaKeywords: ['almohada cuore', 'almohada ergonomica', 'cuore'],
      
      variants: {
        create: [
          {
            sku: 'ALM-CUORE',
            size: 'Standard',
            dimensions: '70x40x11',
            width: 40,
            length: 70,
            height: 11,
            price: 2500000,
            stock: 17,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  console.log('✅ Seed de productos complementarios completado!');
  console.log('📊 Resumen:');
  console.log('- Bases y Box: 5 productos');
  console.log('- Sommiers Premium Piero: 4 productos');
  console.log('- Colchones de Cuna: 1 producto');
  console.log('- Almohadas: 6 productos');
  console.log('- Total: 16 productos complementarios');
}

export default seedComplementarios;

// Si se ejecuta directamente
if (require.main === module) {
  seedComplementarios()
    .catch((e) => {
      console.error('❌ Error en seed de complementarios:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}