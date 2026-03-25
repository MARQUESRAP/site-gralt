'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface SelectedAgent {
  id: string
  name: string
}

interface SelectionContextType {
  selectedAgents: SelectedAgent[]
  addAgent: (agent: SelectedAgent) => void
  removeAgent: (agentId: string) => void
  clearSelection: () => void
}

const SelectionContext = createContext<SelectionContextType>({
  selectedAgents: [],
  addAgent: () => {},
  removeAgent: () => {},
  clearSelection: () => {},
})

const STORAGE_KEY = 'gralt-selected-agents'

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [selectedAgents, setSelectedAgents] = useState<SelectedAgent[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setSelectedAgents(JSON.parse(stored))
      }
    } catch {}
  }, [])

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedAgents))
    } catch {}
  }, [selectedAgents])

  const addAgent = useCallback((agent: SelectedAgent) => {
    setSelectedAgents((prev) => {
      if (prev.some((a) => a.id === agent.id)) return prev
      return [...prev, agent]
    })
  }, [])

  const removeAgent = useCallback((agentId: string) => {
    setSelectedAgents((prev) => prev.filter((a) => a.id !== agentId))
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedAgents([])
  }, [])

  return (
    <SelectionContext.Provider
      value={{ selectedAgents, addAgent, removeAgent, clearSelection }}
    >
      {children}
    </SelectionContext.Provider>
  )
}

export function useSelection() {
  return useContext(SelectionContext)
}
