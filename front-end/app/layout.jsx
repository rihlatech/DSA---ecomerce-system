import { fraunces, geistMono, geistSans } from '@/lib/fonts'
import { Providers } from '@/components/providers'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { Cursor } from '@/components/motion/Cursor'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { SearchManager } from '@/components/search/SearchOverlay'
import './globals.css'

export const metadata = {
  title: {
    default: 'DSA Atelier — Editorial Commerce',
    template: '%s — DSA Atelier',
  },
  description:
    'An editorial commerce experience: curated goods presented with restraint, choreographed motion, and craft.',
  metadataBase: new URL('https://dsa-atelier.example'),
}

export const viewport = {
  themeColor: '#f3efe6',
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DSA Atelier',
  url: 'https://dsa-atelier.example',
  description: 'An editorial commerce experience: curated goods presented with restraint, choreographed motion, and craft.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-canvas"
          >
            Skip to content
          </a>
          <SmoothScroll>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScroll>
          <Cursor />
          <CartDrawer />
          <SearchManager />
        </Providers>
      </body>
    </html>
  )
}