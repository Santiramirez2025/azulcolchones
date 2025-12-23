import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

async function backupBeforeSeed(seedFile: string) {
  console.log('🔐 BACKUP AUTOMÁTICO ANTES DE SEED');
  console.log('=====================================');
  
  // 1. Crear backup
  const fecha = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  const backupFilename = `backups/backup-${fecha}.json`;
  
  // Crear carpeta backups si no existe
  if (!fs.existsSync('backups')) {
    fs.mkdirSync('backups');
  }

  // Exportar todos los productos
  const products = await prisma.product.findMany({
    include: {
      variants: true
    }
  });

  fs.writeFileSync(
    backupFilename,
    JSON.stringify(products, null, 2),
    'utf-8'
  );

  console.log(`✅ Backup creado: ${backupFilename}`);
  console.log(`📊 ${products.length} productos respaldados`);
  console.log('');

  // 2. Ejecutar seed
  console.log(`🌱 Ejecutando seed: ${seedFile}`);
  console.log('=====================================');
  
  try {
    execSync(`npx tsx ${seedFile}`, { stdio: 'inherit' });
    console.log('');
    console.log('✅ Seed ejecutado exitosamente');
    console.log(`💾 Backup disponible en: ${backupFilename}`);
  } catch (error) {
    console.error('❌ Error en seed');
    console.log(`🔄 Puedes restaurar con: npx tsx import-productos.ts ${backupFilename}`);
    throw error;
  }
}

// Uso: npx tsx safe-seed.ts seed-piero-sonno.ts
const seedFile = process.argv[2];

if (!seedFile) {
  console.error('❌ Debes especificar el archivo seed');
  console.log('Uso: npx tsx safe-seed.ts <archivo-seed.ts>');
  process.exit(1);
}

backupBeforeSeed(seedFile)
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
