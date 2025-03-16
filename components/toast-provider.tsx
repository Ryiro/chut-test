"use client"

import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster 
      position="top-center"
      theme="dark"
      richColors
      duration={2000}
    />
  )
}