// lib/promo.ts — Config ÚNICA de la promo activa (barra superior + urgencia).
// Para cambiar/extender la promo, editá SOLO este archivo. Cero código raro.
// La fecha es real → la cuenta regresiva es honesta (no se resetea sola).

export const PROMO = {
  active: true,
  // Fin real de la promo (Argentina, UTC-3). Cambiá esta fecha para extender.
  endsAt: '2026-08-31T23:59:59-03:00',
  title: 'PROMO AGOSTO',
  subtitle: 'Combos 5 en 1 desde $549.000',
  ctaText: 'Ver combos',
  ctaHref: '/catalogo?category=Combos',
} as const
