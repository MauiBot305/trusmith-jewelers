'use client'

import { useRef, useEffect } from 'react'
import { Gem } from 'lucide-react'

interface Diamond3DViewerProps {
  className?: string
}

// Lightweight animated placeholder — full Three.js is Phase 5
export default function Diamond3DViewer({ className = '' }: Diamond3DViewerProps) {
  return (
    <div
      className={`relative bg-black border border-gold/20 rounded-sm flex items-center justify-center overflow-hidden ${className}`}
      style={{ aspectRatio: '1 / 1' }}
    >
      {/* Animated rotating diamond */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div style={{ animation: 'diamondSpin 8s linear infinite' }}>
          <Gem
            className="w-24 h-24 text-gold/80"
            style={{ filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.5))' }}
          />
        </div>
        <p className="text-white/30 text-xs uppercase tracking-widest">3D View</p>
        <p className="text-white/20 text-[10px]">Available in Phase 5</p>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
      />

      <style>{`
        @keyframes diamondSpin {
          from { transform: rotateY(0deg) rotateX(10deg); }
          to { transform: rotateY(360deg) rotateX(10deg); }
        }
      `}</style>
    </div>
  )
}
