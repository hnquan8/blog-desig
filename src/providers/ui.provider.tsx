'use client'
import { Fragment, ReactNode, useEffect } from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { useWindowSize } from 'react-use'

import '../styles/index.css'

export enum Infix {
  xs = 0,
  sm = 576,
  md = 768,
  lg = 992,
  xl = 1200,
  xxl = 1600,
}

const getInfix = (width: number): Infix => {
  if (width >= Infix.xxl) return Infix.xxl
  if (width >= Infix.xl) return Infix.xl
  if (width >= Infix.lg) return Infix.lg
  if (width >= Infix.md) return Infix.md
  if (width >= Infix.sm) return Infix.sm
  return Infix.xs
}

const getTheme = (): Theme => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

/**
 * Store
 */

export type UiStore = {
  infix: Infix
  width: number
  setWidth: (width: number) => void
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useUiStore = create<UiStore>()(
  devtools(
    persist(
      (set) => ({
        infix: getInfix(window.innerWidth),
        width: window.innerWidth,
        setWidth: (width: number) =>
          set({ width, infix: getInfix(width) }, false, 'setWidth'),
        theme: getTheme(),
        setTheme: (theme: Theme) => set({ theme }, false, 'setTheme'),
      }),
      {
        name: 'theme',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
)

/**
 * Hook
 */

export const useWidth = () => {
  return useUiStore(({ width, infix, setWidth }) => ({
    width,
    infix,
    setWidth,
  }))
}

export const useTheme = () => {
  return useUiStore(({ theme, setTheme }) => ({ theme, setTheme }))
}

/**
 * Provider
 */

export default function UiProvider({ children }: { children: ReactNode }) {
  const { setWidth } = useWidth()
  const { theme } = useTheme()
  const { width } = useWindowSize()

  console.log('theme', theme)
  // Listen theme events
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])
  // Listen window events
  useEffect(() => {
    setWidth(width)
  }, [width, setWidth])

  return <Fragment>{children}</Fragment>
}
