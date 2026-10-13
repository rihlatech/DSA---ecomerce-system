'use client'

import { useMemo, useState } from 'react'

export const SORTERS = [
  { slug: 'featured', label: 'Featured' },
  { slug: 'price-asc', label: 'Price — low to high' },
  { slug: 'price-desc', label: 'Price — high to low' },
  { slug: 'name', label: 'Name A–Z' },
]

export function useShopList({ products }) {
  const [collection, setCollection] = useState('all')
  const [sort, setSort] = useState('featured')

  const filtered = useMemo(() => {
    let list =
      collection === 'all'
        ? [...products]
        : products.filter((p) => p.collection === collection)
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [products, collection, sort])

  return { collection, setCollection, sort, setSort, filtered }
}