"use client"

import Image from 'next/image'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/lib/cart"
import { useBuild } from "@/lib/build"
import type { CartItem } from "@/lib/cart"
import type { ComponentCategory } from '@prisma/client'
import { toast } from 'sonner'

type ProductCardProps = {
  product: {
    id: string
    name: string
    description?: string
    price: number
    stock: number
    category: ComponentCategory
    image?: string | null
    monitorSpec?: {
      size: number
      resolution: string
      refreshRate: number
      panelType: string
    } | null
    keyboardSpec?: {
      type: string
      layout: string
      switchType?: string
      wireless: boolean
    } | null
    mouseSpec?: {
      dpi: number
      buttons: number
      wireless: boolean
      rgb: boolean
    } | null
    speakerSpec?: {
      type: string
      totalWattage: number
      wireless: boolean
      bluetooth: boolean
    } | null
    headphoneSpec?: {
      type: string
      driver: string
      wireless: boolean
      noiseCancelling: boolean
    } | null
    externalStorageSpec?: {
      capacity: number
      type: string
      interface: string
      portable: boolean
    } | null
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { addToBuild } = useBuild()
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isAddingToBuild, setIsAddingToBuild] = useState(false)
  
  const handleAddToCart = () => {
    setIsAddingToCart(true)
    
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || undefined,
      category: product.category,
      quantity: 1
    }
    
    setTimeout(() => {
      addItem(cartItem)
      setIsAddingToCart(false)
      toast.success(`${product.name} added to cart`)
    }, 300)
  }

  const handleAddToBuild = () => {
    setIsAddingToBuild(true)
    
    const buildItem = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image || undefined,
      category: product.category,
    }
    
    setTimeout(() => {
      addToBuild(buildItem)
      setIsAddingToBuild(false)
      toast.success(`${product.name} added to build`)
      window.location.href = '/custom-build'
    }, 300)
  }

  const renderSpecifications = () => {
    switch (product.category) {
      // ... existing cases ...

      case 'MONITOR':
        if (!product.monitorSpec) return null;
        return (
          <>
            <p className="text-sm text-muted-foreground">{product.monitorSpec.size}&quot; {product.monitorSpec.panelType}</p>
            <p className="text-sm text-muted-foreground">{product.monitorSpec.resolution} @ {product.monitorSpec.refreshRate}Hz</p>
          </>
        );

      case 'KEYBOARD':
        if (!product.keyboardSpec) return null;
        return (
          <>
            <p className="text-sm text-muted-foreground">{product.keyboardSpec.type} - {product.keyboardSpec.layout}</p>
            {product.keyboardSpec.switchType && (
              <p className="text-sm text-muted-foreground">Switch: {product.keyboardSpec.switchType}</p>
            )}
            {product.keyboardSpec.wireless && (
              <p className="text-sm text-muted-foreground">Wireless</p>
            )}
          </>
        );

      case 'MOUSE':
        if (!product.mouseSpec) return null;
        return (
          <>
            <p className="text-sm text-muted-foreground">{product.mouseSpec.dpi} DPI | {product.mouseSpec.buttons} Buttons</p>
            <p className="text-sm text-muted-foreground">
              {[
                product.mouseSpec.wireless ? 'Wireless' : 'Wired',
                product.mouseSpec.rgb ? 'RGB' : null
              ].filter(Boolean).join(' • ')}
            </p>
          </>
        );

      case 'SPEAKERS':
        if (!product.speakerSpec) return null;
        return (
          <>
            <p className="text-sm text-muted-foreground">{product.speakerSpec.type} | {product.speakerSpec.totalWattage}W</p>
            <p className="text-sm text-muted-foreground">
              {[
                product.speakerSpec.wireless ? 'Wireless' : 'Wired',
                product.speakerSpec.bluetooth ? 'Bluetooth' : null
              ].filter(Boolean).join(' • ')}
            </p>
          </>
        );

      case 'HEADPHONES':
        if (!product.headphoneSpec) return null;
        return (
          <>
            <p className="text-sm text-muted-foreground">{product.headphoneSpec.type} | {product.headphoneSpec.driver}</p>
            <p className="text-sm text-muted-foreground">
              {[
                product.headphoneSpec.wireless ? 'Wireless' : 'Wired',
                product.headphoneSpec.noiseCancelling ? 'ANC' : null
              ].filter(Boolean).join(' • ')}
            </p>
          </>
        );

      case 'EXTERNAL_STORAGE':
        if (!product.externalStorageSpec) return null;
        return (
          <>
            <p className="text-sm text-muted-foreground">
              {product.externalStorageSpec.capacity}GB {product.externalStorageSpec.type}
            </p>
            <p className="text-sm text-muted-foreground">
              {product.externalStorageSpec.interface} | {product.externalStorageSpec.portable ? 'Portable' : 'Desktop'}
            </p>
          </>
        );

      default:
        return null;
    }
  }
  
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="aspect-square relative bg-muted/20 p-4">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground/40"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="font-semibold mb-2">{product.name}</h2>
        {product.description && (
          <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
        )}
        {renderSpecifications()}
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
          <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button 
            variant="outline"
            onClick={handleAddToBuild}
            disabled={isAddingToBuild || product.stock <= 0}
          >
            {isAddingToBuild ? 'Adding...' : 'Add to Build'}
          </Button>
          <Button 
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.stock <= 0}
          >
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Card>
  )
}