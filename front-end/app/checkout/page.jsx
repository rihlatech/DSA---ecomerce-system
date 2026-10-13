import { CheckoutForm } from '@/components/checkout/CheckoutForm'

export const metadata = {
  title: 'Checkout',
}

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-[var(--maxw)] px-6 pb-28 pt-24 md:px-10 md:pt-28">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-ink-faint">
        Secure checkout
      </p>
      <h1 className="mb-12 font-display text-[clamp(2.8rem,8vw,6rem)] font-medium leading-[0.95] tracking-tight">
        Complete your order
      </h1>
      <CheckoutForm />
    </div>
  )
}