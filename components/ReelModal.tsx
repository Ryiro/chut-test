"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ReelModalProps {
  isOpen: boolean
  onClose: () => void
  embedUrl: string
  title: string
}

export default function ReelModal({ isOpen, onClose, embedUrl, title }: ReelModalProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-[400px] mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>
          <div className="aspect-[9/16] w-full bg-black">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  )
}