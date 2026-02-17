'use client'

import { useState, useEffect, useCallback } from 'react'
import ProductCard from '@/components/shop/ProductCard'
import ProductFilters from '@/components/shop/ProductFilters'
import { ProductFilters as Filters, ProductListResponse } from '@/types/product'
import { cn } from '@/lib/utils'

const DEFAULT_FILTERS: Filters = {
  category: 'All',
  metalTypes: [],
  diamondType: 'Both',
  priceMin: 0,
  priceMax: 15000,
  sort: 'newest',
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
]

const CATEGORY_TABS = [
  { value: 'All', label: 'All Pieces' },
  { value: 'RING', label: 'Rings' },
  { value: 'BRACELET', label: 'Bracelets' },
  { value: 'CHAIN', label: 'Chains' },
]

export default function ShopPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [data, setData] = useState<ProductListResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProducts = useCallback(async (f: Filters) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (f.category !== 'All') params.set('category', f.category)
      f.metalTypes.forEach((m) => params.append('metalType', m))
      if (f.diamondType !== 'Both') params.set('diamondType', f.diamondType)
      params.set('priceMin', String(f.priceMin))
      params.set('priceMax', String(f.priceMax))
      params.set('sort', f.sort)
      params.set('limit', '24')

      const res = await fetch(`/api/products?${params}`)
      const json: ProductListResponse = await res.json()
      setData(json)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts(filters)
  }, [filters, fetchProducts])

  const setCategory = (cat: string) => {
    setFilters((f) => ({ ...f, category: cat }))
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      {/* Page header */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 mb-10">
        <p className="text-gold/70 text-xs uppercase tracking-[0.3em] mb-3">Ready to Ship</p>
        <h1 className="font-serif text-4xl lg:text-5xl text-white mb-4">Fine Jewelry</h1>
        <p className="text-white/50 text-base max-w-xl">
          Handcrafted engagement rings, tennis bracelets, and chains. In stock and ready to deliver.
        </p>
      </div>

      {/* Category tabs */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 mb-8">
        <div className="flex gap-0 border-b border-white/10 overflow-x-auto">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setCategory(tab.value)}
              className={cn(
                'px-6 py-4 text-sm uppercase tracking-widest whitespace-nowrap transition-colors',
                filters.category === tab.value
                  ? 'text-gold border-b-2 border-gold -mb-px'
                  : 'text-white/40 hover:text-white/70'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort bar */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 mb-8">
        <div className="flex items-center justify-between">
          {data && !loading ? (
            <span className="text-white/40 text-sm">
              {data.total} {data.total === 1 ? 'piece' : 'pieces'}
            </span>
          ) : (
            <span />
          )}
          <select
            value={filters.sort}
            onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value as Filters['sort'] }))}
            className="bg-black-soft border border-white/10 focus:border-gold/50 text-white text-sm px-4 py-2.5 outline-none cursor-pointer transition-colors rounded-sm"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="flex gap-10">
          {/* Filters */}
          <ProductFilters filters={filters} onChange={setFilters} totalResults={data?.total ?? 0} />

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-black-soft animate-pulse rounded-sm" />
                ))}
              </div>
            ) : data?.products.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-serif text-2xl text-white/60 mb-2">No pieces found</p>
                <p className="text-white/30 text-sm">Try adjusting your filters</p>
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="mt-6 border border-gold/40 text-gold hover:border-gold px-6 py-3 text-xs uppercase tracking-widest transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {data?.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
