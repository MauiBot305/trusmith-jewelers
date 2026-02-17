'use client'

import { Suspense, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

// TODO Phase 2 (WebAR): MediaPipe Hands integration
// - Import @mediapipe/hands for real-time hand tracking
// - Use getUserMedia() for webcam access
// - Detect hand landmarks (21 keypoints)
// - Position ring mesh on ring finger (landmark 14-15)
// - See: https://mediapipe.dev/solutions/hands

// TODO Phase 2 (WebAR): Ring positioning on detected finger
// - Map landmark[13] (ring finger MCP) to 3D space
// - Scale ring to match finger width using landmark distance
// - Apply depth-aware occlusion with hand mesh

const handPresets = [
  { id: 'hand1', src: '/hands/hand-light.svg', name: 'Light', label: 'Fair' },
  { id: 'hand2', src: '/hands/hand-medium.svg', name: 'Medium', label: 'Medium' },
  { id: 'hand3', src: '/hands/hand-dark.svg', name: 'Dark', label: 'Deep' },
]

// Lazy load the heavy 3D canvas — only on client, never SSR
const ThreeRingViewer = dynamic(() => import('./ThreeRingViewer'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <span className="text-white-off/60 text-xs tracking-wider uppercase font-sans">
          Loading 3D Preview
        </span>
      </div>
    </div>
  ),
})

interface ARTryOnProps {
  ringModel?: string
  className?: string
}

export function ARTryOn({ ringModel = '/models/rings/SM_Solitaire.glb', className }: ARTryOnProps) {
  const [selectedHand, setSelectedHand] = useState(handPresets[0])
  // 3D viewer disabled for now - causes hydration errors on Vercel
  // TODO: Debug Three.js/R3F SSR issues and re-enable
  const [show3D, setShow3D] = useState(false)

  // Check if iOS for USDZ AR Quick Look
  const isIOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as typeof window & { MSStream?: unknown }).MSStream

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Main try-on viewport */}
      <div className="relative w-full aspect-[4/3] bg-black-soft rounded-lg overflow-hidden border border-gold/10">
        {/* Hand preset background image */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* SVG hand placeholder — production would use real photography */}
          <HandSVG tone={selectedHand.id} />
        </div>

        {/* 3D ring overlay */}
        {show3D && ringModel && (
          <div className="absolute inset-0 pointer-events-none">
            <Suspense fallback={null}>
              <ThreeRingViewer modelUrl={ringModel} />
            </Suspense>
          </div>
        )}

        {/* Toggle overlay */}
        <button
          onClick={() => setShow3D((v) => !v)}
          className="absolute top-3 right-3 px-3 py-1.5 bg-black/60 border border-gold/30 text-gold text-xs tracking-wider uppercase font-sans rounded hover:bg-black/80 transition-colors"
        >
          {show3D ? 'Hide Ring' : 'Show Ring'}
        </button>

        {/* AR label badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 bg-gold/20 border border-gold/40 text-gold text-xs tracking-wider uppercase font-sans rounded">
          ◈ AR Preview
        </div>

        {/* iOS AR Quick Look button — only on iOS Safari */}
        {isIOS && (
          <a
            href={ringModel.replace('.glb', '.usdz')}
            rel="ar"
            className="absolute bottom-3 left-3 flex items-center gap-2 px-4 py-2 bg-gold text-black font-sans font-semibold text-xs tracking-widest uppercase rounded hover:bg-gold-light transition-colors"
          >
            {/* AR Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5l7.5 3.75L12 12 4.5 8.25 12 4.5zM4 9.5l7 3.5v7.5L4 17V9.5zm9 11V13l7-3.5V17l-7 3.5z" />
            </svg>
            View in AR
          </a>
        )}
      </div>

      {/* Hand tone selector */}
      <div className="flex flex-col gap-2">
        <span className="text-white-off/50 text-xs tracking-[0.2em] uppercase font-sans">
          Skin Tone Preset
        </span>
        <div className="flex gap-2">
          {handPresets.map((hand) => (
            <button
              key={hand.id}
              onClick={() => setSelectedHand(hand)}
              className={cn(
                'flex-1 py-2 px-3 rounded border text-xs font-sans tracking-wider uppercase transition-all duration-200',
                selectedHand.id === hand.id
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-white/10 text-white-off/50 hover:border-gold/40 hover:text-white-off/80'
              )}
            >
              <HandSwatchDot tone={hand.id} />
              <span className="ml-1.5">{hand.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Phase 2 teaser */}
      <p className="text-center text-white-off/30 text-[10px] tracking-widest uppercase font-sans">
        Live WebAR with hand tracking — coming soon
      </p>
    </div>
  )
}

// ── Inline SVG hand placeholders (production: replace with real photo presets) ─

function HandSwatchDot({ tone }: { tone: string }) {
  const colors: Record<string, string> = {
    hand1: '#F2C9A0',
    hand2: '#C68642',
    hand3: '#6B3A2A',
  }
  return (
    <span
      className="inline-block w-3 h-3 rounded-full border border-white/20 align-middle"
      style={{ backgroundColor: colors[tone] ?? '#ccc' }}
    />
  )
}

function HandSVG({ tone }: { tone: string }) {
  const skinColors: Record<string, { fill: string; shadow: string }> = {
    hand1: { fill: '#F2C9A0', shadow: '#D4956A' },
    hand2: { fill: '#C68642', shadow: '#8B5A2B' },
    hand3: { fill: '#6B3A2A', shadow: '#3D1C0E' },
  }
  const { fill, shadow } = skinColors[tone] ?? skinColors.hand1

  return (
    <svg
      viewBox="0 0 300 400"
      className="w-3/4 max-w-xs opacity-80"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified hand outline — ring finger prominent for jewelry display */}
      <g fill={fill} stroke={shadow} strokeWidth="1.5">
        {/* Palm */}
        <ellipse cx="150" cy="300" rx="70" ry="80" />
        {/* Index finger */}
        <rect x="170" y="140" width="28" height="120" rx="14" />
        {/* Middle finger (tallest) */}
        <rect x="142" y="110" width="28" height="145" rx="14" />
        {/* Ring finger — highlighted with gold ring */}
        <rect x="114" y="120" width="28" height="135" rx="14" />
        {/* Pinky */}
        <rect x="88" y="150" width="24" height="110" rx="12" />
        {/* Thumb */}
        <ellipse cx="210" cy="290" rx="20" ry="50" transform="rotate(-20,210,290)" />
      </g>
      {/* Gold ring band on ring finger */}
      <rect
        x="110"
        y="218"
        width="36"
        height="12"
        rx="4"
        fill="#D4AF37"
        stroke="#B8860B"
        strokeWidth="1"
        opacity="0.9"
      />
      {/* Diamond sparkle on ring */}
      <polygon points="128,208 133,218 128,213 123,218" fill="#E8C84D" opacity="0.9" />
    </svg>
  )
}

export default ARTryOn
