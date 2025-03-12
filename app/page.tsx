import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductSection from '@/components/layout/ProductSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="bg-muted/40 w-full">
          <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-16 text-center md:gap-10 md:py-24 lg:py-32">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Build Your Perfect Computer
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                High-performance custom PCs designed for gamers, creators, and professionals.
                Built with premium components and expert craftsmanship.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/custom-build">Build Your PC</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/products">View Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Product Section */}
      <ProductSection />
      
      {/* Features Section */}
      <section className="bg-muted/20 py-16 md:py-24 w-full">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
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
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Premium Components</h3>
              <p className="text-muted-foreground">
                We use only the highest quality components from trusted brands to ensure reliability and performance.
              </p>
            </div>
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
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
                  className="h-6 w-6 text-primary"
                >
                  <path d="M21 13v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h4" />
                  <path d="m12 12 4-10 1.7 6L22 9.5z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Expert Craftsmanship</h3>
              <p className="text-muted-foreground">
                Each system is meticulously assembled and thoroughly tested by our team of experienced technicians.
              </p>
            </div>
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
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
                  className="h-6 w-6 text-primary"
                >
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Lifetime Support</h3>
              <p className="text-muted-foreground">
                Our technical support team is always ready to assist you with any questions or issues throughout the life of your system.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 w-full">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Experience ComputerHut Quality?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of satisfied customers who trust ComputerHut for their computing needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/custom-build">Build Your Custom PC</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/support">Get Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  )
}
