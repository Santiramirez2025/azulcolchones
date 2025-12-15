// app/opiniones/OpinionesClient.tsx - CLIENT COMPONENT OPTIMIZED ⚡
'use client'

import { Star, CheckCircle, ThumbsUp, MessageCircle, Filter, MapPin } from 'lucide-react'
import { useState, memo, useMemo, useCallback } from 'react'
import Link from 'next/link'

// ============================================================================
// TYPES
// ============================================================================
interface Review {
  id: number
  name: string
  location: string
  rating: number
  date: string
  verified: boolean
  comment: string
  helpful: number
  product: string
}

interface Stats {
  average: number
  total: number
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

// ============================================================================
// MEMOIZED ICON COMPONENTS
// ============================================================================
const StarIcon = memo(({ filled, size = "w-6 h-6" }: { filled: boolean; size?: string }) => (
  <Star
    className={`${size} ${filled ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'}`}
    aria-hidden="true"
  />
))
StarIcon.displayName = 'StarIcon'

// ============================================================================
// RATING DISPLAY COMPONENT - Memoized
// ============================================================================
const RatingStars = memo(({ rating, size = "w-6 h-6" }: { rating: number; size?: string }) => (
  <div className="flex" role="img" aria-label={`Calificación: ${rating} de 5 estrellas`}>
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} filled={i < rating} size={size} />
    ))}
  </div>
))
RatingStars.displayName = 'RatingStars'

// ============================================================================
// HEADER SECTION - Memoized
// ============================================================================
const HeaderSection = memo(({ stats }: { stats: Stats }) => (
  <header className="text-center mb-16">
    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl mb-6 border border-amber-500/30">
      <Star className="w-10 h-10 text-amber-400" aria-hidden="true" />
    </div>
    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
      Opiniones de Clientes
    </h1>
    <p className="text-zinc-400 text-lg">
      {stats.total.toLocaleString('es-AR')} opiniones reales de clientes verificados
    </p>
    <p className="text-zinc-500 text-sm mt-2">
      Más de 35 años cuidando el descanso de Villa María y la región
    </p>
  </header>
))
HeaderSection.displayName = 'HeaderSection'

// ============================================================================
// OVERALL RATING SECTION - Memoized
// ============================================================================
const OverallRatingSection = memo(({ 
  stats, 
  filterStars, 
  onFilterChange 
}: { 
  stats: Stats; 
  filterStars: number | null; 
  onFilterChange: (stars: number | null) => void 
}) => {
  const getPercentage = useCallback((count: number) => 
    ((count / stats.total) * 100).toFixed(1), [stats.total])

  return (
    <section 
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 mb-12"
      aria-labelledby="rating-heading"
    >
      <div className="grid md:grid-cols-3 gap-8 items-center">
        {/* Score */}
        <div className="text-center md:border-r border-white/10">
          <div 
            className="text-7xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4"
            aria-label={`Calificación promedio: ${stats.average} de 5`}
          >
            {stats.average}
          </div>
          <RatingStars rating={Math.floor(stats.average)} />
          <p className="text-zinc-400 text-sm mt-3">
            Basado en <span className="font-bold text-white">{stats.total.toLocaleString('es-AR')}</span> opiniones
          </p>
        </div>

        {/* Distribution */}
        <div className="md:col-span-2 space-y-3">
          {[5, 4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              onClick={() => onFilterChange(filterStars === stars ? null : stars)}
              className={`w-full flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                filterStars === stars ? 'bg-white/5' : ''
              }`}
              aria-label={`Filtrar por ${stars} estrellas`}
            >
              <span className="text-sm text-zinc-400 w-12">{stars} ★</span>
              <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-400"
                  style={{ width: `${getPercentage(stats.distribution[stars as keyof typeof stats.distribution])}%` }}
                  role="progressbar"
                  aria-valuenow={parseFloat(getPercentage(stats.distribution[stars as keyof typeof stats.distribution]))}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <span className="text-sm text-zinc-400 w-16 text-right">
                {getPercentage(stats.distribution[stars as keyof typeof stats.distribution])}%
              </span>
              <span className="text-sm font-semibold text-white w-16 text-right">
                {stats.distribution[stars as keyof typeof stats.distribution].toLocaleString('es-AR')}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
})
OverallRatingSection.displayName = 'OverallRatingSection'

// ============================================================================
// REVIEW CARD - Memoized
// ============================================================================
const ReviewCard = memo(({ review }: { review: Review }) => (
  <article className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all hover:scale-[1.02] will-change-transform">
    {/* Header */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div 
          className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg"
          aria-label={`Avatar de ${review.name}`}
        >
          {review.name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-white">{review.name}</h3>
            {review.verified && (
              <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-lg border border-emerald-500/30">
                <CheckCircle className="w-3 h-3" aria-hidden="true" />
                <span className="text-xs font-bold">Verificado</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <MapPin className="w-3 h-3" aria-hidden="true" />
            <span>{review.location}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Rating */}
    <div className="flex items-center gap-1 mb-3">
      <RatingStars rating={review.rating} size="w-4 h-4" />
      <time 
        className="text-xs text-zinc-500 ml-2"
        dateTime={review.date}
      >
        {new Date(review.date).toLocaleDateString('es-AR', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })}
      </time>
    </div>

    {/* Product */}
    <p className="text-xs text-violet-400 mb-3 font-semibold">
      {review.product}
    </p>

    {/* Comment */}
    <p className="text-zinc-300 leading-relaxed mb-4 text-sm">
      {review.comment}
    </p>

    {/* Footer */}
    <footer className="flex items-center justify-between pt-4 border-t border-white/10">
      <button 
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded px-2 py-1"
        aria-label={`Marcar como útil (${review.helpful} personas)`}
      >
        <ThumbsUp className="w-4 h-4" aria-hidden="true" />
        <span>Útil ({review.helpful})</span>
      </button>
    </footer>
  </article>
))
ReviewCard.displayName = 'ReviewCard'

// ============================================================================
// TRUST BADGES - Memoized
// ============================================================================
const TrustBadges = memo(() => (
  <section className="grid md:grid-cols-3 gap-6 mb-12" aria-label="Indicadores de confianza">
    <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-6 text-center">
      <div className="text-3xl font-black text-emerald-400 mb-2">+35 años</div>
      <div className="text-sm text-zinc-300 font-semibold">De trayectoria familiar</div>
    </div>
    <div className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/30 rounded-xl p-6 text-center">
      <div className="text-3xl font-black text-violet-400 mb-2">4.9/5</div>
      <div className="text-sm text-zinc-300 font-semibold">Calificación promedio</div>
    </div>
    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6 text-center">
      <div className="text-3xl font-black text-amber-400 mb-2">89%</div>
      <div className="text-sm text-zinc-300 font-semibold">Opiniones 5 estrellas</div>
    </div>
  </section>
))
TrustBadges.displayName = 'TrustBadges'

// ============================================================================
// CTA SECTION - Memoized
// ============================================================================
const CTASection = memo(() => (
  <section className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl p-8 text-center">
    <h2 className="text-2xl font-bold text-white mb-3">¿Ya compraste tu colchón?</h2>
    <p className="text-zinc-300 mb-6">
      Compartí tu experiencia y ayudá a otros clientes a elegir mejor
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button 
        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-violet-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 will-change-transform"
        aria-label="Escribir una opinión"
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        Escribir opinión
      </button>
      <Link
        href="/productos"
        className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        Ver catálogo
      </Link>
    </div>
  </section>
))
CTASection.displayName = 'CTASection'

// ============================================================================
// MAIN CLIENT COMPONENT
// ============================================================================
export function OpinionesClient() {
  const [filterStars, setFilterStars] = useState<number | null>(null)

  // Stats data
  const stats: Stats = useMemo(() => ({
    average: 4.9,
    total: 1847,
    distribution: {
      5: 1642,
      4: 156,
      3: 32,
      2: 11,
      1: 6
    }
  }), [])

  // Reviews data
  const reviews: Review[] = useMemo(() => [
    {
      id: 1,
      name: 'María González',
      location: 'Villa María',
      rating: 5,
      date: '2024-11-15',
      verified: true,
      comment: 'Excelente atención en el showroom de Balerdi. Me asesoraron súper bien y me ayudaron a elegir el colchón perfecto para mi espalda. Llevo 3 meses durmiéndolo y mi vida cambió. 100% recomendable!',
      helpful: 24,
      product: 'Colchón Multisac Premium'
    },
    {
      id: 2,
      name: 'Carlos Ruiz',
      location: 'Villa Nueva',
      rating: 5,
      date: '2024-11-08',
      verified: true,
      comment: 'Familia de toda la vida en Villa María. Compré el colchón viscoelástico y estoy re contento. La firmeza es perfecta y la entrega fue rápida. Los recomiendo sin dudas.',
      helpful: 18,
      product: 'Colchón Viscoelástico Adaptable'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      location: 'Villa María',
      rating: 5,
      date: '2024-11-01',
      verified: true,
      comment: 'Hace años que compro en Azul Colchones. Esta vez fue para mi hija y como siempre, la mejor calidad y el mejor precio de la zona. Son de confianza!',
      helpful: 31,
      product: 'Colchón Híbrido Comfort'
    },
    {
      id: 4,
      name: 'Pedro Sánchez',
      location: 'Bell Ville',
      rating: 4,
      date: '2024-10-25',
      verified: true,
      comment: 'Muy buen colchón, tardó un toque más en llegar porque soy de Bell Ville, pero la calidad es buenísima. Vale la pena la espera.',
      helpful: 12,
      product: 'Colchón Multisac Premium'
    },
    {
      id: 5,
      name: 'Laura Fernández',
      location: 'Villa María',
      rating: 5,
      date: '2024-10-18',
      verified: true,
      comment: 'Me atendió el dueño personalmente en el local y me explicó todo re bien. Increíble la diferencia con mi colchón viejo. Duermo como nunca! Gracias!',
      helpful: 27,
      product: 'Colchón Látex Natural'
    },
    {
      id: 6,
      name: 'Javier López',
      location: 'Córdoba Capital',
      rating: 5,
      date: '2024-10-12',
      verified: true,
      comment: 'Compré online y me llegó perfecto a Córdoba capital. Calidad premium, precio justo. La atención por WhatsApp fue excelente, me respondieron todas las dudas al toque.',
      helpful: 19,
      product: 'Colchón Viscoelástico Adaptable'
    },
    {
      id: 7,
      name: 'Romina Castro',
      location: 'Villa María',
      rating: 5,
      date: '2024-10-05',
      verified: true,
      comment: 'Es la segunda vez que compro con ellos. Comercio de toda la vida en Villa María, super confiables. El showroom de Balerdi está re lindo y podés probar todos los colchones.',
      helpful: 22,
      product: 'Colchón Resortes Ensacados'
    },
    {
      id: 8,
      name: 'Sergio Gómez',
      location: 'Río Cuarto',
      rating: 5,
      date: '2024-09-28',
      verified: true,
      comment: 'Excelente servicio de entrega a Río Cuarto. El colchón es de primera, súper cómodo. La relación precio-calidad es imbatible. Re recomendable!',
      helpful: 15,
      product: 'Colchón Híbrido Comfort'
    }
  ], [])

  // Filtered reviews - memoized
  const filteredReviews = useMemo(() => 
    filterStars ? reviews.filter(r => r.rating === filterStars) : reviews,
    [reviews, filterStars]
  )

  // Filter change handler - memoized
  const handleFilterChange = useCallback((stars: number | null) => {
    setFilterStars(stars)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <HeaderSection stats={stats} />
        
        <OverallRatingSection 
          stats={stats} 
          filterStars={filterStars} 
          onFilterChange={handleFilterChange} 
        />

        {/* Filter Info */}
        {filterStars && (
          <div 
            className="mb-6 bg-violet-500/10 border border-violet-500/30 rounded-xl p-4 flex items-center justify-between"
            role="status"
          >
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-violet-400" aria-hidden="true" />
              <span className="text-white font-semibold">
                Mostrando opiniones de {filterStars} estrellas ({filteredReviews.length})
              </span>
            </div>
            <button
              onClick={() => setFilterStars(null)}
              className="text-violet-400 hover:text-violet-300 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded px-2 py-1"
            >
              Limpiar filtro
            </button>
          </div>
        )}

        {/* Reviews Grid */}
        <section 
          className="grid md:grid-cols-2 gap-6 mb-12"
          aria-label="Opiniones de clientes"
        >
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </section>

        <TrustBadges />
        <CTASection />

        {/* Footer Note */}
        <footer className="mt-12 text-center space-y-2">
          <p className="text-sm text-zinc-500">
            Todas las opiniones son de clientes verificados que compraron en Azul Colchones
          </p>
          <address className="text-xs text-zinc-600 not-italic">
            Showroom: Balerdi 855, Villa María, Córdoba
          </address>
        </footer>
      </div>
    </main>
  )
}