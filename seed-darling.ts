import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Actualizando productos de ropa de cama...\n');

  // ============================================================================
  // 1. JUEGO DE SÁBANAS PIERO CLASSIC FULL
  // ============================================================================
  console.log('📋 Actualizando: Juego de Sábanas Piero Classic FULL...');
  
  const sabanasClassicFull = await prisma.product.update({
    where: { id: 'cmjaefj2m00000j9ujdfnfqkf' },
    data: {
      name: 'Juego de Sábanas Piero Classic Full',
      slug: 'juego-sabanas-piero-classic-full',
      subtitle: 'Juego completo de sábanas marca Piero - Calidad estándar para uso diario',
      
      description: `Juego de sábanas Piero Classic en medida Full (140x190). Es la línea estándar de sábanas Piero, la que usás todos los días sin preocuparte.

Incluye todo lo que necesitás: sábana ajustable, sábana superior y funda de almohada. Todo en tela de algodón-poliéster que aguanta lavados y no necesita plancha obligatoria.

La marca es **Piero**, la misma de los colchones. Saben hacer textiles que duran. No es lujo, es funcional y duradero.

El Full sirve para colchones matrimoniales estándar (140x190 o similares). La ajustable tiene elástico en todo el perímetro, se pone fácil y queda bien firme.

¿Para quién es? Para uso diario. Para tener dos o tres juegos y rotar lavados. Para quien busca sábanas confiables sin gastar de más.

Se lavan en lavarropas común, secan rápido, no se arrugan tanto. Son sábanas para vivir, no para guardar en el placard.`,

      stock: 5,
      inStock: true,
      lowStockAlert: 2,

      category: 'ropa-de-cama',
      subcategory: 'sabanas',
      tags: ['sabanas', 'juego-sabanas', 'piero', 'full', 'matrimonial', 'classic'],

      features: [
        'Juego completo: ajustable + superior + funda',
        'Medida Full para colchones 140x190',
        'Tela algodón-poliéster resistente',
        'Marca Piero - calidad textil probada',
        'Elástico perimetral en ajustable',
        'Fácil lavado y mantenimiento',
        'No requiere plancha obligatoria',
        'Ideal para uso diario y rotación'
      ],

      highlights: [
        'Juego completo listo para usar',
        'Calidad Piero duradera',
        'Tela que aguanta lavados',
        'Medida Full estándar'
      ],

      materials: [
        'Tela: Algodón-poliéster',
        'Elástico perimetral en ajustable',
        'Costuras reforzadas'
      ],

      isActive: true,
      isFeatured: false,
      isBestSeller: true,
      badge: 'Uso Diario',

      sku: 'PIER-SABANAS-CLASSIC-FULL',
      
      mainColor: '#3b82f6',
      
      metaTitle: 'Juego de Sábanas Piero Classic Full | Azul Colchones Villa María',
      metaDescription: 'Juego completo de sábanas Piero Classic Full 140x190. Algodón-poliéster resistente. Uso diario. Villa María.',
      metaKeywords: ['sabanas piero', 'sabanas full', 'juego sabanas', 'sabanas matrimonial', 'piero classic']
    }
  });

  console.log('✅ Sábanas Classic Full actualizado\n');

  // ============================================================================
  // 2. JUEGO DE SÁBANAS PIERO SUPREME KING
  // ============================================================================
  console.log('📋 Actualizando: Juego de Sábanas Piero Supreme KING...');
  
  const sabanasSupremeKing = await prisma.product.update({
    where: { id: 'cmjaefkuc00040j9urqvtphrh' },
    data: {
      name: 'Juego de Sábanas Piero Supreme King',
      slug: 'juego-sabanas-piero-supreme-king',
      subtitle: 'Juego premium de sábanas Piero King - Calidad superior para camas grandes',
      
      description: `Juego de sábanas Piero Supreme en medida King. Esta es la línea premium de sábanas Piero, un escalón arriba del Classic.

La diferencia está en la **calidad de la tela**: mayor densidad de hilos, tacto más suave, mejor caída. Se nota apenas las tocás.

Incluye sábana ajustable King, sábana superior y fundas de almohada (generalmente 2 fundas para King). Todo coordinado.

La medida King sirve para colchones 180x200 o Queen 160x200 con sobra. Si tenés un colchón grande y querés que las sábanas caigan bien generosas, King es el camino.

**Supreme vs Classic:** El Classic cumple bien para uso diario. El Supreme es para quien quiere sentir la diferencia cada vez que se acuesta. Mejor tela, mejor terminación, dura más lavados sin perder suavidad.

¿Para quién es? Para la habitación principal. Para quien puede pagar un poco más y lo valora. Para colchones King o Queen donde querés calidad premium.

Marca Piero, la misma que hace los colchones. Saben de textiles para descanso.`,

      stock: 5,
      inStock: true,
      lowStockAlert: 2,

      category: 'ropa-de-cama',
      subcategory: 'sabanas',
      tags: ['sabanas', 'juego-sabanas', 'piero', 'king', 'supreme', 'premium'],

      features: [
        'Juego completo premium King',
        'Medida King 180x200 (sirve Queen con sobra)',
        'Línea Supreme - calidad superior',
        'Tela de mayor densidad de hilos',
        'Tacto más suave que Classic',
        'Marca Piero textil premium',
        'Incluye 2 fundas generalmente',
        'Mayor durabilidad en lavados'
      ],

      highlights: [
        'Línea premium Supreme',
        'Medida King generosa',
        'Calidad textil superior',
        'Tacto suave premium'
      ],

      materials: [
        'Tela premium alta densidad de hilos',
        'Algodón-poliéster calidad superior',
        'Costuras reforzadas premium'
      ],

      isActive: true,
      isFeatured: true,
      isBestSeller: false,
      isPremium: true,
      badge: 'Premium',

      sku: 'PIER-SABANAS-SUPREME-KING',
      
      mainColor: '#8b5cf6',
      
      metaTitle: 'Juego de Sábanas Piero Supreme King Premium | Azul Colchones',
      metaDescription: 'Juego sábanas Piero Supreme King 180x200, calidad premium, alta densidad de hilos. Tacto superior. Villa María.',
      metaKeywords: ['sabanas premium', 'sabanas king', 'piero supreme', 'sabanas calidad', 'juego king']
    }
  });

  console.log('✅ Sábanas Supreme King actualizado\n');

  // ============================================================================
  // 3. COVER TUSOR LISO PREMIUM QUEEN
  // ============================================================================
  console.log('📋 Actualizando: Cover Tusor Liso Premium QUEEN...');
  
  const coverTusorLiso = await prisma.product.update({
    where: { id: 'cmjaefmab00060j9utzvjid7i' },
    data: {
      name: 'Cover Tusor Liso Premium Queen',
      slug: 'cover-tusor-liso-premium-queen',
      subtitle: 'Acolchado/Cubrecama de tusor liso - Elegancia minimalista para Queen',
      
      description: `Cover de tusor liso en medida Queen. Es básicamente un acolchado/cubrecama liviano que cubre todo el colchón y cae a los costados.

El **tusor liso** es ese acabado elegante, minimalista, que queda bien en cualquier habitación. Sin estampados, sin colores llamativos. Solo textura y caída.

Medida Queen sirve para colchones 160x200 con caída generosa a los costados. Tapa el colchón completo más los laterales.

¿Para qué sirve? Como cubrecama que protege durante el día. Como acolchado liviano en verano. Como capa extra en invierno debajo del edredón pesado.

Es **premium** porque la tela del tusor es de mejor calidad: más densa, mejor terminación, no se arruga tanto.

¿Para quién es? Para habitaciones matrimoniales Queen. Para quien busca estética limpia y minimalista. Para proteger el juego de sábanas durante el día.

Se lava en lavarropas, seca relativamente rápido. No es el típico acolchado pesado de invierno, es más versátil.`,

      stock: 5,
      inStock: true,
      lowStockAlert: 2,

      category: 'ropa-de-cama',
      subcategory: 'acolchados',
      tags: ['cover', 'acolchado', 'cubrecama', 'tusor', 'liso', 'queen', 'premium'],

      features: [
        'Cover/Acolchado de tusor liso',
        'Medida Queen 160x200 con caída',
        'Acabado premium minimalista',
        'Tela tusor de calidad superior',
        'Cubre colchón completo + laterales',
        'Versátil: verano liviano o capa extra',
        'Fácil lavado y mantenimiento',
        'Estética limpia y elegante'
      ],

      highlights: [
        'Tusor liso premium',
        'Medida Queen generosa',
        'Elegancia minimalista',
        'Uso versátil todo el año'
      ],

      materials: [
        'Tela: Tusor premium',
        'Relleno: Acolchado liviano',
        'Costuras reforzadas'
      ],

      isActive: true,
      isFeatured: false,
      isBestSeller: false,
      isPremium: true,
      badge: 'Premium',

      sku: 'COVER-TUSOR-LISO-QUEEN',
      
      mainColor: '#f3f4f6',
      
      metaTitle: 'Cover Tusor Liso Premium Queen | Azul Colchones Villa María',
      metaDescription: 'Acolchado cover tusor liso premium Queen 160x200. Elegancia minimalista, versátil. Villa María.',
      metaKeywords: ['cover queen', 'acolchado tusor', 'cubrecama queen', 'tusor liso', 'premium queen']
    }
  });

  console.log('✅ Cover Tusor Liso actualizado\n');

  // ============================================================================
  // 4. COVER TUSOR ESTAMPADO PREMIUM QUEEN
  // ============================================================================
  console.log('📋 Actualizando: Cover Tusor Estampado Premium QUEEN...');
  
  const coverTusorEstampado = await prisma.product.update({
    where: { id: 'cmjaefniw00090j9u2rgdptal' },
    data: {
      name: 'Cover Tusor Estampado Premium Queen',
      slug: 'cover-tusor-estampado-premium-queen',
      subtitle: 'Acolchado/Cubrecama de tusor estampado - Diseño y calidad para Queen',
      
      description: `Cover de tusor estampado en medida Queen. Es el mismo concepto que el tusor liso pero con diseños/estampados.

El **tusor estampado** le da personalidad a la habitación. Dependiendo del diseño disponible, podés elegir algo más clásico, más moderno, más neutro o más llamativo.

Mismo concepto que el liso: acolchado/cubrecama que cubre el colchón Queen (160x200) con caída a los costados. Protege, decora, y funciona como acolchado liviano.

La calidad es **premium**: buena tela de tusor, buen relleno, terminaciones prolijas. No es el típico acolchado económico que se desarma en 3 lavados.

¿Para quién es? Para quien quiere el cover tusor pero con diseño. Para habitaciones donde querés que la cama sea protagonista visual. Para Queen 160x200.

Mismo uso versátil: cubrecama de día, acolchado liviano de verano, capa extra en invierno.

Se lava en lavarropas, el estampado aguanta lavados sin desvanecerse (si es premium de verdad).`,

      stock: 5,
      inStock: true,
      lowStockAlert: 2,

      category: 'ropa-de-cama',
      subcategory: 'acolchados',
      tags: ['cover', 'acolchado', 'cubrecama', 'tusor', 'estampado', 'queen', 'premium'],

      features: [
        'Cover/Acolchado tusor con estampado',
        'Medida Queen 160x200 con caída',
        'Diseño premium decorativo',
        'Tela tusor de calidad superior',
        'Estampado resistente a lavados',
        'Cubre colchón completo + laterales',
        'Versátil: decoración y abrigo',
        'Terminaciones premium'
      ],

      highlights: [
        'Tusor estampado premium',
        'Diseño decorativo',
        'Medida Queen generosa',
        'Calidad que dura lavados'
      ],

      materials: [
        'Tela: Tusor premium estampado',
        'Relleno: Acolchado liviano',
        'Estampado de calidad durable'
      ],

      isActive: true,
      isFeatured: false,
      isBestSeller: false,
      isPremium: true,
      badge: 'Con Diseño',

      sku: 'COVER-TUSOR-ESTAMPADO-QUEEN',
      
      mainColor: '#ec4899',
      
      metaTitle: 'Cover Tusor Estampado Premium Queen | Azul Colchones',
      metaDescription: 'Acolchado cover tusor estampado premium Queen 160x200. Diseño decorativo, calidad superior. Villa María.',
      metaKeywords: ['cover estampado', 'acolchado diseño', 'tusor queen', 'cubrecama estampado', 'premium queen']
    }
  });

  console.log('✅ Cover Tusor Estampado actualizado\n');

  // ============================================================================
  // 5. PROTECTOR CUBRE COLCHÓN MATELASEADO 2 PLAZAS
  // ============================================================================
  console.log('📋 Actualizando: Protector Cubre Colchón Matelaseado 2 plazas...');
  
  const protectorMatelaseado = await prisma.product.update({
    where: { id: 'cmjaeforf000b0j9u6emraegt' },
    data: {
      name: 'Protector Cubre Colchón Matelaseado 2 Plazas',
      slug: 'protector-cubre-colchon-matelaseado-2-plazas',
      subtitle: 'Protector acolchado para colchón - Protección y confort extra',
      
      description: `Protector cubre colchón matelaseado para 2 plazas (matrimonial 140x190 aproximado). Va entre el colchón y la sábana ajustable.

**Matelaseado** significa que tiene un acolchado liviano. No es solo tela, tiene relleno. Eso le da dos funciones: protege el colchón + agrega una capa de suavidad extra.

¿Para qué sirve? Protege tu colchón de manchas, transpiración, desgaste. Es mucho más fácil (y barato) lavar un protector que limpiar un colchón. Y si el protector se arruina, lo reemplazás. Si el colchón se arruina, te sale carísimo.

El matelaseado también suma confort. Si tu colchón es un toque duro, el protector suaviza la superficie. Si es muy viejo, disimula algunas irregularidades menores.

Tiene elástico en las esquinas para que se ajuste bien y no se mueva. Se pone como una sábana ajustable, queda firme.

¿Para quién es? Para **proteger la inversión** del colchón. Para quien tiene chicos, mascotas, o simplemente quiere que el colchón dure más. Para agregar esa capa extra de confort.

Se lava en lavarropas, seca más rápido que un colchón (obviamente).`,

      stock: 5,
      inStock: true,
      lowStockAlert: 2,

      category: 'ropa-de-cama',
      subcategory: 'protectores',
      tags: ['protector', 'cubre-colchon', 'matelaseado', '2-plazas', 'matrimonial', 'proteccion'],

      features: [
        'Protector matelaseado acolchado',
        'Medida 2 plazas / Matrimonial',
        'Protege colchón de manchas y desgaste',
        'Agrega capa de confort extra',
        'Elástico en esquinas - ajuste firme',
        'Fácil lavado en lavarropas',
        'Prolonga vida útil del colchón',
        'Se coloca como sábana ajustable'
      ],

      highlights: [
        'Protección + confort',
        'Matelaseado acolchado',
        'Fácil mantenimiento',
        'Prolonga vida del colchón'
      ],

      materials: [
        'Tela superior de algodón-poliéster',
        'Relleno matelaseado liviano',
        'Elástico perimetral en esquinas'
      ],

      isActive: true,
      isFeatured: true,
      isBestSeller: true,
      badge: 'Protección',

      sku: 'PROTECTOR-MATELASEADO-2P',
      
      mainColor: '#10b981',
      
      metaTitle: 'Protector Cubre Colchón Matelaseado 2 Plazas | Azul Colchones',
      metaDescription: 'Protector matelaseado acolchado para colchón matrimonial. Protección y confort extra. Fácil lavado. Villa María.',
      metaKeywords: ['protector colchon', 'cubre colchon', 'matelaseado', 'proteccion colchon', '2 plazas']
    }
  });

  console.log('✅ Protector Matelaseado actualizado\n');

  // ============================================================================
  // 6. PROTECTOR CUBRE COLCHÓN IMPERMEABLE 1 1/2 PLAZA
  // ============================================================================
  console.log('📋 Actualizando: Protector Cubre Colchón Impermeable 1 1/2 plaza...');
  
  const protectorImpermeable = await prisma.product.update({
    where: { id: 'cmjaefpzx000e0j9uibg21rug' },
    data: {
      name: 'Protector Cubre Colchón Impermeable 1½ Plaza',
      slug: 'protector-cubre-colchon-impermeable-1-plaza-media',
      subtitle: 'Protector impermeable para colchón - Protección total contra líquidos',
      
      description: `Protector cubre colchón **impermeable** para 1 plaza y media (100x190 aproximado). Este es el que necesitás si la protección contra líquidos es prioridad.

La capa impermeable evita que cualquier líquido pase al colchón: transpiración nocturna, derrames accidentales, lo que sea. El líquido se queda en el protector, el colchón queda intacto.

¿Para quién es? Para **cuartos de chicos**. Para personas con incontinencia. Para quien tiene mascotas que suben a la cama. Para quien quiere protección total sin preocupaciones.

No es ruidoso ni se siente como plástico. Los buenos protectores impermeables tienen una capa técnica que repele líquidos pero respira (no te hacés un charco de transpiración).

Tiene elástico en las esquinas, se ajusta firme como sábana. Va debajo de la sábana ajustable normal.

Se lava en lavarropas. La impermeabilidad aguanta muchos lavados si seguís las instrucciones (agua fría, no secarropas caliente).

Medida **plaza y media** (100x190), ideal para camas individuales grandes o para quienes necesitan protección impermeable en esa medida.

Es esa compra que hacés y te olvidás de preocuparte. Protección real, duerme tranquilo.`,

      stock: 5,
      inStock: true,
      lowStockAlert: 2,

      category: 'ropa-de-cama',
      subcategory: 'protectores',
      tags: ['protector', 'impermeable', 'cubre-colchon', 'plaza-y-media', 'anti-liquidos', 'chicos'],

      features: [
        'Protector 100% impermeable',
        'Medida 1½ plaza (100x190)',
        'Barrera total contra líquidos',
        'No ruidoso - capa técnica',
        'Respira - no genera calor excesivo',
        'Ideal para chicos o mascotas',
        'Elástico ajustable en esquinas',
        'Lavable - impermeabilidad durable'
      ],

      highlights: [
        'Protección 100% impermeable',
        'Ideal para chicos',
        'No ruidoso ni plástico',
        'Respira adecuadamente'
      ],

      materials: [
        'Capa superior: Algodón-poliéster suave',
        'Capa impermeable técnica intermedia',
        'Elástico perimetral ajustable'
      ],

      isActive: true,
      isFeatured: true,
      isBestSeller: true,
      badge: 'Impermeable',

      sku: 'PROTECTOR-IMPERMEABLE-1.5P',
      
      mainColor: '#0ea5e9',
      
      metaTitle: 'Protector Impermeable Colchón 1½ Plaza | Azul Colchones',
      metaDescription: 'Protector cubre colchón impermeable 100x190, barrera total contra líquidos. Ideal niños. No ruidoso. Villa María.',
      metaKeywords: ['protector impermeable', 'cubre colchon impermeable', 'proteccion liquidos', 'plaza y media', 'niños']
    }
  });

  console.log('✅ Protector Impermeable actualizado\n');

  // ============================================================================
  // RESUMEN FINAL
  // ============================================================================
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🎉 ACTUALIZACIÓN COMPLETA - ROPA DE CAMA');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('✅ Juego Sábanas Piero Classic Full - 5 unidades');
  console.log('✅ Juego Sábanas Piero Supreme King - 5 unidades');
  console.log('✅ Cover Tusor Liso Premium Queen - 5 unidades');
  console.log('✅ Cover Tusor Estampado Premium Queen - 5 unidades');
  console.log('✅ Protector Matelaseado 2 Plazas - 5 unidades');
  console.log('✅ Protector Impermeable 1½ Plaza - 5 unidades');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📦 Total: 6 productos | 30 unidades en stock');
  console.log('🏷️  Categoría: Ropa de Cama completa optimizada');
  console.log('═══════════════════════════════════════════════════════════');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });