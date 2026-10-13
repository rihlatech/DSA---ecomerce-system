import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getAllProducts,
  getProductBySlug,
  getProductsByCollection,
} from '@/content/catalog'
import { ProductGallery } from '@/components/product/ProductGallery'
import { BuyPanel } from '@/components/product/BuyPanel'
import { ProductCard } from '@/components/product/ProductCard'
import { Reveal } from '@/components/motion/Reveal'

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Not found' }
  return {
    title: product.name,
    description: product.blurb,
    openGraph: {
      title: `${product.name} — DSA Atelier`,
      description: product.blurb,
      images: [product.image],
    },
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getProductsByCollection(product.collection)
    .filter((p) => p.id !== product.id)
    .slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.blurb,
    image: product.images,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[var(--maxw)] px-6 pb-28 pt-24 md:px-10 md:pt-28">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            <li>
              <Link href="/shop" className="transition-colors hover:text-ink">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/shop`}
                className="transition-colors hover:text-ink"
              >
                {product.category}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ProductGallery product={product} />
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <BuyPanel product={product} />
            </div>
          </div>
        </div>

        <section aria-labelledby="related-heading" className="mt-28">
          <header className="mb-10 border-b border-line pb-4">
            <h2
              id="related-heading"
              className="font-display text-3xl md:text-4xl"
            >
              From the same shelf
            </h2>
          </header>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal
                key={p.id}
                from={{ opacity: 0, y: 40 }}
                delay={i * 0.08}
              >
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}