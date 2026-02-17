// ── Diamond Types ──────────────────────────────────────────────────────────────

export type DiamondCut =
  | 'Round'
  | 'Oval'
  | 'Princess'
  | 'Cushion'
  | 'Emerald'
  | 'Marquise'
  | 'Pear'
  | 'Radiant'
  | 'Asscher'
  | 'Heart'

export type DiamondColor = 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K'

export type DiamondClarity = 'FL' | 'IF' | 'VVS1' | 'VVS2' | 'VS1' | 'VS2' | 'SI1' | 'SI2' | 'I1'

export type DiamondCertification = 'IGI' | 'GIA'

export interface Diamond {
  id: string
  cut: DiamondCut
  carat: number
  color: DiamondColor
  clarity: DiamondClarity
  price: number
  certification: DiamondCertification
  certNumber?: string
  images: string[]
  videoUrl?: string
  available: boolean
  createdAt: Date
}

// ── Ring Setting Types ─────────────────────────────────────────────────────────

export type SettingStyle =
  | 'Solitaire'
  | 'Halo'
  | 'Pavé'
  | 'Three-Stone'
  | 'Cathedral'
  | 'Bezel'
  | 'Tension'
  | 'Vintage'
  | 'East-West'
  | 'Bypass'

export interface Setting {
  id: string
  name: string
  style: SettingStyle
  description: string
  story: string
  images: string[]
  basePrice: number
}

// ── Metal Types ────────────────────────────────────────────────────────────────

export type MetalName = 'Yellow Gold' | 'White Gold' | 'Rose Gold' | 'Platinum'
export type MetalKarat = '14K' | '18K' | '24K'

export interface Metal {
  id: string
  name: MetalName
  type: string
  karat?: MetalKarat
  priceModifier: number
}

// ── Design Builder Types ───────────────────────────────────────────────────────

export type DesignStatus = 'draft' | 'quoted' | 'deposited' | 'in_production' | 'completed'

export interface Design {
  id: string
  customerId?: string
  diamondId: string
  diamond?: Diamond
  settingId: string
  setting?: Setting
  metalId: string
  metal?: Metal
  engraving?: string
  ringSize?: string
  totalPrice?: number
  status: DesignStatus
  createdAt: Date
  updatedAt: Date
}

// ── Builder State (for Ring Configurator) ─────────────────────────────────────

export interface BuilderState {
  currentStep: number
  diamond?: Diamond
  setting?: Setting
  metal?: Metal
  engraving?: string
  ringSize?: string
  estimatedPrice?: number
}

// ── Inventory Product Types ────────────────────────────────────────────────────

export type ProductCategory = 'ring' | 'bracelet' | 'chain' | 'earring' | 'pendant'
export type DiamondType = 'lab' | 'natural'

export interface InventoryProduct {
  id: string
  name: string
  category: ProductCategory
  description: string
  price: number
  metalType: string
  diamondType?: DiamondType
  images: string[]
  available: boolean
  featured: boolean
  createdAt: Date
}

// ── Customer Types ─────────────────────────────────────────────────────────────

export interface Customer {
  id: string
  email: string
  name?: string
  phone?: string
  createdAt: Date
  updatedAt: Date
}

// ── Lead / Contact Types ───────────────────────────────────────────────────────

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed'
export type LeadSource = 'contact' | 'builder' | 'product' | 'gold-sell' | 'social'

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  message?: string
  source: LeadSource
  status: LeadStatus
  createdAt: Date
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  createdAt: Date
}

export interface GoldSellRequest {
  id: string
  name: string
  email: string
  phone?: string
  goldType: string
  weight?: string
  photoUrl?: string
  status: string
  createdAt: Date
}

// ── UI Component Types ─────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

// ── API Response Types ─────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// ── Filter Types ───────────────────────────────────────────────────────────────

export interface DiamondFilters {
  cuts?: DiamondCut[]
  minCarat?: number
  maxCarat?: number
  colors?: DiamondColor[]
  clarities?: DiamondClarity[]
  certifications?: DiamondCertification[]
  minPrice?: number
  maxPrice?: number
  available?: boolean
}

export interface ProductFilters {
  categories?: ProductCategory[]
  metalTypes?: string[]
  diamondTypes?: DiamondType[]
  minPrice?: number
  maxPrice?: number
  featured?: boolean
}
