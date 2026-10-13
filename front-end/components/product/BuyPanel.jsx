'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/format'
import { AccordionItem } from '@/components/ui/Accordion'

const DETAILS = [
  {
    key: 'details',
    label: 'Details',
    body: 'Designed in-house and produced in small runs. Each piece is inspected by hand before it ships.',
  },
  {
    key: 'materials',
    label: 'Materials & care',
    body: 'Honest, durable materials selected for how they age. Care instructions travel with every order.',
  },
  {
    key: 'shipping',
    label: 'Shipping & returns',
    body: 'Free carbon-neutral shipping over $150. 60-day returns, no questions asked.',
  },
]

export function BuyPanel({ product }) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.open)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: 'Standard',
      quantity,
    })
    setAdded(true)
    window.setTimeout(() => {
      openCart()
    }, 320)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
          {product.name}
        </h1>
        <div className="mt-4 flex items-center gap-4">
          <p className="font-mono text-lg text-ink">
            {formatPrice(product.price)}
          </p>
          {product.compareAt && (
            <p className="font-mono text-sm text-ink-faint line-through">
              {formatPrice(product.compareAt)}
            </p>
          )}
        </div>
      </div>

      <p className="max-w-prose text-balance leading-relaxed text-ink-soft">
        {product.blurb}
      </p>

      <div className="flex flex-wrap items-stretch gap-3">
        <div className="flex items-center gap-1 rounded-full border border-line px-2">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full font-mono text-lg text-ink-soft transition-colors hover:bg-surface hover:text-ink"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span aria-live="polite" className="w-8 text-center font-mono text-sm">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full font-mono text-lg text-ink-soft transition-colors hover:bg-surface hover:text-ink"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          aria-live="polite"
          className={`relative min-w-[220px] flex-1 cursor-pointer overflow-hidden rounded-full px-7 py-4 font-mono text-xs uppercase tracking-[0.25em] transition-all duration-[var(--duration-base)] ease-[var(--ease-out-expo)] active:scale-[0.98] ${
            added
              ? 'bg-signal text-signal-ink'
              : 'bg-ink text-canvas hover:bg-signal hover:text-signal-ink'
          }`}
        >
          {added ? 'Added to cart ✓' : 'Add to cart'}
        </button>
      </div>

      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
        In stock — ships within 48h
      </p>

      <div className="border-t border-line">
        {DETAILS.map((d) => (
          <AccordionItem key={d.key} label={d.label} body={d.body} />
        ))}
      </div>
    </div>
  )
}