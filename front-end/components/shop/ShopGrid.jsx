'use client'

import { useRef } from 'react'
import { ProductCard } from '@/components/product/ProductCard'
import { Reveal } from '@/components/motion/Reveal'
import { SORTERS, useShopList } from '@/lib/useShopList'
import { getAllCollections } from '@/content/catalog'

const COLLECTION_OPTIONS = [
  { slug: 'all', label: 'All' },
  ...getAllCollections().map((c) => ({ slug: c.slug, label: c.name })),
]

export function ShopGrid({ products }) {
  const { collection, setCollection, sort, setSort, filtered } = useShopList({
    products,
  })
  const countRef = useRef(null)

  const selects = (value, setter) => {
    if (countRef.current) {
      countRef.current.animate(
        [{ opacity: 0.2 }, { opacity: 1 }],
        { duration: 300, easing: 'ease-out' },
      )
    }
    setter(value)
  }

  return (
    <div className="mx-auto max-w-[var(--maxw)] px-6 md:px-10">
      <div
        role="group"
        aria-label="Filter by shelf"
        className="mb-12 flex flex-wrap items-center gap-2"
      >
        {COLLECTION_OPTIONS.map((option) => (
          <button
            key={option.slug}
            type="button"
            aria-pressed={collection === option.slug}
            onClick={() => {
              selects(option.slug, setCollection)
              if (countRef.current) countRef.current.focus?.()
            }}
            className={`cursor-pointer rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-[var(--duration-fast)] ease-[var(--ease-snappy)] ${
              collection === option.slug
                ? 'border-ink bg-ink text-canvas'
                : 'border-line text-ink-soft hover:border-ink hover:text-ink'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <div ref={countRef} tabIndex={-1} className="font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
          <span aria-live="polite">{filtered.length} pieces</span>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
            Sort
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sort}
              onChange={(e) => selects(e.target.value, setSort)}
              className="cursor-pointer appearance-none rounded-full border border-line bg-surface py-2 pl-4 pr-9 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink focus-visible:border-ink"
            >
              {SORTERS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.label}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-ink-faint"
            >
              ▾
            </span>
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className={`col-span-6 md:col-span-4 lg:col-span-3 ${
                i % 5 === 0 ? 'lg:mt-16' : i % 5 === 2 ? 'lg:mt-8' : ''
              }`}
            >
              <Reveal
                className="[will-change:transform]"
                from={{ opacity: 0, y: 48 }}
                delay={(i % 4) * 0.06}
              >
                <ProductCard product={product} priority={i < 2} />
              </Reveal>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-24 text-center font-mono text-sm uppercase tracking-[0.25em] text-ink-faint">
          No pieces on this shelf yet.
        </p>
      )}
    </div>
  )
}