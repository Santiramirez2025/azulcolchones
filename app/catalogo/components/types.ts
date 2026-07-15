// app/catalogo/components/types.ts

// Tipos principales para el Catálogo
export type NormalizedProduct = {
  id: string
  name: string
  subtitle: string
  slug: string
  description?: string // 🆕 Agregar description
  price: number
  originalPrice?: number | null
  discount?: number | null
  rating: number
  reviewCount: number
  firmness: string
  badge?: string | null
  story: string
  isNew?: boolean | null
  isBestSeller?: boolean | null
  images: string | string[]
  features: string
  techFeatures: string // JSON/string multilinea
  certifications: string // JSON/string multilinea
  tags?: string
  highlights?: string
  benefits?: string
  specifications?: string
  isActive?: boolean
  category?: string
  // ── Catálogo Azul Colchones (DB-driven) ──
  image?: string | null
  line?: string | null            // "entrada" | "media" | "premium" | "ultra"
  springType?: string | null      // "espuma" | "resorte-continuo" | "pocket"
  bajoPedido?: boolean
  isPremium?: boolean | null
  mainColor?: string | null
  plazas?: string[]               // plazas disponibles (de las variantes)
  variants?: Array<{
    id: string
    productId: string
    size: string
    dimensions: string
    plaza?: string | null
    measure?: string | null
    price: number
    originalPrice?: number | null
    stock: number
    sku: string | null
    isActive: boolean
  }>
}

// Interfaz para las props del componente principal
export interface CatalogoClientProps {
  initialProducts: NormalizedProduct[]
  totalProducts?: number
  initialCategory?: string
}

// Props para ProductCard
export interface ProductCardProps {
  product: NormalizedProduct
  index: number
  isFavorite: boolean
  onToggleFavorite: () => void
  avgPrice: number
}