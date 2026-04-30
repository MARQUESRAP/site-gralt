import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AuditForm from './AuditForm'

export const metadata: Metadata = {
  title: 'Audit IA gratuit pour votre entreprise',
  description:
    "Donnez l'URL de votre site et de votre LinkedIn. En 10 minutes, vous recevez un PDF d'audit personnalisé qui identifie 3 process automatisables, chiffrés en heures gagnées par semaine.",
  alternates: { canonical: 'https://gralt.fr/audit' },
  openGraph: {
    title: 'Audit IA gratuit pour votre entreprise · Gralt',
    description:
      "10 minutes, un PDF, 3 process automatisables identifiés sur votre entreprise. Aucun engagement.",
    url: 'https://gralt.fr/audit',
    siteName: 'Gralt',
    type: 'website',
    locale: 'fr_FR',
  },
  robots: { index: true, follow: true },
}

export default function AuditPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-dark-bg pb-24 pt-12 sm:pt-20">
      <BackgroundDecor />

      <div className="relative mx-auto flex w-full max-w-[1080px] flex-col gap-14 px-6 sm:gap-20 sm:px-8">
        <Header />

        {/* HERO + PDF mockup */}
        <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="flex flex-col gap-6">
            <Eyebrow>Dossier d&apos;audit IA · Gratuit</Eyebrow>

            <h1 className="font-sans text-[clamp(2rem,5.4vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.035em] text-text-primary text-balance">
              Ce qu&apos;on peut détecter dans votre entreprise,{' '}
              <span className="text-accent [text-shadow:0_0_20px_rgba(0,229,204,0.4),0_0_60px_rgba(0,229,204,0.2)]">
                rien qu&apos;avec votre URL.
              </span>
            </h1>

            <p className="max-w-[58ch] text-base leading-[1.6] text-text-primary/85 sm:text-[17px]">
              Donnez-nous l&apos;URL de votre site et de votre page LinkedIn. En 10 minutes, vous recevez
              un PDF personnalisé à votre branding qui identifie{' '}
              <span className="font-semibold text-text-primary">3 process automatisables</span>, chiffrés
              en heures gagnées par semaine. Aucun engagement, aucune diapositive commerciale.
            </p>

            <div className="mt-1">
              <SocialProof />
            </div>
          </div>

          <div className="hidden justify-center lg:flex">
            <PdfMockup />
          </div>
        </section>

        {/* FORMULAIRE */}
        <section
          aria-label="Formulaire d'audit"
          className="relative"
        >
          {/* Halo cyan animé autour de la card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-[2px] rounded-[26px] opacity-50 blur-md"
            style={{
              background:
                'linear-gradient(120deg, rgba(0,229,204,0.4), transparent 30%, transparent 70%, rgba(0,229,204,0.4))',
              backgroundSize: '200% 100%',
              animation: 'audit-glow-rotate 8s linear infinite',
            }}
          />

          <div
            className="relative rounded-3xl border border-accent/30 bg-dark-card/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.4),0_0_40px_rgba(0,229,204,0.10),inset_0_1px_0_rgba(0,229,204,0.10)] backdrop-blur-[16px] sm:p-9"
          >
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                Formulaire · 3 champs · 30 secondes
              </span>
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.06em] text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E]" />
                Agent en ligne
              </span>
            </div>

            <AuditForm />
          </div>
        </section>

        {/* PROCESS DIAGRAM */}
        <section>
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-text-primary sm:text-[28px]">
              Comment ça marche
            </h2>
            <span className="text-[11px] uppercase tracking-[0.18em] text-text-secondary">
              3 étapes · 10 minutes
            </span>
          </div>
          <ProcessDiagram />
        </section>
      </div>
    </main>
  )
}

/* ─────────────────────────────────────────── */
/* Header                                     */
/* ─────────────────────────────────────────── */
function Header() {
  return (
    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-text-secondary">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-text-primary transition-colors hover:text-accent"
        aria-label="Retour à la page d'accueil Gralt"
      >
        <span aria-hidden className="text-base leading-none">←</span>
        <span className="font-semibold tracking-[0.04em] normal-case">Gralt</span>
      </Link>
      <span>Audit IA</span>
    </div>
  )
}

/* ─────────────────────────────────────────── */
/* Eyebrow avec dot pulsant                   */
/* ─────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
      <span className="relative inline-flex h-2 w-2">
        <span
          className="absolute inset-0 rounded-full bg-accent opacity-60"
          style={{ animation: 'audit-ping 1.8s cubic-bezier(0,0,0.2,1) infinite' }}
        />
        <span className="relative h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(0,229,204,1)]" />
      </span>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────── */
/* Social proof                               */
/* ─────────────────────────────────────────── */
function SocialProof() {
  return (
    <div className="inline-flex items-center gap-5 rounded-2xl border border-dark-border bg-dark-card/70 px-5 py-3.5 backdrop-blur-md">
      <div className="flex">
        {[
          'linear-gradient(135deg,#00E5CC,#0099AA)',
          'linear-gradient(135deg,#B44AFF,#7928CA)',
          'linear-gradient(135deg,#22C55E,#15803D)',
          'linear-gradient(135deg,#FB923C,#F472B6)',
        ].map((bg, i) => (
          <span
            key={i}
            aria-hidden
            className="h-8 w-8 rounded-full border-[2px] border-dark-bg"
            style={{
              background: bg,
              marginLeft: i === 0 ? 0 : -10,
              zIndex: 4 - i,
            }}
          />
        ))}
      </div>
      <span className="h-7 w-px bg-dark-border" />
      <div className="flex flex-col gap-0.5">
        <p className="text-[13px] font-semibold text-text-primary">
          <span className="text-accent">295</span> entreprises auditées
        </p>
        <p className="text-[11px] tracking-[0.04em] text-text-secondary">
          PDF livré en moins de 10 minutes · Note 4.6/5
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────── */
/* PDF mockup — image réelle (Lemonway)        */
/* ─────────────────────────────────────────── */
function PdfMockup() {
  return (
    <div
      className="audit-pdf-float relative"
      style={{
        perspective: 1200,
        filter:
          'drop-shadow(0 30px 60px rgba(0,0,0,0.5)) drop-shadow(0 0 40px rgba(0,229,204,0.20))',
      }}
    >
      <div
        className="relative overflow-hidden rounded-xl border border-accent/40"
        style={{ transform: 'rotateY(-12deg) rotateX(4deg)' }}
      >
        <Image
          src="/audit-pdf-preview.png"
          alt="Aperçu d'un audit IA Gralt — exemple Lemonway"
          width={460}
          height={258}
          priority
          className="block"
        />
        {/* Sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 h-full w-1/2"
          style={{
            left: '-50%',
            background:
              'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)',
            animation: 'audit-pdf-sheen 5s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────── */
/* Process diagram                             */
/* ─────────────────────────────────────────── */
function ProcessDiagram() {
  const steps = [
    {
      i: '01',
      t: 'Vous donnez vos URL',
      d: "Site, LinkedIn, ou les deux. Aucun compte requis, pas de carte bancaire.",
      icon: 'link' as const,
    },
    {
      i: '02',
      t: 'Notre agent analyse',
      d: 'Scraping + croisement avec 295 cas similaires, structuration en 10 sections.',
      icon: 'cpu' as const,
    },
    {
      i: '03',
      t: 'Vous recevez le PDF',
      d: 'Brandé à vos couleurs, avec votre logo, dans votre boîte mail. En 10 minutes.',
      icon: 'mail' as const,
    },
  ]

  return (
    <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0">
      {/* Ligne de connexion + impulsion */}
      <div
        aria-hidden
        className="pointer-events-none absolute hidden sm:block"
        style={{ top: 28, left: '16.6%', right: '16.6%', height: 1 }}
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(0,229,204,0.4) 20%, rgba(0,229,204,0.4) 80%, transparent)',
          }}
        />
        <div
          className="absolute"
          style={{
            top: -2,
            left: 0,
            width: 60,
            height: 5,
            background:
              'linear-gradient(90deg, transparent, rgba(0,229,204,1), transparent)',
            filter: 'drop-shadow(0 0 8px rgba(0,229,204,1))',
            borderRadius: 3,
            animation: 'audit-process-pulse 3s ease-in-out infinite',
          }}
        />
      </div>

      {steps.map((s) => (
        <div
          key={s.i}
          className="relative flex flex-row items-start gap-4 sm:flex-col sm:items-center sm:gap-3 sm:px-4 sm:text-center"
        >
          <div
            className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-accent/40 bg-dark-bg text-accent"
            style={{
              boxShadow:
                '0 0 0 4px var(--color-dark-bg), 0 0 20px rgba(0,229,204,0.20), inset 0 0 12px rgba(0,229,204,0.10)',
            }}
          >
            <ProcessIcon name={s.icon} />
            <span
              className="absolute -right-1.5 -top-1.5 rounded px-1.5 py-0.5 text-[9px] font-bold tracking-[0.18em] text-dark-bg"
              style={{ background: '#00E5CC' }}
            >
              {s.i}
            </span>
          </div>
          <div>
            <h3 className="mb-1 text-[15px] font-semibold tracking-[-0.01em] text-text-primary">
              {s.t}
            </h3>
            <p className="max-w-none text-[13px] leading-[1.5] text-text-secondary sm:max-w-[220px]">
              {s.d}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function ProcessIcon({ name }: { name: 'link' | 'cpu' | 'mail' }) {
  const common = {
    width: 22,
    height: 22,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (name === 'link') {
    return (
      <svg {...common} viewBox="0 0 24 24" aria-hidden>
        <path d="M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
        <path d="M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
      </svg>
    )
  }
  if (name === 'cpu') {
    return (
      <svg {...common} viewBox="0 0 24 24" aria-hidden>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
      </svg>
    )
  }
  return (
    <svg {...common} viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

/* ─────────────────────────────────────────── */
/* Background : grille + glows cyan            */
/* ─────────────────────────────────────────── */
function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top glow */}
      <div
        className="absolute -top-40 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(0, 229, 204, 0.30), rgba(0, 229, 204, 0))',
        }}
      />
      {/* Bottom glow */}
      <div
        className="absolute right-[-8%] bottom-[-15%] h-[480px] w-[480px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(0, 153, 170, 0.45), rgba(0, 153, 170, 0))',
        }}
      />
      {/* Grille cyan */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,204,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,204,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)',
        }}
      />
      {/* Scan lines subtiles */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(0,229,204,0.015) 0px, rgba(0,229,204,0.015) 1px, transparent 1px, transparent 4px)',
        }}
      />
    </div>
  )
}
