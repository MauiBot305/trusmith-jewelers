export const PRODUCT_CATEGORIES = ['RING', 'BRACELET', 'CHAIN'] as const
export const METAL_TYPES = ['Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum'] as const
export const DIAMOND_TYPES = ['Lab-grown', 'Natural'] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]
export type MetalType = (typeof METAL_TYPES)[number]
export type DiamondType = (typeof DIAMOND_TYPES)[number]

export interface DiamondSpecs {
  carat?: number
  cut?: string
  color?: string
  clarity?: string
}

export interface Product {
  id: string
  sku: string
  name: string
  category: string
  metalType: string
  price: number
  description: string
  images: string[]
  inStock: boolean
  featured: boolean
  diamondType?: string | null
  diamondSpecs?: DiamondSpecs | null
  metalPurity?: string | null
  weight?: string | null
  dimensions?: string | null
  createdAt: string | Date
  updatedAt: string | Date
}

export interface ProductFilters {
  category: string // 'All' | 'RING' | 'BRACELET' | 'CHAIN'
  metalTypes: string[]
  diamondType: string // 'Lab-grown' | 'Natural' | 'Both'
  priceMin: number
  priceMax: number
  sort: 'price_asc' | 'price_desc' | 'newest'
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}
