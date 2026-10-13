'use client'

import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'

export function TemplateTransition({ children }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },
    )
  }, [])

  return <div ref={ref} className="will-change-transform">{children}</div>
}