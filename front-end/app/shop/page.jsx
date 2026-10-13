import { Suspense } from 'react'
import { getAllProducts } from '@/content/catalog'
import { ShopGrid } from '@/components/shop/ShopGrid'
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton'

export const metadata = {
  title: 'Shop',
}

export default function ShopPage() {
  const products = getAllProducts()

  return (
    <div className="pt-24 md:pt-28">
      <div className="mx-auto mb-14 max-w-[var(--maxw)] px-6 md:px-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-ink-faint">
          The full shelf
        </p>
        <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.95] tracking-tight">
          All pieces
        </h1>
      </div>

      <Suspense fallback={<ProductCardSkeleton count={8} />}>
        <ShopGrid products={products} />
      </Suspense>
    </div>
  )
}