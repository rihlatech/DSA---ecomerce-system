'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function useReveal(options = {}) {
  const ref = useRef(null)
  const optionsRef = useRef(options)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const opts = optionsRef.current

    if (reduce) {
      if (opts?.onReveal) opts.onReveal(el)
      return
    }

    const isStatic = opts.from?.opacity === undefined && !opts.from?.y

    if (isStatic) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 32, ...opts.from },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: opts.delay ?? 0,
          scrollTrigger: {
            trigger: el,
            start: opts.start ?? 'top 85%',
            once: true,
          },
          onComplete: () => opts?.onReveal?.(el),
        },
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}

export function Reveal(props) {
  const { as: Tag = 'div', children, className, ...rest } = props
  const ref = useReveal(rest)
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}