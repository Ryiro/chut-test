"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useTheme } from 'next-themes'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-primary h-8 w-8"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M4 9h16" />
              <path d="M6 14h.01" />
              <path d="M6 17h.01" />
              <path d="M14 14h.01" />
              <path d="M14 17h.01" />
              <path d="M10 14h.01" />
              <path d="M10 17h.01" />
              <path d="M4 4v16" />
            </svg>
            <span className="ml-2 text-xl font-bold">ComputerHut</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors">Home</Link>
          <Link href="/products" className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors">Products</Link>
          <Link href="/about" className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors">About</Link>
          <Link href="/support" className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors">Support</Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button asChild variant="default" className="hidden md:inline-flex">
            <Link href="/custom-build">
              Build Your PC
            </Link>
          </Button>
          
          <Button variant="outline" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden p-4 border-t border-border/40 w-full`}>
        <div className="flex flex-col space-y-3">
          <Link href="/" className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors">Home</Link>
          <Link href="/products" className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors">Products</Link>
          <Link href="/about" className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors">About</Link>
          <Link href="/support" className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors">Support</Link>
          <Button asChild variant="default" className="w-full">
            <Link href="/custom-build">
              Build Your PC
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}