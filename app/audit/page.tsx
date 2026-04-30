import type { Metadata } from 'next'
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
      <BackgroundGlow />

      <div className="relative mx-auto flex w-full max-w-2xl flex-col gap-12 px-6 sm:gap-16 sm:px-8">
        <Header />

        <section className="flex flex-col gap-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            Dossier d'audit IA · Gratuit
          </p>

          <h1 className="font-sans text-[clamp(2rem,5.4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary">
            Ce qu'on peut détecter dans votre entreprise,{' '}
            <span className="text-accent">rien qu'avec votre URL.</span>
          </h1>

          <p className="max-w-[58ch] text-base leading-[1.65] text-text-primary/85 sm:text-[17px]">
            Donnez-nous l'URL de votre site et de votre page LinkedIn. En 10 minutes, vous recevez
            un PDF personnalisé à votre branding qui identifie{' '}
            <span className="font-semibold text-text-primary">3 process automatisables</span>,
            chiffrés en heures gagnées par semaine. Aucun engagement, aucune diapositive
            commerciale.
          </p>
        </section>

        <section
          aria-label="Formulaire d'audit"
          className="rounded-2xl border border-dark-border bg-dark-card/60 p-6 backdrop-blur-[12px] sm:p-8"
        >
          <AuditForm />
        </section>

        <Reassurance />
      </div>
    </main>
  )
}

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

function Reassurance() {
  return (
    <section
      aria-label="Comment ça marche"
      className="grid grid-cols-1 gap-3 sm:grid-cols-3"
    >
      <ReassuranceItem index="01" title="Vous donnez vos URL">
        Site, LinkedIn, ou les deux. Pas besoin d'inscription, pas de carte bancaire.
      </ReassuranceItem>
      <ReassuranceItem index="02" title="Notre agent analyse">
        Scraping, croisement avec 314 cas similaires, structuration en 10 sections.
      </ReassuranceItem>
      <ReassuranceItem index="03" title="Vous recevez le PDF">
        Brandé à vos couleurs, avec votre logo, dans votre boîte mail. En 10 minutes.
      </ReassuranceItem>
    </section>
  )
}

interface ReassuranceItemProps {
  index: string
  title: string
  children: string
}

function ReassuranceItem({ index, title, children }: ReassuranceItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
        {index}
      </span>
      <h3 className="text-base font-semibold leading-snug tracking-[-0.01em] text-text-primary">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-text-secondary">{children}</p>
    </div>
  )
}

function BackgroundGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-[0.18] blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(0, 229, 204, 0.55), rgba(0, 229, 204, 0))',
        }}
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] h-[360px] w-[360px] rounded-full opacity-[0.10] blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(0, 153, 170, 0.6), rgba(0, 153, 170, 0))',
        }}
      />
    </div>
  )
}
