'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { Camera, CameraOff, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useBuilderStore } from '@/store/builderStore'

function resolveMetalColor(hex: string): string {
  const map: Record<string, string> = {
    '#D4AF37': '#FFD700',
    '#FFD700': '#FFCC00',
    '#B8860B': '#D4AF37',
    '#E8E8E8': '#F0F0F0',
    '#F0F0F0': '#F5F5F5',
    '#B76E79': '#E8A090',
    '#E8A090': '#DDA0DD',
    '#D0D0D8': '#E8E8F0',
    '#C0C0C0': '#D0D0D0',
  }
  return map[hex] ?? hex
}

const RING_FINGER_MCP = 13
const RING_FINGER_PIP = 14

function drawRingOnFinger(
  ctx: CanvasRenderingContext2D,
  landmarks: any[],
  width: number,
  height: number,
  metalColor: string,
  caratSize: number
) {
  const mcp = landmarks[RING_FINGER_MCP]
  const pip = landmarks[RING_FINGER_PIP]

  const t = 0.35
  const x = (mcp.x + t * (pip.x - mcp.x)) * width
  const y = (mcp.y + t * (pip.y - mcp.y)) * height

  const dx = (pip.x - mcp.x) * width
  const dy = (pip.y - mcp.y) * height
  const fingerAngle = Math.atan2(dy, dx)

  const jointDist = Math.hypot(dx, dy)
  const ringRadius = jointDist * 0.55
  const bandWidth = ringRadius * 0.28
  const ellipseRatio = 0.38

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(fingerAngle + Math.PI / 2)

  ctx.shadowColor = 'rgba(0,0,0,0.5)'
  ctx.shadowBlur = 8
  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2
  ctx.beginPath()
  ctx.ellipse(0, 0, ringRadius + 3, (ringRadius + 3) * ellipseRatio, 0, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(0,0,0,0.3)'
  ctx.lineWidth = bandWidth + 6
  ctx.stroke()
  ctx.shadowColor = 'transparent'

  ctx.beginPath()
  ctx.ellipse(0, 0, ringRadius, ringRadius * ellipseRatio, 0, 0, Math.PI * 2)
  ctx.strokeStyle = metalColor
  ctx.lineWidth = bandWidth
  ctx.lineCap = 'round'
  ctx.stroke()

  const sheenGrad = ctx.createLinearGradient(-ringRadius, 0, ringRadius, 0)
  sheenGrad.addColorStop(0, 'rgba(255,255,255,0.0)')
  sheenGrad.addColorStop(0.35, 'rgba(255,255,255,0.35)')
  sheenGrad.addColorStop(0.5, 'rgba(255,255,255,0.55)')
  sheenGrad.addColorStop(0.65, 'rgba(255,255,255,0.35)')
  sheenGrad.addColorStop(1, 'rgba(255,255,255,0.0)')
  ctx.beginPath()
  ctx.ellipse(0, 0, ringRadius, ringRadius * ellipseRatio, 0, 0, Math.PI * 2)
  ctx.strokeStyle = sheenGrad
  ctx.lineWidth = bandWidth * 0.5
  ctx.stroke()

  const darkGrad = ctx.createLinearGradient(0, -ringRadius * ellipseRatio, 0, ringRadius * ellipseRatio)
  darkGrad.addColorStop(0, 'rgba(0,0,0,0.0)')
  darkGrad.addColorStop(1, 'rgba(0,0,0,0.25)')
  ctx.beginPath()
  ctx.ellipse(0, 0, ringRadius, ringRadius * ellipseRatio, 0, 0, Math.PI * 2)
  ctx.strokeStyle = darkGrad
  ctx.lineWidth = bandWidth * 0.4
  ctx.stroke()

  const gemSize = ringRadius * (0.28 + caratSize * 0.12)
  const gemY = -(ringRadius * ellipseRatio) - gemSize * 0.6

  const haloRadius = gemSize * 1.8
  const haloGrad = ctx.createRadialGradient(0, gemY, 0, 0, gemY, haloRadius)
  haloGrad.addColorStop(0, 'rgba(220, 235, 255, 0.5)')
  haloGrad.addColorStop(0.5, 'rgba(180, 210, 255, 0.15)')
  haloGrad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.beginPath()
  ctx.arc(0, gemY, haloRadius, 0, Math.PI * 2)
  ctx.fillStyle = haloGrad
  ctx.fill()

  const gemGrad = ctx.createRadialGradient(-gemSize * 0.3, gemY - gemSize * 0.3, gemSize * 0.1, 0, gemY, gemSize)
  gemGrad.addColorStop(0, '#ffffff')
  gemGrad.addColorStop(0.2, 'rgba(230, 240, 255, 0.95)')
  gemGrad.addColorStop(0.6, 'rgba(200, 220, 255, 0.85)')
  gemGrad.addColorStop(1, 'rgba(170, 200, 255, 0.7)')
  ctx.beginPath()
  ctx.arc(0, gemY, gemSize, 0, Math.PI * 2)
  ctx.fillStyle = gemGrad
  ctx.fill()
  ctx.strokeStyle = 'rgba(200, 220, 255, 0.8)'
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.strokeStyle = 'rgba(255,255,255,0.3)'
  ctx.lineWidth = 0.8
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(0, gemY)
    ctx.lineTo(Math.cos(a) * gemSize * 0.9, gemY + Math.sin(a) * gemSize * 0.9)
    ctx.stroke()
  }

  ctx.beginPath()
  ctx.arc(-gemSize * 0.3, gemY - gemSize * 0.3, gemSize * 0.18, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,0.9)'
  ctx.fill()

  ctx.beginPath()
  ctx.arc(gemSize * 0.15, gemY - gemSize * 0.1, gemSize * 0.08, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.fill()

  ctx.strokeStyle = metalColor
  ctx.lineWidth = Math.max(1.5, bandWidth * 0.15)
  ctx.lineCap = 'round'
  for (let i = 0; i < 4; i++) {
    const pa = (i / 4) * Math.PI * 2 + Math.PI / 4
    const px = Math.cos(pa) * gemSize
    const py = gemY + Math.sin(pa) * gemSize
    ctx.beginPath()
    ctx.moveTo(px * 1.1, py)
    ctx.lineTo(px * 0.25, gemY + (py - gemY) * 0.2)
    ctx.stroke()
  }

  ctx.restore()
}

interface ARTryOnProps {
  ringModel?: string
  metalColor?: string
  caratSize?: number
  className?: string
}

export function ARTryOn({
  metalColor: metalColorProp,
  caratSize: caratSizeProp,
  className,
}: ARTryOnProps) {
  const { metal, diamond } = useBuilderStore()
  const metalColor = resolveMetalColor(metalColorProp ?? metal?.hex ?? '#D4AF37')
  const caratSize = caratSizeProp ?? diamond?.carat ?? 1.0

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animFrameRef = useRef<number>(0)
  const handsRef = useRef<any>(null)
  const processingRef = useRef(false)

  const [cameraActive, setCameraActive] = useState(false)
  const [handDetected, setHandDetected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const drawRingCallback = useCallback(
    (ctx: CanvasRenderingContext2D, landmarks: any[], width: number, height: number) => {
      drawRingOnFinger(ctx, landmarks, width, height, metalColor, caratSize)
    },
    [metalColor, caratSize]
  )

  const processFrames = useCallback(async () => {
    const video = videoRef.current
    const hands = handsRef.current
    if (video && hands && video.readyState >= 2 && !processingRef.current) {
      processingRef.current = true
      try {
        await hands.send({ image: video })
      } catch {
        // ignore per-frame errors
      } finally {
        processingRef.current = false
      }
    }
    animFrameRef.current = requestAnimationFrame(processFrames)
  }, [])

  const initHandTracking = useCallback(async () => {
    if (handsRef.current) return
    try {
      const { Hands } = await import('@mediapipe/hands')
      const hands = new Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`,
      })
      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.65,
        minTrackingConfidence: 0.5,
      })
      hands.onResults((results: any) => {
        const canvas = canvasRef.current
        const video = videoRef.current
        if (!canvas || !video) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth || 1280
          canvas.height = video.videoHeight || 720
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (results.multiHandLandmarks?.length > 0) {
          setHandDetected(true)
          drawRingCallback(ctx, results.multiHandLandmarks[0], canvas.width, canvas.height)
        } else {
          setHandDetected(false)
        }
      })
      handsRef.current = hands
    } catch (err) {
      console.warn('MediaPipe Hands failed to load:', err)
    }
  }, [drawRingCallback])

  const startCamera = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        },
        audio: false,
      })
      streamRef.current = stream
      const video = videoRef.current
      if (video) {
        video.srcObject = stream
        await new Promise<void>((resolve, reject) => {
          video.onloadedmetadata = () => resolve()
          video.onerror = reject
          setTimeout(reject, 5000)
        })
        await video.play()
        setCameraActive(true)
        await initHandTracking()
        processFrames()
      }
    } catch (err: any) {
      if (err?.name === 'NotAllowedError') {
        setError('Camera permission denied. Please allow camera access in your browser settings.')
      } else if (err?.name === 'NotFoundError') {
        setError('No camera found on this device.')
      } else {
        setError('Could not start camera. Please try again.')
      }
      setCameraActive(false)
    } finally {
      setLoading(false)
    }
  }, [initHandTracking, processFrames])

  const stopCamera = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    const video = videoRef.current
    if (video) video.srcObject = null
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
    }
    setCameraActive(false)
    setHandDetected(false)
  }, [])

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
    }
  }, [])

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="relative w-full rounded-xl overflow-hidden border border-gold/20 bg-black"
           style={{ aspectRatio: '4/3' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'scaleX(-1)' }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none object-cover"
          style={{ transform: 'scaleX(-1)' }}
        />
        {!cameraActive && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="text-5xl">✋</div>
            <p className="text-white/40 text-sm text-center px-6">
              Enable camera to try the ring on your hand
            </p>
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 z-10">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-gold/60 text-sm tracking-wider uppercase">Starting Camera...</p>
          </div>
        )}
        {cameraActive && (
          <div className={cn(
            'absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border transition-all',
            handDetected
              ? 'bg-green-500/20 border-green-500/40 text-green-400'
              : 'bg-black/60 border-white/10 text-white/50'
          )}>
            {handDetected ? '✋ Ring on finger' : '👆 Show your hand'}
          </div>
        )}
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-gold/20 border border-gold/40 text-gold text-xs tracking-widest uppercase rounded-lg font-sans">
          ◈ AR
        </div>
        {error && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/90 border-t border-red-500/30 text-red-400 text-xs px-4 py-3">
            {error}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={cameraActive ? stopCamera : startCamera}
          disabled={loading}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-sans tracking-wider uppercase transition-all',
            loading && 'opacity-50 cursor-not-allowed',
            cameraActive
              ? 'border-gold/60 bg-gold/10 text-gold hover:bg-gold/20'
              : 'border-white/20 text-white/60 hover:border-gold/50 hover:text-gold'
          )}
        >
          {loading ? (
            <><div className="w-4 h-4 border border-gold border-t-transparent rounded-full animate-spin" /> Starting...</>
          ) : cameraActive ? (
            <><CameraOff size={15} /> Stop Camera</>
          ) : (
            <><Camera size={15} /> Try On With Camera</>
          )}
        </button>
        {cameraActive && (
          <button
            onClick={() => { stopCamera(); setTimeout(startCamera, 300) }}
            className="px-3 py-3 rounded-lg border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-all"
            title="Restart camera"
          >
            <RotateCcw size={15} />
          </button>
        )}
      </div>
      <p className="text-center text-white/25 text-[11px] tracking-widest uppercase font-sans">
        {cameraActive
          ? 'Point ring finger toward camera • Ring appears automatically'
          : 'MediaPipe AI hand tracking • Works on mobile & desktop'}
      </p>
    </div>
  )
}

export default ARTryOn
