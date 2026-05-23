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
const GOLDEN = '#F5C842'

// ─── Catégories ─────────────────────────────────────────────────────────────

type Category = {
  id: string
  label: string
  color: string
  intro: string
  tasks: string[]
  timeSaved: string
  agentsHref: string
}

const CATEGORIES: Category[] = [
  {
    id: 'prospection',
    label: 'Prospection & Vente',
    color: '#00E5CC',
    intro:
      'Pour ne plus jamais perdre une minute à chercher un prospect, écrire un mail, ou relancer.',
    tasks: [
      "Repérer les prospects qui ont un vrai besoin (signaux LinkedIn, offres d'emploi, créations d'entreprise)",
      'Envoyer 50 mails ultra-personnalisés par jour, chacun écrit à partir de vraies infos',
      'Lancer une campagne mailing produit en 20 minutes',
      'Relancer automatiquement les prospects qui ne répondent pas',
      'Suivre les ouvertures, clics et réponses dans un dashboard',
      "Préparer la fiche d'un prospect avant un rendez-vous",
    ],
    timeSaved: '15-25 h / semaine',
    agentsHref: '/agents/prospection-vente',
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
      'Programmer une campagne mailing ciblée par produit ou persona',
      'Veiller les tendances de votre secteur, automatiquement',
      'Recycler une vidéo YouTube en plusieurs posts LinkedIn',
      'Analyser ce qui marche dans vos contenus passés pour reproduire la recette',
    ],
    timeSaved: '3-6 h / semaine',
    agentsHref: '/agents/marketing-contenu',
  },
  {
    id: 'admin',
    label: 'Admin & Finance',
    color: '#818CF8',
    intro:
      "Pour libérer votre tête de toutes les petites tâches administratives qui s'accumulent.",
    tasks: [
      "Créer un devis ou une facture à partir d'un simple échange",
      'Relancer automatiquement les impayés, dans le bon ton et au bon moment',
      'Classer les documents reçus (factures fournisseurs, contrats) par client et par type',
      'Synchroniser votre facturation avec votre CRM et votre agenda',
      'Préparer un récap hebdomadaire de vos chiffres-clés',
      "Notifier les échéances importantes avant qu'il soit trop tard",
    ],
    timeSaved: 'Variable',
    agentsHref: '/agents/admin-finance',
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
    timeSaved: '15-20 h / semaine',
    agentsHref: '/agents/rh-recrutement',
  },
  {
    id: 'operations',
    label: 'Opérations & Pilotage',
    color: '#F472B6',
    intro:
      'Pour que votre activité tourne, sans avoir besoin de surveiller tout, tout le temps.',
    tasks: [
      'Alimenter une base produits ou événements en continu, depuis des sources externes',
      'Suivre vos chantiers, vos stocks, vos commandes en temps réel',
      'Synchroniser tous vos outils entre eux (CRM, agenda, mailing, facturation)',
      'Recevoir chaque lundi un récap des chiffres-clés de la semaine',
      "Être alerté quand un KPI sort des clous, avant les autres",
      'Répondre aux questions récurrentes des clients',
    ],
    timeSaved: '8-12 h / semaine',
    agentsHref: '/agents/analyse-pilotage',
  },
]

// ─── Section 1 — Hero (asymétrique gauche) ──────────────────────────────────

function Hero() {
  return (
    <section className="relative px-6 pt-28 pb-20 md:pt-36 md:pb-24">
      <SectionBackground color={ACCENT} secondaryColor="#B44AFF" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <ScrollReveal>
          <p
            className="mb-6 text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: `${ACCENT}cc` }}
          >
            Pour les PME 20-100 salariés
          </p>
          <NeonText as="h1" size="xl" color={ACCENT} className="mb-7 leading-[1.05]">
            Toutes les tâches répétitives
            <br />
            que vous ne devriez plus faire.
          </NeonText>
          <p className="mb-9 max-w-xl text-lg leading-relaxed text-text-secondary">
            Vous, votre équipe, vos collaborateurs : chaque semaine, des heures
            partent à faire les mêmes gestes. On les automatise, sur mesure, pour
            que vous récupériez ce temps.
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <CTAButton variant="primary" href="/rendez-vous" pulse>
              Réserver un audit gratuit
            </CTAButton>
            <CTAButton variant="secondary" href="#categories">
              Voir des exemples concrets ↓
            </CTAButton>
          </div>
        </ScrollReveal>

        {/* Visual: ledger of running automations (asymmetric counterweight) */}
        <ScrollReveal delay={0.15}>
          <HeroLedger />
        </ScrollReveal>
      </div>
    </section>
  )
}

function HeroLedger() {
  const lines = [
    { color: '#00E5CC', task: 'Mail prospect envoyé', meta: 'IABM · à 09:42' },
    { color: '#B44AFF', task: 'Post LinkedIn publié', meta: 'Rapid Pub · à 08:30' },
    { color: '#FB923C', task: '32 CV classés', meta: 'Recrutement · à 07:15' },
    { color: '#22C55E', task: '300 événements ajoutés', meta: 'TibiMag · cette nuit' },
    { color: '#818CF8', task: 'Document classé', meta: 'HL Piscines · à 23:04' },
  ]
  return (
    <div className="relative">
      <p
        className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-text-secondary"
        style={{ opacity: 0.7 }}
      >
        Pendant que vous lisez cette page
      </p>
      <GlassCard color={ACCENT} className="p-5">
        <ul className="space-y-3.5">
          {lines.map((l) => (
            <li key={l.task} className="flex items-start gap-3">
              <span
                className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full"
                style={{
                  background: l.color,
                  boxShadow: `0 0 8px ${l.color}, 0 0 14px ${l.color}55`,
                }}
                aria-hidden
              />
              <span className="flex-1">
                <span className="block text-sm font-medium text-text-primary">
                  {l.task}
                </span>
                <span className="block text-xs text-text-secondary opacity-70">
                  {l.meta}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <div
          className="mt-4 border-t pt-3 text-xs text-text-secondary"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          9 automatisations comme ça, en production.
        </div>
      </GlassCard>
    </div>
  )
}

// ─── Section 2 — Catégories (1 feature + 4 secondary) ───────────────────────

function FeatureCategoryCard({ cat }: { cat: Category }) {
  return (
    <GlassCard color={cat.color} className="p-7 md:p-9">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <div className="mb-5 flex items-baseline gap-3">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{
                background: cat.color,
                boxShadow: `0 0 10px ${cat.color}`,
              }}
              aria-hidden
            />
            <h3 className="text-2xl font-bold text-text-primary md:text-3xl">
              {cat.label}
            </h3>
          </div>
          <p className="mb-6 text-base leading-relaxed text-text-secondary">
            {cat.intro}
          </p>
          <div className="mb-6">
            <div
              className="mb-1 text-xs font-medium uppercase tracking-[0.15em]"
              style={{ color: `${cat.color}cc` }}
            >
              Temps libéré moyen
            </div>
            <div
              className="text-2xl font-bold"
              style={{
                color: cat.color,
                textShadow: `0 0 12px ${cat.color}55`,
              }}
            >
              {cat.timeSaved}
            </div>
          </div>
          <Link
            href={cat.agentsHref}
            className="inline-flex items-center text-sm font-medium transition-opacity hover:opacity-80"
            style={{ color: cat.color }}
          >
            Voir les agents IA de cette catégorie →
          </Link>
        </div>

        <ul className="space-y-3">
          {cat.tasks.map((task) => (
            <li
              key={task}
              className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary"
            >
              <CheckMark color={cat.color} />
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  )
}

function CompactCategoryCard({ cat }: { cat: Category }) {
  return (
    <GlassCard color={cat.color} className="flex h-full flex-col p-6">
      <div className="mb-4 flex items-baseline gap-2.5">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{
            background: cat.color,
            boxShadow: `0 0 8px ${cat.color}`,
          }}
          aria-hidden
        />
        <h3 className="text-lg font-bold text-text-primary">{cat.label}</h3>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
        {cat.intro}
      </p>
      <ul className="mb-5 space-y-2">
        {cat.tasks.slice(0, 4).map((task) => (
          <li
            key={task}
            className="flex items-start gap-2.5 text-[13px] leading-relaxed text-text-secondary"
          >
            <CheckMark color={cat.color} small />
            <span>{task}</span>
          </li>
        ))}
        {cat.tasks.length > 4 && (
          <li
            className="pl-6 text-[12px] opacity-60"
            style={{ color: cat.color }}
          >
            + {cat.tasks.length - 4} autres
          </li>
        )}
      </ul>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
        <span
          className="text-xs font-semibold"
          style={{ color: cat.color }}
        >
          {cat.timeSaved}
        </span>
        <Link
          href={cat.agentsHref}
          className="text-xs font-medium transition-opacity hover:opacity-80"
          style={{ color: cat.color }}
        >
          Voir les agents IA →
        </Link>
      </div>
    </GlassCard>
  )
}

function CheckMark({ color, small = false }: { color: string; small?: boolean }) {
  const size = small ? 14 : 16
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-1 shrink-0"
      aria-hidden
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

function Categories() {
  const [feature, ...rest] = CATEGORIES
  return (
    <section id="categories" className="relative px-6 py-28">
      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-14 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <NeonText as="h2" size="lg" className="mb-3">
                Ce qu&apos;on automatise, concrètement
              </NeonText>
              <p className="max-w-2xl text-text-secondary">
                Cinq familles de tâches que des dirigeants comme vous faisaient à la
                main jusqu&apos;à ce qu&apos;on les automatise. Vous vous reconnaissez
                probablement dans au moins l&apos;une d&apos;elles.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-6">
            <FeatureCategoryCard cat={feature} />
          </div>
        </ScrollReveal>

        <ScrollRevealGroup className="grid gap-6 md:grid-cols-2">
          {rest.map((cat) => (
            <ScrollRevealItem key={cat.id}>
              <CompactCategoryCard cat={cat} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </div>
    </section>
  )
}

// ─── Section 3 — 3 formats ──────────────────────────────────────────────────

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
  agent: GOLDEN,
}

function WorkflowSchema() {
  const c = FORMAT_COLORS.workflow
  return (
    <svg viewBox="0 0 280 130" className="w-full" aria-hidden>
      <g>
        <rect x="10" y="20" width="64" height="24" rx="6" fill="none" stroke={`${c}66`} strokeWidth="1.5" />
        <text x="42" y="36" textAnchor="middle" fontSize="10" fill="#cbd5e1">Source A</text>
        <rect x="10" y="53" width="64" height="24" rx="6" fill="none" stroke={`${c}66`} strokeWidth="1.5" />
        <text x="42" y="69" textAnchor="middle" fontSize="10" fill="#cbd5e1">Source B</text>
        <rect x="10" y="86" width="64" height="24" rx="6" fill="none" stroke={`${c}66`} strokeWidth="1.5" />
        <text x="42" y="102" textAnchor="middle" fontSize="10" fill="#cbd5e1">Source C</text>
      </g>
      <path d="M74 32 L120 60" stroke={`${c}80`} strokeWidth="1.5" fill="none" />
      <path d="M74 65 L120 65" stroke={`${c}80`} strokeWidth="1.5" fill="none" />
      <path d="M74 98 L120 70" stroke={`${c}80`} strokeWidth="1.5" fill="none" />
      <rect x="120" y="45" width="80" height="40" rx="8" fill={`${c}14`} stroke={c} strokeWidth="1.5" />
      <text x="160" y="62" textAnchor="middle" fontSize="11" fontWeight="600" fill={c}>WORKFLOW</text>
      <text x="160" y="76" textAnchor="middle" fontSize="9" fill="#94a3b8">tourne tout seul</text>
      <path d="M200 65 L240 65" stroke={`${c}80`} strokeWidth="1.5" fill="none" markerEnd="url(#arrW)" />
      <defs>
        <marker id="arrW" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={c} />
        </marker>
      </defs>
      <rect x="240" y="52" width="36" height="26" rx="6" fill="none" stroke={`${c}66`} strokeWidth="1.5" />
      <text x="258" y="68" textAnchor="middle" fontSize="9" fill="#cbd5e1">Base</text>
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
      <rect x="10" y="53" width="50" height="24" rx="6" fill="none" stroke={`${c}66`} strokeWidth="1.5" />
      <text x="35" y="69" textAnchor="middle" fontSize="9" fill="#cbd5e1">Données</text>
      <path d="M60 65 L86 65" stroke={`${c}80`} strokeWidth="1.5" fill="none" markerEnd="url(#arrA1)" />
      <rect x="86" y="48" width="58" height="34" rx="6" fill={`${c}10`} stroke={`${c}99`} strokeWidth="1.2" />
      <text x="115" y="62" textAnchor="middle" fontSize="9" fontWeight="600" fill={`${c}cc`}>Workflow</text>
      <text x="115" y="73" textAnchor="middle" fontSize="8" fill="#94a3b8">prépare</text>
      <path d="M144 65 L170 65" stroke={`${c}80`} strokeWidth="1.5" fill="none" markerEnd="url(#arrA1)" />
      <rect x="170" y="40" width="62" height="50" rx="8" fill={`${c}14`} stroke={c} strokeWidth="1.5" />
      <text x="201" y="56" textAnchor="middle" fontSize="10" fontWeight="700" fill={c}>APP</text>
      <text x="201" y="68" textAnchor="middle" fontSize="8" fill="#cbd5e1">vous</text>
      <text x="201" y="80" textAnchor="middle" fontSize="8" fill="#cbd5e1">validez</text>
      <path d="M232 65 L262 65" stroke={`${c}80`} strokeWidth="1.5" fill="none" markerEnd="url(#arrA1)" />
      <circle cx="270" cy="65" r="6" fill={c} />
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
      <rect x="10" y="50" width="62" height="30" rx="6" fill="none" stroke={`${c}66`} strokeWidth="1.5" />
      <text x="41" y="68" textAnchor="middle" fontSize="9" fill="#cbd5e1">Événement</text>
      <path d="M72 65 L98 65" stroke={`${c}80`} strokeWidth="1.5" fill="none" markerEnd="url(#arrAg)" />
      <rect x="98" y="22" width="100" height="86" rx="10" fill={`${c}10`} stroke={c} strokeWidth="1.5" />
      <text x="148" y="40" textAnchor="middle" fontSize="11" fontWeight="700" fill={c}>AGENT IA</text>
      <text x="148" y="53" textAnchor="middle" fontSize="8" fill="#cbd5e1">réfléchit</text>
      <rect x="108" y="60" width="80" height="40" rx="5" fill={`${c}08`} stroke={`${c}55`} strokeWidth="1" />
      <text x="148" y="72" textAnchor="middle" fontSize="8" fontWeight="600" fill={`${c}cc`}>Vos règles</text>
      <line x1="116" y1="80" x2="180" y2="80" stroke={`${c}33`} strokeWidth="0.8" />
      <line x1="116" y1="88" x2="180" y2="88" stroke={`${c}33`} strokeWidth="0.8" />
      <line x1="116" y1="96" x2="160" y2="96" stroke={`${c}33`} strokeWidth="0.8" />
      <path d="M198 65 L228 65" stroke={`${c}80`} strokeWidth="1.5" fill="none" markerEnd="url(#arrAg)" />
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
      'Quand vous voulez garder la main. Décider, valider, ajuster avant que les choses partent.',
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
      "Un agent qui lit chaque message reçu sur Vinted, comprend si c'est un acheteur sérieux ou un négociateur, et répond en conséquence. Avec une limite : jamais en dessous de -20 % du prix.",
    schema: <AgentSchema />,
  },
]

function FormatCard({ format, lifted }: { format: Format; lifted?: boolean }) {
  return (
    <GlassCard
      color={format.color}
      className={`flex h-full flex-col p-6 ${lifted ? 'lg:-translate-y-4 lg:p-7' : ''}`}
    >
      <h3 className="mb-1 text-lg font-bold text-text-primary">{format.label}</h3>
      <div
        className="mb-5 h-px w-full"
        style={{ background: `${format.color}33` }}
      />

      <div
        className="mb-5 rounded-lg p-4"
        style={{ background: `${format.color}08` }}
      >
        {format.schema}
      </div>

      <div className="mb-4">
        <p
          className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em]"
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
          className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: format.color }}
        >
          Exemple concret
        </p>
        <p className="text-sm italic leading-relaxed text-text-secondary">
          {format.example}
        </p>
      </div>
    </GlassCard>
  )
}

function Formats() {
  return (
    <section className="relative px-6 py-32">
      <SectionBackground color="#B44AFF" secondaryColor={GOLDEN} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-14 max-w-2xl">
            <NeonText as="h2" size="lg" className="mb-3">
              3 manières de tout automatiser
            </NeonText>
            <p className="text-text-secondary">
              Selon votre besoin réel, on choisit le bon format. Pas l&apos;inverse.
            </p>
          </div>
        </ScrollReveal>

        <ScrollRevealGroup className="grid items-start gap-6 lg:grid-cols-3">
          {FORMATS.map((f, i) => (
            <ScrollRevealItem key={f.id}>
              <FormatCard format={f} lifted={i === 2} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <p className="max-w-md text-sm text-text-secondary">
              Pas sûr du format qu&apos;il vous faut ? Décrivez votre tâche, on
              s&apos;en occupe.
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

// ─── Section 4 — En action (editorial, pas hero-metric) ─────────────────────

function InAction() {
  return (
    <section className="relative px-6 py-24">
      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-baseline lg:gap-16">
            {/* Typographic feature: oversize number */}
            <div>
              <div
                className="font-bold leading-none"
                style={{
                  fontSize: 'clamp(5rem, 13vw, 9rem)',
                  color: ACCENT,
                  textShadow: `0 0 24px ${ACCENT}66, 0 0 48px ${ACCENT}33`,
                  letterSpacing: '-0.04em',
                }}
              >
                85h
              </div>
              <div
                className="mt-2 text-sm font-medium uppercase tracking-[0.2em]"
                style={{ color: `${ACCENT}cc` }}
              >
                rendues chaque semaine
              </div>
            </div>

            <div className="lg:pt-4">
              <p className="mb-6 max-w-xl text-lg leading-relaxed text-text-primary">
                C&apos;est le temps qu&apos;on rend chaque semaine à{' '}
                <span style={{ color: ACCENT }}>6 dirigeants</span>, à travers{' '}
                <span style={{ color: ACCENT }}>9 automatisations</span> qui
                tournent en production.
              </p>
              <p className="mb-8 max-w-xl text-sm leading-relaxed text-text-secondary">
                À chaque fois, on a commencé par une tâche précise qu&apos;ils ne
                voulaient plus faire. Voilà ce que ça a donné, projet par projet.
              </p>
              <CTAButton variant="primary" href="/travaux">
                Voir toutes les réalisations →
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── Section 5 — Pour aller plus loin (catalogue agents) ────────────────────

function GoFurther() {
  return (
    <section className="relative px-6 py-28">
      <SectionBackground color={GOLDEN} secondaryColor="#B44AFF" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <p
                className="mb-5 text-xs font-medium uppercase tracking-[0.2em]"
                style={{ color: `${GOLDEN}cc` }}
              >
                Option avancée
              </p>
              <NeonText as="h2" size="lg" color={GOLDEN} className="mb-6">
                Quand vous voulez qu&apos;une IA
                <br />
                décide à votre place
              </NeonText>
              <p className="mb-8 max-w-xl leading-relaxed text-text-secondary">
                Pour les besoins où l&apos;automatisation classique ne suffit pas,
                quand il faut qu&apos;une IA arbitre, qu&apos;elle prenne une
                décision à votre place selon vos règles : on déploie un agent IA
                dédié.
              </p>
              <CTAButton variant="primary" color={GOLDEN} href="/agents">
                Découvrir le catalogue d&apos;agents IA →
              </CTAButton>
            </div>

            <GlassCard color={GOLDEN} className="p-7">
              <div
                className="mb-1 text-5xl font-bold leading-none"
                style={{
                  color: GOLDEN,
                  textShadow: `0 0 16px ${GOLDEN}55`,
                  letterSpacing: '-0.02em',
                }}
              >
                31
              </div>
              <div
                className="mb-5 text-xs font-medium uppercase tracking-[0.18em]"
                style={{ color: `${GOLDEN}cc` }}
              >
                agents prêts à l&apos;emploi
              </div>
              <ul
                className="space-y-1.5 text-sm text-text-secondary"
                style={{ opacity: 0.85 }}
              >
                <li>· Prospection &amp; Vente</li>
                <li>· Marketing &amp; Contenu</li>
                <li>· Support &amp; Relation client</li>
                <li>· RH &amp; Recrutement</li>
                <li>· Admin &amp; Finance</li>
                <li>· Analyse &amp; Pilotage</li>
              </ul>
            </GlassCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── Section 6 — CTA final ──────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="relative px-6 py-32">
      <SectionBackground color={ACCENT} secondaryColor="#B44AFF" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <NeonText as="h2" size="lg" className="mb-6">
            Une tâche en tête que vous aimeriez ne plus faire ?
          </NeonText>
          <p className="mx-auto mb-10 max-w-2xl text-text-secondary">
            Parlons-en pendant un audit gratuit de 30 minutes. À la fin, vous
            repartez avec 2-3 pistes concrètes d&apos;automatisation pour votre
            activité.
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
