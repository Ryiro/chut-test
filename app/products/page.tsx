import { Suspense } from 'react'
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ProductsContent from '@/components/ProductsContent'

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