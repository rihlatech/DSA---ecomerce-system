export function ProductCardSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/5] rounded-[var(--radius-xs)] bg-line/50" />
          <div className="mt-4 h-4 w-2/3 rounded bg-line/60" />
          <div className="mt-2 h-3 w-1/3 rounded bg-line/50" />
        </div>
      ))}
    </div>
  )
}