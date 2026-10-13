'use client'

import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/format'
import Link from 'next/link'

const contactSchema = z.object({
  email: z.string().email('Enter a valid email address'),
})

const shippingSchema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  address: z.string().min(5, 'Enter your street address'),
  city: z.string().min(2, 'Enter your city'),
  postal: z.string().min(3, 'Enter your postal code'),
  country: z.string().min(2, 'Enter your country'),
})

const paymentSchema = z.object({
  card: z.string().regex(/^[\d\s]{13,19}$/, 'Enter a valid card number'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/, 'MM/YY'),
  cvc: z.string().regex(/^\d{3,4}$/, '3–4 digits'),
})

const STEPS = [
  { key: 'contact', label: 'Contact' },
  { key: 'shipping', label: 'Shipping' },
  { key: 'payment', label: 'Payment' },
  { key: 'review', label: 'Review' },
]

const INITIAL = {
  email: '',
  name: '',
  address: '',
  city: '',
  postal: '',
  country: '',
  card: '',
  expiry: '',
  cvc: '',
}

function Field({
  register,
  errors,
  label,
  name,
  type = 'text',
  autoComplete,
  placeholder,
  inputMode,
  className,
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="text-ink-faint mb-2 block font-mono text-[11px] tracking-[0.25em] uppercase"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder ?? label}
        aria-invalid={errors[name] ? 'true' : 'false'}
        {...register(name)}
        className={`bg-surface text-ink placeholder:text-ink-faint/70 focus-visible:border-ink w-full rounded-full border px-5 py-3.5 font-mono text-sm transition-colors ${
          errors[name] ? 'border-signal' : 'border-line'
        }`}
      />
      {errors[name] && (
        <p role="alert" className="text-signal mt-2 text-xs">
          {errors[name]}
        </p>
      )}
    </div>
  )
}

export function CheckoutForm() {
  const items = useCartStore((s) => s.items)
  const clear = useCartStore((s) => s.clear)
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)
  const [orderNo, setOrderNo] = useState(null)

  const { register, handleSubmit, getValues } = useForm({ defaultValues: INITIAL })

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shipping = subtotal >= 150 || items.length === 0 ? 0 : 12
  const total = subtotal + shipping

  const schema = useMemo(
    () => [contactSchema, shippingSchema, paymentSchema][step] ?? z.object({}),
    [step],
  )

  function goNext() {
    const result = schema.safeParse(getValues())
    if (!result.success) {
      const next = {}
      for (const issue of result.error.issues) next[issue.path[0]] = issue.message
      setErrors(next)
      return
    }
    setErrors({})
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  function placeOrder() {
    setPlacing(true)
    window.setTimeout(() => {
      const no = `DSA-${Math.floor(100000 + Math.random() * 900000)}`
      clear()
      setOrderNo(no)
      setPlacing(false)
    }, 1600)
  }

  if (orderNo) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <p className="text-signal font-mono text-xs tracking-[0.35em] uppercase">
          Order confirmed
        </p>
        <h1 className="font-display text-[clamp(2.6rem,8vw,6rem)] leading-[0.95] tracking-tight">
          Thank you
        </h1>
        <p className="text-ink-soft max-w-md leading-relaxed text-balance">
          Order <span className="text-ink font-mono">{orderNo}</span> is with the
          atelier. A confirmation is on its way to your inbox.
        </p>
      </div>
    )
  }

  if (items.length === 0 && !orderNo) {
    return (
      <div className="flex min-h-[40vh] flex-col items-start justify-center gap-6">
        <p className="text-ink-soft text-lg text-balance">
          Your cart is empty — add a piece before checkout.
        </p>
        <Link
          href="/shop"
          className="bg-ink text-canvas hover:bg-signal hover:text-signal-ink rounded-full px-6 py-3 font-mono text-xs tracking-[0.25em] uppercase transition-colors"
        >
          Browse the shelf
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <ol aria-label="Checkout progress" className="mb-10 flex flex-wrap gap-3">
          {STEPS.map((s, i) => {
            const isCurrent = i === step
            const isDone = i < step
            return (
              <li key={s.key} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => (isDone ? setStep(i) : undefined)}
                  className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.2em] uppercase transition-all duration-[var(--duration-fast)] ease-[var(--ease-snappy)] ${
                    isCurrent
                      ? 'border-ink bg-ink text-canvas'
                      : isDone
                        ? 'text-signal border-transparent'
                        : 'border-line text-ink-faint'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  <span aria-hidden="true" className="opacity-60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.label}
                  {isDone && <span aria-hidden="true">✓</span>}
                </button>
                {i < STEPS.length - 1 && (
                  <span aria-hidden="true" className="text-ink-faint">
                    /
                  </span>
                )}
              </li>
            )
          })}
        </ol>

        <form
          noValidate
          onSubmit={handleSubmit((e) => e && goNext())}
          className="flex flex-col gap-6"
        >
          {step === 0 && (
            <>
              <Field
                register={register}
                errors={errors}
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                className="max-w-md"
              />
              <p className="text-ink-faint max-w-md text-sm leading-relaxed">
                We only use this for order updates. No newsletters, no noise.
              </p>
            </>
          )}
          {step === 1 && (
            <>
              <Field
                register={register}
                errors={errors}
                label="Full name"
                name="name"
                autoComplete="name"
              />
              <Field
                register={register}
                errors={errors}
                label="Street address"
                name="address"
                autoComplete="street-address"
              />
              <div className="grid gap-6 md:grid-cols-3">
                <Field
                  register={register}
                  errors={errors}
                  label="City"
                  name="city"
                  autoComplete="address-level2"
                />
                <Field
                  register={register}
                  errors={errors}
                  label="Postal code"
                  name="postal"
                  autoComplete="postal-code"
                />
                <Field
                  register={register}
                  errors={errors}
                  label="Country"
                  name="country"
                  autoComplete="country-name"
                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <Field
                register={register}
                errors={errors}
                label="Card number"
                name="card"
                inputMode="numeric"
                autoComplete="cc-number"
                className="max-w-md"
              />
              <div className="grid max-w-md grid-cols-2 gap-6">
                <Field
                  register={register}
                  errors={errors}
                  label="Expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  autoComplete="cc-exp"
                />
                <Field
                  register={register}
                  errors={errors}
                  label="CVC"
                  name="cvc"
                  type="password"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                />
              </div>
              <p className="text-ink-faint max-w-md text-sm leading-relaxed">
                Simulated checkout — no real payment is processed or stored.
              </p>
            </>
          )}
          {step === 3 && (
            <div className="border-line max-w-md rounded-[var(--radius-md)] border p-6">
              <dl className="space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-faint">Contact</dt>
                  <dd>{getValues('email')}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-faint">Ship to</dt>
                  <dd>
                    {getValues('city')}, {getValues('country')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-faint">Pieces</dt>
                  <dd>{items.length}</dd>
                </div>
              </dl>
            </div>
          )}

          <div className="mt-4 flex items-center gap-4">
            {step > 0 && step < STEPS.length - 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="border-line text-ink hover:border-ink cursor-pointer rounded-full border px-6 py-4 font-mono text-xs tracking-[0.25em] uppercase transition-colors"
              >
                ← Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                type="submit"
                className="bg-ink text-canvas hover:bg-signal hover:text-signal-ink flex-1 cursor-pointer rounded-full px-6 py-4 font-mono text-xs tracking-[0.25em] uppercase transition-colors"
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={placeOrder}
                disabled={placing}
                className={`flex-1 cursor-pointer rounded-full px-6 py-4 font-mono text-xs tracking-[0.25em] uppercase transition-colors disabled:cursor-wait ${
                  placing
                    ? 'bg-line text-ink-faint'
                    : 'bg-ink text-canvas hover:bg-signal hover:text-signal-ink'
                }`}
              >
                {placing ? 'Placing order…' : `Place order · ${formatPrice(total)}`}
              </button>
            )}
          </div>
        </form>
      </div>

      <aside className="lg:col-span-5">
        <div className="border-line rounded-[var(--radius-md)] border p-6 lg:sticky lg:top-28">
          <h2 className="text-ink-faint mb-4 font-mono text-xs tracking-[0.3em] uppercase">
            Order summary
          </h2>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={`${item.id}-${item.variant}`}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-display text-base leading-tight">{item.name}</p>
                  <p className="text-ink-faint font-mono text-[11px] tracking-[0.2em] uppercase">
                    {item.variant} × {item.quantity}
                  </p>
                </div>
                <p className="font-mono text-sm">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
          <dl className="border-line mt-6 space-y-2 border-t pt-4 font-mono text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-faint">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-faint">Shipping</dt>
              <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
            </div>
          </dl>
          <div className="border-line mt-4 flex items-baseline justify-between border-t pt-4">
            <p className="text-ink-faint font-mono text-xs tracking-[0.3em] uppercase">
              Total
            </p>
            <p className="font-display text-2xl">{formatPrice(total)}</p>
          </div>
        </div>
      </aside>
    </div>
  )
}
