import Image from 'next/image'
import Link from 'next/link'
import { getAllCollections } from '@/content/catalog'
import { Reveal } from '@/components/motion/Reveal'

const IMAGE_MAP = {
  objects: '/products/01.svg',
  apparel: '/products/02.svg',
  lighting: '/products/03.svg',
}

export function CollectionsTrio() {
  const collections = getAllCollections()

  return (
    <section aria-labelledby="collections-heading" className="mx-auto max-w-[var(--maxw)] px-6 md:px-10">
      <Reveal as="header" from={{ opacity: 0, y: 24 }} className="mb-12 border-b border-line pb-4">
        <h2 id="collections-heading" className="font-display text-3xl md:text-5xl">
          Shop by shelf
        </h2>
      </Reveal>

      <ul className="grid gap-6 md:grid-cols-3">
        {collections.map((collection, i) => (
          <Reveal
            as="li"
            key={collection.slug}
            from={{ opacity: 0, y: 48 }}
            delay={i * 0.1}
          >
            <Link
              href={`/shop?collection=${collection.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xs)] bg-surface">
                <Image
                  src={IMAGE_MAP[collection.slug]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[var(--duration-slower)] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-[var(--duration-slow)] ease-[var(--ease-out-expo)] group-hover:bg-ink/10" />
                <p className="absolute bottom-4 left-4 bg-canvas/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink">
                  Shelf {String(i + 1).padStart(2, '0')}
                </p>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl tracking-tight transition-colors group-hover:text-signal">
                  {collection.name}
                </h3>
                <span aria-hidden="true" className="font-mono text-sm text-ink-faint transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-expo)] group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
                {collection.blurb}
              </p>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}