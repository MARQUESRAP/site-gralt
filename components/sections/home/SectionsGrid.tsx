'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import NeonText from '@/components/ui/NeonText'
import SectionBackground from '@/components/ui/SectionBackground'
import GlassCard from '@/components/ui/GlassCard'

interface SectionCard {
  name: string
  slug: string
  color: string
  description: string
  sceneImage: string
}

export default function SectionsGrid({ sections }: { sections: SectionCard[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  const cardWidth = 440
  const gapWidth = 24

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
    const idx = Math.round(el.scrollLeft / (cardWidth + gapWidth))
    setActiveIndex(Math.min(idx, sections.length - 1))
  }, [sections.length])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({
      left: el.scrollLeft + (direction === 'left' ? -(cardWidth + gapWidth) : cardWidth + gapWidth),
      behavior: 'smooth',
    })
  }

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: index * (cardWidth + gapWidth), behavior: 'smooth' })
  }

  return (
    <section id="sections" className="relative px-6 py-[120px]">
      <SectionBackground color="#00E5CC" secondaryColor="#B44AFF" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal>
          <NeonText as="h2" size="lg" className="mb-4 text-center">
            Qui souhaitez-vous rencontrer aujourd&apos;hui ?
          </NeonText>
          <p className="mb-16 text-center text-text-secondary">
            6 équipes métier, 31 agents prêts à travailler pour vous.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative">
            {/* Carousel */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide py-2 pb-4"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {sections.map((section) => (
                <Link
                  key={section.slug}
                  href={`/agents/${section.slug}`}
                  className="w-[440px] shrink-0"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <GlassCard color={section.color} className="h-full overflow-hidden p-0">
                    {/* Scene image — 3:2 */}
                    <div className="p-4 pb-0">
                      <div
                        className="relative w-full overflow-hidden rounded-xl"
                        style={{ aspectRatio: '3 / 2' }}
                      >
                        <Image
                          src={section.sceneImage}
                          alt={`Équipe ${section.name}`}
                          fill
                          className="object-cover"
                          sizes="440px"
                        />
                      </div>
                    </div>

                    {/* Section info */}
                    <div className="flex flex-col gap-1.5 p-5 pt-4">
                      <NeonText as="h3" size="sm" color={section.color}>
                        L&apos;équipe {section.name}
                      </NeonText>
                      <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">
                        {section.description}
                      </p>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>

            {/* Arrows */}
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute -left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                style={{
                  background: 'rgba(19, 24, 41, 0.7)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(0, 229, 204, 0.25)',
                  boxShadow: '0 0 15px rgba(0, 229, 204, 0.15)',
                }}
                aria-label="Défiler à gauche"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E5CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute -right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                style={{
                  background: 'rgba(19, 24, 41, 0.7)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(0, 229, 204, 0.25)',
                  boxShadow: '0 0 15px rgba(0, 229, 204, 0.15)',
                }}
                aria-label="Défiler à droite"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E5CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            )}

            {/* Pagination dots — mobile */}
            <div className="mt-4 flex items-center justify-center gap-2 lg:hidden">
              {sections.map((section, i) => (
                <button
                  key={section.slug}
                  onClick={() => scrollToIndex(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? 24 : 8,
                    background: i === activeIndex ? section.color : 'rgba(139, 146, 165, 0.3)',
                  }}
                  aria-label={`Aller à ${section.name}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
