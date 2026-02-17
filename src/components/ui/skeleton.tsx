import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-sm bg-black-soft/80', className)} {...props} />
}

// ── Product Card Skeleton ─────────────────────────────────────────────────────

function ProductCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden border border-white/5 bg-black-deep">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  )
}

export { Skeleton, ProductCardSkeleton }
