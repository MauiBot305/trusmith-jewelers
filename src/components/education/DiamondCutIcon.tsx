import React from 'react'

interface DiamondCutIconProps {
  cut: string
  className?: string
  size?: number
  filled?: boolean
}

const cutPaths: Record<string, React.ReactNode> = {
  round: <circle cx="50" cy="50" r="40" />,
  oval: <ellipse cx="50" cy="50" rx="30" ry="42" />,
  princess: <rect x="12" y="12" width="76" height="76" />,
  cushion: (
    <path d="M 25 10 L 75 10 Q 90 10 90 25 L 90 75 Q 90 90 75 90 L 25 90 Q 10 90 10 75 L 10 25 Q 10 10 25 10 Z" />
  ),
  emerald: <path d="M 32 10 L 68 10 L 90 28 L 90 72 L 68 90 L 32 90 L 10 72 L 10 28 Z" />,
  marquise: <path d="M 50 5 Q 92 50 50 95 Q 8 50 50 5 Z" />,
  pear: <path d="M 50 90 Q 10 90 10 55 Q 10 20 50 10 Q 90 20 90 55 Q 90 90 50 90 Z" />,
  radiant: <path d="M 24 10 L 76 10 L 90 24 L 90 76 L 76 90 L 24 90 L 10 76 L 10 24 Z" />,
  asscher: <path d="M 28 10 L 72 10 L 90 28 L 90 72 L 72 90 L 28 90 L 10 72 L 10 28 Z" />,
  heart: (
    <path d="M 50 85 Q 5 55 5 30 Q 5 10 25 10 Q 38 10 50 25 Q 62 10 75 10 Q 95 10 95 30 Q 95 55 50 85 Z" />
  ),
}

const cutFacetLines: Record<string, React.ReactNode> = {
  round: (
    <>
      <circle cx="50" cy="50" r="22" strokeOpacity="0.5" />
      <line x1="50" y1="10" x2="50" y2="28" strokeOpacity="0.4" />
      <line x1="50" y1="72" x2="50" y2="90" strokeOpacity="0.4" />
      <line x1="10" y1="50" x2="28" y2="50" strokeOpacity="0.4" />
      <line x1="72" y1="50" x2="90" y2="50" strokeOpacity="0.4" />
      <line x1="22" y1="22" x2="35" y2="35" strokeOpacity="0.3" />
      <line x1="78" y1="22" x2="65" y2="35" strokeOpacity="0.3" />
      <line x1="22" y1="78" x2="35" y2="65" strokeOpacity="0.3" />
      <line x1="78" y1="78" x2="65" y2="65" strokeOpacity="0.3" />
    </>
  ),
  oval: (
    <>
      <ellipse cx="50" cy="50" rx="16" ry="22" strokeOpacity="0.5" />
      <line x1="50" y1="8" x2="50" y2="25" strokeOpacity="0.4" />
      <line x1="50" y1="75" x2="50" y2="92" strokeOpacity="0.4" />
    </>
  ),
  princess: (
    <>
      <rect x="24" y="24" width="52" height="52" strokeOpacity="0.5" />
      <line x1="12" y1="12" x2="24" y2="24" strokeOpacity="0.4" />
      <line x1="88" y1="12" x2="76" y2="24" strokeOpacity="0.4" />
      <line x1="12" y1="88" x2="24" y2="76" strokeOpacity="0.4" />
      <line x1="88" y1="88" x2="76" y2="76" strokeOpacity="0.4" />
      <line x1="50" y1="12" x2="50" y2="88" strokeOpacity="0.3" />
      <line x1="12" y1="50" x2="88" y2="50" strokeOpacity="0.3" />
    </>
  ),
  cushion: (
    <>
      <path
        d="M 32 22 L 68 22 Q 78 22 78 32 L 78 68 Q 78 78 68 78 L 32 78 Q 22 78 22 68 L 22 32 Q 22 22 32 22 Z"
        strokeOpacity="0.5"
      />
      <line x1="50" y1="10" x2="50" y2="90" strokeOpacity="0.3" />
      <line x1="10" y1="50" x2="90" y2="50" strokeOpacity="0.3" />
    </>
  ),
  emerald: (
    <>
      <path
        d="M 38 20 L 62 20 L 80 38 L 80 62 L 62 80 L 38 80 L 20 62 L 20 38 Z"
        strokeOpacity="0.5"
      />
      <line x1="20" y1="38" x2="80" y2="38" strokeOpacity="0.3" />
      <line x1="20" y1="62" x2="80" y2="62" strokeOpacity="0.3" />
      <line x1="38" y1="20" x2="38" y2="80" strokeOpacity="0.3" />
      <line x1="62" y1="20" x2="62" y2="80" strokeOpacity="0.3" />
    </>
  ),
  marquise: (
    <>
      <ellipse cx="50" cy="50" rx="18" ry="28" strokeOpacity="0.5" />
      <line x1="50" y1="5" x2="50" y2="22" strokeOpacity="0.4" />
      <line x1="50" y1="78" x2="50" y2="95" strokeOpacity="0.4" />
    </>
  ),
  pear: (
    <>
      <path
        d="M 50 75 Q 22 75 22 50 Q 22 25 50 18 Q 78 25 78 50 Q 78 75 50 75 Z"
        strokeOpacity="0.5"
      />
      <line x1="50" y1="10" x2="50" y2="90" strokeOpacity="0.3" />
    </>
  ),
  radiant: (
    <>
      <path
        d="M 30 22 L 70 22 L 78 30 L 78 70 L 70 78 L 30 78 L 22 70 L 22 30 Z"
        strokeOpacity="0.5"
      />
      <line x1="22" y1="50" x2="78" y2="50" strokeOpacity="0.3" />
      <line x1="50" y1="22" x2="50" y2="78" strokeOpacity="0.3" />
    </>
  ),
  asscher: (
    <>
      <path
        d="M 34 22 L 66 22 L 78 34 L 78 66 L 66 78 L 34 78 L 22 66 L 22 34 Z"
        strokeOpacity="0.5"
      />
      <line x1="22" y1="34" x2="78" y2="34" strokeOpacity="0.3" />
      <line x1="22" y1="66" x2="78" y2="66" strokeOpacity="0.3" />
      <line x1="34" y1="22" x2="34" y2="78" strokeOpacity="0.3" />
      <line x1="66" y1="22" x2="66" y2="78" strokeOpacity="0.3" />
    </>
  ),
  heart: (
    <>
      <line x1="50" y1="25" x2="50" y2="85" strokeOpacity="0.4" />
      <path d="M 20 25 Q 50 45 50 60" strokeOpacity="0.3" fill="none" />
      <path d="M 80 25 Q 50 45 50 60" strokeOpacity="0.3" fill="none" />
    </>
  ),
}

export default function DiamondCutIcon({
  cut,
  className = '',
  size = 80,
  filled = false,
}: DiamondCutIconProps) {
  const path = cutPaths[cut]
  if (!path) return null

  const facets = cutFacetLines[cut]

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-label={`${cut} diamond cut shape`}
    >
      <defs>
        <linearGradient id={`gold-fill-${cut}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C84D" stopOpacity={filled ? 0.15 : 0.05} />
          <stop offset="50%" stopColor="#D4AF37" stopOpacity={filled ? 0.25 : 0.1} />
          <stop offset="100%" stopColor="#B8860B" stopOpacity={filled ? 0.15 : 0.05} />
        </linearGradient>
        <linearGradient id={`gold-stroke-${cut}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C84D" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>

      {/* Outer shape - filled */}
      <g fill={`url(#gold-fill-${cut})`} stroke={`url(#gold-stroke-${cut})`} strokeWidth="1.5">
        {path}
      </g>

      {/* Facet lines */}
      <g fill="none" stroke={`url(#gold-stroke-${cut})`} strokeWidth="0.8">
        {facets}
      </g>
    </svg>
  )
}
