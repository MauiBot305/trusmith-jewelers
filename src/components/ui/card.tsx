import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const cardVariants = cva('rounded-lg transition-all duration-300', {
  variants: {
    variant: {
      // Default dark card
      default: 'bg-black-deep border border-white/5 shadow-luxury',
      // Glass morphism
      glass: 'glass-card shadow-luxury',
      // Product card with hover effects
      product:
        'bg-black-deep border border-white/5 shadow-product hover:border-gold/30 hover:shadow-luxury-gold group cursor-pointer',
      // Feature card — slightly elevated
      feature: 'bg-black-soft border border-white/8 hover:border-gold/20',
      // Outlined card
      outline: 'border border-gold/20 bg-transparent hover:border-gold/40',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant }), className)} {...props} />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-serif text-xl font-semibold leading-tight tracking-tight', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-white-off/60 font-sans', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

// ── Product Card — specialized for jewelry items ──────────────────────────────

interface ProductCardProps {
  name: string
  price: number
  imageUrl?: string
  category?: string
  badge?: string
  className?: string
  onClick?: () => void
}

const ProductCard = ({
  name,
  price,
  imageUrl,
  category,
  badge,
  className,
  onClick,
}: ProductCardProps) => {
  return (
    <Card variant="product" className={cn('overflow-hidden', className)} onClick={onClick}>
      {/* Image */}
      <div className="relative aspect-square bg-black-soft overflow-hidden">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-gold/40" />
            </div>
          </div>
        )}
        {badge && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-gold text-black text-xs font-sans font-semibold tracking-wider uppercase">
            {badge}
          </span>
        )}
      </div>
      {/* Info */}
      <div className="p-4 space-y-1">
        {category && (
          <p className="text-gold/70 text-xs font-sans tracking-widest uppercase">{category}</p>
        )}
        <h3 className="font-serif text-white-off text-lg leading-tight">{name}</h3>
        <p className="text-gold font-sans font-medium">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          }).format(price)}
        </p>
      </div>
    </Card>
  )
}
ProductCard.displayName = 'ProductCard'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, ProductCard }
