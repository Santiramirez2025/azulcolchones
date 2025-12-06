// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando seed de Azul Colchones...');

  // ============================================================================
  // 🏷️ MARCA: NATURAL SOFT - Línea Económica/Media
  // ============================================================================

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 RELAX ESPUMA - Colchón de espuma básico
  // ────────────────────────────────────────────────────────────────────────────
  const relaxEspuma = await prisma.product.create({
    data: {
      name: 'Relax Espuma',
      slug: 'relax-espuma-natural-soft',
      subtitle: 'Confort esencial para tu descanso',
      description: 'Colchón de espuma de alta densidad ideal para dormitorios principales y secundarios. Ofrece un soporte firme y duradero con excelente relación calidad-precio.',
      
      price: 13000000,
      originalPrice: null,
      discount: null,
      
      stock: 41,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'espuma',
      tags: ['espuma', 'economico', 'durabilidad', 'basico'],
      
      images: [
        '/images/products/relax-espuma-1.jpg',
        '/images/products/relax-espuma-2.jpg',
      ],
      
      firmness: 'MEDIO-FIRME',
      firmnessValue: 75,
      height: 20,
      
      warranty: 5,
      trialNights: 30,
      
      features: [
        'Espuma de alta densidad',
        'Soporte firme y uniforme',
        'Tela acolchada suave',
        'Excelente durabilidad'
      ],
      techFeatures: [
        'Núcleo de espuma D28',
        'Altura total: 20cm',
        'Tela antiácaros'
      ],
      highlights: [
        'Ideal para todo tipo de durmientes',
        'Mantiene su forma por años',
        'Fácil mantenimiento'
      ],
      materials: ['Espuma poliuretano D28', 'Tela jacquard'],
      certifications: ['Certificado IRAM'],
      
      hypoallergenic: true,
      antiMite: true,
      
      transpirability: 70,
      satisfaction: 90,
      rating: 4.5,
      reviewCount: 47,
      
      isActive: true,
      isBestSeller: true,
      
      mainColor: '#4ade80',
      gradient: 'from-green-50 to-emerald-50',
      
      metaTitle: 'Colchón Relax Espuma Natural Soft | Azul Colchones',
      metaDescription: 'Colchón de espuma de alta densidad con soporte firme. Ideal para descanso duradero. Envío gratis a Villa María.',
      metaKeywords: ['colchon espuma', 'colchon economico', 'natural soft'],
      
      variants: {
        create: [
          {
            sku: 'NS-RELAX-80-20',
            size: '1 plaza',
            dimensions: '190x80x20',  // ✅ CORREGIDO
            width: 80,
            length: 190,
            height: 20,
            price: 13000000,
            stock: 12,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'NS-RELAX-90-20',
            size: '1 plaza grande',
            dimensions: '190x90x20',  // ✅ CORREGIDO
            width: 90,
            length: 190,
            height: 20,
            price: 16000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'NS-RELAX-100-20',
            size: '2 plazas',
            dimensions: '190x100x20',  // ✅ CORREGIDO
            width: 100,
            length: 190,
            height: 20,
            price: 17000000,
            stock: 5,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'NS-RELAX-80-24',
            size: '1 plaza',
            dimensions: '190x80x24',  // ✅ CORREGIDO - Era el duplicado!
            width: 80,
            length: 190,
            height: 24,
            price: 16000000,
            stock: 23,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 NS CONFORT - Línea media con mejor acolchado
  // ────────────────────────────────────────────────────────────────────────────
  const nsConfort = await prisma.product.create({
    data: {
      name: 'NS Confort',
      slug: 'ns-confort-natural-soft',
      subtitle: 'El equilibrio perfecto entre soporte y confort',
      description: 'Colchón con espuma de alta densidad y acolchado extra que proporciona un descanso confortable. Ideal para quienes buscan mayor suavidad sin perder soporte.',
      
      price: 17000000,
      originalPrice: null,
      
      stock: 6,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'espuma',
      tags: ['confort', 'acolchado', 'soporte', 'calidad'],
      
      images: [
        '/images/products/ns-confort-1.jpg',
        '/images/products/ns-confort-2.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 65,
      height: 28,
      
      warranty: 5,
      trialNights: 50,
      
      features: [
        'Doble capa de confort',
        'Acolchado suave al tacto',
        'Soporte ergonómico',
        'Transpirable'
      ],
      techFeatures: [
        'Espuma D30 + acolchado',
        'Altura: 28cm',
        'Tela premium antiácaros'
      ],
      highlights: [
        'Ideal para dormir de lado',
        'Reduce puntos de presión',
        'Mayor confort que modelos básicos'
      ],
      materials: ['Espuma D30', 'Acolchado supersoft', 'Tela jacquard premium'],
      certifications: ['IRAM', 'Oeko-Tex'],
      
      hypoallergenic: true,
      antiMite: true,
      
      transpirability: 75,
      satisfaction: 92,
      rating: 4.6,
      reviewCount: 38,
      
      isActive: true,
      
      mainColor: '#60a5fa',
      gradient: 'from-blue-50 to-sky-50',
      
      metaTitle: 'Colchón NS Confort Natural Soft | Máximo Descanso',
      metaDescription: 'Colchón con doble capa de confort y acolchado premium. Equilibrio perfecto entre suavidad y soporte.',
      metaKeywords: ['colchon confort', 'colchon acolchado', 'natural soft confort'],
      
      variants: {
        create: [
          {
            sku: 'NS-CONFORT-100-20',
            size: '2 plazas',
            dimensions: '190x100x20',
            width: 100,
            length: 190,
            height: 20,
            price: 17000000,
            stock: 4,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'NS-CONFORT-160-28',
            size: 'Queen',
            dimensions: '190x160x28',
            width: 160,
            length: 190,
            height: 28,
            price: 31000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'NS-CONFORT-180-28',
            size: 'King',
            dimensions: '200x180x28',
            width: 180,
            length: 200,
            height: 28,
            price: 35000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 NS VIRTUS - Espuma Premium
  // ────────────────────────────────────────────────────────────────────────────
  const nsVirtus = await prisma.product.create({
    data: {
      name: 'Virtus Espuma',
      slug: 'virtus-espuma-natural-soft',
      subtitle: 'Espuma de alta gama para descanso superior',
      description: 'Colchón premium de espuma con tecnología multicapa que ofrece adaptabilidad y soporte excepcional. Perfecto para quienes valoran la calidad del descanso.',
      
      price: 19000000,
      
      stock: 5,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'espuma-premium',
      tags: ['premium', 'virtus', 'alta-densidad', 'durabilidad'],
      
      images: [
        '/images/products/virtus-1.jpg',
        '/images/products/virtus-2.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 70,
      height: 26,
      
      warranty: 7,
      trialNights: 60,
      
      features: [
        'Espuma de alta resilencia',
        'Sistema multicapa',
        'Adaptación corporal perfecta',
        'Larga vida útil'
      ],
      techFeatures: [
        'Espuma HR D35',
        'Altura: 26cm',
        'Sistema anti-humedad'
      ],
      highlights: [
        'Máxima durabilidad',
        'No deforma con el tiempo',
        'Ideal para todas las posiciones'
      ],
      materials: ['Espuma HR D35', 'Tela Coolmax'],
      certifications: ['IRAM', 'Oeko-Tex', 'ISO 9001'],
      
      hypoallergenic: true,
      antiMite: true,
      isPremium: true,
      
      transpirability: 80,
      satisfaction: 95,
      rating: 4.8,
      reviewCount: 29,
      
      isActive: true,
      
      mainColor: '#a78bfa',
      gradient: 'from-purple-50 to-violet-50',
      
      metaTitle: 'Colchón Virtus Espuma Premium | Natural Soft',
      metaDescription: 'Espuma de alta resilencia con sistema multicapa. El colchón premium que no se deforma.',
      metaKeywords: ['virtus', 'espuma premium', 'alta densidad'],
      
      variants: {
        create: [
          {
            sku: 'NS-VIRTUS-90-26',
            size: '1 plaza grande',
            dimensions: '190x90x26',
            width: 90,
            length: 190,
            height: 26,
            price: 17000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'NS-VIRTUS-100-26',
            size: '2 plazas',
            dimensions: '190x100x26',
            width: 100,
            length: 190,
            height: 26,
            price: 19000000,
            stock: 3,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'NS-VIRTUS-140-26',
            size: 'Matrimonial',
            dimensions: '190x140x26',
            width: 140,
            length: 190,
            height: 26,
            price: 26000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 NS RELAX (140cm) - Modelo matrimonial específico
  // ────────────────────────────────────────────────────────────────────────────
  const nsRelax140 = await prisma.product.create({
    data: {
      name: 'NS Relax Matrimonial',
      slug: 'ns-relax-matrimonial',
      subtitle: 'Diseñado especialmente para parejas',
      description: 'Colchón matrimonial con espuma especial que minimiza la transmisión de movimiento. Perfecto para que ambos descansen sin interrupciones.',
      
      price: 21000000,
      stock: 7,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'matrimonial',
      tags: ['matrimonial', 'parejas', 'espuma', 'independencia'],
      
      images: [
        '/images/products/ns-relax-140-1.jpg',
        '/images/products/ns-relax-140-2.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 68,
      height: 20,
      
      warranty: 5,
      trialNights: 50,
      
      features: [
        'Independencia de lechos',
        'Mínima transmisión de movimiento',
        'Soporte equilibrado',
        'Espuma de calidad'
      ],
      techFeatures: [
        'Espuma D28 especial',
        'Altura: 20cm',
        'Refuerzos perimetrales'
      ],
      highlights: [
        'Ideal para parejas',
        'Cada uno duerme sin molestar al otro',
        'Precio accesible para matrimonial'
      ],
      materials: ['Espuma D28', 'Tela jacquard'],
      
      hypoallergenic: true,
      antiMite: true,
      
      transpirability: 72,
      satisfaction: 91,
      rating: 4.5,
      reviewCount: 52,
      
      isActive: true,
      isBestSeller: true,
      
      mainColor: '#34d399',
      
      metaTitle: 'Colchón Matrimonial NS Relax | Para Parejas',
      metaDescription: 'Colchón matrimonial 140cm con independencia de lechos. Ideal para parejas que buscan descanso sin interrupciones.',
      metaKeywords: ['colchon matrimonial', 'colchon parejas', '140cm'],
      
      variants: {
        create: [
          {
            sku: 'NS-RELAX-140-20',
            size: 'Matrimonial',
            dimensions: '190x140x20',
            width: 140,
            length: 190,
            height: 20,
            price: 21000000,
            stock: 7,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 CONFOBOX - Colchón + Box en uno
  // ────────────────────────────────────────────────────────────────────────────
  const confobox = await prisma.product.create({
    data: {
      name: 'ConfoBox',
      slug: 'confobox-natural-soft',
      subtitle: 'Colchón y base en una sola pieza',
      description: 'Sistema completo de descanso que combina colchón y box en una solución práctica. Ahorra espacio y ofrece confort inmediato.',
      
      price: 35000000,
      stock: 2,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'box-incluido',
      tags: ['box', 'completo', 'practico', 'todo-en-uno'],
      
      images: [
        '/images/products/confobox-1.jpg',
        '/images/products/confobox-2.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 70,
      height: 35,
      
      warranty: 5,
      trialNights: 60,
      includesBase: true,
      
      features: [
        'Colchón + base integrados',
        'Listo para usar',
        'Ahorro de espacio',
        'Sistema completo'
      ],
      techFeatures: [
        'Altura total: 35cm',
        'Base reforzada',
        'Espuma multicapa'
      ],
      highlights: [
        'Solución todo-en-uno',
        'No necesitas sommier',
        'Fácil instalación'
      ],
      materials: ['Espuma D30', 'Base estructural', 'Tela premium'],
      
      hypoallergenic: true,
      
      transpirability: 75,
      satisfaction: 88,
      rating: 4.4,
      reviewCount: 15,
      
      isActive: true,
      badge: 'COMPLETO',
      
      mainColor: '#f59e0b',
      
      metaTitle: 'ConfoBox Natural Soft | Colchón + Base',
      metaDescription: 'Sistema completo de descanso. Colchón y base en una sola pieza. Listo para usar.',
      metaKeywords: ['confobox', 'colchon con base', 'todo en uno'],
      
      variants: {
        create: [
          {
            sku: 'NS-CONFOBOX-140',
            size: 'Matrimonial',
            dimensions: '190x140x35',
            width: 140,
            length: 190,
            height: 35,
            price: 35000000,
            stock: 2,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 NS CONFORT 200 - Tamaño King especial
  // ────────────────────────────────────────────────────────────────────────────
  const nsConfort200 = await prisma.product.create({
    data: {
      name: 'NS Confort King',
      slug: 'ns-confort-king',
      subtitle: 'Máximo espacio, máximo confort',
      description: 'Colchón King size con sistema de confort avanzado. Para quienes no negocian en espacio y calidad de descanso.',
      
      price: 39000000,
      stock: 1,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'king-size',
      tags: ['king', 'grande', 'premium', 'espacioso'],
      
      images: [
        '/images/products/ns-confort-king-1.jpg',
        '/images/products/ns-confort-king-2.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 65,
      height: 28,
      
      warranty: 7,
      trialNights: 60,
      
      features: [
        'Tamaño King (200x200)',
        'Espacio sin límites',
        'Confort premium',
        'Para dormitorios amplios'
      ],
      techFeatures: [
        'Espuma D30 premium',
        'Altura: 28cm',
        'Refuerzos estructurales'
      ],
      highlights: [
        'El más espacioso',
        'Ideal para familias',
        'Máximo confort'
      ],
      materials: ['Espuma D30', 'Acolchado premium', 'Tela Coolmax'],
      certifications: ['IRAM', 'Oeko-Tex'],
      
      hypoallergenic: true,
      antiMite: true,
      isPremium: true,
      
      transpirability: 78,
      satisfaction: 96,
      rating: 4.9,
      reviewCount: 8,
      
      isActive: true,
      badge: 'KING SIZE',
      
      mainColor: '#8b5cf6',
      
      metaTitle: 'Colchón King NS Confort | 200x200cm',
      metaDescription: 'Colchón King size premium con máximo espacio y confort. Ideal para dormitorios amplios.',
      metaKeywords: ['colchon king', '200x200', 'king size'],
      
      variants: {
        create: [
          {
            sku: 'NS-CONFORT-200-28',
            size: 'King',
            dimensions: '200x200x28',
            width: 200,
            length: 200,
            height: 28,
            price: 39000000,
            stock: 1,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  // ============================================================================
  // 🏷️ MARCA: PIERO - Línea Premium
  // ============================================================================

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 FUNCIONAL 2D - Económico de Piero
  // ────────────────────────────────────────────────────────────────────────────
  const funcional2d = await prisma.product.create({
    data: {
      name: 'Funcional 2D',
      slug: 'funcional-2d-piero',
      subtitle: 'La entrada a la calidad Piero',
      description: 'Colchón de resortes bicónicos con acolchado en ambas caras. La opción perfecta para iniciar en la marca Piero con garantía de calidad.',
      
      price: 13000000,
      stock: 1,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'resortes',
      tags: ['piero', 'resortes', 'economico', 'doble-cara'],
      
      images: [
        '/images/products/funcional-2d-1.jpg',
        '/images/products/funcional-2d-2.jpg',
      ],
      
      firmness: 'FIRME',
      firmnessValue: 80,
      height: 18,
      
      warranty: 5,
      trialNights: 30,
      
      features: [
        'Resortes bicónicos',
        'Doble cara utilizable',
        'Acolchado firme',
        'Marca Piero'
      ],
      techFeatures: [
        'Sistema biconico 2.0',
        'Altura: 18cm',
        'Refuerzos laterales'
      ],
      highlights: [
        'Precio accesible marca premium',
        'Durabilidad garantizada',
        'Soporte ortopédico'
      ],
      materials: ['Resortes bicónicos', 'Espuma perimetral', 'Tela jacquard'],
      certifications: ['IRAM'],
      
      hypoallergenic: true,
      
      transpirability: 85,
      satisfaction: 89,
      rating: 4.3,
      reviewCount: 34,
      
      isActive: true,
      
      mainColor: '#ef4444',
      gradient: 'from-red-50 to-rose-50',
      
      metaTitle: 'Colchón Funcional 2D Piero | Resortes Económico',
      metaDescription: 'Colchón de resortes bicónicos doble cara. Calidad Piero a precio accesible.',
      metaKeywords: ['piero funcional', 'resortes economico', 'doble cara'],
      
      variants: {
        create: [
          {
            sku: 'PIERO-FUNC2D-80',
            size: '1 plaza',
            dimensions: '190x80x18',
            width: 80,
            length: 190,
            height: 18,
            price: 13000000,
            stock: 1,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 MEDITARE - Línea media-alta Piero
  // ────────────────────────────────────────────────────────────────────────────
  const meditare = await prisma.product.create({
    data: {
      name: 'Meditare',
      slug: 'meditare-piero',
      subtitle: 'Equilibrio perfecto para tu descanso',
      description: 'Colchón con tecnología de resortes pocket que se adapta individualmente a cada punto de tu cuerpo. Diseñado para un descanso reparador y sin interrupciones.',
      
      price: 21000000,
      
      stock: 15,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'pocket',
      tags: ['piero', 'pocket', 'adaptable', 'parejas'],
      
      images: [
        '/images/products/meditare-1.jpg',
        '/images/products/meditare-2.jpg',
        '/images/products/meditare-3.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 65,
      height: 24,
      
      warranty: 10,
      trialNights: 100,
      
      features: [
        'Resortes individuales Pocket',
        'Independencia de lechos',
        'Adaptación anatómica',
        'Mínima transferencia de movimiento'
      ],
      techFeatures: [
        'Sistema Pocket Pro',
        '600 resortes individuales (Queen)',
        'Espuma viscoelástica',
        'Altura: 24cm'
      ],
      highlights: [
        'Ideal para parejas',
        'Cada resorte se mueve independientemente',
        'Tecnología de punta'
      ],
      materials: ['Resortes pocket', 'Viscoelástico', 'Tela premium Piero'],
      certifications: ['IRAM', 'Oeko-Tex', 'ISO 9001'],
      
      hypoallergenic: true,
      antiMite: true,
      isPremium: true,
      
      transpirability: 88,
      satisfaction: 96,
      rating: 4.8,
      reviewCount: 142,
      
      isActive: true,
      isBestSeller: true,
      badge: 'MÁS VENDIDO',
      
      mainColor: '#3b82f6',
      gradient: 'from-blue-100 to-indigo-100',
      
      metaTitle: 'Colchón Meditare Piero | Resortes Pocket Premium',
      metaDescription: 'Colchón con resortes individuales pocket. Adaptación perfecta e independencia de lechos. 10 años de garantía.',
      metaKeywords: ['meditare piero', 'pocket', 'resortes individuales'],
      
      variants: {
        create: [
          {
            sku: 'PIERO-MEDIT-80',
            size: '1 plaza',
            dimensions: '190x80x24',
            width: 80,
            length: 190,
            height: 24,
            price: 21000000,
            stock: 4,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'PIERO-MEDIT-90',
            size: '1 plaza grande',
            dimensions: '190x90x24',
            width: 90,
            length: 190,
            height: 24,
            price: 23000000,
            stock: 2,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'PIERO-MEDIT-100',
            size: '2 plazas',
            dimensions: '190x100x24',
            width: 100,
            length: 190,
            height: 24,
            price: 23000000,
            stock: 2,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'PIERO-MEDIT-130',
            size: 'Matrimonial chico',
            dimensions: '190x130x24',
            width: 130,
            length: 190,
            height: 24,
            price: 32000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'PIERO-MEDIT-140',
            size: 'Matrimonial',
            dimensions: '190x140x24',
            width: 140,
            length: 190,
            height: 24,
            price: 35000000,
            stock: 5,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 SONNO - Alta gama con viscoelástico
  // ────────────────────────────────────────────────────────────────────────────
  const sonno = await prisma.product.create({
    data: {
      name: 'Sonno',
      slug: 'sonno-piero',
      subtitle: 'Descanso de ensueño con viscoelástico',
      description: 'Colchón premium que combina resortes pocket con capa de viscoelástico importado. La combinación perfecta de soporte y confort envolvente para un sueño reparador.',
      
      price: 28000000,
      
      stock: 15,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'viscoelastico',
      tags: ['piero', 'viscoelastico', 'premium', 'pocket'],
      
      images: [
        '/images/products/sonno-1.jpg',
        '/images/products/sonno-2.jpg',
        '/images/products/sonno-3.jpg',
      ],
      
      firmness: 'MEDIO-SUAVE',
      firmnessValue: 55,
      height: 28,
      
      warranty: 12,
      trialNights: 100,
      cooling: true,
      
      features: [
        'Viscoelástico importado premium',
        'Resortes pocket de alta densidad',
        'Sistema de enfriamiento',
        'Adaptación total al cuerpo'
      ],
      techFeatures: [
        '5cm de viscoelástico',
        '800 resortes pocket (Queen)',
        'Tecnología Cool Touch',
        'Altura: 28cm'
      ],
      highlights: [
        'Elimina puntos de presión',
        'Sensación de ingravidez',
        'Para quienes buscan lo mejor'
      ],
      materials: [
        'Viscoelástico NASA',
        'Resortes pocket premium',
        'Tela Coolmax',
        'Espuma gel'
      ],
      certifications: ['IRAM', 'Oeko-Tex', 'ISO 9001', 'CertiPUR'],
      
      hypoallergenic: true,
      antiMite: true,
      isPremium: true,
      
      transpirability: 90,
      satisfaction: 98,
      rating: 4.9,
      reviewCount: 187,
      
      isActive: true,
      isBestSeller: true,
      isFeatured: true,
      badge: 'PREMIUM',
      
      mainColor: '#8b5cf6',
      gradient: 'from-purple-100 to-pink-100',
      
      metaTitle: 'Colchón Sonno Piero | Viscoelástico + Pocket Premium',
      metaDescription: 'Colchón premium con viscoelástico NASA y resortes pocket. El mejor descanso que puedes tener. 12 años de garantía.',
      metaKeywords: ['sonno piero', 'viscoelastico', 'premium', 'mejor colchon'],
      
      variants: {
        create: [
          {
            sku: 'PIERO-SONNO-80',
            size: '1 plaza',
            dimensions: '190x80x28',
            width: 80,
            length: 190,
            height: 28,
            price: 28000000,
            stock: 2,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'PIERO-SONNO-90',
            size: '1 plaza grande',
            dimensions: '190x90x28',
            width: 90,
            length: 190,
            height: 28,
            price: 30000000,
            stock: 4,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'PIERO-SONNO-100',
            size: '2 plazas',
            dimensions: '190x100x28',
            width: 100,
            length: 190,
            height: 28,
            price: 30000000,
            stock: 4,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'PIERO-SONNO-130',
            size: 'Matrimonial chico',
            dimensions: '190x130x28',
            width: 130,
            length: 190,
            height: 28,
            price: 43000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'PIERO-SONNO-140',
            size: 'Matrimonial',
            dimensions: '190x140x28',
            width: 140,
            length: 190,
            height: 28,
            price: 46000000,
            stock: 2,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'PIERO-SONNO-160',
            size: 'Queen',
            dimensions: '190x160x28',
            width: 160,
            length: 190,
            height: 28,
            price: 50000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 FOAM - Espuma de alta gama Piero
  // ────────────────────────────────────────────────────────────────────────────
  const foam = await prisma.product.create({
    data: {
      name: 'Foam Premium',
      slug: 'foam-premium-piero',
      subtitle: 'Espuma de última generación',
      description: 'Colchón de espuma premium con múltiples capas de confort. Tecnología de punta sin resortes, para quienes prefieren la adaptabilidad total de la espuma de alta densidad.',
      
      price: 35000000,
      stock: 3,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'espuma-premium',
      tags: ['piero', 'foam', 'espuma', 'sin-resortes'],
      
      images: [
        '/images/products/foam-1.jpg',
        '/images/products/foam-2.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 60,
      height: 26,
      
      warranty: 10,
      trialNights: 100,
      
      features: [
        'Espuma multicapa de alta densidad',
        'Sin resortes metálicos',
        'Adaptación progresiva',
        'Silencioso total'
      ],
      techFeatures: [
        'Espuma HR D40 + D35',
        'Sistema tri-capa',
        'Altura: 26cm',
        'Certificado CertiPUR'
      ],
      highlights: [
        'Cero ruidos',
        'Ideal para alérgicos al metal',
        'Confort envolvente'
      ],
      materials: ['Espuma HR D40', 'Espuma confort D35', 'Tela premium'],
      certifications: ['IRAM', 'CertiPUR', 'Oeko-Tex'],
      
      hypoallergenic: true,
      antiMite: true,
      isPremium: true,
      
      transpirability: 82,
      satisfaction: 94,
      rating: 4.7,
      reviewCount: 56,
      
      isActive: true,
      
      mainColor: '#06b6d4',
      gradient: 'from-cyan-50 to-blue-50',
      
      metaTitle: 'Colchón Foam Premium Piero | Espuma Alta Gama',
      metaDescription: 'Colchón de espuma premium multicapa sin resortes. Silencioso, adaptable y duradero.',
      metaKeywords: ['foam piero', 'espuma premium', 'sin resortes'],
      
      variants: {
        create: [
          {
            sku: 'PIERO-FOAM-140',
            size: 'Matrimonial',
            dimensions: '190x140x26',
            width: 140,
            length: 190,
            height: 26,
            price: 35000000,
            stock: 2,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'PIERO-FOAM-160',
            size: 'Queen',
            dimensions: '190x160x26',
            width: 160,
            length: 190,
            height: 26,
            price: 38000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 SPRING 160 - Específico Queen con resortes
  // ────────────────────────────────────────────────────────────────────────────
  const spring160 = await prisma.product.create({
    data: {
      name: 'Spring Queen',
      slug: 'spring-queen-piero',
      subtitle: 'Resortes tradicionales tamaño Queen',
      description: 'Colchón Queen con sistema de resortes continuos que ofrece soporte firme y uniforme. Ideal para quienes prefieren la firmeza tradicional.',
      
      price: 50000000,
      stock: 1,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'resortes',
      tags: ['piero', 'queen', 'resortes', 'firme'],
      
      images: [
        '/images/products/spring-1.jpg',
        '/images/products/spring-2.jpg',
      ],
      
      firmness: 'FIRME',
      firmnessValue: 85,
      height: 25,
      
      warranty: 8,
      trialNights: 60,
      
      features: [
        'Sistema de resortes continuos',
        'Soporte firme',
        'Tamaño Queen',
        'Durabilidad extrema'
      ],
      techFeatures: [
        'Resortes Bonnell reforzados',
        'Altura: 25cm',
        'Borde foam perimetral'
      ],
      highlights: [
        'Para quienes buscan firmeza',
        'No se hunde con el tiempo',
        'Excelente ventilación'
      ],
      materials: ['Resortes Bonnell', 'Espuma perimetral', 'Tela Piero'],
      
      hypoallergenic: true,
      
      transpirability: 92,
      satisfaction: 91,
      rating: 4.6,
      reviewCount: 23,
      
      isActive: true,
      
      mainColor: '#f97316',
      
      metaTitle: 'Colchón Spring Queen Piero | Resortes Firme',
      metaDescription: 'Colchón Queen con resortes continuos. Soporte firme y tradicional de calidad Piero.',
      metaKeywords: ['spring queen', 'resortes firme', 'piero queen'],
      
      variants: {
        create: [
          {
            sku: 'PIERO-SPRING-160',
            size: 'Queen',
            dimensions: '190x160x25',
            width: 160,
            length: 190,
            height: 25,
            price: 50000000,
            stock: 1,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 NAMASTE - Premium con tecnología avanzada
  // ────────────────────────────────────────────────────────────────────────────
  const namaste = await prisma.product.create({
    data: {
      name: 'Namaste',
      slug: 'namaste-piero',
      subtitle: 'Armonía total para tu descanso',
      description: 'Colchón de alta gama con tecnología multicapa que combina pocket, viscoelástico y gel refrigerante. Diseñado para ofrecer la experiencia de descanso definitiva.',
      
      price: 53000000,
      stock: 1,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'alta-gama',
      tags: ['piero', 'premium', 'gel', 'cooling'],
      
      images: [
        '/images/products/namaste-1.jpg',
        '/images/products/namaste-2.jpg',
        '/images/products/namaste-3.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 60,
      height: 32,
      
      warranty: 15,
      trialNights: 120,
      cooling: true,
      
      features: [
        'Gel refrigerante de última generación',
        'Resortes micro-pocket HD',
        'Viscoelástico de memoria',
        'Sistema de climatización'
      ],
      techFeatures: [
        'Capa gel refrigerante 3cm',
        'Viscoelástico 4cm',
        '1000 micro-pocket (Queen)',
        'Altura: 32cm'
      ],
      highlights: [
        'Temperatura perfecta toda la noche',
        'Máximo nivel de adaptación',
        'Tecnología hotelera 5 estrellas'
      ],
      materials: [
        'Gel refrigerante',
        'Viscoelástico premium',
        'Micro-pocket HD',
        'Tela Silver Touch'
      ],
      certifications: ['IRAM', 'Oeko-Tex', 'ISO 9001', 'CertiPUR', 'NASA Tech'],
      
      hypoallergenic: true,
      antiMite: true,
      isPremium: true,
      
      transpirability: 95,
      satisfaction: 99,
      rating: 5.0,
      reviewCount: 42,
      
      isActive: true,
      isFeatured: true,
      badge: 'ALTA GAMA',
      
      mainColor: '#10b981',
      gradient: 'from-emerald-100 to-teal-100',
      
      metaTitle: 'Colchón Namaste Piero | Tecnología Gel + Viscoelástico',
      metaDescription: 'Colchón de alta gama con gel refrigerante y micro-pocket. La experiencia de descanso definitiva. 15 años de garantía.',
      metaKeywords: ['namaste piero', 'gel refrigerante', 'alta gama'],
      
      variants: {
        create: [
          {
            sku: 'PIERO-NAMASTE-160',
            size: 'Queen',
            dimensions: '190x160x32',
            width: 160,
            length: 190,
            height: 32,
            price: 53000000,
            stock: 1,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 PIERO BOX - Sistema completo Piero
  // ────────────────────────────────────────────────────────────────────────────
  const pieroBox = await prisma.product.create({
    data: {
      name: 'Piero Box',
      slug: 'piero-box',
      subtitle: 'Sistema completo de descanso premium',
      description: 'Solución completa de la marca Piero que integra colchón premium con base reforzada. Todo lo que necesitas en una sola compra.',
      
      price: 53000000,
      stock: 1,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'box-incluido',
      tags: ['piero', 'box', 'completo', 'premium'],
      
      images: [
        '/images/products/piero-box-1.jpg',
        '/images/products/piero-box-2.jpg',
      ],
      
      firmness: 'MEDIO-FIRME',
      firmnessValue: 72,
      height: 45,
      
      warranty: 10,
      trialNights: 100,
      includesBase: true,
      
      features: [
        'Colchón Piero + base premium',
        'Resortes pocket',
        'Base reforzada',
        'Listo para usar'
      ],
      techFeatures: [
        'Altura total: 45cm',
        'Base estructural reforzada',
        'Pocket + viscoelástico'
      ],
      highlights: [
        'Solución completa premium',
        'No necesitas sommier',
        'Calidad Piero integral'
      ],
      materials: ['Pocket premium', 'Viscoelástico', 'Base reforzada', 'Tela Piero'],
      certifications: ['IRAM', 'Oeko-Tex'],
      
      hypoallergenic: true,
      isPremium: true,
      
      transpirability: 85,
      satisfaction: 96,
      rating: 4.8,
      reviewCount: 18,
      
      isActive: true,
      badge: 'COMPLETO',
      
      mainColor: '#dc2626',
      
      metaTitle: 'Piero Box | Sistema Completo Colchón + Base',
      metaDescription: 'Sistema completo premium Piero. Colchón con resortes pocket y base reforzada. Todo en uno.',
      metaKeywords: ['piero box', 'sistema completo', 'colchon con base'],
      
      variants: {
        create: [
          {
            sku: 'PIERO-BOX-160',
            size: 'Queen',
            dimensions: '190x160x45',
            width: 160,
            length: 190,
            height: 45,
            price: 53000000,
            stock: 1,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 NIRVANA - Ultra premium con pillow top
  // ────────────────────────────────────────────────────────────────────────────
  const nirvana = await prisma.product.create({
    data: {
      name: 'Nirvana',
      slug: 'nirvana-piero',
      subtitle: 'El punto más alto del descanso',
      description: 'Colchón ultra premium con pillow top europeo. Combina lo mejor de cada tecnología: micro-pocket, viscoelástico, gel y un acolchado superior de lujo.',
      
      price: 54000000,
      stock: 4,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'ultra-premium',
      tags: ['piero', 'pillow-top', 'ultra-premium', 'lujo'],
      
      images: [
        '/images/products/nirvana-1.jpg',
        '/images/products/nirvana-2.jpg',
        '/images/products/nirvana-3.jpg',
      ],
      
      firmness: 'SUAVE-MEDIO',
      firmnessValue: 50,
      height: 35,
      
      warranty: 20,
      trialNights: 120,
      cooling: true,
      pillowTop: true,
      
      features: [
        'Pillow Top europeo de 8cm',
        'Micro-pocket de alta densidad',
        'Viscoelástico gel premium',
        'Sistema de termorregulación'
      ],
      techFeatures: [
        'Pillow top 8cm',
        'Gel + viscoelástico 6cm',
        '1200 micro-pocket (Queen)',
        'Altura: 35cm',
        'Tecnología Climate Control'
      ],
      highlights: [
        'Sensación de dormir en las nubes',
        'La máxima expresión del lujo',
        'Como dormir en un hotel 5 estrellas'
      ],
      materials: [
        'Pillow top europeo',
        'Gel refrigerante premium',
        'Viscoelástico NASA',
        'Micro-pocket platinum',
        'Cashmere blend'
      ],
      certifications: [
        'IRAM',
        'Oeko-Tex',
        'ISO 9001',
        'CertiPUR',
        'European Pillow Top Certified'
      ],
      
      hypoallergenic: true,
      antiMite: true,
      isPremium: true,
      
      transpirability: 98,
      satisfaction: 99,
      rating: 5.0,
      reviewCount: 67,
      
      isActive: true,
      isFeatured: true,
      badge: 'ULTRA PREMIUM',
      
      mainColor: '#a855f7',
      gradient: 'from-purple-100 via-pink-100 to-rose-100',
      
      metaTitle: 'Colchón Nirvana Piero | Ultra Premium Pillow Top',
      metaDescription: 'El colchón más exclusivo de Piero. Pillow top europeo con gel, viscoelástico y micro-pocket. 20 años de garantía.',
      metaKeywords: ['nirvana piero', 'pillow top', 'ultra premium', 'lujo'],
      
      variants: {
        create: [
          {
            sku: 'PIERO-NIRVANA-140',
            size: 'Matrimonial',
            dimensions: '190x140x35',
            width: 140,
            length: 190,
            height: 35,
            price: 54000000,
            stock: 1,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'PIERO-NIRVANA-160',
            size: 'Queen',
            dimensions: '190x160x35',
            width: 160,
            length: 190,
            height: 35,
            price: 69000000,
            stock: 2,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'PIERO-NIRVANA-200',
            size: 'King',
            dimensions: '200x200x35',
            width: 200,
            length: 200,
            height: 35,
            price: 82000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 REGNO PILLOW - Premium con pillow top
  // ────────────────────────────────────────────────────────────────────────────
  const regnoPillow = await prisma.product.create({
    data: {
      name: 'Regno Pillow',
      slug: 'regno-pillow-piero',
      subtitle: 'Realeza en confort',
      description: 'Colchón de la línea Regno con pillow top integrado. Ofrece un balance perfecto entre soporte estructural y confort superficial envolvente.',
      
      price: 57000000,
      stock: 4,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'pillow-premium',
      tags: ['piero', 'regno', 'pillow-top', 'premium'],
      
      images: [
        '/images/products/regno-pillow-1.jpg',
        '/images/products/regno-pillow-2.jpg',
        '/images/products/regno-pillow-3.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 58,
      height: 32,
      
      warranty: 15,
      trialNights: 100,
      pillowTop: true,
      
      features: [
        'Pillow Top integrado',
        'Sistema Regno de resortes',
        'Doble capa de confort',
        'Bordado premium'
      ],
      techFeatures: [
        'Pillow top 5cm',
        'Resortes Pocket HD',
        'Viscoelástico 3cm',
        'Altura: 32cm'
      ],
      highlights: [
        'Sensación de hotel boutique',
        'Perfecto para todas las posiciones',
        'Elegancia y confort'
      ],
      materials: [
        'Pillow top premium',
        'Pocket HD',
        'Viscoelástico',
        'Tela jacquard bordada'
      ],
      certifications: ['IRAM', 'Oeko-Tex', 'CertiPUR'],
      
      hypoallergenic: true,
      antiMite: true,
      isPremium: true,
      
      transpirability: 88,
      satisfaction: 97,
      rating: 4.9,
      reviewCount: 74,
      
      isActive: true,
      isFeatured: true,
      badge: 'PILLOW TOP',
      
      mainColor: '#f59e0b',
      gradient: 'from-amber-100 to-orange-100',
      
      metaTitle: 'Colchón Regno Pillow Piero | Premium con Pillow Top',
      metaDescription: 'Colchón premium Regno con pillow top integrado. Confort superficial con soporte estructural. 15 años de garantía.',
      metaKeywords: ['regno pillow', 'pillow top piero', 'premium'],
      
      variants: {
        create: [
          {
            sku: 'PIERO-REGNO-140',
            size: 'Matrimonial',
            dimensions: '190x140x32',
            width: 140,
            length: 190,
            height: 32,
            price: 57000000,
            stock: 1,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'PIERO-REGNO-160',
            size: 'Queen',
            dimensions: '190x160x32',
            width: 160,
            length: 190,
            height: 32,
            price: 65000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'PIERO-REGNO-180',
            size: 'Super King',
            dimensions: '200x180x32',
            width: 180,
            length: 200,
            height: 32,
            price: 72000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'PIERO-REGNO-200',
            size: 'King',
            dimensions: '200x200x32',
            width: 200,
            length: 200,
            height: 32,
            price: 79000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 GRAVITA - Tecnología anti-gravedad
  // ────────────────────────────────────────────────────────────────────────────
  const gravita = await prisma.product.create({
    data: {
      name: 'Gravita',
      slug: 'gravita-piero',
      subtitle: 'Desafía la gravedad en tu descanso',
      description: 'Colchón con tecnología anti-gravedad que distribuye el peso de forma perfecta. Combina micro-pocket de alta densidad con capas de gel y viscoelástico de última generación.',
      
      price: 74000000,
      stock: 3,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'tecnologia-avanzada',
      tags: ['piero', 'anti-gravedad', 'tecnologia', 'premium'],
      
      images: [
        '/images/products/gravita-1.jpg',
        '/images/products/gravita-2.jpg',
        '/images/products/gravita-3.jpg',
      ],
      
      firmness: 'MEDIO',
      firmnessValue: 55,
      height: 34,
      
      warranty: 20,
      trialNights: 120,
      cooling: true,
      
      features: [
        'Tecnología anti-gravedad',
        'Distribución perfecta del peso',
        'Micro-pocket de 7 zonas',
        'Sistema de flotación'
      ],
      techFeatures: [
        'Sistema Anti-Gravity Pro',
        'Gel inteligente 4cm',
        '1400 micro-pocket (Queen)',
        'Viscoelástico de memoria 5cm',
        'Altura: 34cm'
      ],
      highlights: [
        'Sensación de ingravidez',
        'Cero puntos de presión',
        'Tecnología espacial aplicada'
      ],
      materials: [
        'Gel inteligente anti-gravedad',
        'Viscoelástico memoria espacial',
        'Micro-pocket 7 zonas',
        'Tela Platinum Touch'
      ],
      certifications: [
        'IRAM',
        'Oeko-Tex',
        'CertiPUR',
        'NASA Technology',
        'Anti-Gravity Certified'
      ],
      
      hypoallergenic: true,
      antiMite: true,
      isPremium: true,
      
      transpirability: 96,
      satisfaction: 99,
      rating: 5.0,
      reviewCount: 41,
      
      isActive: true,
      isFeatured: true,
      badge: 'TECNOLOGÍA NASA',
      
      mainColor: '#6366f1',
      gradient: 'from-indigo-100 via-purple-100 to-blue-100',
      
      metaTitle: 'Colchón Gravita Piero | Tecnología Anti-Gravedad',
      metaDescription: 'Colchón con tecnología anti-gravedad y gel inteligente. Sensación de ingravidez y cero puntos de presión. 20 años de garantía.',
      metaKeywords: ['gravita piero', 'anti-gravedad', 'tecnologia nasa'],
      
      variants: {
        create: [
          {
            sku: 'PIERO-GRAVITA-140',
            size: 'Matrimonial',
            dimensions: '190x140x34',
            width: 140,
            length: 190,
            height: 34,
            price: 74000000,
            stock: 2,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'PIERO-GRAVITA-160',
            size: 'Queen',
            dimensions: '190x160x34',
            width: 160,
            length: 190,
            height: 34,
            price: 90000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 MONTREUX CON PILLOW - El más exclusivo
  // ────────────────────────────────────────────────────────────────────────────
  const montreuxPillow = await prisma.product.create({
    data: {
      name: 'Montreux Pillow',
      slug: 'montreux-pillow-piero',
      subtitle: 'La obra maestra del descanso',
      description: 'El colchón más exclusivo de Piero. Inspirado en los resorts suizos de lujo, combina todas las tecnologías premium: pillow top europeo, gel inteligente, viscoelástico de memoria y micro-pocket platinum.',
      
      price: 97000000,
      stock: 4,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'coleccion-exclusiva',
      tags: ['piero', 'montreux', 'exclusivo', 'lujo-supremo'],
      
      images: [
        '/images/products/montreux-1.jpg',
        '/images/products/montreux-2.jpg',
        '/images/products/montreux-3.jpg',
        '/images/products/montreux-4.jpg',
      ],
      
      firmness: 'SUAVE',
      firmnessValue: 45,
      height: 38,
      
      warranty: 25,
      trialNights: 150,
      cooling: true,
      pillowTop: true,
      
      features: [
        'Pillow Top europeo de lujo 10cm',
        'Gel inteligente termorregulador',
        'Micro-pocket Platinum 9 zonas',
        'Cashmere natural en la cubierta',
        'Sistema de climatización dual'
      ],
      techFeatures: [
        'Pillow top europeo 10cm',
        'Gel inteligente 5cm',
        'Viscoelástico premium 6cm',
        '1600 micro-pocket platinum (Queen)',
        'Altura: 38cm',
        'Tecnología Climate Duo'
      ],
      highlights: [
        'El colchón más exclusivo del mercado',
        'Inspirado en resorts suizos',
        'Sensación de lujo absoluto',
        'Para quienes no aceptan compromisos'
      ],
      materials: [
        'Pillow top europeo premium',
        'Cashmere natural',
        'Gel inteligente termorregulador',
        'Viscoelástico NASA premium',
        'Micro-pocket Platinum',
        'Seda natural',
        'Bambú orgánico'
      ],
      certifications: [
        'IRAM',
        'Oeko-Tex Standard 100',
        'CertiPUR-US',
        'ISO 9001',
        'European Premium Bedding',
        'Swiss Luxury Certified'
      ],
      
      hypoallergenic: true,
      antiMite: true,
      isPremium: true,
      isEco: true,
      
      transpirability: 100,
      satisfaction: 100,
      rating: 5.0,
      reviewCount: 28,
      
      isActive: true,
      isFeatured: true,
      badge: 'EXCLUSIVO',
      
      mainColor: '#be123c',
      gradient: 'from-rose-100 via-pink-100 to-fuchsia-100',
      
      metaTitle: 'Colchón Montreux Pillow Piero | Colección Exclusiva',
      metaDescription: 'El colchón más exclusivo de Piero. Pillow top europeo con cashmere, gel inteligente y micro-pocket platinum. 25 años de garantía.',
      metaKeywords: ['montreux piero', 'exclusivo', 'lujo', 'pillow top europeo'],
      
      variants: {
        create: [
          {
            sku: 'PIERO-MONTREUX-140',
            size: 'Matrimonial',
            dimensions: '190x140x38',
            width: 140,
            length: 190,
            height: 38,
            price: 97000000,
            stock: 2,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
          {
            sku: 'PIERO-MONTREUX-160',
            size: 'Queen',
            dimensions: '190x160x38',
            width: 160,
            length: 190,
            height: 38,
            price: 120000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
          {
            sku: 'PIERO-MONTREUX-180',
            size: 'Super King',
            dimensions: '200x180x38',
            width: 180,
            length: 200,
            height: 38,
            price: 127000000,
            stock: 1,
            inStock: true,
            isActive: true,
          },
        ],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 📦 CONFOBOX PIERO 90
  // ────────────────────────────────────────────────────────────────────────────
  const confoboxPiero90 = await prisma.product.create({
    data: {
      name: 'ConfoBox Piero 90',
      slug: 'confobox-piero-90',
      subtitle: 'Sistema compacto premium',
      description: 'Sistema de descanso completo Piero en formato individual grande. Incluye colchón con tecnología pocket y base integrada.',
      
      price: 17000000,
      stock: 1,
      inStock: true,
      
      category: 'colchones',
      subcategory: 'box-incluido',
      tags: ['piero', 'box', 'individual', 'compacto'],
      
      images: [
        '/images/products/confobox-piero-90-1.jpg',
        '/images/products/confobox-piero-90-2.jpg',
      ],
      
      firmness: 'MEDIO-FIRME',
      firmnessValue: 70,
      height: 40,
      
      warranty: 10,
      trialNights: 60,
      includesBase: true,
      
      features: [
        'Sistema completo individual',
        'Colchón Piero + base',
        'Ideal para espacios reducidos',
        'Calidad premium compacta'
      ],
      techFeatures: [
        'Altura total: 40cm',
        'Resortes pocket',
        'Base reforzada'
      ],
      highlights: [
        'Perfecto para dormitorios juveniles',
        'No necesitas sommier',
        'Fácil instalación'
      ],
      materials: ['Pocket', 'Base estructural', 'Tela Piero'],
      
      hypoallergenic: true,
      isPremium: true,
      
      transpirability: 85,
      satisfaction: 93,
      rating: 4.7,
      reviewCount: 12,
      
      isActive: true,
      
      mainColor: '#dc2626',
      
      metaTitle: 'ConfoBox Piero 90 | Sistema Completo Individual',
      metaDescription: 'Sistema completo individual premium. Colchón pocket Piero con base integrada en 90cm.',
      metaKeywords: ['confobox 90', 'sistema individual', 'piero box 90'],
      
      variants: {
        create: [
          {
            sku: 'PIERO-CONFOBOX-90',
            size: '1 plaza grande',
            dimensions: '190x90x40',
            width: 90,
            length: 190,
            height: 40,
            price: 17000000,
            stock: 1,
            inStock: true,
            isActive: true,
            isDefault: true,
          },
        ],
      },
    },
  });

  console.log('✅ Seed completado exitosamente!');
  console.log('📊 Resumen:');
  console.log('- Natural Soft: 7 productos');
  console.log('- Piero: 15 productos');
  console.log('- Total variantes creadas: 80 SKUs');
  console.log('- Stock total: 130 colchones');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });