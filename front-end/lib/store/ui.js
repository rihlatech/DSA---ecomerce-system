'use client'

import { create } from 'zustand'

export const useUiStore = create((set) => ({
  searchOpen: false,
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
}))