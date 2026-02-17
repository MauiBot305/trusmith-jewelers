import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Build Your Ring',
  description:
    'Design your perfect lab-grown diamond engagement ring. Choose your cut, setting, metal, and personalize every detail.',
}

// Heavy 3D dependencies — dynamic import with SSR disabled
const RingBuilder = dynamic(
  () => import('@/components/builder/RingBuilder').then((m) => ({ default: m.RingBuilder })),
  { ssr: false }
)

export default function BuildPage() {
  return <RingBuilder />
}
