import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/format'

export function ProductCard({ product, priority = false }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xs)] bg-surface">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        {product.compareAt && (
          <span className="absolute left-4 top-4 rounded-full bg-signal px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-signal-ink">
            Sale
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-display text-lg leading-tight tracking-tight transition-colors group-hover:text-signal">
            {product.name}
          </h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            {product.category}
          </p>
        </div>
        <p className="whitespace-nowrap font-mono text-sm text-ink-soft">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  )
}