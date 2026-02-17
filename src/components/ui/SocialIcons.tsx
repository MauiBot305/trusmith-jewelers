'use client'

import Link from 'next/link'
import { Instagram, Youtube } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SocialIconsProps {
  className?: string
  /** Size variant — 'sm' (header), 'md' (footer), 'lg' (standalone) */
  size?: 'sm' | 'md' | 'lg'
  /** Show labels next to icons */
  showLabels?: boolean
}

const SOCIAL_LINKS = [
  {
    href: 'https://instagram.com/TrueSmithJeweler',
    label: 'Instagram',
    handle: '@TrueSmithJeweler',
    Icon: Instagram,
    ariaLabel: 'Follow True Smith Jewelers on Instagram',
  },
  {
    href: 'https://youtube.com/@TrueSmithJeweler',
    label: 'YouTube',
    handle: '@TrueSmithJeweler',
    Icon: Youtube,
    ariaLabel: 'Watch True Smith Jewelers on YouTube',
  },
]

const sizeMap = {
  sm: { wrapper: 'w-7 h-7', icon: 14 },
  md: { wrapper: 'w-9 h-9', icon: 16 },
  lg: { wrapper: 'w-11 h-11', icon: 20 },
}

export function SocialIcons({ className, size = 'md', showLabels = false }: SocialIconsProps) {
  const { wrapper, icon: iconSize } = sizeMap[size]

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {SOCIAL_LINKS.map(({ href, label, handle, Icon, ariaLabel }) => (
        <Link
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={cn(
            'group flex items-center gap-2 transition-all duration-200',
            showLabels ? 'flex-row' : ''
          )}
        >
          <span
            className={cn(
              wrapper,
              'border border-gold/20 flex items-center justify-center',
              'text-white-off/50 group-hover:text-gold group-hover:border-gold/50',
              'transition-all duration-200'
            )}
          >
            <Icon size={iconSize} />
          </span>
          {showLabels && (
            <span className="text-white-off/50 group-hover:text-gold text-sm font-sans transition-colors duration-200">
              {handle}
            </span>
          )}
          <span className="sr-only">{label}</span>
        </Link>
      ))}
    </div>
  )
}

// Compact inline version for header
export function SocialIconsCompact({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {SOCIAL_LINKS.map(({ href, label, Icon, ariaLabel }) => (
        <Link
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className="text-white-off/40 hover:text-gold transition-colors duration-200 p-1"
        >
          <Icon size={15} />
          <span className="sr-only">{label}</span>
        </Link>
      ))}
    </div>
  )
}
