"use client"

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BannerSlider from '@/components/BannerSlider'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

const featuredBuilds = [
  {
    id: 1,
    name: "Titan X Gaming",
    description: "RTX 4090, Intel i9-14900K, 64GB DDR5, 2TB NVMe",
    price: 3999,
    image: "/product-images/1742114739120-gpu5-removebg-preview.png",
    specs: ["RTX 4090 24GB", "Intel i9-14900K", "64GB DDR5 6000MHz", "2TB NVMe Gen4"]
  },
  {
    id: 2,
    name: "Pro Creator",
    description: "RTX 4080, Ryzen 9 7950X, 128GB DDR5, 4TB Storage",
    price: 3499,
    image: "/product-images/1742081844710-cpu6.png",
    specs: ["RTX 4080 16GB", "Ryzen 9 7950X", "128GB DDR5 5600MHz", "4TB NVMe RAID"]
  },
  {
    id: 3,
    name: "Elite Workstation",
    description: "RTX 4070 Ti, Intel i7-14700K, 32GB DDR5, 2TB Storage",
    price: 2499,
    image: "/product-images/1742081834399-cpu3-removebg-preview.png",
    specs: ["RTX 4070 Ti 12GB", "Intel i7-14700K", "32GB DDR5 5200MHz", "2TB NVMe Gen4"]
  }
]

const reels = [
  {
    id: 1,
    title: "Custom PC Build",
    embedUrl: "https://www.instagram.com/p/DHOLlHJvvhl/embed"
  },
  {
    id: 2,
    title: "Gaming Setup",
    embedUrl: "https://www.instagram.com/p/DHIzyFwPiOJ/embed"
  },
  {
    id: 3,
    title: "Professional Build",
    embedUrl: "https://www.instagram.com/p/DHGaanDv3Oz/embed"
  },
  {
    id: 4,
    title: "Workstation Build",
    embedUrl: "https://www.instagram.com/p/DHOLlHJvvhl/embed"
  },
  {
    id: 5,
    title: "RGB Build Showcase",
    embedUrl: "https://www.instagram.com/p/DHIzyFwPiOJ/embed"
  }
]

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative z-10">
        <Header />
        <BannerSlider />
        
        {/* Featured Products Section */}
        <section className="py-16 md:py-24 w-full">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white mb-4">
                Featured Custom Builds
              </h2>
              <p className="text-gray-600 dark:text-gray-300 md:text-lg max-w-[800px] mx-auto">
                Discover our expertly crafted PC builds, designed for maximum performance and reliability
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBuilds.map((build) => (
                <Card key={build.id} className="group overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300">
                  <div className="p-6">
                    <div className="relative h-48 mb-6 transform group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={build.image}
                        alt={build.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{build.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{build.description}</p>
                    <ul className="space-y-1 mb-6 text-sm text-gray-600 dark:text-gray-300">
                      {build.specs.map((spec, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {spec}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">${build.price}</span>
                      <Button asChild>
                        <Link href={`/custom-build?template=${build.id}`}>Configure</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reels Section */}
        <section className="py-16 md:py-24 w-full bg-gray-100 dark:bg-gray-800/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white mb-4">
                Build Showcases
              </h2>
              <p className="text-gray-600 dark:text-gray-300 md:text-lg max-w-[800px] mx-auto">
                Watch our latest custom PC builds and behind-the-scenes content
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {reels.map((reel) => (
                <div key={reel.id} className="aspect-[9/16] w-full max-w-[240px] mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <iframe
                    src={reel.embedUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 w-full">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
                  Ready to Experience ComputerHut Quality?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-600 dark:text-slate-300 md:text-xl">
                  Join thousands of satisfied customers who trust ComputerHut for their computing needs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600">
                  <Link href="/custom-build">Build Your Custom PC</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-gray-400 dark:border-slate-500 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800">
                  <Link href="/support">Get Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
