'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search } from 'lucide-react'
import DiamondCard from '@/components/diamonds/DiamondCard'
import DiamondFilters from '@/components/diamonds/DiamondFilters'
import { DiamondFilters as Filters, DiamondListResponse } from '@/types/diamond'
import { cn } from '@/lib/utils'

const DEFAULT_FILTERS: Filters = {
  cuts: [],
  caratMin: 0.3,
  caratMax: 5.0,
  colors: [],
  clarities: [],
  priceMin: 500,
  priceMax: 50000,
  certification: 'Both',
  search: '',
  sort: 'newest',
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'carat_desc', label: 'Carat: Largest First' },
]

export default function DiamondsPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [data, setData] = useState<DiamondListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  const fetchDiamonds = useCallback(async (f: Filters, p: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      f.cuts.forEach((c) => params.append('cut', c))
      f.colors.forEach((c) => params.append('color', c))
      f.clarities.forEach((c) => params.append('clarity', c))
      params.set('caratMin', String(f.caratMin))
      params.set('caratMax', String(f.caratMax))
      params.set('priceMin', String(f.priceMin))
      params.set('priceMax', String(f.priceMax))
      if (f.certification !== 'Both') params.set('certification', f.certification)
      if (f.search) params.set('search', f.search)
      params.set('sort', f.sort)
      params.set('page', String(p))
      params.set('limit', '24')

      const res = await fetch(`/api/diamonds?${params}`)
      const json: DiamondListResponse = await res.json()
      setData(json)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDiamonds(filters, page)
  }, [filters, page, fetchDiamonds])

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters)
    setPage(1)
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      {/* Page header */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 mb-10">
        <p className="text-gold/70 text-xs uppercase tracking-[0.3em] mb-3">True Smith Jewelers</p>
        <h1 className="font-serif text-4xl lg:text-5xl text-white mb-4">Lab-Grown Diamonds</h1>
        <p className="text-white/50 text-base max-w-xl">
          Ethically created, chemically identical to mined diamonds. Every stone certified by IGI or
          GIA.
        </p>
      </div>

      {/* Search & Sort bar */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search cut, certification..."
              value={filters.search}
              onChange={(e) => handleFiltersChange({ ...filters, search: e.target.value })}
              className="w-full bg-black-soft border border-white/10 focus:border-gold/50 pl-10 pr-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/25 rounded-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Result count */}
            {data && !loading && (
              <span className="text-white/40 text-sm hidden sm:block">
                Showing {data.diamonds.length} of {data.total} diamonds
              </span>
            )}

            {/* Sort */}
            <select
              value={filters.sort}
              onChange={(e) =>
                handleFiltersChange({ ...filters, sort: e.target.value as Filters['sort'] })
              }
              className="bg-black-soft border border-white/10 focus:border-gold/50 text-white text-sm px-4 py-3 outline-none cursor-pointer transition-colors rounded-sm"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile result count */}
        {data && !loading && (
          <p className="text-white/40 text-sm mt-2 sm:hidden">
            Showing {data.diamonds.length} of {data.total} diamonds
          </p>
        )}
      </div>

      {/* Main content */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="flex gap-10">
          {/* Filters sidebar */}
          <DiamondFilters
            filters={filters}
            onChange={handleFiltersChange}
            totalResults={data?.total ?? 0}
          />

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-black-soft animate-pulse rounded-sm" />
                ))}
              </div>
            ) : data?.diamonds.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-serif text-2xl text-white/60 mb-2">No diamonds found</p>
                <p className="text-white/30 text-sm">Try adjusting your filters</p>
                <button
                  onClick={() => handleFiltersChange(DEFAULT_FILTERS)}
                  className="mt-6 border border-gold/40 text-gold hover:border-gold px-6 py-3 text-xs uppercase tracking-widest transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {data?.diamonds.map((diamond) => (
                    <DiamondCard key={diamond.id} diamond={diamond} />
                  ))}
                </div>

                {/* Pagination */}
                {data && data.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                      className="px-4 py-2 border border-white/10 text-white/60 hover:border-gold/50 hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed text-sm transition-all"
                    >
                      ← Previous
                    </button>

                    {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={cn(
                          'w-10 h-10 border text-sm transition-all',
                          p === page
                            ? 'border-gold bg-gold text-black font-medium'
                            : 'border-white/10 text-white/60 hover:border-gold/50 hover:text-gold'
                        )}
                      >
                        {p}
                      </button>
                    ))}

                    <button
                      disabled={page === data.totalPages}
                      onClick={() => setPage((p) => p + 1)}
                      className="px-4 py-2 border border-white/10 text-white/60 hover:border-gold/50 hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed text-sm transition-all"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
