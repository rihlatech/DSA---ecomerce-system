import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-start justify-center gap-8 px-6 pt-24 md:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-signal">
        Error — 404
      </p>
      <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-medium leading-[0.92] tracking-tight">
        This shelf
        <br />
        is empty
      </h1>
      <p className="max-w-md text-balance leading-relaxed text-ink-soft">
        The page you&apos;re looking for was moved, sold, or never existed.
      </p>
      <Link
        href="/shop"
        className="rounded-full bg-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.25em] text-canvas transition-colors hover:bg-signal hover:text-signal-ink"
      >
        Back to the shop →
      </Link>
    </div>
  )
}