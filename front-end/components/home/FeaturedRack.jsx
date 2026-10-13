import { getFeaturedProducts } from '@/content/catalog'
import { ProductCard } from '@/components/product/ProductCard'
import { Reveal } from '@/components/motion/Reveal'
import Link from 'next/link'

export function FeaturedRack() {
  const products = getFeaturedProducts(4)

  return (
    <section aria-labelledby="featured-heading" className="mx-auto max-w-[var(--maxw)]">
      <header className="mb-10 flex items-end justify-between border-b border-line pb-4">
        <h2 id="featured-heading" className="font-display text-3xl md:text-5xl">
          Featured shelf
        </h2>
        <Link
          href="/shop"
          className="group font-mono text-xs uppercase tracking-[0.25em] text-ink-soft transition-colors hover:text-ink"
        >
          View all
          <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-expo)] group-hover:translate-x-1">
            →
          </span>
        </Link>
      </header>
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {products.map((product, i) => (
          <Reveal
            key={product.id}
            className="[will-change:transform]"
            from={{ opacity: 0, y: 44 }}
            delay={i * 0.08}
          >
            <ProductCard product={product} priority={i < 2} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}