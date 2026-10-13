'use client'

import { useId, useState } from 'react'

export function AccordionItem({ label, body, defaultOpen = false }) {
  const id = useId()
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-line">
      <h3 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-mono text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:text-signal"
        >
          {label}
          <span
            aria-hidden="true"
            className={`transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-expo)] ${
              open ? 'rotate-45' : ''
            }`}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 420ms var(--ease-out-expo)',
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 leading-relaxed text-ink-soft">{body}</p>
        </div>
      </div>
    </div>
  )
}