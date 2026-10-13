'use client'

import Image from 'next/image'
import { useState } from 'react'

export function ProductGallery({ product }) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {product.images.length > 1 && (
        <div
          role="group"
          aria-label="Product images"
          className="flex gap-3 md:flex-col"
        >
          {product.images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                setActive(i)
                setZoomed(false)
              }}
              aria-label={`View image ${i + 1} of ${product.images.length}`}
              aria-pressed={active === i}
              className={`relative aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-[var(--radius-xs)] border transition-all duration-[var(--duration-fast)] ease-[var(--ease-snappy)] ${
                active === i
                  ? 'border-ink opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <div
        className="group relative flex-1 overflow-hidden rounded-[var(--radius-xs)] bg-surface"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <Image
          src={product.images[active]}
          alt={product.alt}
          fill
          priority
          sizes="(min-width: 768px) 60vw, 100vw"
          className={`object-cover transition-transform duration-[var(--duration-slower)] ease-[var(--ease-out-expo)] ${
            zoomed ? 'scale-[1.12]' : 'scale-100'
          }`}
        />
        <p className="absolute bottom-4 right-4 bg-canvas/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink">
          View {String(active + 1).padStart(2, '0')} /{' '}
          {String(product.images.length).padStart(2, '0')}
        </p>
      </div>
    </div>
  )
}