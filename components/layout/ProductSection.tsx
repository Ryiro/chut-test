import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProductSection() {
  const products = [
    {
      id: 'gaming-pc',
      name: 'ComputerHut Pro Gaming PC',
      description: 'Dominate every game with our high-performance gaming rig, featuring the latest GPU and CPU technology.',
      image: '/window.svg',
      price: '$1,599',
      specs: ['RTX 4070 Graphics', 'Intel i7 Processor', '32GB DDR5 RAM', '1TB NVMe SSD'],
      link: '/products/gaming-pc'
    },
    {
      id: 'workstation',
      name: 'CreatorStation Ultra',
      description: 'Professional grade workstation designed for content creation, 3D rendering, and intensive workloads.',
      image: '/file.svg',
      price: '$2,199',
      specs: ['RTX 4080 Graphics', 'AMD Ryzen 9', '64GB DDR5 RAM', '2TB NVMe SSD'],
      link: '/products/workstation'
    },
    {
      id: 'office-pc',
      name: 'BusinessTech Elite',
      description: 'Reliable, efficient, and secure computing solution for your business or home office needs.',
      image: '/globe.svg',
      price: '$899',
      specs: ['Intel i5 Processor', '16GB DDR4 RAM', '512GB NVMe SSD', 'Windows 11 Pro'],
      link: '/products/office-pc'
    }
  ]

  return (
    <section className="py-16 md:py-24 w-full">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Custom-Built PCs for Every Need</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            High-performance computers built with premium components and expert craftsmanship.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden border-2 transition-all hover:shadow-lg">
              <CardHeader className="p-0">
                <div className="aspect-video w-full overflow-hidden bg-muted/20 flex items-center justify-center p-8">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={120} 
                    height={120} 
                    className="h-auto w-auto object-contain" 
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6">
                <CardTitle className="text-xl mb-2.5">{product.name}</CardTitle>
                <CardDescription className="mb-4 text-base">{product.description}</CardDescription>
                <div className="mb-4">
                  <p className="text-xl font-bold text-primary mb-3">Starting at {product.price}</p>
                  <ul className="space-y-1">
                    {product.specs.map((spec, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <div className="flex items-center justify-between w-full">
                  <Button asChild variant="default">
                    <Link href={product.link}>View Details</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/custom-build">Customize</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/custom-build" className="flex items-center gap-2">
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
                className="h-5 w-5"
              >
                <path d="M11 12H3"></path>
                <path d="m15 16-4-4 4-4"></path>
                <rect width="4" height="6" x="17" y="9"></rect>
              </svg>
              Build Your Custom PC
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}