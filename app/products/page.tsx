import React from 'react'
import { prisma } from '@/lib/db'
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
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

// Force Next.js to treat this as a dynamic page
export const fetchCache = 'force-no-store'
export const revalidate = 0

async function getProducts() {
  try {
    console.log('Fetching products...')
    const products = await prisma.product.findMany({
      include: {
        cpuSpec: true,
        gpuSpec: true,
        ramSpec: true,
        storageSpec: true,
        motherboardSpec: true,
        psuSpec: true,
        caseSpec: true,
        coolerSpec: true,
      }
    })
    console.log('Products fetched:', products.length)
    return {
      products,
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

export default async function Products() {
  const { products, error } = await getProducts()

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Section */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpu">Processors</SelectItem>
                      <SelectItem value="gpu">Graphics Cards</SelectItem>
                      <SelectItem value="ram">Memory</SelectItem>
                      <SelectItem value="storage">Storage</SelectItem>
                      <SelectItem value="motherboard">Motherboards</SelectItem>
                      <SelectItem value="psu">Power Supplies</SelectItem>
                      <SelectItem value="case">Cases</SelectItem>
                      <SelectItem value="cooler">CPU Coolers</SelectItem>
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                    <SelectContent>
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
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
              <Select>
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
      <Footer />
    </>
  )
}