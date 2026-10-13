'use client'

import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { getAllProducts } from '@/content/catalog'
import { formatPrice } from '@/lib/format'
import { useUiStore } from '@/lib/store/ui'

const PRODUCTS = getAllProducts()

export function SearchOverlay() {
  const close = useUiStore((s) => s.closeSearch)
  const router = useRouter()
  const overlayRef = useRef(null)
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const results = query.trim()
    ? PRODUCTS.filter((p) => {
        const haystack = `${p.name} ${p.category} ${p.tags.join(' ')}`.toLowerCase()
        return haystack.includes(query.trim().toLowerCase())
      })
    : PRODUCTS.slice(0, 6)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    gsap.set(overlayRef.current, { autoAlpha: 0 })
    gsap.to(overlayRef.current, { autoAlpha: 1, duration: reduce ? 0 : 0.3, ease: 'power2.out' })
    requestAnimationFrame(() => inputRef.current?.focus())
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && results[activeIndex]) {
        router.push(`/product/${results[activeIndex].slug}`)
        close()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [results, activeIndex, close, router])

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Search the shelf"
      className="fixed inset-0 z-[85] flex items-start justify-center bg-ink/40 px-4 pt-[12vh] backdrop-blur-sm"
    >
      <div
        className="absolute inset-0"
        onClick={close}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[var(--radius-md)] border border-line bg-canvas shadow-2xl">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault()
            if (results[0]) {
              router.push(`/product/${results[0].slug}`)
              close()
            }
          }}
          className="flex items-center gap-3 border-b border-line px-6 py-4"
        >
          <span aria-hidden="true" className="font-mono text-lg text-ink-faint">
            ⌕
          </span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIndex(0)
            }}
            placeholder="Search the shelf…"
            aria-label="Search the shelf"
            className="w-full bg-transparent font-mono text-base text-ink placeholder:text-ink-faint/70 focus:outline-none"
          />
          <button
            type="button"
            onClick={close}
            className="ml-auto shrink-0 rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-faint transition-colors hover:border-ink hover:text-ink"
          >
            Esc
          </button>
        </form>

        <div className="max-h-[50vh] overflow-y-auto">
          {results.length === 0 ? (
            <p className="px-6 py-12 text-center font-mono text-sm uppercase tracking-[0.2em] text-ink-faint">
              No match for “{query}”
            </p>
          ) : (
            <ul>
              {results.map((p, i) => (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.slug}`}
                    onClick={close}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`flex items-center gap-4 px-6 py-3 transition-colors ${
                      i === activeIndex ? 'bg-surface' : 'bg-transparent'
                    }`}
                  >
                    <span className="relative aspect-[4/5] w-10 shrink-0 overflow-hidden rounded-[var(--radius-xs)] bg-surface">
                      <Image src={p.image} alt="" fill sizes="40px" className="object-cover" />
                    </span>
                    <span className="flex flex-1 items-baseline justify-between gap-4">
                      <span>
                        <span className="block font-display text-base leading-tight">{p.name}</span>
                        <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                          {p.category}
                        </span>
                      </span>
                      <span className="whitespace-nowrap font-mono text-sm text-ink-soft">
                        {formatPrice(p.price)}
                      </span>
                    </span>
                    {i === activeIndex && (
                      <span aria-hidden="true" className="font-mono text-xs text-signal">
                        ↵
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export function SearchManager() {
  const isOpen = useUiStore((s) => s.searchOpen)
  const toggle = useUiStore((s) =>
    s.searchOpen ? s.closeSearch : s.openSearch,
  )

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])

  return isOpen ? <SearchOverlay /> : null
}