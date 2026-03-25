'use client'

import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface GlassCardProps {
  color?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
  tilt?: boolean
}

export default function GlassCard({
  color = '#1E2436',
  children,
  className = '',
  onClick,
  hoverable = true,
  tilt = false,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tilt || !cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      cardRef.current.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`
    },
    [tilt]
  )

  const handleMouseLeave = useCallback(() => {
    if (!tilt || !cardRef.current) return
    cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)'
  }, [tilt])

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative rounded-2xl overflow-hidden
        bg-[rgba(19,24,41,0.6)] backdrop-blur-[16px]
        shadow-[0_4px_24px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.2)]
        ${tilt ? 'transition-[border-color,box-shadow] duration-300' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        border: `1px solid ${color}26`,
        ...(tilt ? { transition: 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s' } : {}),
      }}
      whileHover={
        hoverable && !tilt
          ? {
              y: -4,
              borderColor: `${color}66`,
              boxShadow: `0 4px 24px rgba(0,0,0,0.3), 0 0 20px ${color}4D, 0 0 40px ${color}1A`,
            }
          : undefined
      }
      onMouseMove={tilt ? handleMouseMove : undefined}
      onMouseLeave={tilt ? handleMouseLeave : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
