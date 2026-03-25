'use client'

import { motion } from 'framer-motion'
import { useSelection } from '@/lib/SelectionContext'

interface AgentSelectorProps {
  agentId: string
  agentName: string
  color: string
}

export default function AgentSelector({
  agentId,
  agentName,
  color,
}: AgentSelectorProps) {
  const { selectedAgents, addAgent, removeAgent } = useSelection()
  const isSelected = selectedAgents.some((a) => a.id === agentId)

  const handleClick = () => {
    if (isSelected) {
      removeAgent(agentId)
    } else {
      addAgent({ id: agentId, name: agentName })
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      className="relative inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors duration-300"
      style={{
        background: isSelected ? `${color}1A` : 'transparent',
        border: `1px solid ${isSelected ? color : `${color}4D`}`,
        color: isSelected ? color : '#E8EAF0',
      }}
      whileHover={{
        borderColor: color,
        boxShadow: `0 0 15px ${color}33`,
      }}
      whileTap={{ scale: 0.97 }}
    >
      {isSelected ? (
        <>
          <span>✓</span>
          <span>{agentName} sélectionné</span>
        </>
      ) : (
        <>
          <span>+</span>
          <span>Cet agent m&apos;intéresse</span>
        </>
      )}
    </motion.button>
  )
}
