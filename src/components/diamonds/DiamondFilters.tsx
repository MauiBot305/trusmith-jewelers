'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { X, SlidersHorizontal } from 'lucide-react'
import {
  DiamondFilters as Filters,
  DIAMOND_CUTS,
  DIAMOND_COLORS,
  DIAMOND_CLARITIES,
  CERTIFICATIONS,
} from '@/types/diamond'
import { cn } from '@/lib/utils'

interface DiamondFiltersProps {
  filters: Filters
  onChange: (filters: Filters) => void
  totalResults: number
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-white/10 pb-5 mb-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between mb-4 group"
      >
        <span className="text-white/60 text-xs uppercase tracking-[0.15em]">{title}</span>
        <span
          className={cn(
            'text-white/40 text-lg leading-none transition-transform duration-200 group-hover:text-gold',
            !open && 'rotate-180'
          )}
        >
          −
        </span>
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}

export default function DiamondFilters({ filters, onChange, totalResults }: DiamondFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const update = (partial: Partial<Filters>) => onChange({ ...filters, ...partial })

  const toggleCut = (cut: string) => {
    const cuts = filters.cuts.includes(cut)
      ? filters.cuts.filter((c) => c !== cut)
      : [...filters.cuts, cut]
    update({ cuts })
  }

  const toggleColor = (color: string) => {
    const colors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color]
    update({ colors })
  }

  const toggleClarity = (clarity: string) => {
    const clarities = filters.clarities.includes(clarity)
      ? filters.clarities.filter((c) => c !== clarity)
      : [...filters.clarities, clarity]
    update({ clarities })
  }

  const resetAll = () =>
    onChange({
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
    })

  const hasActiveFilters =
    filters.cuts.length > 0 ||
    filters.colors.length > 0 ||
    filters.clarities.length > 0 ||
    filters.certification !== 'Both' ||
    filters.caratMin > 0.3 ||
    filters.caratMax < 5.0 ||
    filters.priceMin > 500 ||
    filters.priceMax < 50000

  const FiltersContent = () => (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-white text-lg">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={resetAll}
            className="text-gold/70 hover:text-gold text-xs uppercase tracking-wider transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Cut */}
      <FilterSection title="Cut">
        <div className="space-y-2">
          {DIAMOND_CUTS.map((cut) => (
            <label key={cut} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={cn(
                  'w-4 h-4 border transition-all duration-150 flex items-center justify-center flex-shrink-0',
                  filters.cuts.includes(cut)
                    ? 'border-gold bg-gold'
                    : 'border-white/20 group-hover:border-gold/50'
                )}
                onClick={() => toggleCut(cut)}
              >
                {filters.cuts.includes(cut) && (
                  <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
              <span
                className={cn(
                  'text-sm transition-colors',
                  filters.cuts.includes(cut) ? 'text-gold' : 'text-white/70 group-hover:text-white'
                )}
                onClick={() => toggleCut(cut)}
              >
                {cut}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Carat Range */}
      <FilterSection title="Carat Weight">
        <div className="px-1">
          <div className="flex justify-between mb-4">
            <span className="text-white text-sm font-medium">{filters.caratMin}ct</span>
            <span className="text-white text-sm font-medium">{filters.caratMax}ct</span>
          </div>
          <Slider
            min={0.3}
            max={5.0}
            step={0.1}
            value={[filters.caratMin, filters.caratMax]}
            onValueChange={([min, max]) => update({ caratMin: min, caratMax: max })}
            className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold"
          />
          <div className="flex justify-between mt-2 text-white/30 text-xs">
            <span>0.3 ct</span>
            <span>5.0 ct</span>
          </div>
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection title="Color Grade">
        <div className="flex flex-wrap gap-2">
          {DIAMOND_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={cn(
                'w-9 h-9 border text-xs font-medium transition-all duration-150',
                filters.colors.includes(color)
                  ? 'border-gold bg-gold text-black'
                  : 'border-white/20 text-white/70 hover:border-gold/50 hover:text-white'
              )}
            >
              {color}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Clarity */}
      <FilterSection title="Clarity Grade">
        <div className="flex flex-wrap gap-2">
          {DIAMOND_CLARITIES.map((clarity) => (
            <button
              key={clarity}
              onClick={() => toggleClarity(clarity)}
              className={cn(
                'px-2.5 h-8 border text-xs font-medium transition-all duration-150',
                filters.clarities.includes(clarity)
                  ? 'border-gold bg-gold text-black'
                  : 'border-white/20 text-white/70 hover:border-gold/50 hover:text-white'
              )}
            >
              {clarity}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="px-1">
          <div className="flex justify-between mb-4">
            <span className="text-white text-sm font-medium">
              ${filters.priceMin.toLocaleString()}
            </span>
            <span className="text-white text-sm font-medium">
              ${filters.priceMax.toLocaleString()}
            </span>
          </div>
          <Slider
            min={500}
            max={50000}
            step={500}
            value={[filters.priceMin, filters.priceMax]}
            onValueChange={([min, max]) => update({ priceMin: min, priceMax: max })}
            className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold"
          />
          <div className="flex justify-between mt-2 text-white/30 text-xs">
            <span>$500</span>
            <span>$50,000</span>
          </div>
        </div>
      </FilterSection>

      {/* Certification */}
      <FilterSection title="Certification">
        <div className="flex gap-2">
          {(['IGI', 'GIA', 'Both'] as const).map((cert) => (
            <button
              key={cert}
              onClick={() => update({ certification: cert })}
              className={cn(
                'flex-1 py-2 border text-xs uppercase tracking-wider font-medium transition-all',
                filters.certification === cert
                  ? 'border-gold bg-gold text-black'
                  : 'border-white/20 text-white/60 hover:border-gold/50'
              )}
            >
              {cert}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Result count */}
      <p className="text-white/30 text-xs text-center mt-2">
        {totalResults} {totalResults === 1 ? 'diamond' : 'diamonds'} found
      </p>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center gap-2 border border-white/20 text-white/70 hover:border-gold/50 hover:text-gold px-4 py-2.5 text-sm uppercase tracking-wider transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="bg-gold text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {filters.cuts.length + filters.colors.length + filters.clarities.length}
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-black-deep border-r border-white/10 overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-white text-lg">Filters</h3>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5 text-white/60 hover:text-white" />
              </button>
            </div>
            <FiltersContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <FiltersContent />
      </aside>
    </>
  )
}
