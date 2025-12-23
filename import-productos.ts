import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function importProducts(filename: string) {
  console.log(`📦 Importando desde ${filename}...`);

  // Leer archivo JSON
  const data = JSON.parse(fs.readFileSync(filename, 'utf-8'));

  console.log(`🔄 Procesando ${data.length} productos...`);

  for (const product of data) {
    // Separar variantes del producto
    const { variants, ...productData } = product;

    // Crear o actualizar producto
    const created = await prisma.product.upsert({
      where: { id: product.id },
      update: productData,
      create: productData
    });

    console.log(`✅ Producto: ${created.name}`);

    // Crear variantes
    for (const variant of variants) {
      await prisma.productVariant.upsert({
        where: { id: variant.id },
        update: variant,
        create: variant
      });
      console.log(`  ↳ Variante: ${variant.dimensions}`);
    }
  }

  console.log('🎉 Importación completada');
}

// Uso: npx tsx import-productos.ts backup-productos-2025-12-21.json
const filename = process.argv[2] || 'backup-productos.json';

importProducts(filename)
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
