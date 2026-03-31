// ═══════════════════════════════════════════
// GRALT — TypeScript Types
// ═══════════════════════════════════════════

export interface Section {
  id: string
  name: string
  slug: string
  color_primary: string
  color_secondary: string | null
  color_bg: string
  description: string
  order: number
}

export interface Agent {
  id: string
  name: string
  section_id: string
  subsection: string | null
  slug: string
  accroche: string
  description_steps: AgentStep[]
  resultats: AgentResultats
  prix_setup: number
  prix_mensuel: number
  abonnement_details?: AbonnementDetail[]
  delai: string
  roi: string
  is_golden: boolean
  color: string
  image?: string
  case_study_slug: string | null
  agents_complementaires: string[]
  // Joined
  section?: Section
}

export interface AbonnementDetail {
  label: string
  amount: number
}

export interface AgentStep {
  step: number
  text: string
}

export interface AgentResultats {
  metrics: string[]
  heures_liberees: string
  roi_semaines: string
}

export interface CaseStudyWorkflow {
  image: string
  title: string
  description: string
}

export interface CaseStudy {
  id: string
  title: string
  slug: string
  type: 'detailed' | 'mini'
  context: string
  problem: string
  solution: string
  tech: string[]
  results: string[]
  agent_slugs: string[]
  image?: string
  workflows?: CaseStudyWorkflow[]
}

export interface FormSubmission {
  id: string
  name: string
  company: string
  website: string | null
  employees: string
  sector: string
  agents_interested: string[]
  need_description: string | null
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  meta_description: string
  category: string
  status: 'draft' | 'published'
  created_at: string
}

// ═══════════════════════════════════════════
// Section color mapping
// ═══════════════════════════════════════════

export const SECTION_COLORS: Record<string, {
  primary: string
  secondary: string | null
  bg: string
}> = {
  'prospection-vente': {
    primary: '#00E5CC',
    secondary: '#0099AA',
    bg: 'rgba(0, 229, 204, 0.12)',
  },
  'marketing-contenu': {
    primary: '#B44AFF',
    secondary: '#7928CA',
    bg: 'rgba(180, 74, 255, 0.12)',
  },
  'support-relation-client': {
    primary: '#22C55E',
    secondary: '#15803D',
    bg: 'rgba(34, 197, 94, 0.12)',
  },
  'rh-recrutement': {
    primary: '#FB923C',
    secondary: null,
    bg: 'rgba(251, 146, 60, 0.12)',
  },
  'admin-finance': {
    primary: '#818CF8',
    secondary: '#4F46E5',
    bg: 'rgba(129, 140, 248, 0.12)',
  },
  'analyse-pilotage': {
    primary: '#F472B6',
    secondary: null,
    bg: 'rgba(244, 114, 182, 0.12)',
  },
}

export const GOLDEN_COLORS = {
  primary: '#F5C842',
  bg: 'rgba(245, 200, 66, 0.15)',
  deep: '#D4A528',
}
