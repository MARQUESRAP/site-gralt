'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import GlassCard from '@/components/ui/GlassCard'
import NeonText from '@/components/ui/NeonText'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

interface CarouselAgent {
  name: string
  slug: string
  color: string
  sectionSlug: string
  sectionName: string
  accroche: string
  isGolden?: boolean
  image?: string
}

interface AgentCarouselProps {
  agents: CarouselAgent[]
  showArrows?: boolean
  cardSize?: 'sm' | 'md' | 'lg'
  onAgentClick?: (slug: string, sectionSlug: string) => void
}

const sizeConfig = {
  sm: { card: 'w-[280px]', gap: 'gap-5' },
  md: { card: 'w-[350px]', gap: 'gap-6' },
  lg: { card: 'w-[400px]', gap: 'gap-6' },
}

function AgentCardContent({ agent, displayColor }: { agent: CarouselAgent; displayColor: string }) {
  return (
    <GlassCard color={displayColor} className="h-full p-0 overflow-hidden">
      {/* Image or placeholder — square 1:1 */}
      <div className="p-4 pb-0">
        {agent.image ? (
          <div
            className="relative w-full overflow-hidden rounded-xl"
            style={{ aspectRatio: '1 / 1' }}
          >
            <Image
              src={agent.image}
              alt={`Photo de ${agent.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 280px, 350px"
            />
          </div>
        ) : (
          <div
            className="w-full"
            style={{ aspectRatio: '1 / 1' }}
          >
            <ImagePlaceholder
              width="100%"
              height="100%"
              label={`Image ${agent.name} à venir`}
              color={displayColor}
            />
          </div>
        )}
      </div>

      {/* Agent info */}
      <div className="flex flex-col gap-1.5 p-5 pt-4">
        <NeonText as="h3" size="sm" color={displayColor}>
          {agent.name}
        </NeonText>
        <p className="text-sm font-medium text-text-primary">
          {agent.sectionName}
        </p>
        <p className="line-clamp-3 text-sm leading-relaxed text-text-secondary">
          {agent.accroche}
        </p>
      </div>
    </GlassCard>
  )
}

export default function AgentCarousel({
  agents,
  showArrows = true,
  cardSize = 'md',
  onAgentClick,
}: AgentCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const config = sizeConfig[cardSize]

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)

    const cardWidth = cardSize === 'sm' ? 280 : cardSize === 'md' ? 350 : 400
    const gapWidth = cardSize === 'sm' ? 20 : 24
    const idx = Math.round(el.scrollLeft / (cardWidth + gapWidth))
    setActiveIndex(Math.min(idx, agents.length - 1))
  }, [cardSize, agents.length])

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
    const cardWidth = cardSize === 'sm' ? 280 : cardSize === 'md' ? 350 : 400
    const gapWidth = cardSize === 'sm' ? 20 : 24
    const scrollAmount = cardWidth + gapWidth
    el.scrollTo({
      left: el.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth',
    })
  }

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = cardSize === 'sm' ? 280 : cardSize === 'md' ? 350 : 400
    const gapWidth = cardSize === 'sm' ? 20 : 24
    el.scrollTo({
      left: index * (cardWidth + gapWidth),
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative">
      {/* Carousel container */}
      <div
        ref={scrollRef}
        className={`flex ${config.gap} overflow-x-auto scrollbar-hide py-2 pb-4`}
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {agents.map((agent) => {
          const displayColor = agent.isGolden ? '#F5C842' : agent.color

          if (onAgentClick) {
            return (
              <div
                key={agent.slug}
                className={`shrink-0 cursor-pointer ${config.card}`}
                style={{ scrollSnapAlign: 'start' }}
                onClick={() => onAgentClick(agent.slug, agent.sectionSlug)}
              >
                <AgentCardContent agent={agent} displayColor={displayColor} />
              </div>
            )
          }

          return (
            <Link
              key={agent.slug}
              href={`/agents/${agent.sectionSlug}`}
              className={`shrink-0 ${config.card}`}
              style={{ scrollSnapAlign: 'start' }}
            >
              <AgentCardContent agent={agent} displayColor={displayColor} />
            </Link>
          )
        })}
      </div>

      {/* Navigation Arrows */}
      {showArrows && agents.length > 3 && (
        <>
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
        </>
      )}

      {/* Pagination dots */}
      <div className="mt-4 flex items-center justify-center gap-2 lg:hidden">
        {agents.map((agent, i) => (
          <button
            key={agent.slug}
            onClick={() => scrollToIndex(i)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? 24 : 8,
              background: i === activeIndex ? agent.color : 'rgba(139, 146, 165, 0.3)',
            }}
            aria-label={`Aller à ${agent.name}`}
          />
        ))}
      </div>
    </div>
  )
}
