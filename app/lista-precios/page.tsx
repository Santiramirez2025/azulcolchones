import type { Metadata } from 'next'
import { HIGHLIGHTS_POR_MODELO } from '@/data/productos'

export const metadata: Metadata = {
  title: 'HOT SALE — Lista de Precios Azul Colchones',
  description: 'HOT SALE Azul Colchones: precios especiales en colchones, sommiers y accesorios Piero. Distribuidor oficial exclusivo en Villa María, Córdoba.',
}

export default function ListaPrecios() {
  return (
    <>
      <style>{`
        :root {
          --azul: #1a3a5c;
          --azul-medio: #2a5298;
          --celeste: #4a90d9;
          --oro: #c8a96e;
          --crema: #faf8f4;
          --gris-suave: #f0eff0;
          --gris-texto: #5a5a6e;
          --blanco: #ffffff;
          --hot-rojo: #e11d48;
          --hot-naranja: #f97316;
          --hot-amarillo: #fbbf24;
        }

        .lp-body {
          font-family: 'Georgia', serif;
          background: var(--crema);
          color: #222;
          min-height: 100vh;
        }

        /* ===== SCROLL OFFSET para que el ancla no quede pegada al header ===== */
        .lp-seccion {
          scroll-margin-top: 100px;
          margin-bottom: 48px;
        }

        /* ===== HEADER ===== */
        .lp-header {
          background: var(--azul);
          color: white;
          padding: 32px 48px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 4px solid var(--oro);
        }
        .lp-marca {
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.5px;
          line-height: 1;
        }
        .lp-marca span { color: var(--oro); }
        .lp-submarca {
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          margin-top: 6px;
          font-family: sans-serif;
        }
        .lp-dist-badge {
          background: var(--oro);
          color: var(--azul);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 2px;
          margin-bottom: 8px;
          display: inline-block;
          font-family: sans-serif;
        }
        .lp-piero {
          font-size: 28px;
          font-weight: 700;
          color: white;
          letter-spacing: 2px;
        }
        .lp-fecha {
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          margin-top: 6px;
          font-family: sans-serif;
        }
        .lp-header-right { text-align: right; }

        /* ===== HOT SALE BANNER ===== */
        .lp-hotsale-banner {
          background: linear-gradient(90deg, var(--hot-rojo) 0%, var(--hot-naranja) 50%, var(--hot-rojo) 100%);
          background-size: 200% 100%;
          animation: lp-hot-shimmer 4s linear infinite;
          color: white;
          text-align: center;
          padding: 18px 24px;
          font-family: sans-serif;
          position: relative;
          overflow: hidden;
        }
        .lp-hotsale-titulo {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: 6px;
          text-transform: uppercase;
          text-shadow: 0 2px 12px rgba(0,0,0,0.25);
          line-height: 1;
        }
        .lp-hotsale-fire { font-size: 28px; vertical-align: middle; margin: 0 8px; }
        .lp-hotsale-sub {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-top: 6px;
          opacity: 0.95;
        }
        @keyframes lp-hot-shimmer {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        /* ===== AVISO BAR ===== */
        .lp-aviso {
          background: var(--azul-medio);
          color: white;
          text-align: center;
          padding: 10px 48px;
          font-size: 13px;
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
          font-family: sans-serif;
        }
        .lp-aviso span { display: flex; align-items: center; gap: 6px; }
        .lp-dot { width: 6px; height: 6px; background: var(--oro); border-radius: 50%; flex-shrink: 0; }
        .lp-dot-hot { background: var(--hot-amarillo); }

        /* ===== CONTAINER ===== */
        .lp-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 32px 60px;
        }

        /* ===== SECCIÓN ===== */
        .lp-seccion-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 2px solid var(--azul);
          transition: background 1.5s ease;
        }
        .lp-seccion-icono {
          width: 44px; height: 44px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; flex-shrink: 0;
        }
        .lp-seccion-titulo {
          font-size: 22px; font-weight: 600; color: var(--azul);
        }
        .lp-seccion-subtitulo {
          font-size: 12px; color: var(--gris-texto); font-weight: 400;
          margin-top: 2px; text-transform: uppercase; letter-spacing: 1px;
          font-family: sans-serif;
        }
        .lp-badge {
          margin-left: auto; padding: 4px 12px; border-radius: 20px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
          text-transform: uppercase; font-family: sans-serif;
        }
        .lp-badge-ancla    { background: #fde8e8; color: #c0392b; }
        .lp-badge-equil    { background: #e8f0fe; color: #1a56db; }
        .lp-badge-premium  { background: #fef3e2; color: #92400e; }
        .lp-badge-accesorio{ background: #ecfdf5; color: #1a6b3c; }
        .lp-badge-hot {
          background: linear-gradient(90deg, var(--hot-rojo), var(--hot-naranja));
          color: white;
          box-shadow: 0 2px 8px rgba(225, 29, 72, 0.35);
        }

        /* ===== DESTACAR sección cuando llegás desde un ancla ===== */
        .lp-seccion:target .lp-seccion-header {
          animation: lp-highlight 2.5s ease-out;
        }
        @keyframes lp-highlight {
          0%   { background: rgba(200, 169, 110, 0.35); box-shadow: 0 0 0 8px rgba(200, 169, 110, 0.2); }
          100% { background: transparent; box-shadow: none; }
        }

        /* ===== TABLA ===== */
        .lp-tabla-wrapper {
          background: white; border-radius: 12px; overflow: hidden;
          box-shadow: 0 2px 16px rgba(26,58,92,0.08);
          border: 1px solid rgba(26,58,92,0.08);
        }
        .lp-tabla-wrapper table { width: 100%; border-collapse: collapse; }
        .lp-tabla-wrapper thead th {
          background: var(--azul); color: white;
          padding: 12px 18px; font-size: 11px; font-weight: 600;
          letter-spacing: 1.5px; text-transform: uppercase; text-align: left;
          font-family: sans-serif;
        }
        .lp-tabla-wrapper thead th:last-child { text-align: right; }
        .lp-tabla-wrapper tbody tr { border-bottom: 1px solid #f0f0f5; }
        .lp-tabla-wrapper tbody tr:last-child { border-bottom: none; }
        .lp-tabla-wrapper tbody tr:hover { background: #fff7ed; }
        .lp-tabla-wrapper tbody tr.lp-destacado { background: #fffdf5; }
        .lp-tabla-wrapper td {
          padding: 13px 18px; font-size: 14px; color: #333; vertical-align: middle;
          font-family: sans-serif;
        }

        .lp-col-medida { color: var(--gris-texto); font-size: 13px; }
        .lp-col-precio {
          text-align: right; font-size: 17px; font-weight: 700;
          color: var(--hot-rojo); white-space: nowrap;
        }
        .lp-star {
          display: inline-block; background: var(--oro); color: white;
          font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 10px;
          margin-left: 6px; letter-spacing: 0.5px; text-transform: uppercase; vertical-align: middle;
        }
        .lp-hot-tag {
          display: inline-block;
          background: linear-gradient(90deg, var(--hot-rojo), var(--hot-naranja));
          color: white;
          font-size: 9px; font-weight: 800; padding: 2px 7px; border-radius: 10px;
          margin-left: 6px; letter-spacing: 0.5px; text-transform: uppercase; vertical-align: middle;
        }
        .lp-consultar {
          display: inline-block; background: #fef3e2; color: #92400e;
          font-size: 10px; padding: 2px 8px; border-radius: 10px; font-weight: 600;
        }

        /* ===== GRUPO SUBHEADER ===== */
        .lp-tr-grupo td {
          background: #f5f6fa; color: var(--azul-medio);
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 1px; padding: 7px 18px; font-family: sans-serif;
        }
        .lp-categoria-grupo {
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px;
          padding: 8px 14px; background: var(--gris-suave);
          border-bottom: 1px solid #e8e8f0;
        }
        .lp-categoria-grupo > span:first-child {
          font-size: 11px; font-weight: 700; color: var(--azul-medio);
          text-transform: uppercase; letter-spacing: 1px; font-family: sans-serif;
        }

        /* ===== GRID ACCESORIOS ===== */
        .lp-grid-2 {
          display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
        }
        .lp-tabla-sm { margin-bottom: 16px; }
        .lp-tabla-wrapper.compact thead th { background: #2a5298; padding: 10px 14px; font-size: 10px; }
        .lp-tabla-wrapper.compact td { padding: 10px 14px; font-size: 13px; }
        .lp-tabla-wrapper.compact .lp-col-precio { font-size: 15px; }

        /* ===== LEYENDA ===== */
        .lp-leyenda {
          display: flex; gap: 24px; flex-wrap: wrap;
          margin-top: 12px; font-size: 12px; color: var(--gris-texto);
          font-family: sans-serif;
          align-items: center;
        }
        .lp-leyenda-item { display: flex; align-items: center; gap: 6px; }

        /* ===== FOOTER ===== */
        .lp-footer {
          background: var(--azul); color: rgba(255,255,255,0.7);
          padding: 28px 48px;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 16px; margin-top: 20px;
          font-family: sans-serif;
        }
        .lp-footer-nota { font-size: 12px; line-height: 1.6; }
        .lp-footer-nota strong { color: var(--oro); }
        .lp-footer-nota .lp-hot-text { color: var(--hot-amarillo); font-weight: 700; }
        .lp-footer-contacto { text-align: right; font-size: 13px; }
        .lp-footer-contacto strong { color: white; display: block; font-size: 15px; margin-bottom: 4px; }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .lp-header { padding: 20px; flex-direction: column; gap: 16px; text-align: center; }
          .lp-header-right { text-align: center; }
          .lp-container { padding: 24px 16px; }
          .lp-grid-2 { grid-template-columns: 1fr; }
          .lp-aviso { gap: 12px; padding: 10px 16px; }
          .lp-hotsale-titulo { font-size: 22px; letter-spacing: 3px; }
          .lp-hotsale-fire { font-size: 20px; }
          .lp-hotsale-sub { font-size: 11px; letter-spacing: 2px; }
          .lp-footer { padding: 20px; flex-direction: column; }
          .lp-footer-contacto { text-align: left; }
          .lp-tabla-wrapper td, .lp-tabla-wrapper thead th { padding: 10px 12px; }
          .lp-seccion { scroll-margin-top: 80px; }
        }

        @media print {
          .lp-aviso, .lp-hotsale-banner { display: none; }
          .lp-seccion { page-break-inside: avoid; }
        }

        html { scroll-behavior: smooth; }
      `}</style>

      <div className="lp-body">

        {/* HEADER */}
        <div className="lp-header">
          <div>
            <div className="lp-marca">Azul <span>Colchones</span></div>
            <div className="lp-submarca">Distribuidor Oficial Exclusivo · Villa María, Córdoba</div>
          </div>
          <div className="lp-header-right">
            <div className="lp-dist-badge">Distribuidor Exclusivo</div>
            <div className="lp-piero">PIERO</div>
            <div className="lp-fecha">Lista HOT SALE · Mayo 2026</div>
          </div>
        </div>

        {/* HOT SALE BANNER */}
        <div className="lp-hotsale-banner">
          <div className="lp-hotsale-titulo">
            <span className="lp-hotsale-fire">🔥</span>
            HOT SALE
            <span className="lp-hotsale-fire">🔥</span>
          </div>
          <div className="lp-hotsale-sub">Precios Especiales · Por Tiempo Limitado</div>
        </div>

        {/* AVISO */}
        <div className="lp-aviso">
          <span><span className="lp-dot lp-dot-hot" />Precios HOT SALE vigentes</span>
          <span><span className="lp-dot" />Garantía oficial Piero</span>
          <span><span className="lp-dot" />Delivery a Villa María y zona</span>
        </div>

        <div className="lp-container">

          {/* ── MEDITARE EUROPILLOW ── */}
          <div id="meditare" className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#fde8e8' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Meditare EuroPillow</div>
                <div className="lp-seccion-subtitulo">{HIGHLIGHTS_POR_MODELO.meditare}</div>
              </div>
              <span className="lp-badge lp-badge-hot">🔥 Hot Sale</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr><td className="lp-col-medida">190×80 · 1 plaza</td><td>Colchón Piero Meditare EuroPillow</td><td className="lp-col-precio">$290.500</td></tr>
                  <tr><td className="lp-col-medida">190×90 · 1 plaza</td><td>Colchón Piero Meditare EuroPillow</td><td className="lp-col-precio">$322.900</td></tr>
                  <tr><td className="lp-col-medida">190×100 · 1 plaza</td><td>Colchón Piero Meditare EuroPillow</td><td className="lp-col-precio">$355.600</td></tr>
                  <tr><td className="lp-col-medida">190×130 · 1½ plaza</td><td>Colchón Piero Meditare EuroPillow</td><td className="lp-col-precio">$452.700</td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Meditare EuroPillow</td><td className="lp-col-precio">$487.200</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── SONNO EUROPILLOW ── */}
          <div id="sonno" className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#fde8e8' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Sonno EuroPillow</div>
                <div className="lp-seccion-subtitulo">Línea Entrada · Más Vendido</div>
              </div>
              <span className="lp-badge lp-badge-hot">🔥 Hot Sale</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr><td className="lp-col-medida">190×80 · 1 plaza</td><td>Colchón Piero Sonno EuroPillow</td><td className="lp-col-precio">$384.400</td></tr>
                  <tr><td className="lp-col-medida">190×90 · 1 plaza</td><td>Colchón Piero Sonno EuroPillow</td><td className="lp-col-precio">$419.500</td></tr>
                  <tr><td className="lp-col-medida">190×100 · 1 plaza</td><td>Colchón Piero Sonno EuroPillow</td><td className="lp-col-precio">$454.900</td></tr>
                  <tr><td className="lp-col-medida">190×130 · 1½ plaza</td><td>Colchón Piero Sonno EuroPillow</td><td className="lp-col-precio">$575.800</td></tr>
                  <tr className="lp-destacado"><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Sonno EuroPillow <span className="lp-star">⭐ Destacado</span></td><td className="lp-col-precio">$625.100</td></tr>
                  <tr><td className="lp-col-medida">190×160 · 2 plazas</td><td>Colchón Piero Sonno EuroPillow</td><td className="lp-col-precio">$682.000</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── NIRVANA ── */}
          <div id="nirvana" className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#e8f0fe' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Nirvana 2.0</div>
                <div className="lp-seccion-subtitulo">{HIGHLIGHTS_POR_MODELO.nirvana}</div>
              </div>
              <span className="lp-badge lp-badge-hot">🔥 Hot Sale</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr><td className="lp-col-medida">190×80 · 1 plaza</td><td>Colchón Piero Nirvana 2.0</td><td className="lp-col-precio">$448.900</td></tr>
                  <tr><td className="lp-col-medida">190×90 · 1 plaza</td><td>Colchón Piero Nirvana 2.0</td><td className="lp-col-precio">$500.300</td></tr>
                  <tr><td className="lp-col-medida">190×100 · 1 plaza</td><td>Colchón Piero Nirvana 2.0</td><td className="lp-col-precio">$568.500</td></tr>
                  <tr><td className="lp-col-medida">190×130 · 1½ plaza</td><td>Colchón Piero Nirvana 2.0</td><td className="lp-col-precio">$710.300</td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Nirvana 2.0</td><td className="lp-col-precio">$760.400</td></tr>
                  <tr><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Nirvana 2.0</td><td className="lp-col-precio">$969.100</td></tr>
                  <tr><td className="lp-col-medida">200×180 · Queen XL</td><td>Colchón Piero Nirvana 2.0</td><td className="lp-col-precio">$1.066.000</td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Nirvana 2.0</td><td className="lp-col-precio">$1.151.300</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── NAMASTE / NAMASTE PILLOW TOP ── */}
          <div id="namaste" className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#e8f0fe' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Namaste / Namaste Pillow Top</div>
                <div className="lp-seccion-subtitulo">{HIGHLIGHTS_POR_MODELO.namaste}</div>
              </div>
              <span className="lp-badge lp-badge-hot">🔥 Hot Sale</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr className="lp-tr-grupo"><td colSpan={3}>Namaste</td></tr>
                  <tr><td className="lp-col-medida">190×80 · 1 plaza</td><td>Colchón Piero Namaste</td><td className="lp-col-precio">$348.400</td></tr>
                  <tr><td className="lp-col-medida">190×90 · 1 plaza</td><td>Colchón Piero Namaste</td><td className="lp-col-precio">$388.100</td></tr>
                  <tr><td className="lp-col-medida">190×100 · 1 plaza</td><td>Colchón Piero Namaste</td><td className="lp-col-precio">$427.900</td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Namaste</td><td className="lp-col-precio">$586.800</td></tr>
                  <tr><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Namaste</td><td className="lp-col-precio">$748.400</td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Namaste</td><td className="lp-col-precio">$898.000</td></tr>
                  <tr className="lp-tr-grupo"><td colSpan={3}>Namaste Pillow Top</td></tr>
                  <tr><td className="lp-col-medida">190×100 · 1 plaza</td><td>Colchón Piero Namaste Pillow Top</td><td className="lp-col-precio">$516.200</td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Namaste Pillow Top</td><td className="lp-col-precio">$744.300</td></tr>
                  <tr><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Namaste Pillow Top</td><td className="lp-col-precio">$851.200</td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Namaste Pillow Top</td><td className="lp-col-precio">$1.043.800</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── REGNO / REGNO PILLOW TOP ── */}
          <div id="regno" className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#e8f0fe' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Regno / Regno Pillow Top</div>
                <div className="lp-seccion-subtitulo">{HIGHLIGHTS_POR_MODELO.regno}</div>
              </div>
              <span className="lp-badge lp-badge-hot">🔥 Hot Sale</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr className="lp-tr-grupo"><td colSpan={3}>Regno</td></tr>
                  <tr><td className="lp-col-medida">190×80 · 1 plaza</td><td>Colchón Piero Regno</td><td className="lp-col-precio">$397.700</td></tr>
                  <tr><td className="lp-col-medida">190×90 · 1 plaza</td><td>Colchón Piero Regno</td><td className="lp-col-precio">$430.200</td></tr>
                  <tr><td className="lp-col-medida">190×100 · 1 plaza</td><td>Colchón Piero Regno</td><td className="lp-col-precio">$468.600</td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Regno</td><td className="lp-col-precio">$612.800</td></tr>
                  <tr><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Regno</td><td className="lp-col-precio">$723.300</td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Regno</td><td className="lp-col-precio">$890.300</td></tr>
                  <tr className="lp-tr-grupo"><td colSpan={3}>Regno Pillow Top</td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Regno Pillow Top</td><td className="lp-col-precio">$766.200</td></tr>
                  <tr><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Regno Pillow Top</td><td className="lp-col-precio">$879.000</td></tr>
                  <tr><td className="lp-col-medida">200×180 · Queen XL</td><td>Colchón Piero Regno Pillow Top</td><td className="lp-col-precio">$974.700</td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Regno Pillow Top</td><td className="lp-col-precio">$1.069.500</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── GRAVITA ── */}
          <div id="gravita" className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#e8f0fe' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Gravita</div>
                <div className="lp-seccion-subtitulo">{HIGHLIGHTS_POR_MODELO.gravita}</div>
              </div>
              <span className="lp-badge lp-badge-hot">🔥 Hot Sale</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Gravita</td><td className="lp-col-precio">$1.004.200</td></tr>
                  <tr><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Gravita</td><td className="lp-col-precio">$1.235.100</td></tr>
                  <tr><td className="lp-col-medida">200×180 · Queen XL</td><td>Colchón Piero Gravita</td><td className="lp-col-precio">$1.322.100</td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Gravita</td><td className="lp-col-precio">$1.406.000</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── MONTREAUX / MONTREAUX PILLOW TOP ── */}
          <div id="montreaux" className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#fef3e2' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Montreaux / Montreaux Pillow Top</div>
                <div className="lp-seccion-subtitulo">{HIGHLIGHTS_POR_MODELO.montreaux}</div>
              </div>
              <span className="lp-badge lp-badge-hot">🔥 Hot Sale</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr className="lp-tr-grupo"><td colSpan={3}>Montreaux</td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Montreaux</td><td className="lp-col-precio">$1.054.000</td></tr>
                  <tr><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Montreaux</td><td className="lp-col-precio">$1.322.400</td></tr>
                  <tr><td className="lp-col-medida">200×180 · Queen XL</td><td>Colchón Piero Montreaux</td><td className="lp-col-precio">$1.414.500</td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Montreaux</td><td className="lp-col-precio">$1.499.100</td></tr>
                  <tr className="lp-tr-grupo"><td colSpan={3}>Montreaux Pillow Top</td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Montreaux Pillow Top</td><td className="lp-col-precio">$1.324.100</td></tr>
                  <tr className="lp-destacado"><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Montreaux Pillow Top <span className="lp-star">⭐ Destacado</span></td><td className="lp-col-precio">$1.613.400</td></tr>
                  <tr><td className="lp-col-medida">200×180 · Queen XL</td><td>Colchón Piero Montreaux Pillow Top</td><td className="lp-col-precio">$1.731.100</td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Montreaux Pillow Top</td><td className="lp-col-precio">$1.836.100</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── DREAM FIT ── */}
          <div id="dreamfit" className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#fef3e2' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Dream Fit Pocket / Dream Fit Foam</div>
                <div className="lp-seccion-subtitulo">Línea Ultra Premium · Alta Tecnología · Bajo Pedido</div>
              </div>
              <span className="lp-badge lp-badge-hot">🔥 Hot Sale</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr className="lp-tr-grupo"><td colSpan={3}>Dream Fit Pocket</td></tr>
                  <tr><td className="lp-col-medida">190×140×32 · 2 plazas</td><td>Colchón Piero Dream Fit Pocket <span className="lp-consultar">Consultar stock</span></td><td className="lp-col-precio">$2.081.100</td></tr>
                  <tr><td className="lp-col-medida">200×160×32 · Queen</td><td>Colchón Piero Dream Fit Pocket <span className="lp-consultar">Consultar stock</span></td><td className="lp-col-precio">$2.396.400</td></tr>
                  <tr><td className="lp-col-medida">200×200×32 · King</td><td>Colchón Piero Dream Fit Pocket <span className="lp-consultar">Consultar stock</span></td><td className="lp-col-precio">$2.727.000</td></tr>
                  <tr className="lp-tr-grupo"><td colSpan={3}>Dream Fit Foam</td></tr>
                  <tr><td className="lp-col-medida">190×140×32 · 2 plazas</td><td>Colchón Piero Dream Fit Foam <span className="lp-consultar">Consultar stock</span></td><td className="lp-col-precio">$1.963.400</td></tr>
                  <tr><td className="lp-col-medida">200×160×32 · Queen</td><td>Colchón Piero Dream Fit Foam <span className="lp-consultar">Consultar stock</span></td><td className="lp-col-precio">$2.325.400</td></tr>
                  <tr><td className="lp-col-medida">200×200×32 · King</td><td>Colchón Piero Dream Fit Foam <span className="lp-consultar">Consultar stock</span></td><td className="lp-col-precio">$2.646.300</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── SOMMIERS ── */}
          <div id="sommiers" className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#ecfdf5' }}>📦</div>
              <div>
                <div className="lp-seccion-titulo">Sommiers Piero</div>
                <div className="lp-seccion-subtitulo">Bases y Somieres · Todas las Líneas</div>
              </div>
              <span className="lp-badge lp-badge-hot">🔥 Hot Sale</span>
            </div>
            <div className="lp-grid-2">
              <div>
                <div className="lp-tabla-wrapper compact">
                  <div className="lp-categoria-grupo">
                    <span>Sommier Grey</span>
                  </div>
                  <table><thead><tr><th>Medida</th><th>Precio</th></tr></thead>
                  <tbody>
                    <tr><td>190×80</td><td className="lp-col-precio">$182.700</td></tr>
                    <tr><td>190×90</td><td className="lp-col-precio">$195.400</td></tr>
                    <tr><td>190×100</td><td className="lp-col-precio">$214.300</td></tr>
                    <tr><td>190×130</td><td className="lp-col-precio">$238.800</td></tr>
                    <tr><td>190×140</td><td className="lp-col-precio">$242.100</td></tr>
                    <tr><td>200×160</td><td className="lp-col-precio">$388.500</td></tr>
                    <tr><td>200×180</td><td className="lp-col-precio">$403.800</td></tr>
                    <tr><td>200×200</td><td className="lp-col-precio">$429.600</td></tr>
                  </tbody></table>
                </div>
              </div>
              <div>
                <div className="lp-tabla-wrapper compact">
                  <div className="lp-categoria-grupo">
                    <span>Sommier Brown</span>
                  </div>
                  <table><thead><tr><th>Medida</th><th>Precio</th></tr></thead>
                  <tbody>
                    <tr><td>190×140</td><td className="lp-col-precio">$273.000</td></tr>
                    <tr><td>200×160</td><td className="lp-col-precio">$459.100</td></tr>
                    <tr><td>200×180</td><td className="lp-col-precio">$464.800</td></tr>
                    <tr><td>200×200</td><td className="lp-col-precio">$477.500</td></tr>
                  </tbody></table>
                </div>
              </div>
              <div>
                <div className="lp-tabla-wrapper compact">
                  <div className="lp-categoria-grupo">
                    <span>Sommier Sognare</span>
                  </div>
                  <table><thead><tr><th>Medida</th><th>Precio</th></tr></thead>
                  <tbody>
                    <tr><td>190×80</td><td className="lp-col-precio">$196.700</td></tr>
                    <tr><td>190×90</td><td className="lp-col-precio">$206.400</td></tr>
                    <tr><td>190×100</td><td className="lp-col-precio">$222.500</td></tr>
                    <tr><td>190×130</td><td className="lp-col-precio">$241.800</td></tr>
                    <tr><td>190×140</td><td className="lp-col-precio">$261.200</td></tr>
                    <tr><td>190×160</td><td className="lp-col-precio">$393.300</td></tr>
                  </tbody></table>
                </div>
              </div>
              <div>
                <div className="lp-tabla-wrapper compact lp-tabla-sm">
                  <div className="lp-categoria-grupo">
                    <span>Sommier Exclusivo</span>
                  </div>
                  <table><thead><tr><th>Medida</th><th>Precio</th></tr></thead>
                  <tbody>
                    <tr><td>190×140</td><td className="lp-col-precio">$237.900</td></tr>
                    <tr><td>200×160</td><td className="lp-col-precio">$409.800</td></tr>
                    <tr><td>200×180</td><td className="lp-col-precio">$420.100</td></tr>
                    <tr><td>200×200</td><td className="lp-col-precio">$466.300</td></tr>
                  </tbody></table>
                </div>
                <div className="lp-tabla-wrapper compact">
                  <div className="lp-categoria-grupo">
                    <span>Sommier Dream Fit <span className="lp-consultar" style={{ marginLeft: 6 }}>Consultar</span></span>
                  </div>
                  <table><thead><tr><th>Medida</th><th>Precio</th></tr></thead>
                  <tbody>
                    <tr><td>190×140</td><td className="lp-col-precio">$574.300</td></tr>
                    <tr><td>200×160</td><td className="lp-col-precio">$989.200</td></tr>
                    <tr><td>200×200</td><td className="lp-col-precio">$1.039.700</td></tr>
                  </tbody></table>
                </div>
              </div>
            </div>
          </div>

          {/* ── PROTECTORES ── */}
          <div id="protectores" className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#ecfdf5' }}>🛡️</div>
              <div>
                <div className="lp-seccion-titulo">Protectores de Colchón</div>
                <div className="lp-seccion-subtitulo">Cubre Colchón Procol · Impermeables</div>
              </div>
              <span className="lp-badge lp-badge-hot">🔥 Hot Sale</span>
            </div>
            <div className="lp-grid-2">
              <div className="lp-tabla-wrapper compact">
                <div className="lp-categoria-grupo">
                  <span>Procol 4 Elásticos</span>
                </div>
                <table><thead><tr><th>Medida</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr><td>190×80</td><td className="lp-col-precio">$15.500</td></tr>
                  <tr><td>190×90</td><td className="lp-col-precio">$16.600</td></tr>
                  <tr><td>190×100</td><td className="lp-col-precio">$17.900</td></tr>
                  <tr><td>190×140</td><td className="lp-col-precio">$21.400</td></tr>
                  <tr><td>200×160 Queen</td><td className="lp-col-precio">$26.500</td></tr>
                  <tr><td>200×180</td><td className="lp-col-precio">$28.400</td></tr>
                  <tr><td>200×200 King</td><td className="lp-col-precio">$31.600</td></tr>
                </tbody></table>
              </div>
              <div className="lp-tabla-wrapper compact">
                <div className="lp-categoria-grupo">
                  <span>Cubre Lateral</span>
                </div>
                <table><thead><tr><th>Medida</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr><td>190×80</td><td className="lp-col-precio">$30.000</td></tr>
                  <tr><td>190×90</td><td className="lp-col-precio">$30.900</td></tr>
                  <tr><td>190×100</td><td className="lp-col-precio">$31.900</td></tr>
                  <tr><td>190×140</td><td className="lp-col-precio">$36.800</td></tr>
                  <tr><td>200×160 Queen</td><td className="lp-col-precio">$57.800</td></tr>
                  <tr><td>200×180</td><td className="lp-col-precio">$62.200</td></tr>
                  <tr><td>200×200 King</td><td className="lp-col-precio">$75.000</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>

          {/* ── ALMOHADAS ── */}
          <div id="almohadas" className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#ecfdf5' }}>💤</div>
              <div>
                <div className="lp-seccion-titulo">Almohadas Piero</div>
                <div className="lp-seccion-subtitulo">Línea Completa · Visco, Micro y Fibra</div>
              </div>
              <span className="lp-badge lp-badge-hot">🔥 Hot Sale</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Modelo</th><th>Medida</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr className="lp-tr-grupo"><td colSpan={3}>Visco Dream Fit</td></tr>
                  <tr><td>Visco Dream Fit Clásica</td><td className="lp-col-medida">62×40 cm</td><td className="lp-col-precio">$158.600</td></tr>
                  <tr><td>Visco Dream Fit Cervical</td><td className="lp-col-medida">57×37 cm</td><td className="lp-col-precio">$152.500</td></tr>
                  <tr><td>Visco Dream Tech</td><td className="lp-col-medida">70×40 cm</td><td className="lp-col-precio">$137.100</td></tr>
                  <tr className="lp-tr-grupo"><td colSpan={3}>Micro Max Tech</td></tr>
                  <tr><td>Micro Max Tech Rollo</td><td className="lp-col-medida">70×50 cm</td><td className="lp-col-precio">$96.900</td></tr>
                  <tr><td>Micro Max Tech Rollo</td><td className="lp-col-medida">80×50 cm</td><td className="lp-col-precio">$99.800</td></tr>
                  <tr><td>Micro Max Tech Rollo</td><td className="lp-col-medida">90×50 cm</td><td className="lp-col-precio">$104.300</td></tr>
                  <tr><td>Micro Max Tech Núcleo</td><td className="lp-col-medida">70×40 cm</td><td className="lp-col-precio">$130.700</td></tr>
                  <tr className="lp-tr-grupo"><td colSpan={3}>Fibra Smart Tech</td></tr>
                  <tr><td>Fibra Smart Tech Plus</td><td className="lp-col-medida">70×50 cm</td><td className="lp-col-precio">$51.000</td></tr>
                  <tr><td>Fibra Smart Tech Plus</td><td className="lp-col-medida">80×50 cm</td><td className="lp-col-precio">$56.200</td></tr>
                  <tr><td>Fibra Smart Tech Confort</td><td className="lp-col-medida">70×40 cm</td><td className="lp-col-precio">$19.700</td></tr>
                  <tr><td>Fibra Smart Tech Confort</td><td className="lp-col-medida">80×40 cm</td><td className="lp-col-precio">$21.500</td></tr>
                  <tr><td>Fibra Smart Tech Confort</td><td className="lp-col-medida">90×40 cm</td><td className="lp-col-precio">$20.400</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── SÁBANAS ── */}
          <div id="sabanas" className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#ecfdf5' }}>✨</div>
              <div>
                <div className="lp-seccion-titulo">Sábanas Piero Classic Lisa</div>
                <div className="lp-seccion-subtitulo">Percal 144 Hilos · Colores a consultar</div>
              </div>
              <span className="lp-badge lp-badge-hot">🔥 Hot Sale</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr><td className="lp-col-medida">Twin (hasta 100 cm)</td><td>Sábanas Piero Classic Lisa Percal 144 Hilos</td><td className="lp-col-precio">$140.400</td></tr>
                  <tr><td className="lp-col-medida">140×190 cm · Full</td><td>Sábanas Piero Classic Lisa Percal 144 Hilos</td><td className="lp-col-precio">$166.200</td></tr>
                  <tr><td className="lp-col-medida">160×200 cm · Queen</td><td>Sábanas Piero Classic Lisa Percal 144 Hilos</td><td className="lp-col-precio">$181.000</td></tr>
                  <tr><td className="lp-col-medida">200×200 cm · King</td><td>Sábanas Piero Classic Lisa Percal 144 Hilos</td><td className="lp-col-precio">$206.900</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* LEYENDA */}
          <div className="lp-leyenda">
            <div className="lp-leyenda-item"><span className="lp-consultar">Consultar stock</span>&nbsp;Producto bajo pedido</div>
            <div className="lp-leyenda-item"><span className="lp-star">⭐ Destacado</span>&nbsp;Producto más recomendado en su línea</div>
            <div className="lp-leyenda-item"><span className="lp-hot-tag">🔥 Hot Sale</span>&nbsp;Precios especiales por tiempo limitado</div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="lp-footer">
          <div className="lp-footer-nota">
            <strong>Azul Colchones · Distribuidor Oficial Exclusivo Piero</strong><br />
            <span className="lp-hot-text">🔥 PRECIOS HOT SALE VIGENTES 🔥</span> · Lista actualizada Mayo 2026<br />
            Precios en pesos argentinos · Los precios pueden variar sin previo aviso.
          </div>
          <div className="lp-footer-contacto">
            <strong>Azul Colchones</strong>
            Villa María, Córdoba, Argentina<br />
            Distribuidor Oficial Exclusivo PIERO
          </div>
        </div>

      </div>
    </>
  )
}
