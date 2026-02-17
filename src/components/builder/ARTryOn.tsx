'use client'

import { Suspense, useState, useRef, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { Camera, CameraOff } from 'lucide-react'

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

const skinTones = [
  { id: 'fair', label: 'Fair', fill: '#F2C9A0', shadow: '#D4956A' },
  { id: 'medium', label: 'Medium', fill: '#C68642', shadow: '#8B5A2B' },
  { id: 'deep', label: 'Deep', fill: '#6B3A2A', shadow: '#3D1C0E' },
]

function HandSVG({ fill, shadow }: { fill: string; shadow: string }) {
  return (
    <svg
      viewBox="0 0 300 400"
      className="w-3/4 max-w-xs opacity-80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={fill} stroke={shadow} strokeWidth="1.5">
        <ellipse cx="150" cy="300" rx="70" ry="80" />
        <rect x="170" y="140" width="28" height="120" rx="14" />
        <rect x="142" y="110" width="28" height="145" rx="14" />
        <rect x="114" y="120" width="28" height="135" rx="14" />
        <rect x="88" y="150" width="24" height="110" rx="12" />
        <ellipse cx="210" cy="290" rx="20" ry="50" transform="rotate(-20,210,290)" />
      </g>
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
      <polygon points="128,208 133,218 128,213 123,218" fill="#E8C84D" opacity="0.9" />
    </svg>
  )
}

interface ARTryOnProps {
  ringModel?: string
  metalColor?: string
  className?: string
}

export function ARTryOn({
  ringModel = '/models/ring-placeholder.glb',
  metalColor = '#D4AF37',
  className,
}: ARTryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [show3D, setShow3D] = useState(true)
  const [selectedTone, setSelectedTone] = useState(skinTones[0])
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = useCallback(async () => {
    try {
      setCameraError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      setCameraActive(true)
    } catch (err) {
      setCameraError('Camera access denied. Using hand preview instead.')
      setCameraActive(false)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) videoRef.current.srcObject = null
    setCameraActive(false)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
      }
    }
  }, [])

  // Check iOS for USDZ Quick Look
  const isIOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as typeof window & { MSStream?: unknown }).MSStream

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Main viewport */}
      <div className="relative w-full aspect-[4/3] bg-black-soft rounded-lg overflow-hidden border border-gold/10">
        {/* Camera feed or SVG hand background */}
        {cameraActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <HandSVG fill={selectedTone.fill} shadow={selectedTone.shadow} />
          </div>
        )}

        {/* 3D ring overlay */}
        {show3D && ringModel && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ mixBlendMode: cameraActive ? 'screen' : 'normal' }}
          >
            <Suspense fallback={null}>
              <ThreeRingViewer modelUrl={ringModel} metalColor={metalColor} />
            </Suspense>
          </div>
        )}

        {/* Toggle 3D */}
        <button
          onClick={() => setShow3D((v) => !v)}
          className="absolute top-3 right-3 px-3 py-1.5 bg-black/60 border border-gold/30 text-gold text-xs tracking-wider uppercase font-sans rounded hover:bg-black/80 transition-colors"
        >
          {show3D ? 'Hide Ring' : 'Show Ring'}
        </button>

        {/* AR badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 bg-gold/20 border border-gold/40 text-gold text-xs tracking-wider uppercase font-sans rounded">
          ◈ {cameraActive ? 'Live AR' : 'AR Preview'}
        </div>

        {/* Camera error */}
        {cameraError && (
          <div className="absolute bottom-3 left-3 right-3 bg-black/80 border border-red-500/40 text-red-400 text-xs px-3 py-2 rounded">
            {cameraError}
          </div>
        )}

        {/* iOS Quick Look */}
        {isIOS && (
          <a
            href={ringModel.replace('.glb', '.usdz')}
            rel="ar"
            className="absolute bottom-3 left-3 flex items-center gap-2 px-4 py-2 bg-gold text-black font-sans font-semibold text-xs tracking-widest uppercase rounded hover:bg-gold-light transition-colors"
          >
            View in AR
          </a>
        )}
      </div>

      {/* Camera toggle + skin tone */}
      <div className="flex flex-col gap-3">
        {/* Camera button */}
        <button
          onClick={cameraActive ? stopCamera : startCamera}
          className={cn(
            'flex items-center justify-center gap-2 w-full py-3 rounded-lg border text-sm font-sans tracking-wider uppercase transition-all',
            cameraActive
              ? 'border-gold bg-gold/10 text-gold hover:bg-gold/20'
              : 'border-white/20 text-white-off/60 hover:border-gold/50 hover:text-gold'
          )}
        >
          {cameraActive ? (
            <>
              <CameraOff size={16} />
              Stop Camera
            </>
          ) : (
            <>
              <Camera size={16} />
              Try On With Camera
            </>
          )}
        </button>

        {/* Skin tone (only shown when camera is off) */}
        {!cameraActive && (
          <div className="flex flex-col gap-2">
            <span className="text-white-off/50 text-xs tracking-[0.2em] uppercase font-sans">
              Skin Tone Preset
            </span>
            <div className="flex gap-2">
              {skinTones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone)}
                  className={cn(
                    'flex-1 py-2 px-3 rounded border text-xs font-sans tracking-wider uppercase transition-all duration-200',
                    selectedTone.id === tone.id
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-white/10 text-white-off/50 hover:border-gold/40'
                  )}
                >
                  <span
                    className="inline-block w-3 h-3 rounded-full border border-white/20 align-middle mr-1.5"
                    style={{ backgroundColor: tone.fill }}
                  />
                  {tone.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-white-off/30 text-[10px] tracking-widest uppercase font-sans">
        {cameraActive
          ? 'Point your ring finger at the camera'
          : 'Live camera AR available — tap "Try On With Camera"'}
      </p>
    </div>
  )
}

export default ARTryOn
