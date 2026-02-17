import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with True Smith Jewelers. Call 239-244-6446, email us, or book an appointment. We're based in Miami, FL and serve clients nationwide.",
  openGraph: {
    title: 'Contact True Smith Jewelers',
    description: 'Call, email, or book an appointment with our expert jewelers.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://trusmithjewelers.com/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
