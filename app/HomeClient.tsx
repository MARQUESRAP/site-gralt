'use client'

import Link from 'next/link'

const GREEN = '#11241B'
const CREAM = '#FBF6E7'
const CREAM_SOFT = '#F5EFDB'
const YELLOW = '#F5D547'
const YELLOW_DEEP = '#E0BB1F'
const TEXT_ON_GREEN = '#F7F3E3'
const TEXT_ON_CREAM = '#1A1F1A'
const TEXT_MUTED = 'rgba(247, 243, 227, 0.7)'

// ═══════════════════════════════════════════════════════════════════════════
// SchemaPlaceholder — a single reusable, clearly-marked dashed area where a
// schema image (provided separately by Raphaël) will be dropped later.
// ═══════════════════════════════════════════════════════════════════════════

function SchemaPlaceholder({
  label,
  hint,
  aspect = '5/4',
  bg = CREAM_SOFT,
  borderColor = YELLOW_DEEP,
}: {
  label: string
  hint: string
  aspect?: string
  bg?: string
  borderColor?: string
}) {
  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl px-6 py-6"
      style={{
        aspectRatio: aspect,
        background: bg,
        border: `2px dashed ${borderColor}`,
      }}
    >
      <div className="flex flex-col items-center text-center">
        <span
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ color: borderColor, opacity: 0.85 }}
        >
          {label}
        </span>
        <p
          className="max-w-sm text-[12px] leading-snug"
          style={{ color: 'rgba(26, 31, 26, 0.65)' }}
        >
          {hint}
        </p>
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

        {/* RIGHT — schema placeholder (image fournie par Raphaël) */}
        <div className="lg:pl-4">
          <SchemaPlaceholder
            label="Schéma hero · à fournir"
            hint="Schéma Sources → Hub GRÄLT → Actions automatiques, sur fond dark green ou cream selon ta préférence. Image fournie séparément par toi (PNG/SVG), à déposer dans public/ puis on remplace ce placeholder par <Image>."
            aspect="6/5"
          />
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Section 2 — Comment ça se passe (3 steps, illustrations à fournir)
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
      'Sketch : Raphaël en discussion avec un dirigeant, prise de notes, premières pistes',
  },
  {
    num: '02',
    title: 'Analyse terrain',
    pill: '30 min à 1h par personne, étalé sur 1 à 3 jours',
    illustrationHint:
      'Sketch : un manager devant un tableau avec ses tâches, Raphaël qui observe et documente',
  },
  {
    num: '03',
    title: 'Plan + livraison',
    pill: '2 à 5 semaines',
    illustrationHint:
      'Sketch : un colis avec checkmark vert, automatisations prêtes à l\'emploi',
  },
]

function StepCard({ step }: { step: Step }) {
  return (
    <div
      className="flex flex-col rounded-2xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
      style={{ background: CREAM }}
    >
      <SchemaPlaceholder
        label={`Illustration ${step.num} · à fournir`}
        hint={step.illustrationHint}
        aspect="4/3"
        bg={CREAM_SOFT}
      />

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
