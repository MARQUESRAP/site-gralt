'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import GlassCard from '@/components/ui/GlassCard'
import NeonText from '@/components/ui/NeonText'
import CTAButton from '@/components/ui/CTAButton'
import SectionBackground from '@/components/ui/SectionBackground'
import ScrollReveal, {
  ScrollRevealGroup,
  ScrollRevealItem,
} from '@/components/ui/ScrollReveal'
import { useSectionColor } from '@/lib/SectionContext'

const ACCENT = '#00E5CC'

// ─── Catégories de tâches ───────────────────────────────────────────────────

type Category = {
  id: string
  label: string
  color: string
  intro: string
  tasks: string[]
  timeSaved: string
  agentsHref: string
  icon: React.ReactNode
}

const ICON_PROPS = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const ProspectionIcon = (
  <svg {...ICON_PROPS}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

const ContentIcon = (
  <svg {...ICON_PROPS}>
    <path d="M4 4h12l4 4v12H4z" />
    <path d="M16 4v4h4" />
    <path d="M8 12h8M8 16h6" />
  </svg>
)

const AdminIcon = (
  <svg {...ICON_PROPS}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 15h4" />
  </svg>
)

const RHIcon = (
  <svg {...ICON_PROPS}>
    <circle cx="9" cy="9" r="3.5" />
    <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
    <circle cx="17" cy="8" r="2.5" />
    <path d="M15 19c0-2.2 1.3-4 3-4s3 1.5 3 4" />
  </svg>
)

const OpsIcon = (
  <svg {...ICON_PROPS}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </svg>
)

const CATEGORIES: Category[] = [
  {
    id: 'prospection',
    label: 'Prospection & Vente',
    color: '#00E5CC',
    intro:
      'Pour ne plus jamais perdre une minute à chercher un prospect, écrire un mail, ou relancer.',
    tasks: [
      "Repérer les prospects qui ont un vrai besoin (signaux LinkedIn, offres d'emploi, créations d'entreprise)",
      "Envoyer 50 mails ultra-personnalisés par jour, chacun écrit à partir de vraies infos",
      'Lancer une campagne mailing produit en 20 minutes',
      'Relancer automatiquement les prospects qui ne répondent pas',
      'Suivre les ouvertures, clics et réponses dans un dashboard',
      "Préparer la fiche d'un prospect avant un rendez-vous",
    ],
    timeSaved: '~15-25h/semaine libérées',
    agentsHref: '/agents/prospection-vente',
    icon: ProspectionIcon,
  },
  {
    id: 'marketing',
    label: 'Marketing & Contenu',
    color: '#B44AFF',
    intro:
      'Pour publier régulièrement, créer du contenu pertinent, et tester sans y passer vos soirées.',
    tasks: [
      'Générer des posts LinkedIn dans votre voix, validés en 1 clic',
      'Créer des fiches produits avec photos retravaillées',
      'Programmer une campagne mailing ciblée par produit / persona',
      'Veiller les tendances de votre secteur, automatiquement',
      'Recycler une vidéo YouTube en plusieurs posts LinkedIn',
      'Analyser ce qui marche dans vos contenus passés pour reproduire la recette',
    ],
    timeSaved: '~3-6h/semaine libérées',
    agentsHref: '/agents/marketing-contenu',
    icon: ContentIcon,
  },
  {
    id: 'admin',
    label: 'Admin & Finance',
    color: '#818CF8',
    intro:
      'Pour libérer votre tête de toutes les petites tâches administratives qui s’accumulent.',
    tasks: [
      "Créer un devis ou une facture à partir d'un simple échange",
      'Relancer automatiquement les impayés, dans le bon ton et au bon moment',
      'Classer les documents reçus (factures fournisseurs, contrats) par client et par type',
      'Synchroniser votre facturation avec votre CRM et votre agenda',
      'Préparer un récap hebdomadaire de vos chiffres-clés',
      "Notifier les échéances importantes avant qu'il soit trop tard",
    ],
    timeSaved: 'Variable selon volumétrie',
    agentsHref: '/agents/admin-finance',
    icon: AdminIcon,
  },
  {
    id: 'rh',
    label: 'RH & Recrutement',
    color: '#FB923C',
    intro:
      "Pour ne plus laisser passer un bon candidat juste parce que personne n'a eu le temps de lire son CV.",
    tasks: [
      'Trier les CV reçus sur un poste, faire remonter les meilleurs en tête',
      'Surveiller les plateformes (France Travail, Indeed, LinkedIn) sur des profils ciblés',
      'Pré-qualifier les candidats par mail avant un premier RDV',
      "Préparer la fiche d'un candidat avant un entretien",
      'Onboarder un nouveau collaborateur (création de comptes, accès, contrats)',
    ],
    timeSaved: '~15-20h/semaine libérées',
    agentsHref: '/agents/rh-recrutement',
    icon: RHIcon,
  },
  {
    id: 'operations',
    label: 'Opérations & Pilotage',
    color: '#F472B6',
    intro:
      'Pour que votre activité tourne, sans avoir besoin de surveiller tout, tout le temps.',
    tasks: [
      'Alimenter une base produits / événements en continu, depuis des sources externes',
      'Suivre vos chantiers, vos stocks, vos commandes en temps réel',
      'Synchroniser tous vos outils entre eux (CRM, agenda, mailing, facturation)',
      'Recevoir chaque lundi un récap des chiffres-clés de la semaine',
      "Être alerté quand un KPI sort des clous, avant les autres",
      'Répondre aux questions récurrentes des clients',
    ],
    timeSaved: 'Souvent 8-12h/semaine libérées',
    agentsHref: '/agents/analyse-pilotage',
    icon: OpsIcon,
  },
]

// ─── Section 1 — Hero ───────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative px-6 pt-24 pb-16 md:pt-32">
      <SectionBackground color={ACCENT} secondaryColor="#B44AFF" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <NeonText as="h1" size="xl" color={ACCENT} className="mb-6">
            Toutes les tâches répétitives
            <br />
            que vous ne devriez plus faire.
          </NeonText>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-secondary">
            Vous, votre équipe, vos collaborateurs : chaque semaine, des heures sont
            englouties par des tâches répétitives. On les automatise, sur mesure, pour
            que vous récupériez ce temps.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton variant="primary" href="/rendez-vous" pulse>
              Réserver un audit gratuit
            </CTAButton>
            <CTAButton variant="secondary" href="#categories">
              Voir des exemples concrets ↓
            </CTAButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── Section 2 — Catégories ─────────────────────────────────────────────────

function CategoryCard({ cat }: { cat: Category }) {
  return (
    <GlassCard color={cat.color} className="flex h-full flex-col p-6 md:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `${cat.color}1A`,
            border: `1px solid ${cat.color}40`,
            color: cat.color,
            boxShadow: `0 0 18px ${cat.color}22`,
          }}
        >
          {cat.icon}
        </span>
        <h3 className="text-xl font-bold text-text-primary">{cat.label}</h3>
      </div>

      <p className="mb-5 text-sm leading-relaxed text-text-secondary">
        {cat.intro}
      </p>

      <ul className="mb-6 space-y-2.5">
        {cat.tasks.map((task) => (
          <li
            key={task}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={cat.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0"
              aria-hidden
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>{task}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: `${cat.color}14`,
            color: cat.color,
            border: `1px solid ${cat.color}33`,
            boxShadow: `0 0 10px ${cat.color}1A`,
          }}
        >
          {cat.timeSaved}
        </span>
        <Link
          href={cat.agentsHref}
          className="text-sm font-medium transition-opacity hover:opacity-80"
          style={{ color: cat.color }}
        >
          Voir les agents IA →
        </Link>
      </div>
    </GlassCard>
  )
}

function Categories() {
  return (
    <section id="categories" className="relative px-6 py-24">
      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <NeonText as="h2" size="lg" className="mb-4">
              Ce qu&apos;on automatise — par catégorie
            </NeonText>
            <p className="mx-auto max-w-2xl text-text-secondary">
              5 grandes familles de tâches. Vous vous reconnaissez probablement dans
              au moins l&apos;une d&apos;elles.
            </p>
          </div>
        </ScrollReveal>

        <ScrollRevealGroup className="grid gap-6 md:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <ScrollRevealItem key={cat.id}>
              <CategoryCard cat={cat} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </div>
    </section>
  )
}

// ─── Section 3 — Les 3 formats ──────────────────────────────────────────────

type Format = {
  id: string
  label: string
  color: string
  whenForYou: string
  example: string
  schema: React.ReactNode
}

const FORMAT_COLORS = {
  workflow: '#00E5CC',
  app: '#B44AFF',
  agent: '#F5C842',
}

function WorkflowSchema() {
  const c = FORMAT_COLORS.workflow
  return (
    <svg viewBox="0 0 280 130" className="w-full" aria-hidden>
      {/* Sources */}
      <g>
        <rect x="10" y="20" width="64" height="24" rx="6" fill="none" stroke={`${c}66`} strokeWidth="1.5" />
        <text x="42" y="36" textAnchor="middle" fontSize="10" fill="#cbd5e1">Source A</text>
        <rect x="10" y="53" width="64" height="24" rx="6" fill="none" stroke={`${c}66`} strokeWidth="1.5" />
        <text x="42" y="69" textAnchor="middle" fontSize="10" fill="#cbd5e1">Source B</text>
        <rect x="10" y="86" width="64" height="24" rx="6" fill="none" stroke={`${c}66`} strokeWidth="1.5" />
        <text x="42" y="102" textAnchor="middle" fontSize="10" fill="#cbd5e1">Source C</text>
      </g>
      {/* Arrows to workflow */}
      <path d="M74 32 L120 60" stroke={`${c}80`} strokeWidth="1.5" fill="none" />
      <path d="M74 65 L120 65" stroke={`${c}80`} strokeWidth="1.5" fill="none" />
      <path d="M74 98 L120 70" stroke={`${c}80`} strokeWidth="1.5" fill="none" />
      {/* Workflow box */}
      <rect x="120" y="45" width="80" height="40" rx="8" fill={`${c}14`} stroke={c} strokeWidth="1.5" />
      <text x="160" y="62" textAnchor="middle" fontSize="11" fontWeight="600" fill={c}>WORKFLOW</text>
      <text x="160" y="76" textAnchor="middle" fontSize="9" fill="#94a3b8">tourne tout seul</text>
      {/* Arrow to output */}
      <path d="M200 65 L240 65" stroke={`${c}80`} strokeWidth="1.5" fill="none" markerEnd="url(#arrW)" />
      <defs>
        <marker id="arrW" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={c} />
        </marker>
      </defs>
      {/* Output */}
      <rect x="240" y="52" width="36" height="26" rx="6" fill="none" stroke={`${c}66`} strokeWidth="1.5" />
      <text x="258" y="68" textAnchor="middle" fontSize="9" fill="#cbd5e1">Base</text>
      {/* Cron icon below */}
      <circle cx="160" cy="105" r="8" fill="none" stroke={`${c}99`} strokeWidth="1.2" />
      <path d="M160 100 L160 105 L163 107" stroke={`${c}99`} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <text x="175" y="108" fontSize="9" fill="#94a3b8">cron</text>
    </svg>
  )
}

function AppSchema() {
  const c = FORMAT_COLORS.app
  return (
    <svg viewBox="0 0 280 130" className="w-full" aria-hidden>
      {/* Data */}
      <rect x="10" y="53" width="50" height="24" rx="6" fill="none" stroke={`${c}66`} strokeWidth="1.5" />
      <text x="35" y="69" textAnchor="middle" fontSize="9" fill="#cbd5e1">Données</text>
      <path d="M60 65 L86 65" stroke={`${c}80`} strokeWidth="1.5" fill="none" markerEnd="url(#arrA1)" />
      {/* Workflow */}
      <rect x="86" y="48" width="58" height="34" rx="6" fill={`${c}10`} stroke={`${c}99`} strokeWidth="1.2" />
      <text x="115" y="62" textAnchor="middle" fontSize="9" fontWeight="600" fill={`${c}cc`}>Workflow</text>
      <text x="115" y="73" textAnchor="middle" fontSize="8" fill="#94a3b8">prépare</text>
      <path d="M144 65 L170 65" stroke={`${c}80`} strokeWidth="1.5" fill="none" markerEnd="url(#arrA1)" />
      {/* App */}
      <rect x="170" y="40" width="62" height="50" rx="8" fill={`${c}14`} stroke={c} strokeWidth="1.5" />
      <text x="201" y="56" textAnchor="middle" fontSize="10" fontWeight="700" fill={c}>APP</text>
      <text x="201" y="68" textAnchor="middle" fontSize="8" fill="#cbd5e1">vous</text>
      <text x="201" y="80" textAnchor="middle" fontSize="8" fill="#cbd5e1">validez</text>
      <path d="M232 65 L262 65" stroke={`${c}80`} strokeWidth="1.5" fill="none" markerEnd="url(#arrA1)" />
      {/* Action */}
      <circle cx="270" cy="65" r="6" fill={c} />
      {/* Person icon below */}
      <g transform="translate(195, 100)">
        <circle cx="6" cy="4" r="3" fill="none" stroke={`${c}cc`} strokeWidth="1.2" />
        <path d="M0 14 C0 10 3 8 6 8 C9 8 12 10 12 14" fill="none" stroke={`${c}cc`} strokeWidth="1.2" />
        <text x="20" y="13" fontSize="8" fill="#94a3b8">2 min/sem</text>
      </g>
      <defs>
        <marker id="arrA1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={c} />
        </marker>
      </defs>
    </svg>
  )
}

function AgentSchema() {
  const c = FORMAT_COLORS.agent
  return (
    <svg viewBox="0 0 280 130" className="w-full" aria-hidden>
      {/* Event */}
      <rect x="10" y="50" width="62" height="30" rx="6" fill="none" stroke={`${c}66`} strokeWidth="1.5" />
      <text x="41" y="68" textAnchor="middle" fontSize="9" fill="#cbd5e1">Événement</text>
      <path d="M72 65 L98 65" stroke={`${c}80`} strokeWidth="1.5" fill="none" markerEnd="url(#arrAg)" />
      {/* Agent IA */}
      <rect x="98" y="22" width="100" height="86" rx="10" fill={`${c}10`} stroke={c} strokeWidth="1.5" />
      <text x="148" y="40" textAnchor="middle" fontSize="11" fontWeight="700" fill={c}>AGENT IA</text>
      <text x="148" y="53" textAnchor="middle" fontSize="8" fill="#cbd5e1">réfléchit</text>
      {/* Rules box inside */}
      <rect x="108" y="60" width="80" height="40" rx="5" fill={`${c}08`} stroke={`${c}55`} strokeWidth="1" />
      <text x="148" y="72" textAnchor="middle" fontSize="8" fontWeight="600" fill={`${c}cc`}>Vos règles</text>
      <line x1="116" y1="80" x2="180" y2="80" stroke={`${c}33`} strokeWidth="0.8" />
      <line x1="116" y1="88" x2="180" y2="88" stroke={`${c}33`} strokeWidth="0.8" />
      <line x1="116" y1="96" x2="160" y2="96" stroke={`${c}33`} strokeWidth="0.8" />
      {/* Arrow out */}
      <path d="M198 65 L228 65" stroke={`${c}80`} strokeWidth="1.5" fill="none" markerEnd="url(#arrAg)" />
      {/* Decision */}
      <rect x="228" y="50" width="48" height="30" rx="6" fill={`${c}14`} stroke={`${c}99`} strokeWidth="1.5" />
      <text x="252" y="68" textAnchor="middle" fontSize="9" fill={c}>Décision</text>
      <defs>
        <marker id="arrAg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={c} />
        </marker>
      </defs>
    </svg>
  )
}

const FORMATS: Format[] = [
  {
    id: 'workflow',
    label: 'Workflow en arrière-plan',
    color: FORMAT_COLORS.workflow,
    whenForYou:
      "Quand la tâche est répétitive et n'a pas besoin de votre validation.",
    example:
      "Chaque lundi à 8h, vérifier sur 3 sites les nouveaux événements du secteur, les classer, et les ajouter automatiquement à votre catalogue. Vous ne touchez à rien.",
    schema: <WorkflowSchema />,
  },
  {
    id: 'app',
    label: 'Application sur mesure',
    color: FORMAT_COLORS.app,
    whenForYou:
      'Quand vous voulez garder la main — décider, valider, ajuster avant que les choses partent.',
    example:
      "Une application qui prépare des suggestions de posts LinkedIn chaque semaine. Vous ouvrez, vous validez en 2 minutes, c'est publié. Sans vous, rien ne part.",
    schema: <AppSchema />,
  },
  {
    id: 'agent',
    label: 'Agent IA',
    color: FORMAT_COLORS.agent,
    whenForYou:
      "Quand il faut qu'une IA prenne une décision toute seule, selon vos règles. Pas juste exécuter un script.",
    example:
      "Un agent qui lit chaque message reçu sur Vinted, comprend si c'est un acheteur sérieux ou un négociateur, et répond en conséquence. Avec une limite : jamais en dessous de -20% du prix.",
    schema: <AgentSchema />,
  },
]

function FormatCard({ format }: { format: Format }) {
  return (
    <GlassCard color={format.color} className="flex h-full flex-col p-6">
      <h3 className="mb-1 text-lg font-bold text-text-primary">{format.label}</h3>
      <div
        className="mb-5 h-px w-full"
        style={{ background: `${format.color}33` }}
      />

      <div className="mb-5 rounded-lg p-4" style={{ background: `${format.color}08` }}>
        {format.schema}
      </div>

      <div className="mb-4">
        <p
          className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: format.color }}
        >
          Quand c&apos;est pour vous
        </p>
        <p className="text-sm leading-relaxed text-text-secondary">
          {format.whenForYou}
        </p>
      </div>

      <div className="mt-auto">
        <p
          className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: format.color }}
        >
          Exemple concret
        </p>
        <p className="text-sm italic leading-relaxed text-text-secondary">
          “{format.example}”
        </p>
      </div>
    </GlassCard>
  )
}

function Formats() {
  return (
    <section className="relative px-6 py-24">
      <SectionBackground color="#B44AFF" secondaryColor="#F5C842" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <NeonText as="h2" size="lg" className="mb-4">
              3 manières de tout automatiser
            </NeonText>
            <p className="mx-auto max-w-2xl text-text-secondary">
              Selon votre besoin réel, on choisit le bon format. Pas l&apos;inverse.
            </p>
          </div>
        </ScrollReveal>

        <ScrollRevealGroup className="grid gap-6 lg:grid-cols-3">
          {FORMATS.map((f) => (
            <ScrollRevealItem key={f.id}>
              <FormatCard format={f} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>

        <ScrollReveal delay={0.2}>
          <div
            className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4 rounded-xl px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p className="text-sm text-text-secondary">
              Pas sûr de quel format il vous faut ? Décrivez votre tâche, on s&apos;en
              occupe.
            </p>
            <CTAButton variant="secondary" href="/sur-mesure">
              Décrire ma tâche →
            </CTAButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── Section 4 — En action (preuve /travaux) ────────────────────────────────

function InAction() {
  const stats = [
    { value: '~85h/semaine', label: 'libérées chez mes clients' },
    { value: '9', label: 'automatisations en production' },
    { value: '6', label: 'clients accompagnés' },
  ]

  return (
    <section className="relative px-6 py-24">
      <div className="relative z-10 mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <NeonText as="h2" size="lg" color={ACCENT} className="mb-4">
              Ce que ces automatisations ont donné chez nos clients
            </NeonText>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <GlassCard key={s.label} color={ACCENT} className="p-6 text-center">
                <div
                  className="mb-2 text-3xl font-bold md:text-4xl"
                  style={{
                    color: ACCENT,
                    textShadow: `0 0 12px ${ACCENT}55`,
                  }}
                >
                  {s.value}
                </div>
                <p className="text-sm text-text-secondary">{s.label}</p>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="text-center">
            <CTAButton variant="primary" href="/travaux">
              Voir toutes les réalisations →
            </CTAButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── Section 5 — Pour aller plus loin (catalogue agents) ────────────────────

function GoFurther() {
  const golden = '#F5C842'
  return (
    <section className="relative px-6 py-24">
      <SectionBackground color={golden} secondaryColor="#B44AFF" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <NeonText as="h2" size="lg" color={golden} className="mb-6">
              Quand vous voulez qu&apos;une IA décide à votre place
            </NeonText>
            <p className="mx-auto max-w-2xl leading-relaxed text-text-secondary">
              Pour les besoins où l&apos;automatisation classique ne suffit pas —
              quand il faut qu&apos;une IA arbitre, qu&apos;elle prenne une décision
              à votre place selon vos règles — on déploie un agent IA dédié.
              <span className="text-text-primary">
                {' '}
                31 agents prêts à l&apos;emploi répartis dans 6 sections métier.
              </span>
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="text-center">
            <CTAButton variant="primary" color={golden} href="/agents">
              Découvrir le catalogue d&apos;agents IA →
            </CTAButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── Section 6 — CTA final ──────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="relative px-6 py-24">
      <SectionBackground color={ACCENT} secondaryColor="#B44AFF" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <NeonText as="h2" size="lg" className="mb-6">
            Une tâche en tête que vous aimeriez ne plus faire ?
          </NeonText>
          <p className="mx-auto mb-10 max-w-2xl text-text-secondary">
            Parlons-en pendant un audit gratuit de 30 minutes. À la fin, vous repartez
            avec 2-3 pistes concrètes d&apos;automatisation pour votre activité.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton variant="primary" href="/rendez-vous" pulse>
              Réserver un audit gratuit
            </CTAButton>
            <CTAButton variant="secondary" href="/sur-mesure">
              Décrire ma tâche
            </CTAButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── Page principale ────────────────────────────────────────────────────────

export default function AutomatisationsClient() {
  const { setActiveColor } = useSectionColor()

  useEffect(() => {
    setActiveColor(ACCENT)
    return () => setActiveColor('#00E5CC')
  }, [setActiveColor])

  return (
    <div className="relative min-h-screen">
      <Hero />
      <Categories />
      <Formats />
      <InAction />
      <GoFurther />
      <FinalCTA />
    </div>
  )
}
