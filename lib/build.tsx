"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
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
  }

  const removeFromBuild = (category: ComponentCategory) => {
    setComponents(prev => ({
      ...prev,
      [category]: null
    }))
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

  const buildTotal = Object.values(components)
    .reduce((total, item) => total + (item?.price || 0), 0)

  return (
    <BuildContext.Provider value={{
      components,
      addToBuild,
      removeFromBuild,
      clearBuild,
      buildTotal
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