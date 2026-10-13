import { getAllProducts } from '@/content/catalog'

export default function sitemap() {
  const base = 'https://dsa-atelier.example'
  const staticPages = ['', '/shop', '/cart', '/checkout'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }))
  const products = getAllProducts().map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }))
  return [...staticPages, ...products]
}