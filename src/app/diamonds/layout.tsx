import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lab-Grown Diamonds',
  description:
    'Browse our curated selection of IGI and GIA certified lab-grown diamonds. Filter by cut, carat, color, clarity, and price. Every stone ethically created, every price transparent.',
  keywords: [
    'lab grown diamonds',
    'IGI certified diamonds',
    'GIA certified diamonds',
    'loose diamonds',
    'diamond pricing',
    'oval cut diamond',
    'round brilliant diamond',
  ],
  openGraph: {
    title: 'Lab-Grown Diamond Collection | True Smith Jewelers',
    description:
      'IGI & GIA certified lab-grown diamonds at transparent prices. Filter by the 4Cs and find your perfect stone.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://trusmithjewelers.com/diamonds' },
}

export default function DiamondsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
