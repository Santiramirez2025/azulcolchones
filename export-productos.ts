import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function exportProducts() {
  console.log('📦 Exportando productos y variantes...');

  // Obtener todos los productos con sus variantes
  const products = await prisma.product.findMany({
    include: {
      variants: true
    }
  });

  // Crear nombre de archivo con fecha
  const fecha = new Date().toISOString().split('T')[0];
  const filename = `backup-productos-${fecha}.json`;

  // Guardar en archivo JSON
  fs.writeFileSync(
    filename,
    JSON.stringify(products, null, 2),
    'utf-8'
  );

  console.log(`✅ Exportados ${products.length} productos`);
  console.log(`📄 Archivo: ${filename}`);
  
  // Estadísticas
  const totalVariants = products.reduce((sum, p) => sum + p.variants.length, 0);
  console.log(`📊 Total variantes: ${totalVariants}`);
  console.log(`💾 Tamaño: ${(fs.statSync(filename).size / 1024).toFixed(2)} KB`);
}

exportProducts()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
