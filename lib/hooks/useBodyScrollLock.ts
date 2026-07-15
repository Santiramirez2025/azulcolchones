'use client'
// Bloqueo de scroll del body con CONTEO de referencias.
// Evita que múltiples overlays (menú, drawer, modal) se pisen entre sí y
// dejen el scroll trabado. Cuando ningún lock está activo, limpia el estilo.
import { useEffect } from 'react'

let lockCount = 0

function apply() {
  if (typeof document === 'undefined') return
  document.body.style.overflow = lockCount > 0 ? 'hidden' : ''
}

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    lockCount += 1
    apply()
    return () => {
      lockCount = Math.max(0, lockCount - 1)
      apply()
    }
  }, [locked])
}
