'use client'

import dynamic from 'next/dynamic'
import type { RingConfig } from './ProceduralRing'

const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-yellow-500/60 border-t-transparent rounded-full animate-spin" />
        <span className="text-yellow-500/40 text-xs tracking-widest uppercase">Loading 3D Preview</span>
      </div>
    </div>
  ),
})

const METAL_MAP: Record<string, { color: string; roughness: number }> = {
  '#D4AF37': { color: '#FFD700', roughness: 0.2 },
  '#FFD700': { color: '#FFCC00', roughness: 0.15 },
  '#E8E8E8': { color: '#E8E8E8', roughness: 0.2 },
  '#F0F0F0': { color: '#F0F0F0', roughness: 0.15 },
  '#B76E79': { color: '#E8A090', roughness: 0.2 },
  '#E8A090': { color: '#E89888', roughness: 0.15 },
  '#D0D0D8': { color: '#D0D0D8', roughness: 0.1 },
  '#C0C0C0': { color: '#C0C0C0', roughness: 0.25 },
}

interface ThreeRingViewerProps {
  modelUrl?: string
  metalColor?: string
  className?: string
  caratSize?: number
  sideStones?: 'none' | 'pave' | 'channel'
  bandScale?: number
}

export default function ThreeRingViewer({
  metalColor = '#D4AF37',
  className = '',
  caratSize = 1.0,
  sideStones = 'none',
  bandScale = 1.0,
}: ThreeRingViewerProps) {
  const metal = METAL_MAP[metalColor] ?? { color: metalColor, roughness: 0.2 }

  const ringConfig: RingConfig = {
    metalColor: metal.color,
    metalRoughness: metal.roughness,
    stoneColor: '#E8E8E8',
    stoneTransmission: true,
    caratSize,
    sideStones,
    bandScale,
    autoRotate: true,
    rotationSpeed: 0.4,
  }

  return (
    <div className={`w-full h-full min-h-[300px] ${className}`} style={{ minHeight: 300 }}>
      <Scene3D ringConfig={ringConfig} className="w-full h-full" />
    </div>
  )
}
