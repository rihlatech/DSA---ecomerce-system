import { Suspense } from 'react'
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton'
import StoryLazy from '@/components/home/StoryLazy'
import { FeaturedRack } from '@/components/home/FeaturedRack'
import { CollectionsTrio } from '@/components/home/CollectionsTrio'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { Reveal } from '@/components/motion/Reveal'
import { Magnetic } from '@/components/motion/Magnetic'
import { Marquee, MarqueeItem } from '@/components/motion/Marquee'
import Link from 'next/link'

export const metadata = {
  title: 'Editorial Commerce',
}

export default function HomePage() {
  return (
    <div className="min-h-svh">
      <div className="relative flex min-h-svh flex-col">
        <section className="flex grow flex-col justify-center px-6 pt-32 pb-16 md:px-10">
          <Reveal
            as="p"
            from={{ opacity: 0, y: 16 }}
            className="mb-8 font-mono text-xs uppercase tracking-[0.35em] text-ink-faint md:mb-12 md:text-sm"
          >
            Atelier Nº 01 — Objects, Apparel &amp; Light
          </Reveal>

          <SplitHeading
            as="h1"
            text="Considered essentials"
            srText="Considered essentials"
            className="max-w-[16ch] font-display text-[clamp(3.2rem,13vw,11rem)] font-medium leading-[0.92] tracking-tight"
          />

          <Reveal
            from={{ opacity: 0, y: 24 }}
            delay={0.25}
            className="mt-10 flex flex-col items-start gap-8 md:mt-16 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-sm text-balance text-base leading-relaxed text-ink-soft md:text-lg">
              A rotating shelf of durable, well-made things — chosen slowly, kept
              for a long time.
            </p>
            <Magnetic>
              <Link
                href="/shop"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.25em] text-canvas"
              >
                <span className="absolute inset-0 -translate-x-full bg-signal transition-transform duration-[var(--duration-slow)] ease-[var(--ease-in-out-quart)] group-hover:translate-x-0" />
                <span className="relative z-10">Enter the shelf</span>
                <span
                  aria-hidden="true"
                  className="relative z-10 inline-block transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Magnetic>
          </Reveal>
        </section>

        <Marquee className="border-y border-line py-4 font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">
          {['Free shipping over $150', 'Considered materials', 'Carbon-neutral delivery', 'Made to last', '60-day returns'].map(
            (item) => (
              <MarqueeItem key={item}>{item}</MarqueeItem>
            ),
          )}
        </Marquee>
      </div>

      <section className="px-6 py-28 md:px-10">
        <Suspense fallback={<ProductCardSkeleton count={4} />}>
          <FeaturedRack />
        </Suspense>
      </section>

      <div className="pt-6">
        <CollectionsTrio />
      </div>

      <div className="mt-32 md:mt-44">
        <StoryLazy />
      </div>
    </div>
  )
}