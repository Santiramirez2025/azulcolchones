// prisma/seed-master.ts
// ============================================================================
// SEED MASTER - AZUL COLCHONES
// ============================================================================
// Ejecuta todos los seeds en orden
// ============================================================================

import { PrismaClient } from '@prisma/client';
import seedComplementarios from './seed-complementarios';
import seedRopaCama from './seed-ropa-cama';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 ============================================');
  console.log('🚀 INICIANDO SEED COMPLETO - AZUL COLCHONES');
  console.log('🚀 ============================================\n');

  try {
    // ========================================================================
    // 1️⃣ COLCHONES (seed.ts ya existente)
    // ========================================================================
    console.log('📦 1/3: Importando colchones...');
    console.log('⚠️  Ejecutar: npx tsx prisma/seed.ts\n');

    // ========================================================================
    // 2️⃣ PRODUCTOS COMPLEMENTARIOS
    // ========================================================================
    console.log('📦 2/3: Importando productos complementarios...');
    await seedComplementarios();
    console.log('✅ Productos complementarios importados\n');

    // ========================================================================
    // 3️⃣ ROPA DE CAMA
    // ========================================================================
    console.log('📦 3/3: Importando ropa de cama...');
    await seedRopaCama();
    console.log('✅ Ropa de cama importada\n');

    // ========================================================================
    // RESUMEN FINAL
    // ========================================================================
    console.log('🎉 ============================================');
    console.log('🎉 SEED COMPLETO FINALIZADO');
    console.log('🎉 ============================================\n');

    console.log('📊 RESUMEN TOTAL:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Contar productos por categoría
    const productCount = await prisma.product.count();
    const colchonesCount = await prisma.product.count({
      where: { category: 'colchones' }
    });
    const basesCount = await prisma.product.count({
      where: { category: 'bases' }
    });
    const almohadasCount = await prisma.product.count({
      where: { category: 'almohadas' }
    });
    const infantilCount = await prisma.product.count({
      where: { category: 'infantil' }
    });
    const ropaCamaCount = await prisma.product.count({
      where: { category: 'ropa-cama' }
    });
    const accesoriosCount = await prisma.product.count({
      where: { category: 'accesorios' }
    });

    // Contar variantes
    const variantCount = await prisma.productVariant.count();
    const variantesConStock = await prisma.productVariant.count({
      where: { 
        isActive: true,
        stock: { gt: 0 }
      }
    });

    // Calcular stock total
    const stockTotal = await prisma.productVariant.aggregate({
      _sum: { stock: true }
    });

    console.log(`\n📦 PRODUCTOS TOTALES: ${productCount}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   🛏️  Colchones:          ${colchonesCount}`);
    console.log(`   📦 Bases/Sommiers:      ${basesCount}`);
    console.log(`   🛏️  Almohadas:          ${almohadasCount}`);
    console.log(`   🧸 Infantil:            ${infantilCount}`);
    console.log(`   🛏️  Ropa de Cama:       ${ropaCamaCount}`);
    console.log(`   🛡️  Accesorios:         ${accesoriosCount}`);

    console.log(`\n📊 VARIANTES TOTALES: ${variantCount}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   ✅ Con stock:           ${variantesConStock}`);
    console.log(`   📦 Stock total:         ${stockTotal._sum.stock || 0} unidades`);

    console.log('\n✅ Base de datos lista para producción!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('\n❌ Error durante el seed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Error fatal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });