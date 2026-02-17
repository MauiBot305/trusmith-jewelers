import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Playfair_Display } from 'next/font/google'

import '@/styles/globals.css'
import { OrganizationSchema, WebsiteSchema } from '@/components/seo/JsonLd'

// ── Premium Fonts ──────────────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// ── Metadata ───────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://trusmithjewelers.com'),
  title: {
    default: 'True Smith Jewelers | Lab-Grown Diamond Engagement Rings',
    template: '%s | True Smith Jewelers',
  },
  description:
    'Affordable luxury lab-grown diamonds. Build your dream engagement ring with ethical, certified diamonds. Lifetime warranty, 30-day returns.',
  keywords: [
    'lab-grown diamonds',
    'engagement rings',
    'custom rings',
    'ethical diamonds',
    'diamond engagement rings',
    'tennis bracelets',
    'true smith jewelers',
    'lab grown diamond jewelry',
    'IGI certified diamonds',
    'GIA diamonds Miami',
  ],
  authors: [{ name: 'True Smith Jewelers', url: 'https://trusmithjewelers.com' }],
  creator: 'True Smith Jewelers',
  publisher: 'True Smith Jewelers',
  category: 'Jewelry',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trusmithjewelers.com',
    siteName: 'True Smith Jewelers',
    title: 'True Smith Jewelers | Lab-Grown Diamond Engagement Rings',
    description:
      'Affordable luxury lab-grown diamonds. Build your dream engagement ring with ethical, certified diamonds.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'True Smith Jewelers — Lab-Grown Diamond Engagement Rings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TrueSmithJeweler',
    creator: '@TrueSmithJeweler',
    title: 'True Smith Jewelers | Lab-Grown Diamond Engagement Rings',
    description: 'Affordable luxury lab-grown diamonds with lifetime warranty.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification token when available
    // google: 'your-verification-token',
  },
  alternates: {
    canonical: 'https://trusmithjewelers.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body className="min-h-screen bg-black text-white-off antialiased">{children}</body>
    </html>
  )
}
