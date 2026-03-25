'use client'

import Image from 'next/image'
import SectionBackground from '@/components/ui/SectionBackground'
import NeonText from '@/components/ui/NeonText'
import CTAButton from '@/components/ui/CTAButton'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ShimmerEffect from '@/components/ui/ShimmerEffect'

const teamAgents = [
  { name: 'Zeus', image: '/agents/zeus.webp', offset: 'translate-y-2' },
  { name: 'Apollo', image: '/agents/apollo.webp', offset: '-translate-y-1' },
  { name: 'Isis', image: '/agents/isis.webp', offset: 'translate-y-3' },
  { name: 'Attila', image: '/agents/attila.webp', offset: '-translate-y-2' },
  { name: 'Odin', image: '/agents/odin.webp', offset: 'translate-y-1' },
  { name: 'Atlas', image: '/agents/atlas.webp', offset: '-translate-y-1' },
]

export default function FinalCTA() {
  return (
    <section className="relative px-6 py-[120px]">
      <SectionBackground color="#00E5CC" secondaryColor="#B44AFF" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <NeonText as="h2" size="lg" className="mb-10">
            Prêt à rencontrer votre prochaine équipe ?
          </NeonText>

          {/* Team illustration — 6 golden agents with photos */}
          <div className="relative mx-auto mb-10 grid max-w-[650px] grid-cols-3 gap-4 rounded-2xl px-6 py-6 sm:gap-5 sm:py-8 md:grid-cols-6 md:gap-6"
            style={{
              background: 'rgba(245, 200, 66, 0.05)',
              border: '1px solid rgba(245, 200, 66, 0.15)',
            }}
          >
            <ShimmerEffect />
            {teamAgents.map((agent) => (
              <div key={agent.name} className={`relative z-10 flex flex-col items-center gap-1.5 sm:gap-2 md:${agent.offset}`}>
                <div
                  className="relative h-14 w-14 overflow-hidden rounded-full sm:h-16 sm:w-16 md:h-20 md:w-20"
                  style={{
                    border: '2px solid #F5C842',
                    boxShadow: '0 0 15px rgba(245, 200, 66, 0.3), 0 0 30px rgba(245, 200, 66, 0.1)',
                  }}
                >
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <span
                  className="text-xs font-medium md:text-sm"
                  style={{ color: '#F5C842', textShadow: '0 0 8px rgba(245, 200, 66, 0.3)' }}
                >
                  {agent.name}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href="#sections" pulse>
              Explorer les agents
            </CTAButton>
            <CTAButton variant="secondary" href="/rendez-vous">
              Réserver un audit gratuit
            </CTAButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
