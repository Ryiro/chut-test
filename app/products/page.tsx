import { Suspense } from 'react'
import { Metadata } from 'next'
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ProductsContent from '@/components/ProductsContent'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our products'
}

// Separate loading component for better UX
function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    </div>
  )
}

export default function Products() {
  return (
    <>
      <Header />
      <Suspense fallback={<ProductsLoading />}>
        <ProductsContent />
      </Suspense>
      <Footer />
    </>
  )
}