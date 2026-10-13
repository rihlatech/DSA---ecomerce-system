export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[var(--maxw)] flex-col gap-10 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10">
        <p className="max-w-md text-balance text-sm leading-relaxed text-ink-soft">
          An editorial commerce experience. Designed with restraint, choreographed
          motion, and performance at heart.
        </p>
        <dl className="flex flex-col gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
          <div className="flex gap-4">
            <dt>Hours</dt>
            <dd>24 / 7</dd>
          </div>
          <div className="flex gap-4">
            <dt>Support</dt>
            <dd>hello@dsa.atelier</dd>
          </div>
        </dl>
      </div>
    </footer>
  )
}