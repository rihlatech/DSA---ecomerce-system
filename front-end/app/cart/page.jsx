'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/format'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const setQuantity = useCartStore((s) => s.setQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const clear = useCartStore((s) => s.clear)

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((n, i) => n + i.quantity, 0)

  return (
    <div className="mx-auto max-w-[var(--maxw)] px-6 pb-28 pt-24 md:px-10 md:pt-28">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-ink-faint">Your selection</p>
      <h1 className="mb-12 font-display text-[clamp(2.8rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-tight">
        Cart {count > 0 && <span className="font-mono text-lg tracking-normal text-ink-faint">({count})</span>}
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-start gap-6 py-16">
          <p className="text-balance text-lg text-ink-soft">
            Nothing here yet. The shelf is waiting.
          </p>
          <Link
            href="/shop"
            className="rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-canvas transition-colors hover:bg-signal hover:text-signal-ink"
          >
            Browse the shelf
          </Link>
        </div>
      ) : (
        <div className="grid gap-12 lg:grid-cols-12">
          <ul className="lg:col-span-8">
            {items.map((item) => (
              <li key={`${item.id}-${item.variant}`} className="flex gap-5 border-b border-line py-6 first:pt-0">
                <Link
                  href={`/product/${item.slug}`}
                  className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-[var(--radius-xs)] bg-surface"
                >
                  <Image src={item.image} alt="" fill sizes="112px" className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-xl leading-tight">{item.name}</h2>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                        {item.variant}
                      </p>
                    </div>
                    <p className="font-mono text-base">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-1 rounded-full border border-line px-1">
                      <button
                        type="button"
                        onClick={() => setQuantity(item.id, item.variant, item.quantity - 1)}
                        className="flex size-8 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-mono text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.id, item.variant, item.quantity + 1)}
                        className="flex size-8 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id, item.variant)}
                      className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint transition-colors hover:text-signal"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="lg:col-span-4">
            <div className="rounded-[var(--radius-md)] border border-line p-6">
              <dl className="space-y-3 border-b border-line pb-5 font-mono text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-faint">Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-faint">Shipping</dt>
                  <dd>Calculated next</dd>
                </div>
              </dl>
              <div className="flex items-baseline justify-between py-5">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-faint">Total</p>
                <p className="font-display text-3xl">{formatPrice(subtotal)}</p>
              </div>
              <Link
                href="/checkout"
                className="flex w-full items-center justify-center gap-3 rounded-full bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.25em] text-canvas transition-colors hover:bg-signal hover:text-signal-ink"
              >
                Continue → Checkout
              </Link>
              <button
                type="button"
                onClick={clear}
                className="mt-4 w-full cursor-pointer py-2 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint transition-colors hover:text-signal"
              >
                Clear cart
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}