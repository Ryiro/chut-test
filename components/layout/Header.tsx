"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { useCart } from '@/lib/cart'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { itemCount } = useCart()
  
  return (
    <header className="bg-[#1a365d] dark:bg-[#1e3a5f] sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-[#1a365d]/80 dark:supports-[backdrop-filter]:bg-[#1e3a5f]/80">
      {/* First section with logo, search, and utility buttons */}
      <div className="bg-[#1a365d] dark:bg-[#1e3a5f] border-b border-border/40">
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
                className="text-white h-8 w-8"
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
              <span className="ml-2 text-xl font-bold text-white">ComputerHut</span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
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
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>

          {/* Utility buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-white hover:bg-white/10"
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
                className="h-7 w-7 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
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
                className="absolute h-7 w-7 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
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
                className="h-7 w-7"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              </svg>
              <span className="sr-only">Account</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 relative"
              asChild
            >
              <Link href="/checkout">
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
                  className="h-7 w-7"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
      </div>

      {/* Second section with navigation */}
      <div className="bg-[#15294a] dark:bg-[#182f51]">
        <div className="container mx-auto px-4 md:px-6">
          <NavigationMenu className="hidden md:flex h-12">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium leading-none mb-1">PC Components</h4>
                        <div className="grid gap-2">
                          <Link href="/products?category=CPU" className="text-sm text-muted-foreground hover:text-foreground">
                            Processors (CPU)
                          </Link>
                          <Link href="/products?category=MOTHERBOARD" className="text-sm text-muted-foreground hover:text-foreground">
                            Motherboards
                          </Link>
                          <Link href="/products?category=RAM" className="text-sm text-muted-foreground hover:text-foreground">
                            Memory (RAM)
                          </Link>
                          <Link href="/products?category=GPU" className="text-sm text-muted-foreground hover:text-foreground">
                            Graphics Cards (GPU)
                          </Link>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium leading-none mb-1">Essential Parts</h4>
                        <div className="grid gap-2">
                          <Link href="/products?category=STORAGE" className="text-sm text-muted-foreground hover:text-foreground">
                            Storage Drives
                          </Link>
                          <Link href="/products?category=PSU" className="text-sm text-muted-foreground hover:text-foreground">
                            Power Supplies
                          </Link>
                          <Link href="/products?category=CASE" className="text-sm text-muted-foreground hover:text-foreground">
                            PC Cases
                          </Link>
                          <Link href="/products?category=COOLER" className="text-sm text-muted-foreground hover:text-foreground">
                            CPU Coolers
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/support" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Support
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/custom-build" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Build Your PC
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden p-4 border-t border-white/10 w-full bg-[#15294a] dark:bg-[#182f51]`}>
        <div className="flex flex-col space-y-4">
          {/* Mobile search */}
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
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
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>

          <Link href="/" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Home</Link>
          <div className="space-y-2">
            <p className="text-white/80 font-medium text-sm">Products</p>
            <div className="pl-4 space-y-2">
              <div>
                <p className="text-white/60 text-xs mb-1">PC Components</p>
                <div className="space-y-1">
                  <Link href="/products?category=CPU" className="block text-white/80 hover:text-white text-sm transition-colors">Processors (CPU)</Link>
                  <Link href="/products?category=MOTHERBOARD" className="block text-white/80 hover:text-white text-sm transition-colors">Motherboards</Link>
                  <Link href="/products?category=RAM" className="block text-white/80 hover:text-white text-sm transition-colors">Memory (RAM)</Link>
                  <Link href="/products?category=GPU" className="block text-white/80 hover:text-white text-sm transition-colors">Graphics Cards (GPU)</Link>
                </div>
              </div>
              <div>
                <p className="text-white/60 text-xs mb-1">Essential Parts</p>
                <div className="space-y-1">
                  <Link href="/products?category=STORAGE" className="block text-white/80 hover:text-white text-sm transition-colors">Storage Drives</Link>
                  <Link href="/products?category=PSU" className="block text-white/80 hover:text-white text-sm transition-colors">Power Supplies</Link>
                  <Link href="/products?category=CASE" className="block text-white/80 hover:text-white text-sm transition-colors">PC Cases</Link>
                  <Link href="/products?category=COOLER" className="block text-white/80 hover:text-white text-sm transition-colors">CPU Coolers</Link>
                </div>
              </div>
            </div>
          </div>
          <Link href="/about" className="text-white/80 hover:text-white text-sm font-medium transition-colors">About</Link>
          <Link href="/support" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Support</Link>
          <Link href="/custom-build" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Build Your PC</Link>
          <Link href="/checkout" className="text-white/80 hover:text-white text-sm font-medium transition-colors flex items-center gap-2">
            Cart {itemCount > 0 && <span className="bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{itemCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  )
}