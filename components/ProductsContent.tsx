"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ProductCard from "@/components/ProductCard"
import { ComponentCategory } from '@prisma/client'

type CpuSpec = {
  id: string;
  brand: string;
  cores: number;
  threads: number;
  baseSpeed: number;
  boostSpeed: number | null;
  socket: string;
  tdp: number;
}

type GpuSpec = {
  id: string;
  brand: string;
  memory: number;
  memoryType: string;
  coreClock: number;
  boostClock: number | null;
  tdp: number;
}

type RamSpec = {
  id: string;
  capacity: number;
  speed: number;
  type: string;
  timing: string;
}

type StorageSpec = {
  id: string;
  type: string;
  capacity: number;
  interface: string;
  readSpeed: number | null;
  writeSpeed: number | null;
}

type MotherboardSpec = {
  id: string;
  socket: string;
  chipset: string;
  formFactor: string;
  memoryMax: number;
  memorySlots: number;
}

type PsuSpec = {
  id: string;
  wattage: number;
  efficiency: string;
  modular: boolean;
}

type CaseSpec = {
  id: string;
  formFactor: string;
  maxGpuLength: number;
  maxCpuHeight: number;
}

type CoolerSpec = {
  id: string;
  type: string;
  height: number;
  radiatorSize: number | null;
  fanSize: number;
  fanCount: number;
  tdp: number;
  socket: string;
}

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: ComponentCategory;
  image?: string | null;
  cpuSpec: CpuSpec | null;
  gpuSpec: GpuSpec | null;
  ramSpec: RamSpec | null;
  storageSpec: StorageSpec | null;
  motherboardSpec: MotherboardSpec | null;
  psuSpec: PsuSpec | null;
  caseSpec: CaseSpec | null;
  coolerSpec: CoolerSpec | null;
}

async function getProducts(category?: string) {
  try {
    const response = await fetch(`/api/products${category ? `?category=${category}` : ''}`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const data = await response.json()
    return {
      products: data,
      error: null
    }
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return {
      products: [],
      error: 'Failed to load products. Please try again later.'
    }
  }
}

export default function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all')

  useEffect(() => {
    setSelectedCategory(categoryParam || 'all')
  }, [categoryParam])

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts(categoryParam || undefined)
      setProducts(result.products)
      setError(result.error)
    }
    fetchProducts()
  }, [categoryParam])

  return (
    <main className="container mx-auto px-4 py-8 md:px-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Section */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={(value) => {
                  setSelectedCategory(value)
                  window.location.href = value !== 'all' ? `/products?category=${value}` : '/products'
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="CPU">Processors</SelectItem>
                    <SelectItem value="GPU">Graphics Cards</SelectItem>
                    <SelectItem value="RAM">Memory</SelectItem>
                    <SelectItem value="STORAGE">Storage</SelectItem>
                    <SelectItem value="MOTHERBOARD">Motherboards</SelectItem>
                    <SelectItem value="PSU">Power Supplies</SelectItem>
                    <SelectItem value="CASE">Cases</SelectItem>
                    <SelectItem value="COOLER">CPU Coolers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="Min" />
                  <Input type="number" placeholder="Max" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Brand</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    <SelectItem value="intel">Intel</SelectItem>
                    <SelectItem value="amd">AMD</SelectItem>
                    <SelectItem value="nvidia">NVIDIA</SelectItem>
                    <SelectItem value="corsair">Corsair</SelectItem>
                    <SelectItem value="samsung">Samsung</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Stock Status</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">PC Components</h1>
            <Select defaultValue="price-asc">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-900/10 dark:text-red-400">
              <p>{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}