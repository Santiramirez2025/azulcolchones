// lib/matching-algorithm.ts - CON FILTRO DE TAMAÑO
interface UserPreferences {
  position: string
  weight: string
  firmness: string
  budget: string
  size: string
}

interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number | null
  firmness?: string
  height?: number
  cooling?: boolean
  hypoallergenic?: boolean
  isEco?: boolean
  warranty?: number
  rating?: number
  reviewCount?: number
  isBestSeller?: boolean
  width?: number
  length?: number
  features?: string[]
  highlights?: string[]
  breathability?: string
  inStock?: boolean
}

interface ScoredProduct extends Product {
  matchScore: number
  matchPercentage: number
  matchReasons: string[]
}

function getBudgetRange(budget: string): { min: number; max: number } {
  switch (budget) {
    case 'economic':
      return { min: 0, max: 300000 }
    case 'standard':
      return { min: 300000, max: 600000 }
    case 'premium':
      return { min: 1000000, max: 99999999 }
    default:
      return { min: 0, max: 99999999 }
  }
}

function getIdealFirmness(position: string, weight: string, firmnessPreference: string): number {
  let base = 6

  // Ajustar por posición
  switch (position) {
    case 'side':
      base = 5
      break
    case 'back':
      base = 6
      break
    case 'stomach':
      base = 8
      break
    case 'mixed':
      base = 6
      break
  }

  // Ajustar por peso
  switch (weight) {
    case 'light':
      base -= 1
      break
    case 'heavy':
      base += 1
      break
  }

  // Ajustar por preferencia
  switch (firmnessPreference) {
    case 'soft':
      base -= 2
      break
    case 'firm':
      base += 2
      break
  }

  return Math.max(1, Math.min(10, base))
}

function mapFirmnessToNumber(firmness?: string): number {
  if (!firmness) return 6

  const lower = firmness.toLowerCase()
  
  if (lower.includes('suave') || lower.includes('soft') || lower.includes('blanda')) return 4
  if (lower.includes('medio suave') || lower.includes('medium soft')) return 5
  if (lower.includes('media') || lower.includes('medium') || lower.includes('equilibrada')) return 6
  if (lower.includes('medio firme') || lower.includes('medium firm')) return 7
  if (lower.includes('firme') || lower.includes('firm') || lower.includes('dura')) return 8
  if (lower.includes('extra firme') || lower.includes('extra firm')) return 9
  
  return 6
}

function getSizeCategory(width?: number, name?: string): string {
  const nameLower = (name || '').toLowerCase()
  
  // Detectar por nombre
  if (nameLower.includes('king') && !nameLower.includes('super')) return 'king'
  if (nameLower.includes('super king')) return 'king'
  if (nameLower.includes('queen')) return 'queen'
  if (nameLower.includes('2 plazas') || nameLower.includes('doble')) return 'double'
  if (nameLower.includes('1½') || nameLower.includes('plaza y media')) return 'twin'
  if (nameLower.includes('1 plaza') || nameLower.includes('individual')) return 'single'
  
  // Detectar por ancho (si está disponible)
  if (width) {
    if (width >= 180) return 'king'
    if (width >= 150) return 'queen'
    if (width >= 130) return 'double'
    if (width >= 100) return 'twin'
    return 'single'
  }
  
  return 'unknown'
}

function matchesSize(product: Product, requestedSize: string): boolean {
  const productSize = getSizeCategory(product.width, product.name)
  
  // Si no se pudo determinar el tamaño, incluirlo (mejor mostrar más que menos)
  if (productSize === 'unknown') return true
  
  return productSize === requestedSize
}

export function getTopRecommendations(
  products: Product[],
  preferences: UserPreferences,
  topN: number = 3
): ScoredProduct[] {
  console.log('🎯 [MatchingAlgorithm] Starting recommendations')
  console.log('📊 [MatchingAlgorithm] Products received:', products.length)
  console.log('👤 [MatchingAlgorithm] User preferences:', preferences)

  // Filtrar productos válidos
  const validProducts = products.filter(p => {
    const isValid = p.id && p.name && p.slug && p.price > 0 && p.inStock !== false
    if (!isValid) {
      console.log('⚠️ [MatchingAlgorithm] Invalid product filtered out:', p.name)
    }
    return isValid
  })

  console.log('✅ [MatchingAlgorithm] Valid products:', validProducts.length)

  // Filtrar por tamaño si está especificado
  const sizeFilteredProducts = preferences.size 
    ? validProducts.filter(p => matchesSize(p, preferences.size))
    : validProducts

  console.log(`🔍 [MatchingAlgorithm] Products matching size "${preferences.size}":`, sizeFilteredProducts.length)

  if (sizeFilteredProducts.length === 0) {
    console.warn('⚠️ [MatchingAlgorithm] No products match the requested size, using all products')
    // Si no hay productos del tamaño exacto, usar todos
    return scoreProducts(validProducts, preferences, topN)
  }

  return scoreProducts(sizeFilteredProducts, preferences, topN)
}

function scoreProducts(
  products: Product[],
  preferences: UserPreferences,
  topN: number
): ScoredProduct[] {
  const budgetRange = getBudgetRange(preferences.budget)
  const idealFirmness = getIdealFirmness(
    preferences.position,
    preferences.weight,
    preferences.firmness
  )

  console.log('🎯 [MatchingAlgorithm] Ideal firmness:', idealFirmness)
  console.log('💰 [MatchingAlgorithm] Budget range:', budgetRange)

  const scoredProducts = products.map(product => {
    let score = 0
    const reasons: string[] = []

    // 1. FIRMEZA (35 puntos)
    const productFirmness = mapFirmnessToNumber(product.firmness)
    const firmnessDiff = Math.abs(idealFirmness - productFirmness)
    const firmnessScore = Math.max(0, 35 - firmnessDiff * 7)
    score += firmnessScore

    if (firmnessScore > 25) {
      reasons.push(`Firmeza ${product.firmness || 'media'} perfecta para tu perfil`)
    }

    // 2. PRESUPUESTO (30 puntos)
    let budgetScore = 0
    if (product.price >= budgetRange.min && product.price <= budgetRange.max) {
      const rangeCenter = (budgetRange.min + budgetRange.max) / 2
      const distanceFromCenter = Math.abs(product.price - rangeCenter)
      const rangeSize = budgetRange.max - budgetRange.min
      budgetScore = 30 - (distanceFromCenter / rangeSize) * 15
      reasons.push('Se ajusta perfectamente a tu presupuesto')
    } else if (product.price < budgetRange.min) {
      budgetScore = 20
      reasons.push('Excelente precio por debajo de tu presupuesto')
    } else {
      budgetScore = 5
    }
    score += budgetScore

    // 3. POSICIÓN DE SUEÑO (15 puntos)
    let positionScore = 10
    if (preferences.position === 'side' && productFirmness <= 6) {
      positionScore = 15
      reasons.push('Suavidad ideal para dormir de lado')
    } else if (preferences.position === 'back' && productFirmness >= 5 && productFirmness <= 7) {
      positionScore = 15
      reasons.push('Soporte lumbar óptimo para dormir boca arriba')
    } else if (preferences.position === 'stomach' && productFirmness >= 7) {
      positionScore = 15
      reasons.push('Firmeza perfecta para dormir boca abajo')
    } else if (preferences.position === 'mixed') {
      positionScore = 15
      reasons.push('Versatilidad para todas las posiciones')
    }
    score += positionScore

    // 4. PESO (10 puntos)
    let weightScore = 5
    if (preferences.weight === 'light' && productFirmness <= 6) {
      weightScore = 10
      reasons.push('Adaptabilidad perfecta para tu peso')
    } else if (preferences.weight === 'medium' && productFirmness >= 5 && productFirmness <= 7) {
      weightScore = 10
      reasons.push('Soporte equilibrado para tu peso')
    } else if (preferences.weight === 'heavy' && productFirmness >= 7) {
      weightScore = 10
      reasons.push('Soporte reforzado ideal para tu peso')
    }
    score += weightScore

    // 5. CARACTERÍSTICAS PREMIUM (10 puntos)
    let premiumScore = 0
    if (product.cooling) {
      premiumScore += 2
      reasons.push('Tecnología de refrigeración para noches frescas')
    }
    if (product.isEco) {
      premiumScore += 2
      reasons.push('Materiales ecológicos certificados')
    }
    if (product.hypoallergenic) {
      premiumScore += 2
      reasons.push('Hipoalergénico para máxima salud')
    }
    if (product.height && product.height >= 25) {
      premiumScore += 2
      reasons.push(`Altura premium de ${product.height}cm`)
    }
    if (product.breathability === 'high' || product.breathability === 'excellent') {
      premiumScore += 2
      reasons.push('Excelente transpirabilidad')
    }
    score += Math.min(10, premiumScore)

    // 6. SOCIAL PROOF (bonus hasta 10 puntos)
    if (product.isBestSeller) {
      score += 5
      reasons.push('Bestseller en Villa María')
    }
    if (product.rating && product.rating >= 4.5) {
      score += 3
      reasons.push(`Calificación ${product.rating.toFixed(1)}⭐ de clientes`)
    }
    if (product.reviewCount && product.reviewCount > 50) {
      score += 2
      reasons.push(`${product.reviewCount}+ opiniones verificadas`)
    }

    // Normalizar score (0-100)
    const normalizedScore = Math.min(100, Math.max(0, score))
    
    // Convertir a porcentaje de match (85-99%)
    const matchPercentage = Math.round(85 + (normalizedScore / 100) * 14)

    console.log(`📊 [MatchingAlgorithm] ${product.name}: ${normalizedScore.toFixed(1)} points (${matchPercentage}% match)`)

    return {
      ...product,
      matchScore: normalizedScore,
      matchPercentage,
      matchReasons: reasons.slice(0, 4)
    }
  })

  // Ordenar por score descendente
  scoredProducts.sort((a, b) => b.matchScore - a.matchScore)

  const topRecommendations = scoredProducts.slice(0, topN)

  console.log('🏆 [MatchingAlgorithm] Top recommendations:')
  topRecommendations.forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.name} - ${p.matchPercentage}% match (${p.matchScore.toFixed(1)} points)`)
  })

  return topRecommendations
}