// app/piero-fabrica/logicaRecomendacion.ts
// Lógica de recomendación de colchones PIERO
// Basada en postura de sueño, peso y medida seleccionada

export interface Respuestas {
    medida: 'plaza' | 'plaza-media' | 'queen' | 'king' | null
    postura: 'lado' | 'boca-arriba' | 'boca-abajo' | 'cambia' | null
    peso: 'menos-60' | '60-80' | '80-100' | 'mas-100' | null
    acompanado?: boolean
  }
  
  export interface Recomendacion {
    modelo: string
    medida: string
    medidaDisplay: string
    precio: number
    precioML?: number
    razonamiento: string
    caracteristicas: string[]
    imagen?: string
    ancla?: string // Para scroll al producto
  }
  
  type FirmezaNivel = 'suave-medio' | 'medio' | 'medio-firme' | 'firme'
  type Segmento = 'ancla' | 'equilibrio' | 'premium'
  
  // ============================================================================
  // MATRIZ DE FIRMEZA POR POSTURA
  // ============================================================================
  
  const FIRMEZA_POR_POSTURA: Record<NonNullable<Respuestas['postura']>, FirmezaNivel> = {
    'lado': 'medio', // Necesita adaptabilidad en hombros/cadera
    'boca-arriba': 'medio-firme', // Buen soporte lumbar
    'boca-abajo': 'firme', // Evitar hundimiento excesivo
    'cambia': 'medio' // Equilibrio para todas las posturas
  }
  
  // ============================================================================
  // MATRIZ DE FIRMEZA POR PESO
  // ============================================================================
  
  const FIRMEZA_POR_PESO: Record<NonNullable<Respuestas['peso']>, FirmezaNivel> = {
    'menos-60': 'suave-medio',
    '60-80': 'medio',
    '80-100': 'medio-firme',
    'mas-100': 'firme'
  }
  
  // ============================================================================
  // SEGMENTO COMERCIAL POR PESO (Budget routing)
  // ============================================================================
  
  const SEGMENTO_POR_PESO: Record<NonNullable<Respuestas['peso']>, Segmento> = {
    'menos-60': 'ancla', // Precio accesible
    '60-80': 'equilibrio', // Mayor volumen
    '80-100': 'equilibrio', // Necesita calidad
    'mas-100': 'premium' // Requiere máximo soporte
  }
  
  // ============================================================================
  // CATÁLOGO DE PRODUCTOS POR PERFIL
  // ============================================================================
  
  interface ModeloBase {
    nombre: string
    preciosPorMedida: {
      plaza?: number
      'plaza-media'?: number
      queen?: number
      king?: number
    }
    preciosMLPorMedida?: {
      plaza?: number
      'plaza-media'?: number
      queen?: number
      king?: number
    }
    caracteristicas: string[]
    razonamiento: {
      'lado'?: string
      'boca-arriba'?: string
      'boca-abajo'?: string
      'cambia'?: string
      default: string
    }
  }
  
  const MODELOS: Record<FirmezaNivel, Record<Segmento, ModeloBase>> = {
    'suave-medio': {
      ancla: {
        nombre: 'Colchón Piero Meditare EuroPillow',
        preciosPorMedida: {
          plaza: 234900,
          'plaza-media': 354900,
          queen: 354900,
          king: 354900
        },
        preciosMLPorMedida: {
          plaza: 279900,
          'plaza-media': 399900,
          queen: 399900,
          king: 399900
        },
        caracteristicas: [
          'EuroPillow integrado para mayor confort',
          'Firmeza suave-media ideal para peso ligero',
          'Garantía oficial PIERO 5 años'
        ],
        razonamiento: {
          'lado': 'Al dormir de lado con peso ligero, este colchón ofrece la adaptabilidad necesaria en hombros y cadera sin comprometer el soporte.',
          default: 'Con firmeza suave-media, es ideal para tu peso, proporcionando confort sin perder soporte estructural.'
        }
      },
      equilibrio: {
        nombre: 'Colchón Piero Sonno EuroPillow',
        preciosPorMedida: {
          plaza: 314900,
          'plaza-media': 469900,
          queen: 514900,
          king: 514900
        },
        preciosMLPorMedida: {
          plaza: 369900,
          'plaza-media': 679900,
          queen: 579900,
          king: 579900
        },
        caracteristicas: [
          'EuroPillow de alta densidad',
          'Equilibrio perfecto confort-soporte',
          'Garantía oficial PIERO 8 años'
        ],
        razonamiento: {
          default: 'El Sonno EuroPillow ofrece un equilibrio superior entre adaptabilidad y soporte, ideal para tu perfil.'
        }
      },
      premium: {
        nombre: 'Colchón Piero Namaste',
        preciosPorMedida: {
          'plaza-media': 424900,
          queen: 539900,
          king: 649900
        },
        preciosMLPorMedida: {
          'plaza-media': 449900,
          queen: 579900,
          king: 699900
        },
        caracteristicas: [
          'Tecnología premium de adaptación',
          'Sistema de confort multicapa',
          'Garantía oficial PIERO 10 años'
        ],
        razonamiento: {
          default: 'El Namaste combina tecnología premium con adaptabilidad superior, perfecto para descanso de alta calidad.'
        }
      }
    },
  
    'medio': {
      ancla: {
        nombre: 'Colchón Piero Nirvana',
        preciosPorMedida: {
          plaza: 359900,
          'plaza-media': 549900,
          queen: 769900,
          king: 829900
        },
        preciosMLPorMedida: {
          plaza: 519900,
          'plaza-media': 709900,
          queen: 1099900,
          king: 1019900
        },
        caracteristicas: [
          'Firmeza media balanceada',
          'Excelente relación calidad-precio',
          'Garantía oficial PIERO 8 años'
        ],
        razonamiento: {
          'lado': 'Por tu forma de dormir de lado, el Nirvana ofrece la firmeza media ideal: se adapta a tus curvas sin perder soporte.',
          'cambia': 'Como cambiás mucho de posición, necesitás un colchón versátil. El Nirvana tiene firmeza media equilibrada para todas las posturas.',
          default: 'El Nirvana ofrece firmeza media perfectamente balanceada, ideal para tu peso y forma de dormir.'
        }
      },
      equilibrio: {
        nombre: 'Colchón Piero Regno',
        preciosPorMedida: {
          plaza: 324900,
          'plaza-media': 459900,
          queen: 544900,
          king: 669900
        },
        preciosMLPorMedida: {
          plaza: 449900,
          'plaza-media': 729900,
          queen: 979900,
          king: 899900
        },
        caracteristicas: [
          'Firmeza media de alta calidad',
          'Sistema anti-transferencia de movimiento',
          'Garantía oficial PIERO 10 años'
        ],
        razonamiento: {
          'lado': 'Al dormir de lado, el Regno proporciona el balance perfecto: firmeza media que sostiene tu columna y se adapta a hombros y cadera.',
          default: 'El Regno combina firmeza media con tecnología que minimiza la transferencia de movimiento, ideal para tu perfil.'
        }
      },
      premium: {
        nombre: 'Colchón Piero Montreaux',
        preciosPorMedida: {
          'plaza-media': 789900,
          queen: 989900,
          king: 1119900
        },
        preciosMLPorMedida: {
          'plaza-media': 1369900,
          queen: 1699900,
          king: 1929900
        },
        caracteristicas: [
          'Firmeza media premium',
          'Tecnología de última generación',
          'Garantía oficial PIERO 10 años'
        ],
        razonamiento: {
          default: 'El Montreaux es nuestro tope de gama en firmeza media, con tecnología premium para descanso superior.'
        }
      }
    },
  
    'medio-firme': {
      ancla: {
        nombre: 'Colchón Piero Nirvana',
        preciosPorMedida: {
          plaza: 359900,
          'plaza-media': 549900,
          queen: 769900,
          king: 829900
        },
        preciosMLPorMedida: {
          plaza: 519900,
          'plaza-media': 709900,
          queen: 1099900,
          king: 1019900
        },
        caracteristicas: [
          'Soporte firme sin sacrificar confort',
          'Ideal para peso medio-alto',
          'Garantía oficial PIERO 8 años'
        ],
        razonamiento: {
          'boca-arriba': 'Al dormir boca arriba, necesitás buen soporte lumbar. El Nirvana ofrece firmeza media-alta que mantiene tu columna alineada.',
          default: 'Por tu peso, necesitás soporte consistente. El Nirvana ofrece firmeza media-alta sin ser excesivamente duro.'
        }
      },
      equilibrio: {
        nombre: 'Colchón Piero Gravita',
        preciosPorMedida: {
          'plaza-media': 749900,
          queen: 924900,
          king: 1049900
        },
        preciosMLPorMedida: {
          'plaza-media': 999900,
          queen: 1109900,
          king: 1319900
        },
        caracteristicas: [
          'Tecnología Gravita de soporte progresivo',
          'Firmeza media-alta de larga duración',
          'Garantía oficial PIERO 10 años'
        ],
        razonamiento: {
          'boca-arriba': 'El Gravita tiene soporte progresivo ideal para tu postura: firme en zona lumbar, adaptable en el resto del cuerpo.',
          default: 'La tecnología Gravita proporciona soporte firme y duradero, perfecto para tu peso y forma de dormir.'
        }
      },
      premium: {
        nombre: 'Colchón Piero Montreaux Pillow Top',
        preciosPorMedida: {
          'plaza-media': 989900,
          queen: 1199900,
          king: 1369900
        },
        preciosMLPorMedida: {
          'plaza-media': 1529900,
          queen: 2079900,
          king: 2679900
        },
        caracteristicas: [
          'Pillow Top premium sobre base firme',
          'Soporte firme con capa de confort superior',
          'Garantía oficial PIERO 10 años'
        ],
        razonamiento: {
          default: 'El Montreaux Pillow Top combina base firme con capa superior de confort: soporte máximo sin sacrificar comodidad.'
        }
      }
    },
  
    'firme': {
      ancla: {
        nombre: 'Colchón Piero Nirvana',
        preciosPorMedida: {
          plaza: 359900,
          'plaza-media': 549900,
          queen: 769900,
          king: 829900
        },
        preciosMLPorMedida: {
          plaza: 519900,
          'plaza-media': 709900,
          queen: 1099900,
          king: 1019900
        },
        caracteristicas: [
          'Firmeza alta para soporte máximo',
          'Previene hundimiento excesivo',
          'Garantía oficial PIERO 8 años'
        ],
        razonamiento: {
          'boca-abajo': 'Al dormir boca abajo, necesitás firmeza alta para evitar que tu cadera se hunda. El Nirvana proporciona el soporte necesario.',
          default: 'Por tu peso, necesitás soporte firme y duradero. El Nirvana ofrece la firmeza necesaria sin comprometer calidad.'
        }
      },
      equilibrio: {
        nombre: 'Colchón Piero Regno Pillow Top',
        preciosPorMedida: {
          'plaza-media': 574900,
          queen: 659900,
          king: 799900
        },
        preciosMLPorMedida: {
          'plaza-media': 629900,
          queen: 799900,
          king: 1079900
        },
        caracteristicas: [
          'Base firme con Pillow Top de confort',
          'Soporte extra para peso elevado',
          'Garantía oficial PIERO 10 años'
        ],
        razonamiento: {
          'boca-abajo': 'El Regno Pillow Top combina base firme (ideal para boca abajo) con capa superior que evita presión excesiva en pecho y pelvis.',
          default: 'Base firme de alta resistencia con Pillow Top que añade confort sin comprometer soporte.'
        }
      },
      premium: {
        nombre: 'Colchón Piero Dream Fit Pocket',
        preciosPorMedida: {
          'plaza-media': 1949900,
          queen: 2249900,
          king: 2549900
        },
        preciosMLPorMedida: {
          'plaza-media': 2099900,
          queen: 2399900,
          king: 2749900
        },
        caracteristicas: [
          'Resortes pocket individuales de alta densidad',
          'Soporte firme ultra-premium',
          'Garantía oficial PIERO 10 años'
        ],
        razonamiento: {
          default: 'El Dream Fit Pocket es nuestra tecnología más avanzada en soporte firme, con resortes independientes de máxima calidad.'
        }
      }
    }
  }
  
  // ============================================================================
  // MAPEO DE MEDIDAS A DISPLAY
  // ============================================================================
  
  const MEDIDAS_DISPLAY: Record<string, Record<NonNullable<Respuestas['medida']>, string>> = {
    general: {
      plaza: '190x90 cm (1 plaza)',
      'plaza-media': '190x140 cm (2 plazas)',
      queen: '200x160 cm (Queen)',
      king: '200x200 cm (King)'
    }
  }
  
  // ============================================================================
  // FUNCIÓN PRINCIPAL: COMBINAR FIRMEZA
  // ============================================================================
  
  function combinarFirmeza(
    firmezaPostura: FirmezaNivel,
    firmezaPeso: FirmezaNivel
  ): FirmezaNivel {
    // El peso tiene más influencia (60%) que la postura (40%)
    const niveles: FirmezaNivel[] = ['suave-medio', 'medio', 'medio-firme', 'firme']
    
    const idxPostura = niveles.indexOf(firmezaPostura)
    const idxPeso = niveles.indexOf(firmezaPeso)
    
    // Promedio ponderado: peso 60%, postura 40%
    const idxFinal = Math.round((idxPeso * 0.6) + (idxPostura * 0.4))
    
    return niveles[Math.min(idxFinal, niveles.length - 1)]
  }
  
  // ============================================================================
  // FUNCIÓN: BUSCAR ALTERNATIVA
  // ============================================================================
  
  function buscarAlternativa(
    firmeza: FirmezaNivel,
    segmentoActual: Segmento,
    medida: NonNullable<Respuestas['medida']>
  ): ModeloBase | null {
    // Buscar en segmento superior
    const segmentos: Segmento[] = ['ancla', 'equilibrio', 'premium']
    const idxActual = segmentos.indexOf(segmentoActual)
    
    if (idxActual < segmentos.length - 1) {
      const segmentoSuperior = segmentos[idxActual + 1]
      const modelo = MODELOS[firmeza][segmentoSuperior]
      
      // Verificar que el modelo tenga la medida disponible
      if (modelo.preciosPorMedida[medida]) {
        return modelo
      }
    }
    
    return null
  }
  
  // ============================================================================
  // FUNCIÓN: GENERAR RAZONAMIENTO
  // ============================================================================
  
  function generarRazonamiento(
    modelo: ModeloBase,
    respuestas: Respuestas
  ): string {
    const postura = respuestas.postura!
    
    // Usar razonamiento específico por postura si existe
    if (modelo.razonamiento[postura]) {
      return modelo.razonamiento[postura]!
    }
    
    return modelo.razonamiento.default
  }
  
  // ============================================================================
  // FUNCIÓN PÚBLICA: CALCULAR RECOMENDACIÓN
  // ============================================================================
  
  export function calcularRecomendacion(respuestas: Respuestas): {
    principal: Recomendacion
    alternativa: Recomendacion | null
  } {
    // Validación
    if (!respuestas.medida || !respuestas.postura || !respuestas.peso) {
      throw new Error('Faltan respuestas obligatorias')
    }
  
    // 1. Determinar firmeza necesaria
    const firmezaPorPostura = FIRMEZA_POR_POSTURA[respuestas.postura]
    const firmezaPorPeso = FIRMEZA_POR_PESO[respuestas.peso]
    const firmezaFinal = combinarFirmeza(firmezaPorPostura, firmezaPorPeso)
  
    // 2. Determinar segmento comercial
    const segmento = SEGMENTO_POR_PESO[respuestas.peso]
  
    // 3. Obtener modelo recomendado
    const modeloPrincipal = MODELOS[firmezaFinal][segmento]
    const precio = modeloPrincipal.preciosPorMedida[respuestas.medida]
    const precioML = modeloPrincipal.preciosMLPorMedida?.[respuestas.medida]
  
    // Si el modelo no tiene esa medida, buscar en el mismo nivel de firmeza
    if (!precio) {
      // Fallback: buscar en otro segmento con esa medida
      for (const seg of ['equilibrio', 'premium', 'ancla'] as Segmento[]) {
        const modeloFallback = MODELOS[firmezaFinal][seg]
        if (modeloFallback.preciosPorMedida[respuestas.medida]) {
          const precioFallback = modeloFallback.preciosPorMedida[respuestas.medida]!
          const precioMLFallback = modeloFallback.preciosMLPorMedida?.[respuestas.medida]
  
          const principal: Recomendacion = {
            modelo: modeloFallback.nombre,
            medida: respuestas.medida,
            medidaDisplay: MEDIDAS_DISPLAY.general[respuestas.medida],
            precio: precioFallback,
            precioML: precioMLFallback,
            razonamiento: generarRazonamiento(modeloFallback, respuestas),
            caracteristicas: modeloFallback.caracteristicas,
            ancla: '#productos'
          }
  
          return { principal, alternativa: null }
        }
      }
    }
  
    const principal: Recomendacion = {
      modelo: modeloPrincipal.nombre,
      medida: respuestas.medida,
      medidaDisplay: MEDIDAS_DISPLAY.general[respuestas.medida],
      precio: precio!,
      precioML: precioML,
      razonamiento: generarRazonamiento(modeloPrincipal, respuestas),
      caracteristicas: modeloPrincipal.caracteristicas,
      ancla: '#productos'
    }
  
    // 4. Buscar alternativa
    const modeloAlternativa = buscarAlternativa(firmezaFinal, segmento, respuestas.medida)
    
    let alternativa: Recomendacion | null = null
    if (modeloAlternativa) {
      const precioAlt = modeloAlternativa.preciosPorMedida[respuestas.medida]
      const precioMLAlt = modeloAlternativa.preciosMLPorMedida?.[respuestas.medida]
      
      if (precioAlt) {
        alternativa = {
          modelo: modeloAlternativa.nombre,
          medida: respuestas.medida,
          medidaDisplay: MEDIDAS_DISPLAY.general[respuestas.medida],
          precio: precioAlt,
          precioML: precioMLAlt,
          razonamiento: 'Opción premium con tecnología superior y mayor durabilidad.',
          caracteristicas: modeloAlternativa.caracteristicas,
          ancla: '#productos'
        }
      }
    }
  
    return { principal, alternativa }
  }