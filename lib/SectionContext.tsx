'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface SectionContextType {
  activeColor: string
  setActiveColor: (color: string) => void
}

const SectionContext = createContext<SectionContextType>({
  activeColor: '#00E5CC',
  setActiveColor: () => {},
})

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [activeColor, setActiveColorState] = useState('#00E5CC')

  const setActiveColor = useCallback((color: string) => {
    setActiveColorState(color)
  }, [])

  return (
    <SectionContext.Provider value={{ activeColor, setActiveColor }}>
      {children}
    </SectionContext.Provider>
  )
}

export function useSectionColor() {
  return useContext(SectionContext)
}
