'use client'

import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce || window.innerWidth < 1024) return

    document.documentElement.classList.add('has-cursor')
    return () => document.documentElement.classList.remove('has-cursor')
  }, [])

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 })
    gsap.set(ring, { scale: 1 })

    const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' })
    const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' })
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    const onMove = (e) => {
      dx(e.clientX)
      dy(e.clientY)
      rx(e.clientX)
      ry(e.clientY)
    }

    const isInteractive = (target) =>
      target.closest('a, button, [role="button"], input, select, textarea, [data-magnetic]')

    const onOver = (e) => {
      gsap.to(ring, {
        scale: isInteractive(e.target) ? 2.4 : 1,
        duration: 0.3,
        ease: 'power3.out',
      })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] size-1.5 rounded-full bg-signal opacity-0 data-[on]:opacity-100"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[89] size-9 rounded-full border border-ink/25 opacity-0 data-[on]:opacity-100"
      />
    </>
  )
}