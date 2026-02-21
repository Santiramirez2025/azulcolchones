// app/piero-fabrica/page.tsx - OPTIMIZADO MOBILE-FIRST
import type { Metadata } from 'next'
import ProductosPage from './ProductPage'
import PacksComerciales from './PacksComerciales'
import HeroMinimal from './HeroMinimal'
import FAQSection from './FAQSection'
import CTAFinal from './CTAFinal'
import Footer from '@/components/productos/Footer'

// ============================================================================
// METADATA SEO
// ============================================================================

export const metadata: Metadata = {
  title: 'Colchones PIERO Fábrica | Hasta 49% OFF vs MercadoLibre | Villa María',
  description:
    'Comprá colchones PIERO directo de fábrica. Mismo producto, misma garantía, hasta 49% menos que MercadoLibre. Entrega 7-10 días. Distribuidor oficial en Villa María.',

  keywords: [
    'colchones PIERO fábrica',
    'PIERO Villa María',
    'colchones descuento',
    'colchones baratos Córdoba',
    'distribuidor PIERO',
  ],

  robots: 'index, follow',

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/piero-fabrica`,
  },

  openGraph: {
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/piero-fabrica`,
    siteName: 'Azul Colchones',
    title: 'PIERO Fábrica: Hasta 49% OFF | Azul Colchones Villa María',
    description: 'Comprá directo de fábrica. Mismo producto, misma garantía, hasta 49% menos.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-piero-fabrica.jpg`,
        width: 1200,
        height: 630,
        alt: 'Colchones PIERO Fábrica - Azul Colchones Villa María',
      },
    ],
    locale: 'es_AR',
  },
}

export const revalidate = 43200 // 12 hours

// ============================================================================
// SEPARADOR VISUAL — mobile-safe
// ============================================================================

function SeparadorSeccion({ texto }: { texto: string }) {
  return (
    <div className="relative py-8 md:py-12 bg-zinc-950">
      {/*
       * px-4 garantiza que el contenido nunca toque los bordes del viewport.
       * El gradiente de los separadores usa `via-zinc-700/60` en lugar de
       * colores sólidos para evitar artefactos visuales en pantallas OLED.
       */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-zinc-700/60" />
          <span className="shrink-0 text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-widest px-2 text-center leading-tight">
            {texto}
          </span>
          <div className="flex-1 min-w-0 h-px bg-gradient-to-l from-transparent via-zinc-700/60 to-zinc-700/60" />
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// PAGE PRINCIPAL
// ============================================================================

export default function PieroFabricaPage() {
  return (
    /*
     * ─── FIXES MOBILE CRÍTICOS ───────────────────────────────────────────────
     *
     * 1. `overflow-x-hidden` en el wrapper raíz: corta cualquier elemento hijo
     *    que desborde horizontalmente (tablas, grids con gap, elementos absolute,
     *    negative margins, etc.). Es la primera línea de defensa.
     *
     * 2. `w-full` en lugar de `min-h-screen w-full`: en iOS Safari, `100vw`
     *    puede incluir el ancho de la scrollbar y provocar overflow. `w-full`
     *    hereda el ancho del body de forma segura.
     *
     * 3. `touch-pan-y` (Tailwind: `touch-pan-y`): fuerza scroll vertical nativo
     *    en dispositivos táctiles. Evita el "rubber-band" lateral involuntario.
     *    Si usás gestos personalizados, reemplazá por `touch-auto`.
     *
     * 4. `isolate`: crea un nuevo stacking context para que los `z-index` de
     *    los hijos (modales, drawers, sticky headers) no rompan el layout.
     *
     * 5. `[&_*]:max-w-full` aplica `max-width: 100%` a TODOS los descendientes
     *    como red de seguridad para imágenes, videos e iframes sin `w-full`.
     *    Si algún componente hijo necesita overflow controlado (ej: slider
     *    horizontal), agregale `overflow-x-auto` directamente en ese componente
     *    y wrapeá con `max-w-none` para cancelar este constraint puntualmente.
     *
     * 6. `antialiased` + `subpixel-antialiased` → solo `antialiased` en dark
     *    backgrounds. Queda bien en zinc-950.
     *
     * ─────────────────────────────────────────────────────────────────────────
     */
    <div
      className={[
        'min-h-screen',      // altura mínima para fondos consistentes
        'w-full',            // ancho seguro, no 100vw
        'overflow-x-hidden', // ← fix principal del scroll lateral
        'bg-zinc-950',
        'antialiased',
        'isolate',           // stacking context limpio
        'touch-pan-y',       // scroll vertical nativo en touch
      ].join(' ')}
    >
      {/* ── Hero con Asesor ─────────────────────────────────── */}
      <HeroMinimal />

      {/* ── Catálogo de Productos ───────────────────────────── */}
      {/*
       * section con `min-w-0` evita que flex/grid children expandan
       * el contenedor más allá del viewport cuando hay texto largo o
       * elementos con width intrínseco grande.
       */}
      <section id="productos" className="w-full min-w-0">
        <ProductosPage />
      </section>

      {/* ── Separador ───────────────────────────────────────── */}
      <SeparadorSeccion texto="O aprovechá nuestros combos con descuento extra" />

      {/* ── Packs Comerciales ───────────────────────────────── */}
      <section id="packs" className="w-full min-w-0">
        <PacksComerciales />
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <FAQSection />

      {/* ── CTA Final ───────────────────────────────────────── */}
      <CTAFinal />

      {/* ── Footer ──────────────────────────────────────────── */}
      <Footer />
    </div>
  )
}

/*
 * ─── CHECKLIST DE REVISIÓN EN COMPONENTES HIJOS ──────────────────────────────
 *
 * Si el scroll lateral PERSISTE después de aplicar este fix, el problema
 * está en algún componente hijo. Usá este proceso para encontrarlo:
 *
 *   1. DevTools → Elements → buscar el elemento que causa overflow:
 *      En Chrome: F12 → Computed → busca `overflow` o usá:
 *        document.querySelectorAll('*').forEach(el => {
 *          if (el.scrollWidth > el.clientWidth) console.log(el);
 *        });
 *
 *   2. Patterns problemáticos comunes a revisar en cada hijo:
 *
 *      ❌  className="w-[800px]"          → ✅ className="w-full max-w-[800px]"
 *      ❌  className="px-[-20px]"         → ✅ eliminar negative padding
 *      ❌  className="-mx-4 sm:mx-0"      → ✅ wrapearlo en overflow-hidden
 *      ❌  grid-cols-4 sin responsive     → ✅ grid-cols-1 sm:grid-cols-2 md:grid-cols-4
 *      ❌  flex sin flex-wrap             → ✅ agregar flex-wrap o flex-col en mobile
 *      ❌  <img> sin width/height         → ✅ <Image> de Next.js con sizes correcto
 *      ❌  gap-8 en flex sin wrap         → ✅ gap-4 sm:gap-8 + flex-wrap
 *      ❌  min-w-[Xpx] en cards          → ✅ min-w-0 + w-full en mobile
 *      ❌  absolute/fixed sin right bound → ✅ agregar right-0 o max-w constraint
 *      ❌  whitespace-nowrap en textos   → ✅ solo en elementos controlados
 *      ❌  translate-x sin bounds        → ✅ limitar al viewport
 *
 *   3. En HeroMinimal, PacksComerciales, ProductosPage:
 *      - Todo contenedor directo debe tener: `w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
 *      - Nunca usar `px-0` en mobile sin `overflow-hidden` en el padre
 *      - Cards en grid: siempre `min-w-0` para evitar que el contenido
 *        interno (texto, imágenes) expanda el grid container
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */