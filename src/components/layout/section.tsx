import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const sectionVariants = cva('relative w-full', {
  variants: {
    padding: {
      none: '',
      sm: 'py-12 md:py-16',
      md: 'py-16 md:py-20',
      lg: 'py-20 md:py-28',
      xl: 'py-28 md:py-36',
    },
    background: {
      black: 'bg-black',
      deep: 'bg-black-deep',
      soft: 'bg-black-soft',
      transparent: 'bg-transparent',
    },
  },
  defaultVariants: {
    padding: 'lg',
    background: 'black',
  },
})

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
  as?: 'section' | 'div' | 'article' | 'aside'
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, padding, background, as: Tag = 'section', ...props }, ref) => (
    <Tag
      ref={ref as any}
      className={cn(sectionVariants({ padding, background }), className)}
      {...props}
    />
  )
)
Section.displayName = 'Section'

// ── Section Header — centered title + subtitle + divider ──────────────────────

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  titleGold?: string // Part of title rendered in gold
  description?: string
  centered?: boolean
  className?: string
}

const SectionHeader = ({
  eyebrow,
  title,
  titleGold,
  description,
  centered = true,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn('space-y-4 mb-14', centered && 'text-center', className)}>
      {eyebrow && (
        <p className="text-gold text-xs font-sans font-medium tracking-[0.3em] uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-display-md md:text-display-lg text-white-off">
        {title}
        {titleGold && (
          <>
            {' '}
            <span className="text-gold-gradient italic">{titleGold}</span>
          </>
        )}
      </h2>
      <div className={cn('divider-gold', !centered && 'mx-0')} />
      {description && (
        <p className="text-white-off/60 font-sans text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
SectionHeader.displayName = 'SectionHeader'

export { Section, SectionHeader }
