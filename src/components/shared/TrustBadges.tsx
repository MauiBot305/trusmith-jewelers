import { Shield, RotateCcw, Star } from 'lucide-react'

interface TrustBadgesProps {
  variant?: 'row' | 'column'
}

export default function TrustBadges({ variant = 'row' }: TrustBadgesProps) {
  const badges = [
    {
      icon: Shield,
      title: 'Lifetime Warranty',
      desc: 'Covered forever',
    },
    {
      icon: RotateCcw,
      title: '30-Day Returns',
      desc: 'Hassle-free',
    },
    {
      icon: Star,
      title: '5-Star Rated',
      desc: '1,200+ reviews',
    },
  ]

  return (
    <div className={variant === 'row' ? 'flex items-center gap-6' : 'flex flex-col gap-4'}>
      {badges.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center">
            <Icon className="w-4 h-4 text-gold" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">{title}</p>
            <p className="text-white/40 text-xs">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
