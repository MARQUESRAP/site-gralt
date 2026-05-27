'use client'

import Link from 'next/link'

const GREEN = '#11241B'
const GREEN_SOFT = '#1A3024'
const CREAM = '#FBF6E7'
const CREAM_SOFT = '#F5EFDB'
const YELLOW = '#F5D547'
const YELLOW_DEEP = '#E0BB1F'
const TEXT_ON_GREEN = '#F7F3E3'
const TEXT_ON_CREAM = '#1A1F1A'
const TEXT_MUTED = 'rgba(247, 243, 227, 0.7)'

// ═══════════════════════════════════════════════════════════════════════════
// Hero schema — Sources → GRÄLT hub → Actions automatiques
// Coded natively in HTML/SVG. Yellow dashed arrows + cream cards on green.
// ═══════════════════════════════════════════════════════════════════════════

function CrownIcon({ size = 16, color = YELLOW }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 24 18" fill={color} aria-hidden>
      <path d="M2 16h20l-2-12-5 4-3-6-3 6-5-4z" />
      <circle cx="2" cy="3" r="1.5" />
      <circle cx="12" cy="1.5" r="1.5" />
      <circle cx="22" cy="3" r="1.5" />
    </svg>
  )
}

function SourceCard({
  label,
  sub,
  icon,
  iconBg,
}: {
  label: string
  sub: string
  icon: React.ReactNode
  iconBg: string
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-3.5 py-3"
      style={{
        background: CREAM,
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
      }}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ background: iconBg }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: TEXT_ON_CREAM }}>
          {label}
        </div>
        <div className="text-[11px] leading-tight" style={{ color: 'rgba(26, 31, 26, 0.65)' }}>
          {sub}
        </div>
      </div>
    </div>
  )
}

function ActionCard({
  label,
  icon,
  iconBg,
}: {
  label: string
  icon: React.ReactNode
  iconBg: string
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-3.5 py-2.5"
      style={{
        background: CREAM,
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
      }}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
        style={{ background: iconBg }}
      >
        {icon}
      </span>
      <div className="flex-1 text-sm font-medium" style={{ color: TEXT_ON_CREAM }}>
        {label}
      </div>
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
        style={{ background: '#22C55E' }}
        aria-label="Fait"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.2em]"
      style={{ color: YELLOW }}
    >
      {children}
    </div>
  )
}

function HeroSchema() {
  return (
    <div className="relative">
      {/* Background SVG with hand-drawn dashed arrows */}
      <svg
        viewBox="0 0 800 460"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <marker id="arrowYellow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill={YELLOW} />
          </marker>
        </defs>
        {/* Sources → Hub arrows (3 sources merging into center) */}
        <path
          d="M 180 100 C 260 100, 280 200, 340 220"
          stroke={YELLOW}
          strokeWidth="2.5"
          strokeDasharray="6 5"
          fill="none"
          markerEnd="url(#arrowYellow)"
          opacity="0.85"
        />
        <path
          d="M 180 230 C 260 230, 280 230, 340 230"
          stroke={YELLOW}
          strokeWidth="2.5"
          strokeDasharray="6 5"
          fill="none"
          markerEnd="url(#arrowYellow)"
          opacity="0.85"
        />
        <path
          d="M 180 360 C 260 360, 280 260, 340 240"
          stroke={YELLOW}
          strokeWidth="2.5"
          strokeDasharray="6 5"
          fill="none"
          markerEnd="url(#arrowYellow)"
          opacity="0.85"
        />
        {/* Hub → Actions arrows (1 fan-out to 5) */}
        <path
          d="M 480 220 C 540 220, 560 70, 620 70"
          stroke={YELLOW}
          strokeWidth="2.5"
          strokeDasharray="6 5"
          fill="none"
          markerEnd="url(#arrowYellow)"
          opacity="0.85"
        />
        <path
          d="M 480 225 C 540 225, 560 150, 620 150"
          stroke={YELLOW}
          strokeWidth="2.5"
          strokeDasharray="6 5"
          fill="none"
          markerEnd="url(#arrowYellow)"
          opacity="0.85"
        />
        <path
          d="M 480 230 C 540 230, 560 230, 620 230"
          stroke={YELLOW}
          strokeWidth="2.5"
          strokeDasharray="6 5"
          fill="none"
          markerEnd="url(#arrowYellow)"
          opacity="0.85"
        />
        <path
          d="M 480 235 C 540 235, 560 310, 620 310"
          stroke={YELLOW}
          strokeWidth="2.5"
          strokeDasharray="6 5"
          fill="none"
          markerEnd="url(#arrowYellow)"
          opacity="0.85"
        />
        <path
          d="M 480 240 C 540 240, 560 390, 620 390"
          stroke={YELLOW}
          strokeWidth="2.5"
          strokeDasharray="6 5"
          fill="none"
          markerEnd="url(#arrowYellow)"
          opacity="0.85"
        />
      </svg>

      {/* Foreground content grid */}
      <div className="relative grid grid-cols-[1fr_1.15fr_1fr] items-center gap-6 px-2 py-2">
        {/* SOURCES column */}
        <div>
          <SectionLabel>Sources</SectionLabel>
          <div className="flex flex-col gap-3">
            <SourceCard
              label="Formulaire"
              sub="Demandes site web"
              iconBg="rgba(56, 130, 246, 0.18)"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="18" rx="2" />
                  <path d="M8 8h8M8 12h8M8 16h5" />
                </svg>
              }
            />
            <SourceCard
              label="Email"
              sub="Boîte de réception"
              iconBg="rgba(251, 146, 60, 0.18)"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              }
            />
            <SourceCard
              label="Fichier"
              sub="Excel, CSV, Google Sheets"
              iconBg="rgba(34, 197, 94, 0.18)"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h9l4 4v14H6z" />
                  <path d="M15 3v4h4" />
                </svg>
              }
            />
          </div>
        </div>

        {/* HUB column — central GRÄLT panel */}
        <div className="flex justify-center">
          <div
            className="relative rounded-2xl px-7 py-7"
            style={{
              background: CREAM,
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.35), 0 0 0 4px rgba(245, 213, 71, 0.15)',
              minWidth: 200,
            }}
          >
            <div className="flex flex-col items-center">
              <div className="mb-1.5"><CrownIcon size={28} /></div>
              <div
                className="mb-5 text-3xl font-extrabold tracking-tight"
                style={{ color: YELLOW_DEEP, letterSpacing: '-0.02em' }}
              >
                GRÄLT
              </div>

              <ul className="space-y-3">
                {[
                  {
                    label: 'TRIE',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={YELLOW_DEEP} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 6h16M7 12h10M10 18h4" />
                      </svg>
                    ),
                  },
                  {
                    label: 'ANALYSE',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={YELLOW_DEEP} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                      </svg>
                    ),
                  },
                  {
                    label: 'AGIT',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={YELLOW_DEEP} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2 4 14h7l-1 8 9-12h-7z" fill={YELLOW_DEEP} fillOpacity="0.15" />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-lg font-bold tracking-wide" style={{ color: TEXT_ON_CREAM }}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ACTIONS column */}
        <div>
          <SectionLabel>Actions automatiques</SectionLabel>
          <div className="flex flex-col gap-2">
            <ActionCard
              label="Email envoyé"
              iconBg="rgba(56, 130, 246, 0.18)"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              }
            />
            <ActionCard
              label="Post LinkedIn publié"
              iconBg="rgba(10, 102, 194, 0.18)"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden>
                  <path d="M4.98 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h4v1.7c.6-1 1.9-2 4-2 4 0 5 2.5 5 6V21h-4v-5.3c0-1.4-.5-2.7-2-2.7s-2 1.3-2 2.7V21h-5z" />
                </svg>
              }
            />
            <ActionCard
              label="Fiche CRM mise à jour"
              iconBg="rgba(251, 146, 60, 0.18)"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="9" cy="11" r="2" />
                  <path d="M5 17c0-2 2-3 4-3s4 1 4 3M15 10h4M15 14h3" />
                </svg>
              }
            />
            <ActionCard
              label="Document classé"
              iconBg="rgba(245, 213, 71, 0.22)"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={YELLOW_DEEP} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              }
            />
            <ActionCard
              label="Notification équipe"
              iconBg="rgba(244, 114, 182, 0.18)"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z" />
                  <path d="M10 21h4" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Section 1 — Hero
// ═══════════════════════════════════════════════════════════════════════════

function Hero() {
  return (
    <section className="relative px-6 pt-12 pb-16 md:pt-16 md:pb-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-center lg:gap-12">
        {/* LEFT — copy */}
        <div>
          <p
            className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{ color: YELLOW }}
          >
            Automatisation pour PME
          </p>
          <h1
            className="mb-6 font-extrabold leading-[0.95] tracking-tight"
            style={{
              color: TEXT_ON_GREEN,
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              letterSpacing: '-0.025em',
            }}
          >
            Récupérez{' '}
            <span style={{ color: YELLOW }}>5 à 30 heures</span>
            <br />
            par semaine.
          </h1>
          <p
            className="mb-8 max-w-xl text-lg leading-relaxed"
            style={{ color: TEXT_MUTED }}
          >
            Nous automatisons les tâches répétitives pour que vous vous
            concentriez sur la croissance.
          </p>

          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Link
              href="/rendez-vous"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-transform hover:scale-[1.02]"
              style={{
                background: YELLOW,
                color: GREEN,
                boxShadow: '0 4px 18px rgba(245, 213, 71, 0.35)',
              }}
            >
              Réserver un audit gratuit
            </Link>
            <Link
              href="#exemple"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                color: TEXT_ON_GREEN,
                border: `1.5px solid ${TEXT_MUTED}`,
                background: 'transparent',
              }}
            >
              Voir un exemple
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            {['Approche terrain', 'Résultats rapides', 'Sans engagement'].map((label) => (
              <span key={label} className="flex items-center gap-2" style={{ color: TEXT_MUTED }}>
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: '#22C55E', boxShadow: '0 0 6px #22C55E' }}
                />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — schema */}
        <div className="lg:pl-4">
          <HeroSchema />
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Section 2 — Comment ça se passe (3 steps with illustration placeholders)
// ═══════════════════════════════════════════════════════════════════════════

type Step = {
  num: string
  title: string
  pill: string
  illustrationHint: string
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Audit découverte gratuit',
    pill: '30 min',
    illustrationHint:
      'Illustration sketch : deux silhouettes (Raphaël + dirigeant) en discussion à un bureau, avec une bulle qui montre des checkmarks et idées',
  },
  {
    num: '02',
    title: 'Analyse terrain',
    pill: '30 min à 1h par personne, étalé sur 1 à 3 jours',
    illustrationHint:
      'Illustration sketch : un manager devant un tableau avec post-it / notes de sa journée type, un observateur qui prend des notes à côté',
  },
  {
    num: '03',
    title: 'Plan + livraison',
    pill: '2 à 5 semaines',
    illustrationHint:
      'Illustration sketch : un colis / box avec un checkmark vert dessus, symbolisant l\'automatisation livrée prête à l\'emploi',
  },
]

function StepIllustrationPlaceholder({ hint, num }: { hint: string; num: string }) {
  return (
    <div
      className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl"
      style={{
        background: CREAM_SOFT,
        border: `2px dashed ${YELLOW_DEEP}`,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <span
          className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ color: YELLOW_DEEP, opacity: 0.7 }}
        >
          Illustration {num} — à générer
        </span>
        <p
          className="text-[11px] leading-snug"
          style={{ color: 'rgba(26, 31, 26, 0.65)' }}
        >
          {hint}
        </p>
      </div>
    </div>
  )
}

function StepCard({ step }: { step: Step }) {
  return (
    <div
      className="flex flex-col rounded-2xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
      style={{ background: CREAM }}
    >
      <StepIllustrationPlaceholder hint={step.illustrationHint} num={step.num} />

      <div className="mt-5 flex items-baseline gap-3">
        <span
          className="text-3xl font-extrabold leading-none"
          style={{ color: YELLOW_DEEP, letterSpacing: '-0.02em' }}
        >
          {step.num}
        </span>
        <h3 className="text-lg font-bold leading-tight" style={{ color: TEXT_ON_CREAM }}>
          {step.title}
        </h3>
      </div>

      <div className="mt-4">
        <span
          className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium"
          style={{
            background: 'rgba(245, 213, 71, 0.18)',
            color: YELLOW_DEEP,
            border: `1px solid ${YELLOW_DEEP}33`,
          }}
        >
          {step.pill}
        </span>
      </div>
    </div>
  )
}

function StepArrow() {
  return (
    <div className="hidden items-center justify-center lg:flex" aria-hidden>
      <svg width="56" height="20" viewBox="0 0 56 20" fill="none">
        <path
          d="M 4 10 L 48 10"
          stroke={YELLOW}
          strokeWidth="2.5"
          strokeDasharray="6 5"
          strokeLinecap="round"
        />
        <path
          d="M 42 4 L 52 10 L 42 16"
          stroke={YELLOW}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function HowItWorks() {
  return (
    <section id="methode" className="relative px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-center gap-4">
          <svg width="50" height="14" viewBox="0 0 50 14" aria-hidden>
            <path d="M2 7 L 44 7" stroke={YELLOW} strokeWidth="2" strokeDasharray="5 4" />
            <path d="M 38 2 L 48 7 L 38 12" stroke={YELLOW} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <h2
            className="text-sm font-bold uppercase tracking-[0.22em]"
            style={{ color: YELLOW }}
          >
            Comment ça se passe
          </h2>
          <svg width="50" height="14" viewBox="0 0 50 14" aria-hidden style={{ transform: 'scaleX(-1)' }}>
            <path d="M2 7 L 44 7" stroke={YELLOW} strokeWidth="2" strokeDasharray="5 4" />
            <path d="M 38 2 L 48 7 L 38 12" stroke={YELLOW} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-2">
          <StepCard step={STEPS[0]} />
          <StepArrow />
          <StepCard step={STEPS[1]} />
          <StepArrow />
          <StepCard step={STEPS[2]} />
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page assembly
// ═══════════════════════════════════════════════════════════════════════════

export default function HomeClient() {
  return (
    <div
      className="min-h-screen"
      style={{ background: GREEN, color: TEXT_ON_GREEN }}
    >
      <Hero />
      <HowItWorks />
    </div>
  )
}
