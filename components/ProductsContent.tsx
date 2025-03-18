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

type MonitorSpec = {
  id: string;
  size: number;
  resolution: string;
  refreshRate: number;
  panelType: string;
  responseTime: number;
  aspectRatio: string;
  hdrSupport: boolean;
  ports: string;
  speakers: boolean;
  adjustable: boolean;
}

type KeyboardSpec = {
  id: string;
  type: string;
  layout: string;
  switchType?: string;
  backlighting: boolean;
  wireless: boolean;
  numpad: boolean;
  multimedia: boolean;
}

type MouseSpec = {
  id: string;
  dpi: number;
  buttons: number;
  wireless: boolean;
  sensor: string;
  rgb: boolean;
  weight?: number;
  adjustable: boolean;
}

type SpeakerSpec = {
  id: string;
  type: string;
  totalWattage: number;
  wireless: boolean;
  bluetooth: boolean;
  subwoofer: boolean;
  remote: boolean;
}

type HeadphoneSpec = {
  id: string;
  type: string;
  driver: string;
  wireless: boolean;
  bluetooth: boolean;
  noiseCancelling: boolean;
  microphone: boolean;
  impedance?: number;
  frequency: string;
}

type ExternalStorageSpec = {
  id: string;
  capacity: number;
  type: string;
  interface: string;
  portable: boolean;
  encrypted: boolean;
  readSpeed?: number;
  writeSpeed?: number;
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
  monitorSpec: MonitorSpec | null;
  keyboardSpec: KeyboardSpec | null;
  mouseSpec: MouseSpec | null;
  speakerSpec: SpeakerSpec | null;
  headphoneSpec: HeadphoneSpec | null;
  externalStorageSpec: ExternalStorageSpec | null;
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
  const [formState, setFormState] = useState({
    portable: false,
    wireless: false,
    bluetooth: false,
    encrypted: false
  })

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

  const handleCheckboxChange = (field: keyof typeof formState) => {
    setFormState(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const renderSpecificFilters = () => {
    switch (selectedCategory) {
      case 'MONITOR':
        return (
          <>
            <div className="space-y-2">
              <Label>Panel Type</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="IPS">IPS</SelectItem>
                  <SelectItem value="VA">VA</SelectItem>
                  <SelectItem value="TN">TN</SelectItem>
                  <SelectItem value="OLED">OLED</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Resolution</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Resolutions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Resolutions</SelectItem>
                  <SelectItem value="1920x1080">1080p (1920x1080)</SelectItem>
                  <SelectItem value="2560x1440">1440p (2560x1440)</SelectItem>
                  <SelectItem value="3840x2160">4K (3840x2160)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Refresh Rate</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Rates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rates</SelectItem>
                  <SelectItem value="60">60Hz</SelectItem>
                  <SelectItem value="144">144Hz</SelectItem>
                  <SelectItem value="165">165Hz</SelectItem>
                  <SelectItem value="240">240Hz</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case 'KEYBOARD':
        return (
          <>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Membrane">Membrane</SelectItem>
                  <SelectItem value="Optical">Optical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Layout</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Layouts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Layouts</SelectItem>
                  <SelectItem value="Full-size">Full-size</SelectItem>
                  <SelectItem value="TKL">TKL</SelectItem>
                  <SelectItem value="60%">60%</SelectItem>
                  <SelectItem value="75%">75%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Features</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" />
                  <span>Wireless</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" />
                  <span>Backlighting</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" />
                  <span>Numpad</span>
                </label>
              </div>
            </div>
          </>
        );

      case 'MOUSE':
        return (
          <>
            <div className="space-y-2">
              <Label>DPI Range</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Ranges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ranges</SelectItem>
                  <SelectItem value="8000">Up to 8000</SelectItem>
                  <SelectItem value="16000">Up to 16000</SelectItem>
                  <SelectItem value="25000">Up to 25000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Features</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" />
                  <span>Wireless</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" />
                  <span>RGB Lighting</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" />
                  <span>Adjustable Weight</span>
                </label>
              </div>
            </div>
          </>
        );

      case 'SPEAKERS':
        return (
          <>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="2.0">2.0</SelectItem>
                  <SelectItem value="2.1">2.1</SelectItem>
                  <SelectItem value="5.1">5.1</SelectItem>
                  <SelectItem value="7.1">7.1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Features</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" />
                  <span>Wireless</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" />
                  <span>Bluetooth</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" />
                  <span>Subwoofer</span>
                </label>
              </div>
            </div>
          </>
        );

      case 'HEADPHONES':
        return (
          <>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Over-ear">Over-ear</SelectItem>
                  <SelectItem value="On-ear">On-ear</SelectItem>
                  <SelectItem value="In-ear">In-ear</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Features</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" />
                  <span>Wireless</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" />
                  <span>Noise Cancelling</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" />
                  <span>Built-in Microphone</span>
                </label>
              </div>
            </div>
          </>
        );

      case 'EXTERNAL_STORAGE':
        return (
          <>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="SSD">SSD</SelectItem>
                  <SelectItem value="HDD">HDD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Capacity</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Capacities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Capacities</SelectItem>
                  <SelectItem value="500">500GB</SelectItem>
                  <SelectItem value="1000">1TB</SelectItem>
                  <SelectItem value="2000">2TB</SelectItem>
                  <SelectItem value="4000">4TB+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Interface</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Interfaces" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Interfaces</SelectItem>
                  <SelectItem value="USB 3.0">USB 3.0</SelectItem>
                  <SelectItem value="USB-C">USB-C</SelectItem>
                  <SelectItem value="Thunderbolt 3">Thunderbolt 3</SelectItem>
                  <SelectItem value="Thunderbolt 4">Thunderbolt 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Features</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    className="checkbox" 
                    checked={formState.portable}
                    onChange={() => handleCheckboxChange('portable')}
                  />
                  <span>Portable</span>
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    className="checkbox" 
                    checked={formState.encrypted}
                    onChange={() => handleCheckboxChange('encrypted')}
                  />
                  <span>Hardware Encryption</span>
                </label>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

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
                    <SelectItem value="MONITOR">Monitors</SelectItem>
                    <SelectItem value="KEYBOARD">Keyboards</SelectItem>
                    <SelectItem value="MOUSE">Mice</SelectItem>
                    <SelectItem value="SPEAKERS">Speakers</SelectItem>
                    <SelectItem value="HEADPHONES">Headphones</SelectItem>
                    <SelectItem value="EXTERNAL_STORAGE">External Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {renderSpecificFilters()}

              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="Min" />
                  <Input type="number" placeholder="Max" />
                </div>
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
            <h1 className="text-2xl font-bold">
              {selectedCategory === 'all' ? 'All Products' : 
                selectedCategory.charAt(0) + selectedCategory.slice(1).toLowerCase().replace('_', ' ') + 's'}
            </h1>
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