import { Shield, RotateCcw, Star } from 'lucide-react'

const items = [
  {
    icon: Shield,
    title: 'Lifetime Warranty',
    sub: 'On every piece, forever',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    sub: 'No questions asked',
  },
  {
    icon: Star,
    title: '5-Star Rated',
    sub: 'Google verified reviews',
  },
]

export default function TrustStrip() {
  return (
    <div className="bg-black-deep border-y border-gold/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gold/10">
          {items.map(({ icon: Icon, title, sub }) => (
            <div
              key={title}
              className="flex items-center justify-center sm:justify-start gap-4 py-5 px-6 sm:px-8"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center">
                <Icon size={16} className="text-gold" />
              </div>
              <div>
                <p className="text-white-off text-sm font-serif font-medium leading-tight">
                  {title}
                </p>
                <p className="text-white-off/40 text-xs font-sans mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
