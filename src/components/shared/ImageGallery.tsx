'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageGalleryProps {
  images: string[]
  alt: string
  showZoom?: boolean
}

export default function ImageGallery({ images, alt, showZoom = false }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const safeImages = images?.length > 0 ? images : ['/placeholder-diamond.jpg']

  const prev = () => setActiveIndex((i) => (i - 1 + safeImages.length) % safeImages.length)
  const next = () => setActiveIndex((i) => (i + 1) % safeImages.length)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div
        className="relative aspect-square bg-black-soft rounded-sm overflow-hidden group cursor-zoom-in"
        onMouseMove={showZoom ? handleMouseMove : undefined}
        onMouseEnter={showZoom ? () => setIsZoomed(true) : undefined}
        onMouseLeave={showZoom ? () => setIsZoomed(false) : undefined}
      >
        <Image
          src={safeImages[activeIndex]}
          alt={`${alt} - view ${activeIndex + 1}`}
          fill
          className={cn(
            'object-cover transition-transform duration-500',
            isZoomed && showZoom ? 'scale-150' : 'scale-100'
          )}
          style={
            isZoomed && showZoom ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : undefined
          }
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {/* Zoom hint */}
        {showZoom && (
          <div className="absolute top-4 right-4 bg-black/60 text-gold/80 rounded p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-4 h-4" />
          </div>
        )}

        {/* Nav arrows */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-gold"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-gold"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {safeImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {safeImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition-all duration-200',
                  i === activeIndex ? 'bg-gold w-4' : 'bg-white/40 hover:bg-white/70'
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {safeImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                'relative flex-shrink-0 w-16 h-16 rounded-sm overflow-hidden border transition-all duration-200',
                i === activeIndex
                  ? 'border-gold shadow-gold'
                  : 'border-white/10 hover:border-gold/50'
              )}
            >
              <Image
                src={img}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
