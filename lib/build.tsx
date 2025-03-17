"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react'
import { ComponentCategory } from '@prisma/client'

export type BuildItem = {
  id: string
  name: string
  price: number
  image?: string
  category: ComponentCategory
}

type BuildContextType = {
  components: Record<ComponentCategory, BuildItem | null>
  addToBuild: (item: BuildItem) => void
  removeFromBuild: (category: ComponentCategory) => void
  clearBuild: () => void
  buildTotal: number
  isCompatible: boolean
  compatibilityMessage: string
}

const BuildContext = createContext<BuildContextType | undefined>(undefined)

export function BuildProvider({ children }: { children: ReactNode }) {
  const [components, setComponents] = useState<Record<ComponentCategory, BuildItem | null>>({
    CPU: null,
    GPU: null,
    MOTHERBOARD: null,
    RAM: null,
    STORAGE: null,
    COOLER: null,
    PSU: null,
    CASE: null,
  })

  const [isCompatible, setIsCompatible] = useState(true)
  const [compatibilityMessage, setCompatibilityMessage] = useState('')

  // Load build from localStorage on mount
  useEffect(() => {
    try {
      const savedBuild = localStorage.getItem('build')
      if (savedBuild) {
        setComponents(JSON.parse(savedBuild))
      }
    } catch (error) {
      console.error('Failed to load build from localStorage:', error)
    }
  }, [])

  // Save build to localStorage when components change
  useEffect(() => {
    try {
      localStorage.setItem('build', JSON.stringify(components))
    } catch (error) {
      console.error('Failed to save build to localStorage:', error)
    }
  }, [components])

  const addToBuild = (item: BuildItem) => {
    setComponents(prev => ({
      ...prev,
      [item.category]: item
    }))
    // You can add your compatibility logic here later
    setIsCompatible(true)
    setCompatibilityMessage('')
  }

  const removeFromBuild = (category: ComponentCategory) => {
    setComponents(prev => ({
      ...prev,
      [category]: null
    }))
    // You can update compatibility status here when components are removed
    setIsCompatible(true)
    setCompatibilityMessage('')
  }

  const clearBuild = () => {
    setComponents({
      CPU: null,
      GPU: null,
      MOTHERBOARD: null,
      RAM: null,
      STORAGE: null,
      COOLER: null,
      PSU: null,
      CASE: null,
    })
  }

  const buildTotal = useMemo(() => {
    return Object.values(components)
      .filter((item): item is BuildItem => item !== null)
      .reduce((total, item) => total + item.price, 0)
  }, [components])

  return (
    <BuildContext.Provider value={{
      components,
      addToBuild,
      removeFromBuild,
      clearBuild,
      buildTotal,
      isCompatible,
      compatibilityMessage
    }}>
      {children}
    </BuildContext.Provider>
  )
}

export function useBuild() {
  const context = useContext(BuildContext)
  if (context === undefined) {
    throw new Error('useBuild must be used within a BuildProvider')
  }
  return context
}