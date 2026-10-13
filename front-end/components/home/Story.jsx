'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const LINES = [
  {
    main: 'Own things that outlive the trends you chase.',
    mono: 'Principle 01 — Longevity',
  },
  {
    main: 'Materials chosen slowly, cut to be repaired.',
    mono: 'Principle 02 — Care',
  },
  {
    main: 'Buy less. Buy better. Keep longer.',
    mono: 'Principle 03 — Restraint',
  },
]

export function Story() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=260%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      })

      const lines = gsap.utils.toArray('[data-line]', section)
      const window = 1 / lines.length

      lines.forEach((line, i) => {
        const words = line.querySelectorAll('[data-word]')
        tl.fromTo(
          line,
          { autoAlpha: 0, yPercent: 18 },
          { autoAlpha: 1, yPercent: 0, duration: window * 0.55, ease: 'power2.out' },
          i * window,
        )
        tl.fromTo(
          words,
          { yPercent: 120, rotate: 0.001 },
          { yPercent: 0, duration: window * 0.5, stagger: 0.05, ease: 'power3.out' },
          i * window + window * 0.06,
        )
        tl.to(line, {
          autoAlpha: 0,
          yPercent: -10,
          duration: window * 0.5,
          ease: 'power2.in',
        }, i * window + window * 0.78)
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[320vh]" aria-label="Our principles">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="mx-auto w-full max-w-[var(--maxw)] px-6 md:px-10">
          <div className="relative min-h-[42vh]">
            {LINES.map((line) => (
              <div
                key={line.mono}
                data-line
                className="absolute inset-0 flex flex-col items-start justify-center gap-6 opacity-0"
              >
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-signal md:text-sm">
                  {line.mono}
                </p>
                <div className="overflow-hidden">
                  <p className="text-balance font-display text-[clamp(2.4rem,7vw,6.5rem)] font-medium leading-[1.02] tracking-tight">
                    {line.main.split(' ').map((word, i) => (
                      <span key={i} className="inline-block overflow-hidden align-top">
                        <span data-word className="inline-block will-change-transform">
                          {word}
                        </span>
                        {i < line.main.split(' ').length - 1 ? '\u00A0' : ''}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}