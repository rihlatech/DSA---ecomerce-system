'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id && i.variant === item.variant,
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.variant === item.variant
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity: item.quantity }] }
        }),
      removeItem: (id, variant) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.variant === variant),
          ),
        })),
      setQuantity: (id, variant, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id && i.variant === variant
                ? { ...i, quantity: Math.max(0, quantity) }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    { name: 'dsa-cart' },
  ),
)