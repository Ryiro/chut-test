"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from './ui/button'

const banners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=2560',
    title: 'Build Your Dream PC',
    description: 'Customize every component to match your needs'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=2560',
    title: 'High Performance Gaming',
    description: 'Experience gaming like never before'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&q=80&w=2560',
    title: 'Professional Workstations',
    description: 'Power your creativity and productivity'
  }
]

export default function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const nextSlide = () => {
    setCurrentIndex((current) => (current + 1) % banners.length)
  }

  const previousSlide = () => {
    setCurrentIndex((current) => (current - 1 + banners.length) % banners.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div 
      className="relative w-full h-[600px] overflow-hidden group"
      onMouseEnter={() => {
        setIsPaused(true)
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsPaused(false)
        setIsHovered(false)
      }}
    >
      <div className="absolute inset-0 transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        <div className="flex h-full">
          {banners.map((banner) => (
            <div key={banner.id} className="relative w-full h-full flex-shrink-0 overflow-hidden">
              <div className={`relative w-full h-full transform transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}>
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-8 pb-12 pt-24 text-white transition-opacity duration-300 opacity-100 overflow-hidden">
                  <h2 className="text-4xl font-bold mb-2 truncate">{banner.title}</h2>
                  <p className="text-xl line-clamp-2">{banner.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm border-white/20 transition-all duration-300 hover:scale-110"
          onClick={previousSlide}
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm border-white/20 transition-all duration-300 hover:scale-110"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 
              ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50 hover:scale-110'}`}
          />
        ))}
      </div>
    </div>
  )
}

function ChevronLeft(props: React.ComponentProps<'svg'>) {
  return (
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
      {...props}
    >
      <path d="m15 18-6-6 6-6"/>
    </svg>
  )
}

function ChevronRight(props: React.ComponentProps<'svg'>) {
  return (
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
      {...props}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  )
}