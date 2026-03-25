'use client'

import { useEffect, useRef } from 'react'
import { useSectionColor } from '@/lib/SectionContext'

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const { activeColor } = useSectionColor()

  useEffect(() => {
    // Skip on mobile / touch devices / prefers-reduced-motion
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouchDevice || prefersReduced) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      const dx = mousePos.current.x - dotPos.current.x
      const dy = mousePos.current.y - dotPos.current.y

      // Spring interpolation
      dotPos.current.x += dx * 0.15
      dotPos.current.y += dy * 0.15

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 7}px, ${dotPos.current.y - 7}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Update color without re-rendering the animation loop
  useEffect(() => {
    if (dotRef.current) {
      dotRef.current.style.background = activeColor
      dotRef.current.style.boxShadow = `0 0 10px ${activeColor}80, 0 0 20px ${activeColor}40`
    }
  }, [activeColor])

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-[14px] w-[14px] rounded-full mix-blend-screen will-change-transform md:block"
      style={{
        background: activeColor,
        boxShadow: `0 0 10px ${activeColor}80, 0 0 20px ${activeColor}40`,
      }}
    />
  )
}
