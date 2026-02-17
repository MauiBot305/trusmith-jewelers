export const DIAMOND_CUTS = [
  'Round Brilliant',
  'Oval',
  'Princess',
  'Cushion',
  'Emerald',
  'Marquise',
  'Pear',
  'Radiant',
  'Asscher',
  'Heart',
] as const

export const DIAMOND_COLORS = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'] as const

export const DIAMOND_CLARITIES = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'] as const

export const CERTIFICATIONS = ['IGI', 'GIA'] as const

export type DiamondCut = (typeof DIAMOND_CUTS)[number]
export type DiamondColor = (typeof DIAMOND_COLORS)[number]
export type DiamondClarity = (typeof DIAMOND_CLARITIES)[number]
export type Certification = (typeof CERTIFICATIONS)[number]

export interface Diamond {
  id: string
  sku: string
  cut: string
  carat: number
  color: string
  clarity: string
  certification: string
  certificateNumber: string
  certificateUrl?: string | null
  price: number
  images: string[]
  videoUrl?: string | null
  inStock: boolean
  featured: boolean
  description?: string | null
  createdAt: string | Date
  updatedAt: string | Date
}

export interface DiamondFilters {
  cuts: string[]
  caratMin: number
  caratMax: number
  colors: string[]
  clarities: string[]
  priceMin: number
  priceMax: number
  certification: string // 'IGI' | 'GIA' | 'Both'
  search: string
  sort: 'price_asc' | 'price_desc' | 'carat_desc' | 'newest'
}

export interface DiamondListResponse {
  diamonds: Diamond[]
  total: number
  page: number
  limit: number
  totalPages: number
}
