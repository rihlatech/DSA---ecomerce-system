'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const SPLIT = /(?!^\s*$)\S+\s*/g

function splitToChars(text) {
  return text.split('').map((char, i) => ({
    char,
    key: `${char}-${i}`,
  }))
}

export function SplitWords({ children }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      gsap.set(el, { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll('[data-char]')
      gsap.fromTo(
        chars,
        { yPercent: 110, rotate: 0.001 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.035,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <span ref={ref} className="block overflow-hidden" aria-hidden="true">
      {splitToChars(children).map(({ char, key }) => (
        <span key={key} className="inline-block will-change-transform" data-char>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export function SplitHeading({ as: Tag = 'h2', text, className, srText }) {
  const visibleRef = useRef(null)

  return (
    <Tag className={className}>
      <span className="sr-only">{srText ?? text}</span>
      <SplitWords>{text}</SplitWords>
      <span ref={visibleRef} className="sr-only" data-visible>
        {text}
      </span>
    </Tag>
  )
}