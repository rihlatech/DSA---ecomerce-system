# DSA e-commerce system

A full-stack e-commerce system. Currently implements an **award-oriented frontend**
— an editorial "digital flagship" storefront — built on the 2026 award-winning
principles of art direction, directed motion, and performance.

## Stack

- **Next.js 16 (App Router)** + React 19
- **Tailwind CSS v4** with theme tokens (`app/globals.css`)
- **GSAP** (`ScrollTrigger`, `SplitText` via its own split) + **Lenis** smooth scroll
- **Zustand** (cart, persisted) · **TanStack Query** · **react-hook-form + zod**
- Type catches, semantic markup, JSON-LD, sitemap, reduced-motion support throughout

## Getting started

```bash
cd front-end
npm install
npm run dev
```

Scripts: `dev`, `build`, `start`, `lint`, `format`.

## Structure

```
front-end/
├── app/                 # routes: /, /shop, /product/[slug], /cart, /checkout, 404
├── components/
│   ├── motion/          # SmoothScroll, Reveal, SplitHeading, Marquee, Magnetic, Cursor
│   ├── layout/          # Header, Footer
│   ├── product/         # Card, Gallery, BuyPanel, Skeletons
│   ├── shop/            # ShopGrid (filter/sort)
│   ├── cart/            # CartDrawer
│   ├── checkout/        # multi-step CheckoutForm
│   └── search/          # command-palette SearchOverlay (⌘K)
├── content/catalog.js   # mock product data (swap for a real API later)
├── lib/                 # fonts, format, stores, hooks
└── scripts/gen-assets.mjs  # regenerates the editorial SVG product imagery
```

> `/checkout` is a simulated flow — no real payment is processed. Product data is
> mocked in `content/catalog.js`; swap in a real API by replacing those loaders.

## Motion & accessibility

Every motion primitive respects `prefers-reduced-motion`, custom cursor and
magnetic effects are desktop/pointer-and-fine-only, and all interactive elements
have keyboard + `:focus-visible` support.