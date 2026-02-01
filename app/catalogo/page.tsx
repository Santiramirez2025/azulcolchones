'use client'
// app/catalogo/page.tsx — PRODUCT-FIRST | Static Data | Zero DB
// Estructura: Filtros inline → Product Grid
// Datos hardcoded desde planilla Balerdi 855 - Feb 2026

import { useState, useMemo } from 'react'

// ============================================================================
// TIPOS
// ============================================================================

type Category = 'todos' | 'colchones' | 'sommiers' | 'accesorios'
type Size = 'todos' | '80' | '90' | '100' | '130' | '140' | '160' | '180' | '200'

interface Product {
  id: string
  name: string
  category: Category
  size: string        // e.g. "80x190"
  sizeLabel: string   // e.g. "1 plaza"
  price: number       // in ARS
  stock: number
  image: string | null // ruta en /images/ o null para placeholder
  tag?: string        // "Más vendido", "Último", "Nueva línea", etc.
  description?: string
}

// ============================================================================
// DATA — Extraída de planilla Balerdi 855 Feb 2026
// Precios en ARS (x1000 de la planilla)
// ============================================================================

const PRODUCTS: Product[] = [
  // ─── COLCHONES 80cm (1 plaza) ─────────────────────────────────────────────
  {
    id: 'funcional-80',
    name: 'Funcional',
    category: 'colchones',
    size: '80x190',
    sizeLabel: '1 plaza',
    price: 130_000,
    stock: 20,
    image: null,
    tag: 'Más vendido',
    description: 'Espuma básica, ideal para ambientes secundarios.',
  },
  {
    id: 'relax-80-20',
    name: 'Relax Espuma 20cm',
    category: 'colchones',
    size: '80x190',
    sizeLabel: '1 plaza',
    price: 130_000,
    stock: 6,
    image: null,
    description: 'Espuma de 20cm de espesor, confort diario.',
  },
  {
    id: 'relax-80-24',
    name: 'Relax Espuma 24cm',
    category: 'colchones',
    size: '80x190',
    sizeLabel: '1 plaza',
    price: 160_000,
    stock: 22,
    image: null,
    tag: 'Stock alto',
    description: 'Espuma de 24cm, mayor soporte y confort.',
  },
  {
    id: 'meditare-80',
    name: 'Meditare EP',
    category: 'colchones',
    size: '80x190',
    sizeLabel: '1 plaza',
    price: 210_000,
    stock: 3,
    image: '/images/meditare-ep-80.jpg',
    description: 'Línea premium con espuma de alta densidad.',
  },
  {
    id: 'sonno-80',
    name: 'Sonno',
    category: 'colchones',
    size: '80x190',
    sizeLabel: '1 plaza',
    price: 280_000,
    stock: 1,
    image: '/images/sonno-ep-80.jpg',
    tag: 'Último',
    description: 'Tecnología pocket spring, confort superior.',
  },
  {
    id: 'reino-80',
    name: 'Reino',
    category: 'colchones',
    size: '80x190',
    sizeLabel: '1 plaza',
    price: 300_000,
    stock: 1,
    image: '/images/reino-80.jpg',
    tag: 'Último',
    description: 'Línea premium, acabado de alta calidad.',
  },
  {
    id: 'nirvana-80',
    name: 'Nirvana',
    category: 'colchones',
    size: '80x190',
    sizeLabel: '1 plaza',
    price: 320_000,
    stock: 1,
    image: '/images/nirvana-80.jpg',
    tag: 'Último',
    description: 'Máximo confort en la línea premium.',
  },

  // ─── COLCHONES 90cm (1.5 plaza) ───────────────────────────────────────────
  {
    id: 'relax-90-20',
    name: 'Relax Espuma 20cm',
    category: 'colchones',
    size: '90x190',
    sizeLabel: '1½ plaza',
    price: 160_000,
    stock: 1,
    image: null,
    tag: 'Último',
    description: 'Espuma 20cm en medida 1.5 plaza.',
  },
  {
    id: 'virtus-90',
    name: 'Virtus Espuma 26cm',
    category: 'colchones',
    size: '90x190',
    sizeLabel: '1½ plaza',
    price: 170_000,
    stock: 1,
    image: null,
    tag: 'Último',
    description: 'Espuma de 26cm con mayor densidad y soporte.',
  },
  {
    id: 'meditare-90',
    name: 'Meditare',
    category: 'colchones',
    size: '90x190',
    sizeLabel: '1½ plaza',
    price: 230_000,
    stock: 2,
    image: '/images/meditare-ep-90.jpg',
    description: 'Confort premium en medida 1.5 plaza.',
  },
  {
    id: 'sonno-90',
    name: 'Sonno',
    category: 'colchones',
    size: '90x190',
    sizeLabel: '1½ plaza',
    price: 300_000,
    stock: 4,
    image: '/images/sonno-ep-90.jpg',
    description: 'Pocket spring, tecnología superior.',
  },

  // ─── COLCHONES 100cm (2 plazas) ───────────────────────────────────────────
  {
    id: 'relax-100-20',
    name: 'Relax Espuma 20cm',
    category: 'colchones',
    size: '100x190',
    sizeLabel: '2 plazas',
    price: 170_000,
    stock: 5,
    image: null,
    description: 'Espuma 20cm, excelente relación precio-calidad.',
  },
  {
    id: 'ns-confort-100',
    name: 'NS Confort 20cm',
    category: 'colchones',
    size: '100x190',
    sizeLabel: '2 plazas',
    price: 170_000,
    stock: 4,
    image: null,
    description: 'Línea NS, espuma confort de 20cm.',
  },
  {
    id: 'ns-virtus-100',
    name: 'NS Virtus 26cm EP',
    category: 'colchones',
    size: '100x190',
    sizeLabel: '2 plazas',
    price: 190_000,
    stock: 3,
    image: null,
    description: 'Espuma premium de 26cm, alta densidad.',
  },
  {
    id: 'meditare-100',
    name: 'Meditare',
    category: 'colchones',
    size: '100x190',
    sizeLabel: '2 plazas',
    price: 250_000,
    stock: 1,
    image: '/images/meditare-ep-100.jpg',
    tag: 'Último',
    description: 'Alta densidad y confort en 2 plazas.',
  },
  {
    id: 'sonno-100',
    name: 'Sonno',
    category: 'colchones',
    size: '100x190',
    sizeLabel: '2 plazas',
    price: 340_000,
    stock: 2,
    image: '/images/sonno-ep-100.jpg',
    description: 'Pocket spring en medida 2 plazas.',
  },

  // ─── COLCHONES 130cm (2 plazas grande) ────────────────────────────────────
  {
    id: 'meditare-130',
    name: 'Meditare',
    category: 'colchones',
    size: '130x190',
    sizeLabel: '2 plazas grande',
    price: 350_000,
    stock: 1,
    image: '/images/meditare-ep-130.jpg',
    tag: 'Último',
    description: 'Confort premium en medida grande.',
  },
  {
    id: 'foam-130',
    name: 'Foam',
    category: 'colchones',
    size: '130x190',
    sizeLabel: '2 plazas grande',
    price: 350_000,
    stock: 1,
    image: null,
    tag: 'Último',
    description: 'Espuma de alta calidad en formato grande.',
  },
  {
    id: 'sonno-130',
    name: 'Sonno',
    category: 'colchones',
    size: '130x190',
    sizeLabel: '2 plazas grande',
    price: 460_000,
    stock: 2,
    image: '/images/sonno-ep-130.jpg',
    description: 'Pocket spring en medida 130cm.',
  },
  {
    id: 'nirvana-130',
    name: 'Nirvana',
    category: 'colchones',
    size: '130x190',
    sizeLabel: '2 plazas grande',
    price: 540_000,
    stock: 1,
    image: '/images/nirvana-130.jpg',
    tag: 'Último',
    description: 'Máximo confort en formato grande.',
  },

  // ─── COLCHONES 140cm (matrimonial) ────────────────────────────────────────
  {
    id: 'sonno-140',
    name: 'Sonno',
    category: 'colchones',
    size: '140x190',
    sizeLabel: 'Matrimonial',
    price: 500_000,
    stock: 1,
    image: '/images/sonno-ep-140.jpg',
    tag: 'Último',
    description: 'Pocket spring en medida matrimonial.',
  },
  {
    id: 'namaste-140',
    name: 'Namaste',
    category: 'colchones',
    size: '140x190',
    sizeLabel: 'Matrimonial',
    price: 530_000,
    stock: 1,
    image: '/images/namaste-140.jpg',
    tag: 'Último',
    description: 'Línea especial, confort matrimonial.',
  },

  // ─── COLCHONES 160cm (Queen) ──────────────────────────────────────────────
  {
    id: 'ns-confort-160',
    name: 'NS Confort 28cm EP',
    category: 'colchones',
    size: '160x190',
    sizeLabel: 'Queen',
    price: 310_000,
    stock: 1,
    image: null,
    tag: 'Último',
    description: 'Espuma premium 28cm en formato Queen.',
  },
  {
    id: 'spring-160',
    name: 'Spring',
    category: 'colchones',
    size: '160x190',
    sizeLabel: 'Queen',
    price: 500_000,
    stock: 1,
    image: '/images/sonno-ep-160.jpg',
    tag: 'Último',
    description: 'Tecnología spring en formato Queen.',
  },
  {
    id: 'reino-pillow-160',
    name: 'Reino Pillow',
    category: 'colchones',
    size: '160x190',
    sizeLabel: 'Queen',
    price: 650_000,
    stock: 1,
    image: '/images/reino-pillow-160.jpg',
    tag: 'Último',
    description: 'Acabado pillow top, máximo lujo.',
  },

  // ─── COLCHONES 180cm (King) ───────────────────────────────────────────────
  {
    id: 'ns-confort-180',
    name: 'NS Confort 28cm EP',
    category: 'colchones',
    size: '180x190',
    sizeLabel: 'King',
    price: 350_000,
    stock: 1,
    image: '/images/reino-pillow-180.jpg',
    tag: 'Último',
    description: 'Espuma premium 28cm en formato King.',
  },
  {
    id: 'nirvana-180',
    name: 'Nirvana',
    category: 'colchones',
    size: '180x190',
    sizeLabel: 'King',
    price: 820_000,
    stock: 1,
    image: '/images/nirvana-180.jpg',
    tag: 'Último',
    description: 'Máximo confort en formato King.',
  },
  {
    id: 'montreux-pillow-180',
    name: 'Montreux Pillow',
    category: 'colchones',
    size: '180x200',
    sizeLabel: 'King',
    price: 1_200_000,
    stock: 1,
    image: '/images/montreaux-pillow-180.jpg',
    tag: 'Último · Premium',
    description: 'Línea Montreux con acabado pillow top.',
  },

  // ─── COLCHONES 200cm (Super King) ─────────────────────────────────────────
  {
    id: 'ns-confort-200',
    name: 'NS Confort 28cm EP',
    category: 'colchones',
    size: '200x200',
    sizeLabel: 'Super King',
    price: 200_000,
    stock: 1,
    image: null,
    tag: 'Último',
    description: 'Espuma premium en formato Super King.',
  },
  {
    id: 'reino-pillow-200',
    name: 'Reino Pillow',
    category: 'colchones',
    size: '200x190',
    sizeLabel: 'Super King',
    price: 790_000,
    stock: 1,
    image: '/images/reino-pillow-200.jpg',
    tag: 'Último',
    description: 'Acabado pillow top en formato Super King.',
  },
  {
    id: 'montreux-pillow-200',
    name: 'Montreux c/ Pillow',
    category: 'colchones',
    size: '200x200',
    sizeLabel: 'Super King',
    price: 970_000,
    stock: 2,
    image: '/images/montreaux-pillow-200.jpg',
    description: 'Línea Montreux completa con pillow top.',
  },
  {
    id: 'dreamfit-pocket-200',
    name: 'DreamFit Pocket',
    category: 'colchones',
    size: '200x200',
    sizeLabel: 'Super King',
    price: 1_550_000,
    stock: 1,
    image: '/images/dreamfit-pocket-200.jpg',
    tag: 'Último · Top',
    description: 'Tecnología pocket spring de máxima gama.',
  },

  // ─── COLCHONES DE CUNA ────────────────────────────────────────────────────
  {
    id: 'mickey-cuna-130',
    name: 'Mickey 130x60',
    category: 'accesorios',
    size: '130x60',
    sizeLabel: 'Cuna',
    price: 50_000,
    stock: 2,
    image: null,
    description: 'Colchón de cuna Mickey, 8cm de espesor.',
  },
  {
    id: 'mickey-cuna-97',
    name: 'Mickey 97x65',
    category: 'accesorios',
    size: '97x65',
    sizeLabel: 'Cuna',
    price: 50_000,
    stock: 1,
    image: null,
    tag: 'Último',
    description: 'Colchón de cuna Mickey, medida estándar.',
  },
  {
    id: 'mickey-cuna-140',
    name: 'Mickey 140x80',
    category: 'accesorios',
    size: '140x80',
    sizeLabel: 'Cuna',
    price: 60_000,
    stock: 1,
    image: null,
    tag: 'Último',
    description: 'Colchón de cuna Mickey, formato grande.',
  },

  // ─── SOMMIERS ORIGINALES ──────────────────────────────────────────────────
  {
    id: 'sognare-80',
    name: 'Sognare',
    category: 'sommiers',
    size: '80x190',
    sizeLabel: '1 plaza',
    price: 165_000,
    stock: 1,
    image: null,
    tag: 'Último',
    description: 'Sommier original línea Sognare.',
  },
  {
    id: 'grey-80',
    name: 'Grey',
    category: 'sommiers',
    size: '80x190',
    sizeLabel: '1 plaza',
    price: 165_000,
    stock: 1,
    image: null,
    tag: 'Último',
    description: 'Sommier original línea Grey.',
  },
  {
    id: 'brown-80',
    name: 'Brown',
    category: 'sommiers',
    size: '80x190',
    sizeLabel: '1 plaza',
    price: 165_000,
    stock: 1,
    image: null,
    tag: 'Último',
    description: 'Sommier original línea Brown.',
  },
  {
    id: 'brown-140',
    name: 'Brown',
    category: 'sommiers',
    size: '140x190',
    sizeLabel: 'Matrimonial',
    price: 190_000,
    stock: 1,
    image: null,
    tag: 'Último',
    description: 'Sommier Brown en matrimonial.',
  },
  {
    id: 'exclusivo-140',
    name: 'Exclusivo',
    category: 'sommiers',
    size: '140x190',
    sizeLabel: 'Matrimonial',
    price: 190_000,
    stock: 2,
    image: null,
    description: 'Sommier Exclusivo en matrimonial.',
  },
  {
    id: 'legrand-100',
    name: 'Legrand',
    category: 'sommiers',
    size: '100x200',
    sizeLabel: '2 plazas',
    price: 190_000,
    stock: 4,
    image: null,
    description: 'Sommier Legrand, acabado fino.',
  },
  {
    id: 'paraiso-lila-100',
    name: 'Paraiso Lila',
    category: 'sommiers',
    size: '100x200',
    sizeLabel: '2 plazas',
    price: 190_000,
    stock: 2,
    image: null,
    description: 'Sommier Paraiso en tono lila.',
  },
  {
    id: 'montreux-80',
    name: 'Montreux',
    category: 'sommiers',
    size: '80x200',
    sizeLabel: '1 plaza',
    price: 190_000,
    stock: 4,
    image: null,
    description: 'Sommier Montreux, línea premium.',
  },
  // Olimpo Tela
  {
    id: 'olimpo-80',
    name: 'Olimpo Tela',
    category: 'sommiers',
    size: '80x200',
    sizeLabel: '1 plaza',
    price: 85_000,
    stock: 12,
    image: null,
    tag: 'Más vendido',
    description: 'Sommier Olimpo en tela, muy buen precio.',
  },
  {
    id: 'olimpo-90',
    name: 'Olimpo Tela',
    category: 'sommiers',
    size: '90x200',
    sizeLabel: '1½ plaza',
    price: 85_000,
    stock: 6,
    image: null,
    description: 'Sommier Olimpo Tela en 1.5 plaza.',
  },
  {
    id: 'olimpo-100',
    name: 'Olimpo Tela',
    category: 'sommiers',
    size: '100x200',
    sizeLabel: '2 plazas',
    price: 85_000,
    stock: 6,
    image: null,
    description: 'Sommier Olimpo Tela en 2 plazas.',
  },

  // ─── BOX ECOCUERO ─────────────────────────────────────────────────────────
  {
    id: 'box-eco-80x190',
    name: 'Box Ecocuero',
    category: 'sommiers',
    size: '80x190',
    sizeLabel: '1 plaza',
    price: 75_000,
    stock: 2,
    image: null,
    description: 'Box en ecocuero, acabado moderno.',
  },
  {
    id: 'box-eco-90x190',
    name: 'Box Ecocuero',
    category: 'sommiers',
    size: '90x190',
    sizeLabel: '1½ plaza',
    price: 75_000,
    stock: 9,
    image: null,
    tag: 'Stock alto',
    description: 'Box ecocuero en 1.5 plaza.',
  },
  {
    id: 'box-eco-100x190',
    name: 'Box Ecocuero',
    category: 'sommiers',
    size: '100x190',
    sizeLabel: '2 plazas',
    price: 75_000,
    stock: 13,
    image: null,
    tag: 'Más vendido',
    description: 'Box ecocuero en 2 plazas, gran stock.',
  },
  {
    id: 'box-eco-80x200',
    name: 'Box Ecocuero',
    category: 'sommiers',
    size: '80x200',
    sizeLabel: '1 plaza',
    price: 80_000,
    stock: 1,
    image: null,
    tag: 'Último',
    description: 'Box ecocuero en medida 80x200.',
  },
  {
    id: 'box-eco-90x200',
    name: 'Box Ecocuero',
    category: 'sommiers',
    size: '90x200',
    sizeLabel: '1½ plaza',
    price: 80_000,
    stock: 4,
    image: null,
    description: 'Box ecocuero en 1.5 plaza largo.',
  },
  {
    id: 'box-eco-100x200',
    name: 'Box Ecocuero',
    category: 'sommiers',
    size: '100x200',
    sizeLabel: '2 plazas',
    price: 80_000,
    stock: 2,
    image: null,
    description: 'Box ecocuero en 2 plazas largo.',
  },
  {
    id: 'box-eco-140x190',
    name: 'Box Ecocuero',
    category: 'sommiers',
    size: '140x190',
    sizeLabel: 'Matrimonial',
    price: 90_000,
    stock: 1,
    image: null,
    tag: 'Último',
    description: 'Box ecocuero matrimonial.',
  },
  {
    id: 'box-eco-130x190',
    name: 'Box Ecocuero',
    category: 'sommiers',
    size: '130x190',
    sizeLabel: '2 plazas grande',
    price: 90_000,
    stock: 1,
    image: null,
    tag: 'Último',
    description: 'Box ecocuero en 130cm.',
  },

  // ─── ALMOHADAS ────────────────────────────────────────────────────────────
  {
    id: 'almohada-darling',
    name: 'Almohada Darling',
    category: 'accesorios',
    size: '—',
    sizeLabel: 'Almohada',
    price: 15_000,
    stock: 5,
    image: '/images/almohada-fibra.jpg',
    description: 'Almohada básica, muy accesible.',
  },
  {
    id: 'almohada-cuore',
    name: 'Almohada Cuore',
    category: 'accesorios',
    size: '—',
    sizeLabel: 'Almohada',
    price: 25_000,
    stock: 16,
    image: '/images/almohada-micro.jpg',
    tag: 'Más vendido',
    description: 'Almohada Cuore, gran stock disponible.',
  },
  {
    id: 'almohada-confort-70',
    name: 'Confort Plus 70',
    category: 'accesorios',
    size: '—',
    sizeLabel: 'Almohada',
    price: 30_000,
    stock: 9,
    image: '/images/almohada-fibra.jpg',
    description: 'Almohada Confort Plus tamaño 70.',
  },
  {
    id: 'almohada-confort-80',
    name: 'Confort Plus 80',
    category: 'accesorios',
    size: '—',
    sizeLabel: 'Almohada',
    price: 40_000,
    stock: 3,
    image: '/images/almohada-micro.jpg',
    description: 'Almohada Confort Plus tamaño 80.',
  },
  {
    id: 'almohada-sensitive',
    name: 'Sensitive Standard',
    category: 'accesorios',
    size: '—',
    sizeLabel: 'Almohada',
    price: 30_000,
    stock: 1,
    image: '/images/almohada-fibra.jpg',
    tag: 'Último',
    description: 'Almohada Sensitive, material especial.',
  },
  {
    id: 'almohada-king-milan',
    name: 'Sensitive King Milan',
    category: 'accesorios',
    size: '—',
    sizeLabel: 'Almohada King',
    price: 50_000,
    stock: 7,
    image: '/images/almohada-micro.jpg',
    description: 'Almohada King Milan, formato grande.',
  },

  // ─── SABANAS ──────────────────────────────────────────────────────────────
  {
    id: 'sabana-classic-full',
    name: 'Juego Sabanas Classic Full',
    category: 'accesorios',
    size: '140',
    sizeLabel: 'Full (4 piezas)',
    price: 100_000,
    stock: 3,
    image: '/images/sabanas-140.jpg',
    description: 'Percal 144 hilos, 100% algodón con guarda.',
  },
  {
    id: 'sabana-classic-queen',
    name: 'Juego Sabanas Classic Queen',
    category: 'accesorios',
    size: '160',
    sizeLabel: 'Queen (4 piezas)',
    price: 110_000,
    stock: 1,
    image: '/images/sabanas-160.jpg',
    tag: 'Último',
    description: 'Percal 144 hilos, 100% algodón con guarda.',
  },
  {
    id: 'sabana-classic-king',
    name: 'Juego Sabanas Classic King',
    category: 'accesorios',
    size: '200',
    sizeLabel: 'King (4 piezas)',
    price: 130_000,
    stock: 1,
    image: '/images/sabanas-200.jpg',
    tag: 'Último',
    description: 'Percal 144 hilos, 100% algodón con guarda.',
  },
  {
    id: 'sabana-supreme-king',
    name: 'Juego Sabanas Supreme King',
    category: 'accesorios',
    size: '200',
    sizeLabel: 'King (4 piezas)',
    price: 200_000,
    stock: 2,
    image: '/images/sabanas-200.jpg',
    tag: 'Premium',
    description: '200 hilos, 100% algodón, línea Supreme.',
  },

  // ─── COVERS ───────────────────────────────────────────────────────────────
  {
    id: 'cover-tusor-queen',
    name: 'Cover Tusor Liso Queen',
    category: 'accesorios',
    size: '160',
    sizeLabel: 'Queen',
    price: 150_000,
    stock: 1,
    image: '/images/protector-160.jpg',
    tag: 'Último',
    description: 'Cover Tusor liso línea Premium.',
  },
  {
    id: 'cover-tusor-king',
    name: 'Cover Tusor Liso King',
    category: 'accesorios',
    size: '200',
    sizeLabel: 'King',
    price: 180_000,
    stock: 1,
    image: '/images/protector-200.jpg',
    tag: 'Último',
    description: 'Cover Tusor liso línea Premium.',
  },
  {
    id: 'cover-tusor-estampado-queen',
    name: 'Cover Tusor Estampado Queen',
    category: 'accesorios',
    size: '160',
    sizeLabel: 'Queen',
    price: 200_000,
    stock: 2,
    image: '/images/protector-160.jpg',
    description: 'Cover Tusor estampado línea Premium.',
  },
  {
    id: 'cubre-matelaseado-140',
    name: 'Cubre Matelaseado 2 plazas',
    category: 'accesorios',
    size: '140',
    sizeLabel: '2 plazas',
    price: 65_000,
    stock: 2,
    image: '/images/protector-140.jpg',
    description: 'Cubre colchón matelaseado 140x190.',
  },
  {
    id: 'cubre-matelaseado-200',
    name: 'Cubre Matelaseado Super King',
    category: 'accesorios',
    size: '200',
    sizeLabel: 'Super King',
    price: 100_000,
    stock: 2,
    image: '/images/protector-200.jpg',
    description: 'Cubre colchón matelaseado 200x200.',
  },
  {
    id: 'cubre-impermeable-100',
    name: 'Cubre Impermeable 1½ plaza',
    category: 'accesorios',
    size: '100',
    sizeLabel: '1½ plaza',
    price: 65_000,
    stock: 4,
    image: '/images/protector-140.jpg',
    description: 'Cubre impermeable 100x190.',
  },
]

// ============================================================================
// UTILIDADES
// ============================================================================

function formatPrice(n: number): string {
  return '$' + n.toLocaleString('es-AR')
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function CatalogoPage() {
  const [category, setCategory] = useState<Category>('todos')
  const [size, setSize] = useState<Size>('todos')

  // Categorías con conteo
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { todos: PRODUCTS.length }
    PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])

  // Tamaños disponibles según categoría activa
  const availableSizes = useMemo(() => {
    const filtered = category === 'todos' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)
    const widths = new Set<string>()
    filtered.forEach((p) => {
      const w = p.size.split('x')[0]
      if (w && w !== '—' && !isNaN(Number(w))) widths.add(w)
    })
    return Array.from(widths).sort((a, b) => Number(a) - Number(b))
  }, [category])

  // Reset size filter si el tamaño activo no existe en la nueva categoría
  const effectiveSize: Size = availableSizes.includes(size) ? size : 'todos'

  // Productos filtrados
  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (category !== 'todos' && p.category !== category) return false
      if (effectiveSize !== 'todos') {
        const w = p.size.split('x')[0]
        if (w !== effectiveSize) return false
      }
      return true
    })
  }, [category, effectiveSize])

  // Labels de tamaño
  const sizeLabels: Record<string, string> = {
    '80': '80cm · 1 plaza',
    '90': '90cm · 1½',
    '100': '100cm · 2 plazas',
    '130': '130cm',
    '140': '140cm · Matrimonial',
    '160': '160cm · Queen',
    '180': '180cm · King',
    '200': '200cm · Super King',
  }

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* ─── FILTROS ─────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-3 space-y-2.5">

          {/* Categorías */}
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {(['todos', 'colchones', 'sommiers', 'accesorios'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setSize('todos') }}
                className={[
                  'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200',
                  category === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700',
                ].join(' ')}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                <span className="ml-1.5 text-xs opacity-60">({categoryCounts[cat] || 0})</span>
              </button>
            ))}
          </div>

          {/* Tamaños — solo si hay tamaños disponibles */}
          {availableSizes.length > 0 && (
            <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              <button
                onClick={() => setSize('todos')}
                className={[
                  'flex-shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200',
                  effectiveSize === 'todos'
                    ? 'bg-zinc-700 text-white'
                    : 'text-zinc-500 hover:text-zinc-300',
                ].join(' ')}
              >
                Todos
              </button>
              {availableSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s as Size)}
                  className={[
                    'flex-shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap',
                    effectiveSize === s
                      ? 'bg-zinc-700 text-white'
                      : 'text-zinc-500 hover:text-zinc-300',
                  ].join(' ')}
                >
                  {sizeLabels[s] || s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── GRID ────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Contador resultados */}
        <p className="text-xs text-zinc-600 mb-4">
          {filtered.length} producto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-zinc-600 text-sm">No hay productos con ese filtro.</p>
            <button
              onClick={() => { setCategory('todos'); setSize('todos') }}
              className="mt-3 text-blue-400 text-sm hover:text-blue-300 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* ─── CONDICIONES DE VENTA ────────────────────────────────────────── */}
      <div className="border-t border-zinc-800 mt-4">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h3 className="text-sm font-semibold text-zinc-400 mb-3">Condiciones de venta · Febrero 2026</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { label: 'Contado / Transferencia', detail: 'Sin recargo' },
              { label: 'Débito y Crédito 1 pago', detail: 'Sin recargo' },
              { label: '3 cuotas', detail: '+18%' },
              { label: '6 cuotas', detail: '+27%' },
              { label: '9 cuotas', detail: '+38%' },
              { label: '12 cuotas', detail: '+52%' },
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900 rounded-lg px-3 py-2.5">
                <p className="text-xs text-zinc-300 font-medium">{item.label}</p>
                <p className={`text-xs mt-0.5 ${item.detail === 'Sin recargo' ? 'text-green-400' : 'text-zinc-500'}`}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-800 py-5 mt-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-600">
          <span>© 2025 Azul Colchones · Balerdi 855, Villa María, Córdoba</span>
          <span>+35 años de experiencia</span>
        </div>
      </footer>
    </div>
  )
}

// ============================================================================
// PRODUCT CARD
// ============================================================================

function ProductCard({ product }: { product: Product }) {
  const isLow = product.stock <= 2
  const isHighStock = product.stock >= 6

  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-all duration-200">

      {/* Imagen o placeholder */}
      <div className="relative bg-zinc-800 aspect-square overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {product.category === 'sommiers' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm4-2V2m8 2V2M4 10h16" />
              ) : product.sizeLabel === 'Almohada' || product.sizeLabel === 'Almohada King' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 6h12v6a6 6 0 01-12 0V6z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h18v10a3 3 0 01-3 3H6a3 3 0 01-3-3V7zm0 4h18M3 7a3 3 0 013-3h12a3 3 0 013 3" />
              )}
            </svg>
          </div>
        )}

        {/* Tag */}
        {product.tag && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-zinc-950/80 border border-zinc-700 rounded-md text-[10px] font-semibold text-zinc-300">
            {product.tag}
          </span>
        )}

        {/* Stock bajo */}
        {isLow && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-amber-500/15 border border-amber-500/30 rounded-md text-[10px] font-semibold text-amber-400">
            ¡Solo {product.stock}!
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-zinc-500 mb-0.5">{product.sizeLabel} · {product.size !== '—' ? product.size : ''}</p>
        <h3 className="text-sm font-bold text-white leading-tight truncate">{product.name}</h3>
        <p className="text-[11px] text-zinc-600 mt-0.5 line-clamp-2">{product.description}</p>

        {/* precio */}
        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-base font-bold text-white">{formatPrice(product.price)}</span>
          {isHighStock && (
            <span className="text-[10px] text-green-500 font-medium">Stock disponible</span>
          )}
        </div>
      </div>
    </div>
  )
}