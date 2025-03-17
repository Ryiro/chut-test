"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart"
import { BuildProvider } from "@/lib/build"
import { ToastProvider } from "@/components/toast-provider"
import { ParallaxProvider } from 'react-scroll-parallax'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="computerhut-theme"
    >
      <ParallaxProvider>
        <CartProvider>
          <BuildProvider>
            <ToastProvider />
            {children}
          </BuildProvider>
        </CartProvider>
      </ParallaxProvider>
    </ThemeProvider>
  )
}