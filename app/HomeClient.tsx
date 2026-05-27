'use client'

import Image from 'next/image'
import Link from 'next/link'

// ─── Tokens ─────────────────────────────────────────────────────────────────
const GREEN = '#11241B'
const GREEN_DEEP = '#0B1B12'
const YELLOW = '#F5D547'
const YELLOW_DEEP = '#E0BB1F'
const CREAM = '#FBF6E7'
const TEXT_ON_GREEN = '#F7F3E3'
const TEXT_ON_CREAM = '#1A1F1A'
const TEXT_MUTED = 'rgba(247, 243, 227, 0.72)'

// ─── Small primitives ───────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-center gap-3">
      <svg width="50" height="14" viewBox="0 0 50 14" aria-hidden>
        <path d="M2 7 L 44 7" stroke={YELLOW} strokeWidth="2" strokeDasharray="5 4" />
        <path d="M 38 2 L 48 7 L 38 12" stroke={YELLOW} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span
        className="text-sm font-bold uppercase tracking-[0.22em]"
        style={{ color: YELLOW }}
      >
        {children}
      </span>
      <svg width="50" height="14" viewBox="0 0 50 14" aria-hidden style={{ transform: 'scaleX(-1)' }}>
        <path d="M2 7 L 44 7" stroke={YELLOW} strokeWidth="2" strokeDasharray="5 4" />
        <path d="M 38 2 L 48 7 L 38 12" stroke={YELLOW} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function YellowCTA({ href, children, large = false }: { href: string; children: React.ReactNode; large?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full font-bold transition-transform hover:scale-[1.02] ${
        large ? 'px-7 py-3.5 text-base' : 'px-6 py-3 text-sm'
      }`}
      style={{
        background: YELLOW,
        color: GREEN,
        boxShadow: '0 4px 18px rgba(245, 213, 71, 0.32)',
      }}
    >
      {children}
    </Link>
  )
}

function OutlineCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
      style={{
        color: TEXT_ON_GREEN,
        border: `1.5px solid ${TEXT_MUTED}`,
      }}
    >
      {children}
    </Link>
  )
}

function GreenDotPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-xs" style={{ color: TEXT_MUTED }}>
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: '#22C55E', boxShadow: '0 0 6px #22C55E' }}
      />
      {children}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 1 — HERO (text left + cropped illustration right)
// ═══════════════════════════════════════════════════════════════════════════

function Hero() {
  return (
    <section className="relative px-6 pt-10 pb-12 md:pt-14 md:pb-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10">
        {/* Left — copy */}
        <div>
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: YELLOW }}>
            Automatisation pour PME
          </p>
          <h1
            className="mb-5 font-extrabold leading-[0.98] tracking-tight"
            style={{
              color: TEXT_ON_GREEN,
              fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
              letterSpacing: '-0.025em',
            }}
          >
            Récupérez{' '}
            <span style={{ color: YELLOW }}>5 à 30 heures</span>
            <br />
            par semaine.
          </h1>
          <p className="mb-7 max-w-xl text-base leading-relaxed md:text-lg" style={{ color: TEXT_MUTED }}>
            Nous automatisons les tâches répétitives pour que vous vous
            concentriez sur la croissance.
          </p>

          <div className="mb-7 flex flex-wrap items-center gap-3">
            <YellowCTA href="/rendez-vous">Réserver un audit gratuit</YellowCTA>
            <OutlineCTA href="#exemple">Voir un exemple</OutlineCTA>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <GreenDotPill>Approche terrain</GreenDotPill>
            <GreenDotPill>Résultats rapides</GreenDotPill>
            <GreenDotPill>Sans engagement</GreenDotPill>
          </div>
        </div>

        {/* Right — schema illustration (cropped from mockup) */}
        <div className="lg:pl-2">
          <Image
            src="/illustrations/hero-schema.png"
            alt="Schéma : sources (formulaire, email, fichier) traitées par l'automatisation Gralt, qui produit des actions automatiques (email envoyé, post LinkedIn publié, fiche CRM, document classé, notification équipe)"
            width={500}
            height={340}
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="block h-auto w-full"
          />
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 2 — TRUST BAND
// ═══════════════════════════════════════════════════════════════════════════

const TRUST_LOGOS = ['ACME', 'NOVA', 'ALPHA', 'PIVOT', 'LUMEN']

function TrustBand() {
  return (
    <section className="relative px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: YELLOW, opacity: 0.85 }}>
            Ils me font confiance
          </span>
        </div>
        <div
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-xl px-6 py-4"
          style={{
            background: 'rgba(0, 0, 0, 0.18)',
            border: '1px solid rgba(245, 213, 71, 0.08)',
          }}
        >
          {TRUST_LOGOS.map((name) => (
            <span
              key={name}
              className="text-base font-bold tracking-wider"
              style={{ color: TEXT_ON_GREEN, opacity: 0.6 }}
            >
              {name}
            </span>
          ))}
          <span className="mx-2 hidden h-5 w-px sm:inline-block" style={{ background: 'rgba(247, 243, 227, 0.15)' }} />
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
            style={{
              background: '#E50914',
              color: '#FFFFFF',
            }}
          >
            BFM BUSINESS
          </span>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 3 — PROMESSE CHIFFRÉE
// ═══════════════════════════════════════════════════════════════════════════

function Promesse() {
  return (
    <section className="relative px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div
              className="font-extrabold leading-none"
              style={{
                fontSize: 'clamp(5rem, 13vw, 9rem)',
                color: YELLOW,
                letterSpacing: '-0.04em',
                textShadow: `0 0 18px ${YELLOW}33`,
              }}
            >
              5 - 30h
            </div>
            <div
              className="mt-3 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: YELLOW }}
            >
              Récupérées chaque semaine dès les premières semaines
            </div>
          </div>

          <div>
            <p className="mb-6 text-base leading-relaxed" style={{ color: TEXT_ON_GREEN }}>
              Nous identifions les tâches chronophages, nous les automatisons, et vous
              gagnez du temps chaque semaine sans perturber votre activité.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: '9', label: 'automatisations en production' },
                { num: '6', label: 'clients accompagnés' },
                { num: '5', label: 'fonctions métier couvertes' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl px-3 py-3 text-center"
                  style={{
                    background: 'rgba(0, 0, 0, 0.18)',
                    border: '1px solid rgba(245, 213, 71, 0.12)',
                  }}
                >
                  <div className="text-2xl font-extrabold" style={{ color: YELLOW }}>
                    {s.num}
                  </div>
                  <div className="text-[10px] leading-tight" style={{ color: TEXT_MUTED }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 4 — COMMENT ÇA SE PASSE (3 step illustrations from mockup)
// ═══════════════════════════════════════════════════════════════════════════

function StepArrow() {
  return (
    <div className="hidden items-center justify-center lg:flex" aria-hidden>
      <svg width="50" height="20" viewBox="0 0 50 20" fill="none">
        <path d="M 4 10 L 42 10" stroke={YELLOW} strokeWidth="2.5" strokeDasharray="6 5" strokeLinecap="round" />
        <path d="M 36 4 L 46 10 L 36 16" stroke={YELLOW} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function HowItWorks() {
  const steps = [
    { src: '/illustrations/step-1.png', alt: 'Étape 1 : audit découverte gratuit, discussion entre Raphaël et un dirigeant' },
    { src: '/illustrations/step-2.png', alt: 'Étape 2 : analyse terrain, observation d\'un manager devant son tableau de tâches' },
    { src: '/illustrations/step-3.png', alt: 'Étape 3 : plan + livraison, automatisations livrées prêtes à l\'emploi' },
  ]

  return (
    <section id="methode" className="relative px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Comment ça se passe</SectionLabel>
        <p className="mb-12 text-center text-sm" style={{ color: TEXT_MUTED }}>
          Trois étapes simples, sans jargon technique.
        </p>

        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-2">
          {steps.map((step, idx) => (
            <div key={step.src} className="contents">
              <div className="flex flex-col items-center">
                <Image
                  src={step.src}
                  alt={step.alt}
                  width={250}
                  height={245}
                  sizes="(min-width: 1024px) 280px, 100vw"
                  className="block h-auto w-full max-w-[280px]"
                />
              </div>
              {idx < steps.length - 1 && <StepArrow />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 5 — CE QU'ON AUTOMATISE (5 colored category cards)
// ═══════════════════════════════════════════════════════════════════════════

type Category = {
  name: string
  color: string
  tasks: string[]
  pill: string
}

const CATEGORIES: Category[] = [
  {
    name: 'Prospection & Vente',
    color: '#00E5CC',
    tasks: ['Repérer les prospects', 'Envoyer 50 mails personnalisés / jour', 'Relancer automatiquement', 'Suivre ouvertures et clics'],
    pill: '15-25h / sem',
  },
  {
    name: 'Marketing & Contenu',
    color: '#B44AFF',
    tasks: ['Générer des posts LinkedIn', 'Créer des fiches produits', 'Programmer des campagnes mailing', 'Veiller votre secteur'],
    pill: '3-6h / sem',
  },
  {
    name: 'Admin & Finance',
    color: '#818CF8',
    tasks: ['Créer devis et factures', 'Relancer les impayés', 'Classer les documents reçus', 'Synchroniser CRM + agenda'],
    pill: 'Variable',
  },
  {
    name: 'RH & Recrutement',
    color: '#FB923C',
    tasks: ['Trier les CV reçus', 'Surveiller les plateformes', 'Pré-qualifier les candidats', 'Onboarder les nouveaux'],
    pill: '15-20h / sem',
  },
  {
    name: 'Opérations & Pilotage',
    color: '#F472B6',
    tasks: ['Alimenter une base produits', 'Synchroniser tous vos outils', 'Récap hebdo des chiffres', 'Alertes KPI en temps réel'],
    pill: '8-12h / sem',
  },
]

function CategoryCard({ cat }: { cat: Category }) {
  return (
    <div
      className="flex h-full flex-col rounded-xl p-5"
      style={{
        background: CREAM,
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="mb-4 flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
          aria-hidden
        />
        <h3 className="text-[15px] font-bold leading-tight" style={{ color: TEXT_ON_CREAM }}>
          {cat.name}
        </h3>
      </div>
      <ul className="mb-5 flex-1 space-y-2">
        {cat.tasks.map((t) => (
          <li key={t} className="flex items-start gap-2 text-[12px] leading-snug" style={{ color: 'rgba(26, 31, 26, 0.78)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={YELLOW_DEEP} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0">
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>{t}</span>
          </li>
        ))}
      </ul>
      <span
        className="self-start rounded-full px-3 py-1 text-[11px] font-bold"
        style={{
          background: `${cat.color}22`,
          color: cat.color,
          border: `1px solid ${cat.color}55`,
        }}
      >
        {cat.pill}
      </span>
    </div>
  )
}

function Categories() {
  return (
    <section id="solutions" className="relative px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Ce qu'on automatise</SectionLabel>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm" style={{ color: TEXT_MUTED }}>
          Cinq familles de tâches que des dirigeants comme vous faisaient à la main
          jusqu'à ce qu'on les automatise.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.name} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 6 — CAS CLIENTS RÉCENTS (6 case study cards)
// ═══════════════════════════════════════════════════════════════════════════

type CaseStudy = {
  client: string
  stat: string
  title: string
  desc: string
}

const CASE_STUDIES: CaseStudy[] = [
  { client: 'ACME', stat: '25h / sem', title: 'Automatisation de prospection', desc: '50 mails personnalisés par jour, basés sur signaux LinkedIn.' },
  { client: 'NOVA', stat: '300 / mois', title: 'Génération de contenu', desc: 'Posts LinkedIn publiés en continu, validés en 1 clic.' },
  { client: 'ALPHA', stat: '18h / sem', title: 'Administration financière', desc: 'Relance impayés et création de factures automatisée.' },
  { client: 'PIVOT', stat: '12h / sem', title: 'Reporting automatisé', desc: 'Récap hebdo des chiffres-clés directement par mail.' },
  { client: 'LUMEN', stat: '700+ réf.', title: 'Qualification des leads', desc: 'Tri et scoring multi-critères des prospects entrants.' },
  { client: 'ACME', stat: '6h / mois', title: 'Onboarding collaborateurs', desc: 'Création des comptes et accès du nouvel arrivant.' },
]

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <div
      className="flex h-full flex-col rounded-xl p-5"
      style={{
        background: CREAM,
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className="rounded-md px-2 py-1 text-[10px] font-bold tracking-wider"
          style={{
            background: 'rgba(26, 31, 26, 0.08)',
            color: 'rgba(26, 31, 26, 0.55)',
          }}
        >
          {cs.client}
        </span>
        <span className="text-lg font-extrabold" style={{ color: YELLOW_DEEP }}>
          {cs.stat}
        </span>
      </div>
      <h3 className="mb-2 text-sm font-bold leading-snug" style={{ color: TEXT_ON_CREAM }}>
        {cs.title}
      </h3>
      <p className="mb-3 flex-1 text-[12px] leading-snug" style={{ color: 'rgba(26, 31, 26, 0.65)' }}>
        {cs.desc}
      </p>
      <Link
        href="/travaux"
        className="self-start text-[11px] font-bold transition-opacity hover:opacity-70"
        style={{ color: YELLOW_DEEP }}
      >
        Voir le cas →
      </Link>
    </div>
  )
}

function CasClients() {
  return (
    <section className="relative px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Cas clients récents</SectionLabel>
        <p className="mb-10 text-center text-sm" style={{ color: TEXT_MUTED }}>
          Ce que ça donne, projet par projet.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((cs, i) => (
            <CaseStudyCard key={i} cs={cs} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/travaux"
            className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-80"
            style={{
              background: CREAM,
              color: TEXT_ON_CREAM,
              border: `1px solid ${YELLOW_DEEP}55`,
            }}
          >
            Voir toutes les réalisations →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 7 — BFM INTERVIEW (text left + cropped video thumbnail right)
// ═══════════════════════════════════════════════════════════════════════════

function BFMInterview() {
  return (
    <section className="relative px-6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
          <div>
            <span
              className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
              style={{ background: '#E50914', color: '#FFFFFF' }}
            >
              BFM BUSINESS
            </span>
            <h2 className="mb-3 text-2xl font-extrabold leading-tight md:text-3xl" style={{ color: TEXT_ON_GREEN }}>
              Notre approche vue sur BFM
            </h2>
            <p className="mb-6 max-w-lg text-base leading-relaxed" style={{ color: TEXT_MUTED }}>
              Raphaël, fondateur de Gralt, présente comment nous accompagnons les
              dirigeants de PME à automatiser leurs tâches chronophages et à
              récupérer plusieurs heures par semaine.
            </p>
            <YellowCTA href="/travaux">▶ Voir l&apos;interview</YellowCTA>
          </div>
          <div>
            <Image
              src="/illustrations/bfm-video.png"
              alt="Miniature de l'interview BFM Business : Raphaël en plateau"
              width={430}
              height={165}
              sizes="(min-width: 1024px) 540px, 100vw"
              className="block h-auto w-full rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 8 — FINAL CTA
// ═══════════════════════════════════════════════════════════════════════════

function FinalCTA() {
  return (
    <section className="relative px-6 py-16 md:py-20" style={{ background: GREEN_DEEP }}>
      <div className="mx-auto max-w-3xl text-center">
        <span
          className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.22em]"
          style={{ color: YELLOW }}
        >
          On en parle ?
        </span>
        <h2
          className="mb-5 font-extrabold leading-tight tracking-tight"
          style={{
            color: TEXT_ON_GREEN,
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            letterSpacing: '-0.02em',
          }}
        >
          Une tâche en tête que vous
          <br />
          aimeriez ne plus faire ?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed" style={{ color: TEXT_MUTED }}>
          30 minutes pour identifier 2 à 3 pistes concrètes d&apos;automatisation
          dans votre activité. Gratuit, sans engagement.
        </p>
        <YellowCTA href="/rendez-vous" large>
          Réserver un audit gratuit
        </YellowCTA>
        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <GreenDotPill>Approche terrain</GreenDotPill>
          <GreenDotPill>Résultats rapides</GreenDotPill>
          <GreenDotPill>Sans engagement</GreenDotPill>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 9 — FOOTER
// ═══════════════════════════════════════════════════════════════════════════

function Footer() {
  const cols = [
    {
      title: 'Pages',
      links: [
        { label: 'Travaux', href: '/travaux' },
        { label: 'Audit', href: '/audit' },
        { label: 'À propos', href: '/a-propos' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Automatisations', href: '#solutions' },
        { label: 'Agents IA', href: '/agents' },
        { label: 'Sur mesure', href: '/sur-mesure' },
      ],
    },
    {
      title: 'Ressources',
      links: [
        { label: 'BFM Business', href: '/travaux' },
        { label: 'Études de cas', href: '/travaux' },
        { label: 'Newsletter', href: '/blog' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: 'raphael@gralt.fr', href: 'mailto:raphael@gralt.fr' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/company/gralt', external: true },
        { label: 'Lille, France', href: '#' },
      ],
    },
  ] as const

  return (
    <footer className="relative px-6 pt-14 pb-8" style={{ background: GREEN_DEEP }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-8 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="mb-3 inline-flex flex-col items-center leading-none">
              <svg width="28" height="14" viewBox="0 0 28 14" fill={YELLOW} aria-hidden className="mb-0.5">
                <circle cx="3" cy="3" r="2" />
                <circle cx="14" cy="2" r="2" />
                <circle cx="25" cy="3" r="2" />
                <path d="M2 5 L4 11 L8 8 L14 12 L20 8 L24 11 L26 5 L22 9 L17 5 L14 8 L11 5 L6 9 Z" />
              </svg>
              <span className="text-xl font-extrabold tracking-tight" style={{ color: YELLOW, letterSpacing: '-0.02em' }}>
                GRÄLT
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
              L&apos;automatisation sur mesure pour PME françaises.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: YELLOW }}>
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => {
                  const isExternal = 'external' in link && link.external
                  const props = {
                    className: 'text-sm transition-opacity hover:opacity-100',
                    style: { color: TEXT_MUTED },
                  }
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" {...props}>
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} {...props}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-3 border-t pt-5 text-xs"
          style={{
            borderColor: 'rgba(245, 213, 71, 0.15)',
            color: TEXT_MUTED,
          }}
        >
          <span>© 2026 Gralt</span>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:opacity-100">Mentions légales</Link>
            <Link href="/politique-de-confidentialite" className="hover:opacity-100">Confidentialité</Link>
            <Link href="/cgv" className="hover:opacity-100">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function HomeClient() {
  return (
    <div className="min-h-screen" style={{ background: GREEN, color: TEXT_ON_GREEN }}>
      <Hero />
      <TrustBand />
      <Promesse />
      <HowItWorks />
      <Categories />
      <CasClients />
      <BFMInterview />
      <FinalCTA />
      <Footer />
    </div>
  )
}
