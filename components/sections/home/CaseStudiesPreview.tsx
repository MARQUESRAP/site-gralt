'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import GlassCard from '@/components/ui/GlassCard'
import NeonText from '@/components/ui/NeonText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionBackground from '@/components/ui/SectionBackground'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import type { CaseStudy } from '@/types'

function ProjectCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link href={`/travaux/${cs.slug}`} className="shrink-0">
      <GlassCard color="#00E5CC" className="w-[300px] overflow-hidden p-4 md:w-[340px]">
        {cs.image ? (
          <div className="relative mb-4 w-full overflow-hidden rounded-lg bg-[#0d1120]" style={{ aspectRatio: '16 / 10' }}>
            <Image src={cs.image} alt={cs.title} fill className="object-contain" sizes="340px" />
          </div>
        ) : (
          <ImagePlaceholder
            width="100%"
            height={180}
            label={`Screenshot ${cs.title}`}
            color="#00E5CC"
            className="mb-4"
          />
        )}
        <h3 className="mb-3 text-lg font-semibold text-text-primary">
          {cs.title}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary line-clamp-3">
          {cs.results[0]}
        </p>
      </GlassCard>
    </Link>
  )
}

export default function CaseStudiesPreview({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId: number
    const speed = 0.5 // px per frame

    const animate = () => {
      if (!isPaused && el) {
        el.scrollLeft += speed
        // When we've scrolled past the first set, jump back seamlessly
        const halfWidth = el.scrollWidth / 2
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth
        }
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [isPaused])

  return (
    <section className="relative px-6 py-[120px]">
      <SectionBackground color="#00E5CC" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal>
          <NeonText as="h2" size="lg" className="mb-4 text-center">
            Ce que j&apos;ai déjà construit
          </NeonText>
          <p className="mb-12 text-center text-text-secondary">
            Des projets concrets, des résultats mesurables.
          </p>
        </ScrollReveal>

        {/* Carrousel infini */}
        <ScrollReveal delay={0.2}>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto py-2 pb-4 scrollbar-hide"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* First set */}
            {caseStudies.map((cs) => (
              <ProjectCard key={cs.slug} cs={cs} />
            ))}
            {/* Duplicate for seamless loop */}
            {caseStudies.map((cs) => (
              <ProjectCard key={`dup-${cs.slug}`} cs={cs} />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 text-center">
            <Link
              href="/travaux"
              className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent/80"
            >
              Voir tous les projets <span>→</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
