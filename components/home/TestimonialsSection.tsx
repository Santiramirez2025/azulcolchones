// components/home/TestimonialsSection.tsx
'use client'

const testimonials = [
  {
    id: 1,
    name: 'María González',
    location: 'Villa María',
    rating: 5,
    date: '2024-11-15',
    text: 'Excelente atención y el colchón queen es súper cómodo. Llegó en 24hs como prometieron. Lo recomiendo 100%.',
    verified: true
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    location: 'Villa Nueva',
    rating: 5,
    date: '2024-11-10',
    text: 'Muy buena calidad-precio. El asesoramiento por WhatsApp fue genial, me ayudaron a elegir el colchón ideal para mi peso.',
    verified: true
  },
  {
    id: 3,
    name: 'Laura Fernández',
    location: 'San Francisco',
    rating: 5,
    date: '2024-11-05',
    text: 'Compré un colchón king con sommier. La entrega fue puntual y el producto superó mis expectativas. Duermo mucho mejor ahora.',
    verified: true
  },
]

export default function TestimonialsSection() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
        Lo que dicen nuestros clientes
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map(testimonial => (
          <div 
            key={testimonial.id}
            className="bg-zinc-900/50 rounded-xl p-6 space-y-4 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors"
            itemScope
            itemType="https://schema.org/Review"
          >
            {/* Stars */}
            <div className="flex gap-1" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
              <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
              <meta itemProp="bestRating" content="5" />
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-zinc-700'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            {/* Review text */}
            <p className="text-zinc-300 leading-relaxed" itemProp="reviewBody">
              &ldquo;{testimonial.text}&rdquo;
            </p>
            
            {/* Author */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
              <div itemProp="author" itemScope itemType="https://schema.org/Person">
                <div className="font-semibold text-white" itemProp="name">
                  {testimonial.name}
                </div>
                <div className="text-sm text-zinc-500">
                  {testimonial.location}
                </div>
              </div>
              {testimonial.verified && (
                <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
                  ✓ Verificada
                </span>
              )}
            </div>
            
            <meta itemProp="datePublished" content={testimonial.date} />
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <p className="text-zinc-400 text-sm">
          ⭐ 4.9/5 basado en 1000+ opiniones verificadas
        </p>
      </div>
    </div>
  )
}