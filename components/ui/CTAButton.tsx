'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface CTAButtonProps {
  variant?: 'primary' | 'secondary'
  color?: string
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  pulse?: boolean
}

export default function CTAButton({
  variant = 'primary',
  color = '#00E5CC',
  href,
  onClick,
  children,
  className = '',
  pulse = false,
}: CTAButtonProps) {
  const isPrimary = variant === 'primary'

  const buttonClasses = `
    relative inline-flex items-center justify-center gap-2
    px-6 py-3 rounded-xl font-medium text-sm md:text-base
    transition-all duration-300
    ${isPrimary ? 'text-dark-bg' : 'text-text-primary'}
    ${className}
  `

  const buttonStyle = isPrimary
    ? {
        background: color,
        boxShadow: `0 0 20px ${color}4D, 0 0 40px ${color}1A`,
      }
    : {
        background: 'transparent',
        border: `1px solid ${color}66`,
        boxShadow: `0 0 15px ${color}1A`,
      }

  const content = (
    <motion.span
      className={buttonClasses}
      style={buttonStyle}
      whileHover={{
        scale: 1.03,
        boxShadow: isPrimary
          ? `0 0 30px ${color}66, 0 0 60px ${color}33`
          : `0 0 25px ${color}33, 0 0 50px ${color}1A`,
      }}
      whileTap={{ scale: 0.98 }}
      animate={
        pulse
          ? {
              scale: [1, 1.02, 1],
            }
          : undefined
      }
      transition={
        pulse
          ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.2 }
      }
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className="inline-block">
      {content}
    </button>
  )
}
