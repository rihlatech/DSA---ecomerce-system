export function Marquee({ children, className = '', reverse = false }) {
  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      aria-hidden="true"
    >
      <div className={`marquee-track inline-flex ${reverse ? '[animation-direction:reverse]' : ''}`}>
        {[0, 1].map((i) => (
          <div key={i} className="inline-flex items-center">
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}

export function MarqueeItem({ children, separator = '✦' }) {
  return (
    <span className="inline-flex items-center">
      <span className="px-8">{children}</span>
      <span className="text-signal" aria-hidden="true">
        {separator}
      </span>
    </span>
  )
}