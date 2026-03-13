import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lista de Precios — Azul Colchones',
  description: 'Lista completa de precios de colchones, sommiers y accesorios Piero. Distribuidor oficial en Villa María, Córdoba.',
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
        }

        .lp-body {
          font-family: 'Georgia', serif;
          background: var(--crema);
          color: #222;
          min-height: 100vh;
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

        /* ===== CONTAINER ===== */
        .lp-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 32px 60px;
        }

        /* ===== SECCIÓN ===== */
        .lp-seccion { margin-bottom: 48px; }
        .lp-seccion-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 2px solid var(--azul);
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
        .lp-tabla-wrapper thead th:last-child,
        .lp-tabla-wrapper thead th:nth-child(3) { text-align: right; }
        .lp-tabla-wrapper tbody tr { border-bottom: 1px solid #f0f0f5; }
        .lp-tabla-wrapper tbody tr:last-child { border-bottom: none; }
        .lp-tabla-wrapper tbody tr:hover { background: #f8f9ff; }
        .lp-tabla-wrapper tbody tr.lp-destacado { background: #fffdf5; }
        .lp-tabla-wrapper td {
          padding: 13px 18px; font-size: 14px; color: #333; vertical-align: middle;
          font-family: sans-serif;
        }

        .lp-col-medida { color: var(--gris-texto); font-size: 13px; }
        .lp-col-precio {
          text-align: right; font-size: 17px; font-weight: 700;
          color: var(--azul); white-space: nowrap;
        }
        .lp-col-ml { text-align: right; white-space: nowrap; }
        .lp-ml { font-size: 12px; color: #999; text-decoration: line-through; }
        .lp-star {
          display: inline-block; background: var(--oro); color: white;
          font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 10px;
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
          display: flex; align-items: center; gap: 10px;
          padding: 8px 18px; background: var(--gris-suave);
          border-bottom: 1px solid #e8e8f0;
        }
        .lp-categoria-grupo span {
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
        .lp-footer-contacto { text-align: right; font-size: 13px; }
        .lp-footer-contacto strong { color: white; display: block; font-size: 15px; margin-bottom: 4px; }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .lp-header { padding: 20px; flex-direction: column; gap: 16px; text-align: center; }
          .lp-header-right { text-align: center; }
          .lp-container { padding: 24px 16px; }
          .lp-grid-2 { grid-template-columns: 1fr; }
          .lp-aviso { gap: 12px; padding: 10px 16px; }
          .lp-footer { padding: 20px; flex-direction: column; }
          .lp-footer-contacto { text-align: left; }
          .lp-tabla-wrapper td, .lp-tabla-wrapper thead th { padding: 10px 12px; }
        }

        @media print {
          .lp-aviso { display: none; }
          .lp-seccion { page-break-inside: avoid; }
        }
      `}</style>

      <div className="lp-body">

        {/* HEADER */}
        <div className="lp-header">
          <div>
            <div className="lp-marca">Azul <span>Colchones</span></div>
            <div className="lp-submarca">Distribuidores oficiales · Villa María, Córdoba</div>
          </div>
          <div className="lp-header-right">
            <div className="lp-dist-badge">Distribuidor Oficial</div>
            <div className="lp-piero">PIERO</div>
            <div className="lp-fecha">Lista actualizada: Marzo 2026</div>
          </div>
        </div>

        {/* AVISO */}
        <div className="lp-aviso">
          <span><span className="lp-dot" />Precios en pesos argentinos</span>
          <span><span className="lp-dot" />Stock sujeto a disponibilidad</span>
          <span><span className="lp-dot" />Consultá financiación en cuotas</span>
          <span><span className="lp-dot" />Delivery a Villa María y zona</span>
        </div>

        <div className="lp-container">

          {/* ── MEDITARE EUROPILLOW ── */}
          <div className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#fde8e8' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Meditare EuroPillow</div>
                <div className="lp-seccion-subtitulo">Línea Entrada · Mejor Precio</div>
              </div>
              <span className="lp-badge lp-badge-ancla">Mejor Precio</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio Local</th><th>Precio Online</th></tr></thead>
                <tbody>
                  <tr><td className="lp-col-medida">190×80 · 1 plaza</td><td>Colchón Piero Meditare EuroPillow</td><td className="lp-col-precio">$205.000</td><td className="lp-col-ml"><span className="lp-ml">$249.900</span></td></tr>
                  <tr><td className="lp-col-medida">190×90 · 1 plaza</td><td>Colchón Piero Meditare EuroPillow</td><td className="lp-col-precio">$258.000</td><td className="lp-col-ml"><span className="lp-ml">$279.900</span></td></tr>
                  <tr><td className="lp-col-medida">190×100 · 1 plaza</td><td>Colchón Piero Meditare EuroPillow</td><td className="lp-col-precio">$278.000</td><td className="lp-col-ml"><span className="lp-ml">$299.900</span></td></tr>
                  <tr><td className="lp-col-medida">190×130 · 1½ plaza</td><td>Colchón Piero Meditare EuroPillow</td><td className="lp-col-precio">$361.000</td><td className="lp-col-ml"><span className="lp-ml">$379.900</span></td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Meditare EuroPillow</td><td className="lp-col-precio">$381.000</td><td className="lp-col-ml"><span className="lp-ml">$399.900</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── NIRVANA ── */}
          <div className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#fde8e8' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Nirvana</div>
                <div className="lp-seccion-subtitulo">Línea Media · Confort Superior</div>
              </div>
              <span className="lp-badge lp-badge-ancla">Mejor Precio</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio Local</th><th>Precio Online</th></tr></thead>
                <tbody>
                  <tr><td className="lp-col-medida">190×80 · 1 plaza</td><td>Colchón Piero Nirvana</td><td className="lp-col-precio">$350.000</td><td className="lp-col-ml"><span className="lp-ml">$449.900</span></td></tr>
                  <tr><td className="lp-col-medida">190×90 · 1 plaza</td><td>Colchón Piero Nirvana</td><td className="lp-col-precio">$391.000</td><td className="lp-col-ml"><span className="lp-ml">$519.900</span></td></tr>
                  <tr><td className="lp-col-medida">190×100 · 1 plaza</td><td>Colchón Piero Nirvana</td><td className="lp-col-precio">$443.000</td><td className="lp-col-ml"><span className="lp-ml">$589.900</span></td></tr>
                  <tr><td className="lp-col-medida">190×130 · 1½ plaza</td><td>Colchón Piero Nirvana</td><td className="lp-col-precio">$556.000</td><td className="lp-col-ml"><span className="lp-ml">$739.900</span></td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Nirvana</td><td className="lp-col-precio">$597.000</td><td className="lp-col-ml"><span className="lp-ml">$709.900</span></td></tr>
                  <tr><td className="lp-col-medida">190×160 · 2 plazas</td><td>Colchón Piero Nirvana</td><td className="lp-col-precio">$752.000</td><td className="lp-col-ml"><span className="lp-ml">$999.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×180 · Queen</td><td>Colchón Piero Nirvana</td><td className="lp-col-precio">$824.000</td><td className="lp-col-ml"><span className="lp-ml">$1.099.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Nirvana</td><td className="lp-col-precio">$896.000</td><td className="lp-col-ml"><span className="lp-ml">$1.019.900</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── SONNO EUROPILLOW ── */}
          <div className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#e8f0fe' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Sonno EuroPillow</div>
                <div className="lp-seccion-subtitulo">Línea Media · Más Vendido</div>
              </div>
              <span className="lp-badge lp-badge-equil">Más Vendido</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio Local</th><th>Precio Online</th></tr></thead>
                <tbody>
                  <tr><td className="lp-col-medida">190×80 · 1 plaza</td><td>Colchón Piero Sonno EuroPillow</td><td className="lp-col-precio">$309.000</td><td className="lp-col-ml"><span className="lp-ml">$339.900</span></td></tr>
                  <tr><td className="lp-col-medida">190×90 · 1 plaza</td><td>Colchón Piero Sonno EuroPillow</td><td className="lp-col-precio">$340.000</td><td className="lp-col-ml"><span className="lp-ml">$369.900</span></td></tr>
                  <tr><td className="lp-col-medida">190×100 · 1 plaza</td><td>Colchón Piero Sonno EuroPillow</td><td className="lp-col-precio">$371.000</td><td className="lp-col-ml"><span className="lp-ml">$399.900</span></td></tr>
                  <tr><td className="lp-col-medida">190×130 · 1½ plaza</td><td>Colchón Piero Sonno EuroPillow</td><td className="lp-col-precio">$464.000</td><td className="lp-col-ml"><span className="lp-ml">$499.900</span></td></tr>
                  <tr className="lp-destacado"><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Sonno EuroPillow <span className="lp-star">⭐ Destacado</span></td><td className="lp-col-precio">$505.000</td><td className="lp-col-ml"><span className="lp-ml">$679.900</span></td></tr>
                  <tr><td className="lp-col-medida">190×160 · 2 plazas</td><td>Colchón Piero Sonno EuroPillow</td><td className="lp-col-precio">$556.000</td><td className="lp-col-ml"><span className="lp-ml">$579.900</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── REGNO ── */}
          <div className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#e8f0fe' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Regno</div>
                <div className="lp-seccion-subtitulo">Línea Media Alta · Tecnología Avanzada</div>
              </div>
              <span className="lp-badge lp-badge-equil">Más Vendido</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio Local</th><th>Precio Online</th></tr></thead>
                <tbody>
                  <tr><td className="lp-col-medida">190×80 · 1 plaza</td><td>Colchón Piero Regno</td><td className="lp-col-precio">$319.000</td><td className="lp-col-ml"><span className="lp-ml">$409.900</span></td></tr>
                  <tr><td className="lp-col-medida">190×90 · 1 plaza</td><td>Colchón Piero Regno</td><td className="lp-col-precio">$350.000</td><td className="lp-col-ml"><span className="lp-ml">$449.900</span></td></tr>
                  <tr><td className="lp-col-medida">190×100 · 1 plaza</td><td>Colchón Piero Regno</td><td className="lp-col-precio">$391.000</td><td className="lp-col-ml">—</td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Regno</td><td className="lp-col-precio">$494.000</td><td className="lp-col-ml"><span className="lp-ml">$729.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Regno</td><td className="lp-col-precio">$587.000</td><td className="lp-col-ml"><span className="lp-ml">$979.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Regno</td><td className="lp-col-precio">$720.000</td><td className="lp-col-ml"><span className="lp-ml">$899.900</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── REGNO PILLOW TOP ── */}
          <div className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#e8f0fe' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Regno Pillow Top</div>
                <div className="lp-seccion-subtitulo">Línea Media Alta · Confort Extra</div>
              </div>
              <span className="lp-badge lp-badge-equil">Más Vendido</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio Local</th><th>Precio Online</th></tr></thead>
                <tbody>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Regno Pillow Top</td><td className="lp-col-precio">$618.000</td><td className="lp-col-ml"><span className="lp-ml">$629.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Regno Pillow Top</td><td className="lp-col-precio">$711.000</td><td className="lp-col-ml"><span className="lp-ml">$799.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×180 · Queen XL</td><td>Colchón Piero Regno Pillow Top</td><td className="lp-col-precio">$783.000</td><td className="lp-col-ml"><span className="lp-ml">$979.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Regno Pillow Top</td><td className="lp-col-precio">$865.000</td><td className="lp-col-ml"><span className="lp-ml">$1.079.900</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── NAMASTE / NAMASTE PILLOW TOP ── */}
          <div className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#e8f0fe' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Namaste / Namaste Pillow Top</div>
                <div className="lp-seccion-subtitulo">Línea Media · Ergonomía y Descanso</div>
              </div>
              <span className="lp-badge lp-badge-equil">Más Vendido</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio Local</th><th>Precio Online</th></tr></thead>
                <tbody>
                  <tr className="lp-tr-grupo"><td colSpan={4}>Namaste</td></tr>
                  <tr><td className="lp-col-medida">190×80 · 1 plaza</td><td>Colchón Piero Namaste</td><td className="lp-col-precio">$278.000</td><td className="lp-col-ml">—</td></tr>
                  <tr><td className="lp-col-medida">190×90 · 1 plaza</td><td>Colchón Piero Namaste</td><td className="lp-col-precio">$309.000</td><td className="lp-col-ml">—</td></tr>
                  <tr><td className="lp-col-medida">190×100 · 1 plaza</td><td>Colchón Piero Namaste</td><td className="lp-col-precio">$350.000</td><td className="lp-col-ml">—</td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Namaste</td><td className="lp-col-precio">$464.000</td><td className="lp-col-ml"><span className="lp-ml">$449.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Namaste</td><td className="lp-col-precio">$587.000</td><td className="lp-col-ml"><span className="lp-ml">$579.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Namaste</td><td className="lp-col-precio">$700.000</td><td className="lp-col-ml"><span className="lp-ml">$699.900</span></td></tr>
                  <tr className="lp-tr-grupo"><td colSpan={4}>Namaste Pillow Top</td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Namaste Pillow Top</td><td className="lp-col-precio">$587.000</td><td className="lp-col-ml"><span className="lp-ml">$579.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Namaste Pillow Top</td><td className="lp-col-precio">$670.000</td><td className="lp-col-ml"><span className="lp-ml">$659.900</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── GRAVITA ── */}
          <div className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#e8f0fe' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Gravita</div>
                <div className="lp-seccion-subtitulo">Línea Alta Gama · Tecnología de Punta</div>
              </div>
              <span className="lp-badge lp-badge-equil">Más Vendido</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio Local</th><th>Precio Online</th></tr></thead>
                <tbody>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Gravita</td><td className="lp-col-precio">$803.000</td><td className="lp-col-ml"><span className="lp-ml">$999.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Gravita</td><td className="lp-col-precio">$999.000</td><td className="lp-col-ml"><span className="lp-ml">$1.109.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×180 · Queen XL</td><td>Colchón Piero Gravita</td><td className="lp-col-precio">$1.082.000</td><td className="lp-col-ml"><span className="lp-ml">$1.299.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Gravita</td><td className="lp-col-precio">$1.133.000</td><td className="lp-col-ml"><span className="lp-ml">$1.319.900</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── MONTREAUX / MONTREAUX PILLOW TOP ── */}
          <div className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#fef3e2' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Montreaux / Montreaux Pillow Top</div>
                <div className="lp-seccion-subtitulo">Línea Premium · Lujo y Confort</div>
              </div>
              <span className="lp-badge lp-badge-premium">Premium</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio Local</th><th>Precio Online</th></tr></thead>
                <tbody>
                  <tr className="lp-tr-grupo"><td colSpan={4}>Montreaux</td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Montreaux</td><td className="lp-col-precio">$876.000</td><td className="lp-col-ml"><span className="lp-ml">$1.369.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Montreaux</td><td className="lp-col-precio">$1.082.000</td><td className="lp-col-ml"><span className="lp-ml">$1.699.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×180 · Queen XL</td><td>Colchón Piero Montreaux</td><td className="lp-col-precio">$1.185.000</td><td className="lp-col-ml">—</td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Montreaux</td><td className="lp-col-precio">$1.236.000</td><td className="lp-col-ml"><span className="lp-ml">$1.929.900</span></td></tr>
                  <tr className="lp-tr-grupo"><td colSpan={4}>Montreaux Pillow Top</td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Montreaux Pillow Top</td><td className="lp-col-precio">$1.082.000</td><td className="lp-col-ml"><span className="lp-ml">$1.529.900</span></td></tr>
                  <tr className="lp-destacado"><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Montreaux Pillow Top <span className="lp-star">⭐ Destacado</span></td><td className="lp-col-precio">$1.288.000</td><td className="lp-col-ml"><span className="lp-ml">$2.079.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×180 · Queen XL</td><td>Colchón Piero Montreaux Pillow Top</td><td className="lp-col-precio">$1.391.000</td><td className="lp-col-ml"><span className="lp-ml">$2.289.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Montreaux Pillow Top</td><td className="lp-col-precio">$1.494.000</td><td className="lp-col-ml"><span className="lp-ml">$2.679.900</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── DREAM FIT ── */}
          <div className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#fef3e2' }}>🛏️</div>
              <div>
                <div className="lp-seccion-titulo">Dream Fit Pocket / Dream Fit Foam</div>
                <div className="lp-seccion-subtitulo">Línea Premium · Alta Tecnología · Bajo Pedido</div>
              </div>
              <span className="lp-badge lp-badge-premium">Premium</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio Local</th><th>Precio Online</th></tr></thead>
                <tbody>
                  <tr className="lp-tr-grupo"><td colSpan={4}>Dream Fit Pocket</td></tr>
                  <tr><td className="lp-col-medida">190×140 · 2 plazas</td><td>Colchón Piero Dream Fit Pocket <span className="lp-consultar">Consultar stock</span></td><td className="lp-col-precio">$1.751.000</td><td className="lp-col-ml"><span className="lp-ml">$2.099.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×160 · Queen</td><td>Colchón Piero Dream Fit Pocket <span className="lp-consultar">Consultar stock</span></td><td className="lp-col-precio">$2.060.000</td><td className="lp-col-ml"><span className="lp-ml">$2.399.900</span></td></tr>
                  <tr><td className="lp-col-medida">200×200 · King</td><td>Colchón Piero Dream Fit Pocket <span className="lp-consultar">Consultar stock</span></td><td className="lp-col-precio">$2.266.000</td><td className="lp-col-ml"><span className="lp-ml">$2.749.900</span></td></tr>
                  <tr className="lp-tr-grupo"><td colSpan={4}>Dream Fit Foam</td></tr>
                  <tr><td className="lp-col-medida">190×140×32 · 2 plazas</td><td>Colchón Piero Dream Fit Foam <span className="lp-consultar">Consultar stock</span></td><td className="lp-col-precio">$1.607.000</td><td className="lp-col-ml">—</td></tr>
                  <tr><td className="lp-col-medida">200×160×32 · Queen</td><td>Colchón Piero Dream Fit Foam <span className="lp-consultar">Consultar stock</span></td><td className="lp-col-precio">$1.875.000</td><td className="lp-col-ml">—</td></tr>
                  <tr><td className="lp-col-medida">200×200×32 · King</td><td>Colchón Piero Dream Fit Foam <span className="lp-consultar">Consultar stock</span></td><td className="lp-col-precio">$2.112.000</td><td className="lp-col-ml">—</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── SOMMIERS ── */}
          <div className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#ecfdf5' }}>📦</div>
              <div>
                <div className="lp-seccion-titulo">Sommiers Piero</div>
                <div className="lp-seccion-subtitulo">Bases y Somieres · Todas las Líneas</div>
              </div>
              <span className="lp-badge lp-badge-accesorio">Complemento</span>
            </div>
            <div className="lp-grid-2">
              <div>
                <div className="lp-tabla-wrapper compact">
                  <div className="lp-categoria-grupo"><span>Sommier Grey</span></div>
                  <table><thead><tr><th>Medida</th><th>Precio</th></tr></thead>
                  <tbody>
                    <tr><td>190×80</td><td className="lp-col-precio">$150.000</td></tr>
                    <tr><td>190×90</td><td className="lp-col-precio">$160.000</td></tr>
                    <tr><td>190×100</td><td className="lp-col-precio">$180.000</td></tr>
                    <tr><td>190×140</td><td className="lp-col-precio">$200.000</td></tr>
                    <tr><td>200×160</td><td className="lp-col-precio">$320.000</td></tr>
                    <tr><td>200×180</td><td className="lp-col-precio">$330.000</td></tr>
                    <tr><td>200×200</td><td className="lp-col-precio">$350.000</td></tr>
                  </tbody></table>
                </div>
              </div>
              <div>
                <div className="lp-tabla-wrapper compact">
                  <div className="lp-categoria-grupo"><span>Sommier Brown</span></div>
                  <table><thead><tr><th>Medida</th><th>Precio</th></tr></thead>
                  <tbody>
                    <tr><td>190×80</td><td className="lp-col-precio">$170.000</td></tr>
                    <tr><td>190×90</td><td className="lp-col-precio">$180.000</td></tr>
                    <tr><td>190×100</td><td className="lp-col-precio">$190.000</td></tr>
                    <tr><td>190×130</td><td className="lp-col-precio">$210.000</td></tr>
                    <tr><td>190×140</td><td className="lp-col-precio">$220.000</td></tr>
                    <tr><td>190×160</td><td className="lp-col-precio">$380.000</td></tr>
                    <tr><td>200×180</td><td className="lp-col-precio">$380.000</td></tr>
                    <tr><td>200×200</td><td className="lp-col-precio">$390.000</td></tr>
                  </tbody></table>
                </div>
              </div>
              <div>
                <div className="lp-tabla-wrapper compact">
                  <div className="lp-categoria-grupo"><span>Sommier Sognare</span></div>
                  <table><thead><tr><th>Medida</th><th>Precio</th></tr></thead>
                  <tbody>
                    <tr><td>190×80</td><td className="lp-col-precio">$160.000</td></tr>
                    <tr><td>190×90</td><td className="lp-col-precio">$170.000</td></tr>
                    <tr><td>190×100</td><td className="lp-col-precio">$180.000</td></tr>
                    <tr><td>190×130</td><td className="lp-col-precio">$200.000</td></tr>
                    <tr><td>190×140</td><td className="lp-col-precio">$220.000</td></tr>
                    <tr><td>190×160</td><td className="lp-col-precio">$320.000</td></tr>
                  </tbody></table>
                </div>
              </div>
              <div>
                <div className="lp-tabla-wrapper compact lp-tabla-sm">
                  <div className="lp-categoria-grupo"><span>Sommier Exclusivo</span></div>
                  <table><thead><tr><th>Medida</th><th>Precio</th></tr></thead>
                  <tbody>
                    <tr><td>190×140</td><td className="lp-col-precio">$200.000</td></tr>
                    <tr><td>200×160</td><td className="lp-col-precio">$350.000</td></tr>
                    <tr><td>200×180</td><td className="lp-col-precio">$350.000</td></tr>
                    <tr><td>200×200</td><td className="lp-col-precio">$390.000</td></tr>
                  </tbody></table>
                </div>
                <div className="lp-tabla-wrapper compact">
                  <div className="lp-categoria-grupo"><span>Sommier Dream Fit <span className="lp-consultar" style={{ marginLeft: 6 }}>Consultar</span></span></div>
                  <table><thead><tr><th>Medida</th><th>Precio</th></tr></thead>
                  <tbody>
                    <tr><td>190×140</td><td className="lp-col-precio">$500.000</td></tr>
                    <tr><td>200×160</td><td className="lp-col-precio">$800.000</td></tr>
                    <tr><td>200×200</td><td className="lp-col-precio">$850.000</td></tr>
                  </tbody></table>
                </div>
              </div>
            </div>
          </div>

          {/* ── PROTECTORES ── */}
          <div className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#ecfdf5' }}>🛡️</div>
              <div>
                <div className="lp-seccion-titulo">Protectores de Colchón</div>
                <div className="lp-seccion-subtitulo">Cubre Colchón Procol · Impermeables</div>
              </div>
              <span className="lp-badge lp-badge-accesorio">Complemento</span>
            </div>
            <div className="lp-grid-2">
              <div className="lp-tabla-wrapper compact">
                <div className="lp-categoria-grupo"><span>Procol 4 Elásticos</span></div>
                <table><thead><tr><th>Medida</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr><td>190×80</td><td className="lp-col-precio">$18.000</td></tr>
                  <tr><td>190×90</td><td className="lp-col-precio">$19.000</td></tr>
                  <tr><td>190×100</td><td className="lp-col-precio">$20.000</td></tr>
                  <tr><td>190×140</td><td className="lp-col-precio">$24.000</td></tr>
                  <tr><td>200×160 Queen</td><td className="lp-col-precio">$29.000</td></tr>
                  <tr><td>200×180</td><td className="lp-col-precio">$31.000</td></tr>
                  <tr><td>200×200 King</td><td className="lp-col-precio">$34.000</td></tr>
                </tbody></table>
              </div>
              <div className="lp-tabla-wrapper compact">
                <div className="lp-categoria-grupo"><span>Cubre Lateral</span></div>
                <table><thead><tr><th>Medida</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr><td>190×80</td><td className="lp-col-precio">$32.000</td></tr>
                  <tr><td>190×90</td><td className="lp-col-precio">$33.000</td></tr>
                  <tr><td>190×100</td><td className="lp-col-precio">$34.000</td></tr>
                  <tr><td>190×140</td><td className="lp-col-precio">$40.000</td></tr>
                  <tr><td>200×160 Queen</td><td className="lp-col-precio">$62.000</td></tr>
                  <tr><td>200×180</td><td className="lp-col-precio">$68.000</td></tr>
                  <tr><td>200×200 King</td><td className="lp-col-precio">$80.000</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>

          {/* ── ALMOHADAS ── */}
          <div className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#ecfdf5' }}>💤</div>
              <div>
                <div className="lp-seccion-titulo">Almohadas Piero</div>
                <div className="lp-seccion-subtitulo">Línea Completa · Visco, Micro y Fibra</div>
              </div>
              <span className="lp-badge lp-badge-accesorio">Complemento</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Modelo</th><th>Medida</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr className="lp-tr-grupo"><td colSpan={3}>Visco Dream Fit</td></tr>
                  <tr><td>Visco Dream Fit Clásica</td><td className="lp-col-medida">62×40 cm</td><td className="lp-col-precio">$116.000</td></tr>
                  <tr><td>Visco Dream Fit Cervical</td><td className="lp-col-medida">57×37 cm</td><td className="lp-col-precio">$116.000</td></tr>
                  <tr><td>Visco Dream Tech</td><td className="lp-col-medida">70×40 cm</td><td className="lp-col-precio">$112.000</td></tr>
                  <tr className="lp-tr-grupo"><td colSpan={3}>Micro Max Tech</td></tr>
                  <tr><td>Micro Max Tech Rollo</td><td className="lp-col-medida">70×50 cm</td><td className="lp-col-precio">$82.000</td></tr>
                  <tr><td>Micro Max Tech Rollo</td><td className="lp-col-medida">80×50 cm</td><td className="lp-col-precio">$87.000</td></tr>
                  <tr><td>Micro Max Tech Rollo</td><td className="lp-col-medida">90×50 cm</td><td className="lp-col-precio">$92.000</td></tr>
                  <tr><td>Micro Max Tech Núcleo</td><td className="lp-col-medida">70×40 cm</td><td className="lp-col-precio">$102.000</td></tr>
                  <tr className="lp-tr-grupo"><td colSpan={3}>Fibra Smart Tech</td></tr>
                  <tr><td>Fibra Smart Tech Plus</td><td className="lp-col-medida">70×50 cm</td><td className="lp-col-precio">$63.000</td></tr>
                  <tr><td>Fibra Smart Tech Plus</td><td className="lp-col-medida">80×50 cm</td><td className="lp-col-precio">$65.000</td></tr>
                  <tr><td>Fibra Smart Tech Confort</td><td className="lp-col-medida">70×40 cm</td><td className="lp-col-precio">$58.000</td></tr>
                  <tr><td>Fibra Smart Tech Confort</td><td className="lp-col-medida">80×40 cm</td><td className="lp-col-precio">$58.000</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── SÁBANAS ── */}
          <div className="lp-seccion">
            <div className="lp-seccion-header">
              <div className="lp-seccion-icono" style={{ background: '#ecfdf5' }}>✨</div>
              <div>
                <div className="lp-seccion-titulo">Sábanas Piero Classic Lisa</div>
                <div className="lp-seccion-subtitulo">Percal 144 Hilos · Colores a consultar</div>
              </div>
              <span className="lp-badge lp-badge-accesorio">Complemento</span>
            </div>
            <div className="lp-tabla-wrapper">
              <table>
                <thead><tr><th>Medida</th><th>Descripción</th><th>Precio</th></tr></thead>
                <tbody>
                  <tr><td className="lp-col-medida">Twin (hasta 100 cm)</td><td>Sábanas Piero Classic Lisa Percal 144 Hilos</td><td className="lp-col-precio">$95.000</td></tr>
                  <tr><td className="lp-col-medida">140×190 cm · Full</td><td>Sábanas Piero Classic Lisa Percal 144 Hilos</td><td className="lp-col-precio">$112.000</td></tr>
                  <tr><td className="lp-col-medida">160×200 cm · Queen</td><td>Sábanas Piero Classic Lisa Percal 144 Hilos</td><td className="lp-col-precio">$122.000</td></tr>
                  <tr><td className="lp-col-medida">200×200 cm · King</td><td>Sábanas Piero Classic Lisa Percal 144 Hilos</td><td className="lp-col-precio">$139.000</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* LEYENDA */}
          <div className="lp-leyenda">
            <div className="lp-leyenda-item"><span className="lp-ml">$XXX</span>&nbsp;Precio tachado = precio en MercadoLibre</div>
            <div className="lp-leyenda-item"><span className="lp-consultar">Consultar stock</span>&nbsp;Producto bajo pedido</div>
            <div className="lp-leyenda-item"><span className="lp-star">⭐ Destacado</span>&nbsp;Producto más recomendado en su línea</div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="lp-footer">
          <div className="lp-footer-nota">
            <strong>Azul Colchones · Distribuidores Oficiales Piero</strong><br />
            Precios vigentes en pesos argentinos · Lista actualizada Marzo 2026<br />
            Los precios pueden variar sin previo aviso. Consultá financiación en el local.
          </div>
          <div className="lp-footer-contacto">
            <strong>Azul Colchones</strong>
            Villa María, Córdoba, Argentina<br />
            Distribuidores Exclusivos PIERO
          </div>
        </div>

      </div>
    </>
  )
}