'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart'
import { useUiStore } from '@/lib/store/ui'

const NAV = [
  { href: '/shop', label: 'Shop' },
  { href: '/collections', label: 'Collections' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const count = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0))
  const open = useCartStore((s) => s.open)
  const openSearch = useUiStore((s) => s.openSearch)

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav
        aria-label="Primary"
        className="flex items-center justify-between border-b border-line/70 bg-canvas/80 px-6 py-4 backdrop-blur-md md:px-10"
      >
        <Link href="/" className="font-mono text-xs uppercase tracking-[0.3em]">
          DSA — Atelier
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group relative font-mono text-xs uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink"
              >
                <span className="block">{item.label}</span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-signal transition-all duration-[var(--duration-base)] ease-[var(--ease-out-expo)] group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={openSearch}
            className="hidden font-mono text-xs uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink md:block"
            aria-haspopup="dialog"
          >
            <span aria-hidden="true">⌕</span> Search
          </button>
          <button
            type="button"
            onClick={open}
            className="relative font-mono text-xs uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink"
            aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
          >
            Cart
            {count > 0 && (
              <span
                aria-hidden="true"
                className="absolute -right-4 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center rounded-full bg-signal text-[10px] text-signal-ink transition-all duration-[var(--duration-base)] ease-[var(--ease-out-expo)]"
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}