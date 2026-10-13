'use client'

import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/format'

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen)
  const close = useCartStore((s) => s.close)
  const items = useCartStore((s) => s.items)
  const setQuantity = useCartStore((s) => s.setQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const panelRef = useRef(null)
  const overlayRef = useRef(null)

  useLayoutEffect(() => {
    const panel = panelRef.current
    const overlay = overlayRef.current
    if (!panel || !overlay) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.set(panel, { xPercent: 100 })
    gsap.set(overlay, { autoAlpha: 0 })
    if (reduce) gsap.set(panel, { xPercent: 0 })

    return () => {}
  }, [])

  useLayoutEffect(() => {
    const panel = panelRef.current
    const overlay = overlayRef.current
    if (!panel || !overlay) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isOpen) {
      gsap.to(overlay, { autoAlpha: 1, duration: reduce ? 0 : 0.4, ease: 'power2.out' })
      gsap.to(panel, {
        xPercent: 0,
        duration: reduce ? 0 : 0.6,
        ease: 'power4.inOut',
      })
      document.body.style.overflow = 'hidden'
    } else {
      gsap.to(overlay, { autoAlpha: 0, duration: reduce ? 0 : 0.35 })
      gsap.to(panel, { xPercent: 100, duration: reduce ? 0 : 0.5, ease: 'power3.in' })
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((n, i) => n + i.quantity, 0)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
      aria-hidden={!isOpen}
      className="fixed inset-0 z-[80]"
    >
      <div
        ref={overlayRef}
        onClick={close}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
      />
      <aside
        ref={panelRef}
        className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-canvas will-change-transform ${
          isOpen ? '' : 'invisible'
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-2xl">
            Cart{' '}
            <span className="font-mono text-sm text-ink-faint">
              {count > 0 ? `(${count})` : ''}
            </span>
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-line font-mono text-sm transition-colors hover:border-ink"
          >
            →
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex grow flex-col items-center justify-center gap-6 px-10 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-faint">
              Your cart is empty
            </p>
            <Link
              href="/shop"
              onClick={close}
              className="rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-canvas transition-colors hover:bg-signal hover:text-signal-ink"
            >
              Browse the shelf
            </Link>
          </div>
        ) : (
          <>
            <ul className="grow overflow-y-auto px-6 py-6">
              {items.map((item) => (
                <li key={`${item.id}-${item.variant}`} className="flex gap-4 border-b border-line py-5 first:pt-0 last:border-0">
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={close}
                    className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-[var(--radius-xs)] bg-surface"
                  >
                    <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-base leading-tight">
                          {item.name}
                        </h3>
                        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                          {item.variant}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.variant)}
                        aria-label={`Remove ${item.name}`}
                        className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint transition-colors hover:text-signal"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-1 rounded-full border border-line px-1">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.variant, item.quantity - 1)}
                          className="flex size-7 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-5 text-center font-mono text-xs">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.variant, item.quantity + 1)}
                          className="flex size-7 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-mono text-sm">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-line px-6 py-6">
              <div className="mb-5 flex items-baseline justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-faint">
                  Subtotal
                </p>
                <p className="font-display text-2xl">{formatPrice(subtotal)}</p>
              </div>
              <p className="mb-5 text-xs leading-relaxed text-ink-faint">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={close}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.25em] text-canvas transition-colors hover:bg-signal hover:text-signal-ink"
              >
                Checkout →
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}