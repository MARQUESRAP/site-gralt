// ═══════════════════════════════════════════
// GRALT — Seed Script
// Run: npx tsx data/seed.ts
// ═══════════════════════════════════════════

import { createClient } from '@supabase/supabase-js'

// ---------------------------------------------------------------------------
// Supabase client (service key for full access)
// ---------------------------------------------------------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_KEY in env.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// ---------------------------------------------------------------------------
// Types (local, matching schema)
// ---------------------------------------------------------------------------
interface SectionSeed {
  name: string
  slug: string
  color_primary: string
  color_secondary: string | null
  color_bg: string
  description: string
  order: number
}

interface AgentStep {
  step: number
  text: string
}

interface AgentResultats {
  metrics: string[]
  heures_liberees: string
  roi_semaines: string
}

interface AgentSeed {
  name: string
  slug: string
  section_slug: string // resolved to section_id at insert time
  subsection: string | null
  accroche: string
  description_steps: AgentStep[]
  resultats: AgentResultats
  prix_setup: number
  prix_mensuel: number
  delai: string
  roi: string
  is_golden: boolean
  color: string
  case_study_slug: string | null
  agents_complementaires: string[]
  order: number
}

interface CaseStudySeed {
  title: string
  slug: string
  type: 'detailed' | 'mini'
  context: string
  problem: string
  solution: string
  tech: string[]
  results: string[]
  agent_slugs: string[]
}

// ---------------------------------------------------------------------------
// 6 SECTIONS
// ---------------------------------------------------------------------------
const sections: SectionSeed[] = [
  {
    name: 'Prospection & Vente',
    slug: 'prospection-vente',
    color_primary: '#00E5CC',
    color_secondary: '#0099AA',
    color_bg: 'rgba(0, 229, 204, 0.12)',
    description: 'Trouvez des clients, suivez vos deals, et closez plus vite grace a vos agents IA de prospection et de vente.',
    order: 1,
  },
  {
    name: 'Marketing & Contenu',
    slug: 'marketing-contenu',
    color_primary: '#B44AFF',
    color_secondary: '#7928CA',
    color_bg: 'rgba(180, 74, 255, 0.12)',
    description: 'Creez du contenu, boostez votre visibilite et developpez votre audience avec des agents marketing IA.',
    order: 2,
  },
  {
    name: 'Support & Relation Client',
    slug: 'support-relation-client',
    color_primary: '#22C55E',
    color_secondary: '#15803D',
    color_bg: 'rgba(34, 197, 94, 0.12)',
    description: 'Repondez a vos clients 24h/24, fidelisez-les et transformez votre support en generateur de revenus.',
    order: 3,
  },
  {
    name: 'RH & Recrutement',
    slug: 'rh-recrutement',
    color_primary: '#FB923C',
    color_secondary: null,
    color_bg: 'rgba(251, 146, 60, 0.12)',
    description: 'Recrutez plus vite, triez les candidatures automatiquement et chassez les meilleurs profils.',
    order: 4,
  },
  {
    name: 'Admin & Finance',
    slug: 'admin-finance',
    color_primary: '#818CF8',
    color_secondary: '#4F46E5',
    color_bg: 'rgba(129, 140, 248, 0.12)',
    description: 'Automatisez votre facturation, vos relances, votre admin et pilotez tout depuis votre telephone.',
    order: 5,
  },
  {
    name: 'Analyse & Pilotage',
    slug: 'analyse-pilotage',
    color_primary: '#F472B6',
    color_secondary: null,
    color_bg: 'rgba(244, 114, 182, 0.12)',
    description: 'Visualisez vos KPIs, recevez des rapports intelligents et detectez les anomalies avant tout le monde.',
    order: 6,
  },
]

// ---------------------------------------------------------------------------
// 31 AGENTS
// ---------------------------------------------------------------------------
const agents: AgentSeed[] = [
  // ═══════════════════════════════════════════
  // PROSPECTION & VENTE (6 agents)
  // ═══════════════════════════════════════════

  // --- Sous-section Prospection ---
  {
    name: 'Pablo',
    slug: 'pablo',
    section_slug: 'prospection-vente',
    subsection: 'Prospection',
    accroche: "Je detecte les entreprises qui ont besoin de vous, je trouve le bon interlocuteur, et je lui envoie un email personnalise qui parle de son business. Resultat : 2 a 7 nouveaux clients par mois, sans que vous leviez le petit doigt.",
    description_steps: [
      { step: 1, text: "Surveille en continu des sources business (offres d'emploi, creations d'entreprises, annonces legales) et detecte les entreprises avec un besoin lie a l'activite du client" },
      { step: 2, text: "Qualifie chaque entreprise (taille, secteur, localisation, pertinence) et ecarte les non-pertinentes" },
      { step: 3, text: "Trouve le bon interlocuteur et recupere ses coordonnees (email pro, LinkedIn, poste)" },
      { step: 4, text: "Genere une page d'analyse personnalisee pour chaque prospect" },
      { step: 5, text: "Envoie un email ultra-personnalise renvoyant vers cette page + relances automatiques" },
      { step: 6, text: "Livre les reponses positives dans la boite mail du client" },
    ],
    resultats: {
      metrics: [
        '400-600 prospects qualifies contactes/mois',
        'Taux de reponse 5-8% (superieur au cold emailing classique)',
        '2 a 7 nouveaux clients/mois (10 000\u20ac \u2014 35 000\u20ac CA supplementaire/mois pour panier moyen 5 000\u20ac)',
      ],
      heures_liberees: '15-20h/semaine de travail de prospection',
      roi_semaines: '3-6 semaines',
    },
    prix_setup: 5000,
    prix_mensuel: 350,
    delai: '3-4 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#00E5CC',
    case_study_slug: 'jobsniper',
    agents_complementaires: ['eloa', 'zeus', 'lara'],
    order: 1,
  },
  {
    name: 'Eloa',
    slug: 'eloa',
    section_slug: 'prospection-vente',
    subsection: 'Prospection',
    accroche: "Je trouve vos futurs clients sur LinkedIn, j'engage la conversation avec eux, et je vous passe la main quand ils sont prets a parler. Resultat : 12 a 30 conversations qualifiees par mois avec des decideurs de votre cible.",
    description_steps: [
      { step: 1, text: "Identifie des decideurs correspondant a la cible ideale (poste, secteur, taille, zone geographique)" },
      { step: 2, text: "Engage progressivement (visite de profil, interaction sur publications, signaux d'interet naturels)" },
      { step: 3, text: "Envoie une demande de connexion avec message personnalise" },
      { step: 4, text: "Deroule une sequence de messages conversationnels sur plusieurs jours" },
      { step: 5, text: "Passe la main des qu'un prospect montre de l'interet" },
    ],
    resultats: {
      metrics: [
        '80-120 demandes de connexion ciblees/semaine',
        "Taux d'acceptation 25-35%, taux de reponse 15-25%",
        '12-30 conversations qualifiees/mois',
        '1-4 nouveaux clients/mois (5 000\u20ac \u2014 20 000\u20ac CA/mois)',
      ],
      heures_liberees: '10-15h/semaine de prospection LinkedIn',
      roi_semaines: '4-8 semaines',
    },
    prix_setup: 3500,
    prix_mensuel: 300,
    delai: '2-3 semaines',
    roi: '4-8 semaines',
    is_golden: false,
    color: '#00E5CC',
    case_study_slug: null,
    agents_complementaires: ['pablo', 'camila', 'zeus'],
    order: 2,
  },
  {
    name: 'Marco',
    slug: 'marco',
    section_slug: 'prospection-vente',
    subsection: 'Prospection',
    accroche: "Je cible votre marche, je collecte des centaines d'entreprises, j'enrichis chaque fiche, et je lance des campagnes email personnalisees a votre place. Resultat : un pipeline de 400 a 800 prospects contactes chaque mois.",
    description_steps: [
      { step: 1, text: "Scrape des entreprises depuis plusieurs sources (Google Maps, annuaires, bases legales) selon criteres definis" },
      { step: 2, text: "Nettoie, dedoublonne, verifie la base" },
      { step: 3, text: "Enrichit chaque entreprise (email dirigeant, telephone, CA, employes, site web, avis Google)" },
      { step: 4, text: "Attribue un score de potentiel a chaque lead" },
      { step: 5, text: "Lance des campagnes email personnalisees avec sequences de relance" },
      { step: 6, text: "Livre un tableau de bord avec resultats et reponses positives" },
    ],
    resultats: {
      metrics: [
        "1 000-3 000 entreprises identifiees/mois, 400-800 contactees",
        'Taux de reponse 3-6%',
        '1-7 nouveaux clients/mois (5 000\u20ac \u2014 35 000\u20ac CA/mois)',
      ],
      heures_liberees: '15-25h/semaine de prospection et constitution de bases',
      roi_semaines: '3-6 semaines',
    },
    prix_setup: 4000,
    prix_mensuel: 300,
    delai: '3-4 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#00E5CC',
    case_study_slug: 'rapid-campaign',
    agents_complementaires: ['pablo', 'lara', 'zeus'],
    order: 3,
  },

  // --- Sous-section Vente ---
  {
    name: 'Lara',
    slug: 'lara',
    section_slug: 'prospection-vente',
    subsection: 'Vente',
    accroche: "Je surveille tous vos devis, je relance au bon moment avec le bon message, et je vous alerte quand un prospect montre un signal d'interet. Resultat : 20 a 30% de deals recuperes qui seraient partis sans reponse.",
    description_steps: [
      { step: 1, text: "Se connecte a l'outil commercial existant (CRM, Excel, email) et cartographie toutes les opportunites" },
      { step: 2, text: "Surveille les signaux d'activite (ouverture email, revisite site, telechargement document)" },
      { step: 3, text: "Declenche des sequences de relance progressives et contextualisees sur les devis sans reponse" },
      { step: 4, text: 'Classe les "pas maintenant" et les recontacte a 3, 6 ou 12 mois avec message contextualise' },
      { step: 5, text: "Alerte immediatement quand un signal chaud est detecte (ancien prospect qui reouvre un devis)" },
    ],
    resultats: {
      metrics: [
        'Recupere 20-30% des deals perdus par manque de suivi',
        'Sur 15 devis/mois a 5 000\u20ac, recupere 3 000\u20ac \u2014 9 000\u20ac de CA/mois',
      ],
      heures_liberees: '30min-1h/jour de suivi commercial',
      roi_semaines: '2-4 semaines (le plus rapide car travaille sur des deals deja avances)',
    },
    prix_setup: 3000,
    prix_mensuel: 250,
    delai: '2-3 semaines',
    roi: '2-4 semaines',
    is_golden: false,
    color: '#0099AA',
    case_study_slug: null,
    agents_complementaires: ['pablo', 'matheus', 'zeus'],
    order: 4,
  },
  {
    name: 'Matheus',
    slug: 'matheus',
    section_slug: 'prospection-vente',
    subsection: 'Vente',
    accroche: "Je transforme vos briefs en devis et propositions commerciales prets a envoyer en 15 minutes au lieu de 3 heures. Resultat : vos devis partent dans l'heure, votre taux de conversion augmente de 15 a 25%.",
    description_steps: [
      { step: 1, text: "Le client decrit le besoin (ecrit, formulaire, ou meme message vocal)" },
      { step: 2, text: "Structure la proposition, applique les bons tarifs depuis la grille tarifaire" },
      { step: 3, text: "Genere un document professionnel aux couleurs de l'entreprise (devis ou proposition commerciale complete)" },
      { step: 4, text: "Peut proposer plusieurs variantes (standard, premium, avec options)" },
      { step: 5, text: "Ajustements en une phrase, document final pret a envoyer" },
    ],
    resultats: {
      metrics: [
        'Temps par devis : 10-15 minutes au lieu de 1-3 heures',
        'Sur 15 devis/mois : 15-45 heures liberees',
        'Taux de conversion +15-25% grace a la reactivite',
        '2-3 devis convertis en plus/mois = 10 000\u20ac \u2014 15 000\u20ac CA supplementaire',
      ],
      heures_liberees: '15-45h/mois sur la generation de devis',
      roi_semaines: '3-5 semaines',
    },
    prix_setup: 2500,
    prix_mensuel: 200,
    delai: '2-3 semaines',
    roi: '3-5 semaines',
    is_golden: false,
    color: '#0099AA',
    case_study_slug: null,
    agents_complementaires: ['lara', 'mila', 'bruno'],
    order: 5,
  },

  // --- Agent dore ---
  {
    name: 'Zeus',
    slug: 'zeus',
    section_slug: 'prospection-vente',
    subsection: null,
    accroche: "Je surveille le web 24h/24 pour detecter les gens qui cherchent exactement ce que vous proposez, et je les contacte dans l'heure \u2014 avant vos concurrents. Resultat : des leads ultra-chauds avec un taux de conversion 3 a 5 fois superieur a la prospection classique.",
    description_steps: [
      { step: 1, text: "Configuration des sources a surveiller (groupes Facebook, profils LinkedIn, avis Google concurrents, forums, plateformes d'appels d'offres)" },
      { step: 2, text: "Definition des signaux d'achat (expressions trahissant besoin, frustration, recherche active)" },
      { step: 3, text: "Surveillance continue 24h/24, analyse IA de chaque publication/commentaire/avis" },
      { step: 4, text: "Enrichissement instantane du contact quand un signal est detecte" },
      { step: 5, text: "Generation d'un message d'approche ultra-contextualise envoye dans l'heure" },
      { step: 6, text: "Suivi de la conversation + alerte des reponse positive" },
    ],
    resultats: {
      metrics: [
        'Taux de reponse 20-40% (vs 3-8% en prospection classique)',
        'Taux de conversion 3-5x superieur',
        '5-15 signaux exploitables/mois \u2192 2-6 nouveaux clients (10 000\u20ac \u2014 30 000\u20ac CA/mois)',
        'Intelligence commerciale continue en bonus',
      ],
      heures_liberees: '20-30h/semaine de veille et prospection manuelle',
      roi_semaines: '4-8 semaines',
    },
    prix_setup: 8000,
    prix_mensuel: 500,
    delai: '4-5 semaines',
    roi: '4-8 semaines',
    is_golden: true,
    color: '#F5C842',
    case_study_slug: null,
    agents_complementaires: ['pablo', 'eloa', 'marco'],
    order: 6,
  },

  // ═══════════════════════════════════════════
  // MARKETING & CONTENU (6 agents)
  // ═══════════════════════════════════════════

  // --- Sous-section Creation de contenu ---
  {
    name: 'Camila',
    slug: 'camila',
    section_slug: 'marketing-contenu',
    subsection: 'Creation de contenu',
    accroche: "Chaque semaine, je vous propose 10 idees de posts, je les redige, je cree les visuels, et je publie a votre place. Resultat : une presence LinkedIn professionnelle en 15 minutes par semaine au lieu de 5 heures.",
    description_steps: [
      { step: 1, text: "Analyse le secteur, la cible, les concurrents et l'actualite du marche" },
      { step: 2, text: "Propose 10 idees de posts par semaine avec resume de l'angle" },
      { step: 3, text: "Le client coche ceux qui lui plaisent (30 secondes)" },
      { step: 4, text: "Redige chaque post dans le ton de la marque + genere visuel adapte" },
      { step: 5, text: "Publie automatiquement aux horaires optimaux apres validation" },
      { step: 6, text: "Surveille les commentaires et suggere des reponses" },
    ],
    resultats: {
      metrics: [
        'Croissance 2 000-6 000 abonnes qualifies en 6 mois',
        'Visibilite x5-10',
        '3-10 demandes entrantes/mois',
      ],
      heures_liberees: '3-8h/semaine \u2192 15 min/semaine',
      roi_semaines: '6-12 semaines',
    },
    prix_setup: 3000,
    prix_mensuel: 300,
    delai: '2-3 semaines',
    roi: '6-12 semaines',
    is_golden: false,
    color: '#B44AFF',
    case_study_slug: 'vedet',
    agents_complementaires: ['tiago', 'apollo', 'luna'],
    order: 7,
  },
  {
    name: 'Tiago',
    slug: 'tiago',
    section_slug: 'marketing-contenu',
    subsection: 'Creation de contenu',
    accroche: "J'identifie les mots-cles que vos clients tapent sur Google, je redige des articles optimises chaque mois, et je les publie sur votre site. Resultat : un trafic organique qui croit mois apres mois sans depenser un euro en publicite.",
    description_steps: [
      { step: 1, text: "Analyse sectorielle + identification des requetes clients sur Google" },
      { step: 2, text: "Calendrier editorial mensuel (sujets classes par potentiel et pertinence commerciale)" },
      { step: 3, text: "Redige 2-4 articles/mois optimises SEO (balisage, structure, meta, maillage interne)" },
      { step: 4, text: "Publication automatique apres validation" },
      { step: 5, text: "Suivi du positionnement + ajustement de la strategie" },
    ],
    resultats: {
      metrics: [
        '500-2 000 visiteurs organiques supplementaires/mois a 6 mois',
        '1 000-5 000 a 12 mois',
        'Taux de conversion 1-2% = 5-100 leads entrants/mois',
      ],
      heures_liberees: '8-15h/mois de redaction et publication',
      roi_semaines: '12-24 semaines (cumulatif et durable)',
    },
    prix_setup: 2500,
    prix_mensuel: 350,
    delai: '2-3 semaines',
    roi: '3-6 mois',
    is_golden: false,
    color: '#B44AFF',
    case_study_slug: null,
    agents_complementaires: ['camila', 'apollo', 'caio'],
    order: 8,
  },
  {
    name: 'Ivy',
    slug: 'ivy',
    section_slug: 'marketing-contenu',
    subsection: 'Creation de contenu',
    accroche: "Je redige et j'envoie votre newsletter chaque semaine \u2014 segmentee, personnalisee, avec un taux d'ouverture que vos concurrents vous envieraient. Resultat : votre base clients reste engagee et vous genere des demandes entrantes regulieres.",
    description_steps: [
      { step: 1, text: "Compile contenus pertinents (actualites secteur, publications, promotions, projets)" },
      { step: 2, text: "Segmente la base d'abonnes par interets/historique/profil" },
      { step: 3, text: "Redige la newsletter dans le ton de la marque + objets optimises" },
      { step: 4, text: "Validation en 5 minutes + envoi programme au meilleur creneau" },
      { step: 5, text: "Analyse des resultats + ajustement" },
    ],
    resultats: {
      metrics: [
        "Taux d'ouverture 25-40% (vs 18% moyenne)",
        '1-5 demandes entrantes/mois via newsletter',
        'Reduction du churn client',
      ],
      heures_liberees: '3-6h/semaine de redaction newsletter',
      roi_semaines: '4-8 semaines',
    },
    prix_setup: 2000,
    prix_mensuel: 250,
    delai: '2-3 semaines',
    roi: '4-8 semaines',
    is_golden: false,
    color: '#B44AFF',
    case_study_slug: null,
    agents_complementaires: ['camila', 'apollo', 'mae'],
    order: 9,
  },

  // --- Sous-section Visibilite & Diffusion ---
  {
    name: 'Luna',
    slug: 'luna',
    section_slug: 'marketing-contenu',
    subsection: 'Visibilite & Diffusion',
    accroche: "Je surveille vos avis Google, vos mentions sur les reseaux, et les avis de vos concurrents 24h/24. Un avis negatif ? Je vous alerte et je propose une reponse. Une bonne prestation ? Je demande un avis au client pour vous. Resultat : votre note Google monte mecaniquement et vos concurrents perdent du terrain.",
    description_steps: [
      { step: 1, text: "Connexion a toutes les presences en ligne (Google Business, reseaux sociaux, sites d'avis)" },
      { step: 2, text: "Alerte en temps reel sur avis negatif + proposition de reponse" },
      { step: 3, text: "Envoi automatique de demandes d'avis apres prestations reussies" },
      { step: 4, text: "Surveillance des avis concurrents (avis negatif concurrent = prospect potentiel)" },
      { step: 5, text: "Rapport mensuel de reputation" },
    ],
    resultats: {
      metrics: [
        'Note Google +0,5 point = +25-35% de contacts entrants',
        "Avis negatifs traites en <1h au lieu de semaines",
      ],
      heures_liberees: '2-4h/semaine de gestion de reputation',
      roi_semaines: '4-8 semaines',
    },
    prix_setup: 2000,
    prix_mensuel: 200,
    delai: '2-3 semaines',
    roi: '4-8 semaines',
    is_golden: false,
    color: '#7928CA',
    case_study_slug: null,
    agents_complementaires: ['caio', 'gabriel', 'apollo'],
    order: 10,
  },
  {
    name: 'Caio',
    slug: 'caio',
    section_slug: 'marketing-contenu',
    subsection: 'Visibilite & Diffusion',
    accroche: "J'inscris votre entreprise sur tous les annuaires qui comptent, j'optimise votre fiche Google, et je maintiens tout a jour partout. Resultat : quand quelqu'un cherche votre metier + votre ville sur Google, c'est vous qui apparaissez en premier.",
    description_steps: [
      { step: 1, text: "Audit de visibilite locale actuelle" },
      { step: 2, text: "Inscription/mise a jour sur tous les annuaires pertinents (15-40 selon secteur)" },
      { step: 3, text: "Optimisation complete de la fiche Google Business Profile" },
      { step: 4, text: "Maintien de la coherence des informations partout" },
      { step: 5, text: "Publication reguliere sur la fiche Google (posts, offres, evenements)" },
    ],
    resultats: {
      metrics: [
        'Apparition dans le pack local Google = visibilite x5-10',
        'Fiche Google optimisee = 2-5x plus de clics et appels',
      ],
      heures_liberees: '2-3h/semaine de gestion d\'annuaires et fiche Google',
      roi_semaines: '4-10 semaines',
    },
    prix_setup: 1500,
    prix_mensuel: 200,
    delai: '2-3 semaines',
    roi: '4-10 semaines',
    is_golden: false,
    color: '#7928CA',
    case_study_slug: null,
    agents_complementaires: ['luna', 'tiago', 'apollo'],
    order: 11,
  },

  // --- Agent dore ---
  {
    name: 'Apollo',
    slug: 'apollo',
    section_slug: 'marketing-contenu',
    subsection: null,
    accroche: "Vous enregistrez un message vocal de 3 minutes sur un sujet que vous maitrisez. Je le transforme en post LinkedIn, article de blog, newsletter, carrousel, story, et email pour votre base clients \u2014 le tout en moins d'une heure. Resultat : une strategie de contenu omnicanale complete pour 20 minutes de votre temps par semaine.",
    description_steps: [
      { step: 1, text: "Le client produit UNE matiere brute (message vocal, video, article, email d'idees)" },
      { step: 2, text: "Extraction des messages cles, insights, chiffres, anecdotes" },
      { step: 3, text: "Generation de 6-10 formats (post LinkedIn, carrousel, thread, newsletter, article blog, story, email clients, infographie)" },
      { step: 4, text: "Adaptation aux codes de chaque plateforme" },
      { step: 5, text: "Validation + diffusion sur chaque canal au bon moment" },
    ],
    resultats: {
      metrics: [
        '240-400 contenus publies en 6 mois sur tous les canaux',
        "3-10 nouveaux clients/mois au bout de 6 mois via l'omnipresence",
        "20 min/semaine du dirigeant au lieu d'un community manager a temps plein (25 000\u20ac-35 000\u20ac/an)",
      ],
      heures_liberees: '15-25h/semaine de creation et diffusion de contenu',
      roi_semaines: '6-12 semaines',
    },
    prix_setup: 6000,
    prix_mensuel: 450,
    delai: '3-4 semaines',
    roi: '6-12 semaines',
    is_golden: true,
    color: '#F5C842',
    case_study_slug: null,
    agents_complementaires: ['camila', 'tiago', 'ivy'],
    order: 12,
  },

  // ═══════════════════════════════════════════
  // SUPPORT & RELATION CLIENT (6 agents)
  // ═══════════════════════════════════════════

  // --- Sous-section Support ---
  {
    name: 'Mira',
    slug: 'mira',
    section_slug: 'support-relation-client',
    subsection: 'Support',
    accroche: "Je reponds a vos clients sur votre site, WhatsApp, Instagram et Facebook en meme temps, 24h/24, 7j/7. Resultat : 70 a 80% des demandes traitees instantanement sans intervention humaine, temps de reponse moyen de 30 secondes au lieu de plusieurs heures.",
    description_steps: [
      { step: 1, text: "Connexion a tous les canaux de communication (site web chat, WhatsApp Business, Instagram DM, Facebook Messenger)" },
      { step: 2, text: "Apprentissage de la base de connaissances de l'entreprise (FAQ, produits, tarifs, procedures)" },
      { step: 3, text: "Reponse instantanee aux questions courantes avec le ton de la marque" },
      { step: 4, text: "Escalade intelligente vers un humain pour les demandes complexes avec contexte complet" },
      { step: 5, text: "Rapport quotidien des demandes traitees et des tendances detectees" },
    ],
    resultats: {
      metrics: [
        '70-80% des demandes traitees sans intervention humaine',
        'Temps de reponse moyen : 30 secondes au lieu de plusieurs heures',
        'Disponibilite 24h/24, 7j/7',
      ],
      heures_liberees: '15-25h/semaine de support client',
      roi_semaines: '3-6 semaines',
    },
    prix_setup: 3500,
    prix_mensuel: 300,
    delai: '3-4 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#22C55E',
    case_study_slug: null,
    agents_complementaires: ['pedro', 'isis', 'gabriel'],
    order: 13,
  },
  {
    name: 'Pedro',
    slug: 'pedro',
    section_slug: 'support-relation-client',
    subsection: 'Support',
    accroche: "Je lis chaque email, chaque message, chaque formulaire qui arrive dans votre boite. Je classe, je redige un brouillon de reponse, et je route vers la bonne personne. Resultat : plus aucune demande client oubliee, et vos devis partent en 10 minutes au lieu de 48 heures.",
    description_steps: [
      { step: 1, text: "Connexion a la boite mail et aux formulaires de contact de l'entreprise" },
      { step: 2, text: "Lecture et classification automatique de chaque message entrant (demande de devis, reclamation, question, spam)" },
      { step: 3, text: "Redaction d'un brouillon de reponse adapte au type de demande" },
      { step: 4, text: "Routage vers la bonne personne selon le sujet et l'urgence" },
      { step: 5, text: "Suivi des demandes non traitees avec relances internes" },
    ],
    resultats: {
      metrics: [
        'Zero demande client oubliee',
        'Temps de traitement des devis : 10 min au lieu de 48h',
        'Classification automatique a 95%+ de precision',
      ],
      heures_liberees: '5-10h/semaine de tri et reponse aux emails',
      roi_semaines: '2-4 semaines',
    },
    prix_setup: 2500,
    prix_mensuel: 250,
    delai: '2-3 semaines',
    roi: '2-4 semaines',
    is_golden: false,
    color: '#22C55E',
    case_study_slug: null,
    agents_complementaires: ['mira', 'lara', 'isis'],
    order: 14,
  },

  // --- Sous-section Relation Client ---
  {
    name: 'Mae',
    slug: 'mae',
    section_slug: 'support-relation-client',
    subsection: 'Relation Client',
    accroche: "Je detecte vos clients qui s'eloignent avant qu'ils ne partent, et je les ramene avec le bon message au bon moment. Resultat : une baisse significative des clients perdus et des revenus recuperes sur des clients que vous pensiez partis.",
    description_steps: [
      { step: 1, text: "Analyse de l'historique d'interactions et d'achats de chaque client" },
      { step: 2, text: "Detection des signaux de desengagement (baisse de frequence, absence de commande, ticket non resolu)" },
      { step: 3, text: "Envoi automatique de messages de reactivation personnalises (offre speciale, prise de nouvelles, geste commercial)" },
      { step: 4, text: "Suivi de la reactivation et escalade vers un commercial si necessaire" },
      { step: 5, text: "Rapport mensuel sur le taux de retention et les clients reactives" },
    ],
    resultats: {
      metrics: [
        'Reduction du churn de 15-30%',
        'Revenus recuperes sur clients inactifs : 2 000\u20ac-8 000\u20ac/mois',
      ],
      heures_liberees: '3-5h/semaine de suivi client manuel',
      roi_semaines: '4-8 semaines',
    },
    prix_setup: 3000,
    prix_mensuel: 250,
    delai: '2-3 semaines',
    roi: '4-8 semaines',
    is_golden: false,
    color: '#15803D',
    case_study_slug: null,
    agents_complementaires: ['talia', 'isis', 'ivy'],
    order: 15,
  },
  {
    name: 'Gabriel',
    slug: 'gabriel',
    section_slug: 'support-relation-client',
    subsection: 'Relation Client',
    accroche: "Apres chaque prestation, j'envoie une enquete de satisfaction au bon moment. Score excellent ? Je redirige le client vers Google pour un avis. Score mauvais ? Je vous alerte avant que ca devienne public. Resultat : un flux constant d'avis 5 etoiles et les problemes rattrapes avant qu'ils n'explosent.",
    description_steps: [
      { step: 1, text: "Detection automatique de fin de prestation / livraison via CRM ou email" },
      { step: 2, text: "Envoi d'une enquete de satisfaction courte et personnalisee au bon moment" },
      { step: 3, text: "Score excellent (4-5/5) : redirection automatique vers Google pour deposer un avis" },
      { step: 4, text: "Score faible (<3/5) : alerte immediate au dirigeant avec contexte complet" },
      { step: 5, text: "Rapport mensuel sur la satisfaction globale et l'evolution de la note Google" },
    ],
    resultats: {
      metrics: [
        "Flux constant d'avis 5 etoiles sur Google",
        'Problemes detectes et rattrapes avant qu\'ils deviennent publics',
        'Note Google en hausse mecanique de +0,3-0,5 point',
      ],
      heures_liberees: '2-3h/semaine de suivi de satisfaction',
      roi_semaines: '4-8 semaines',
    },
    prix_setup: 2000,
    prix_mensuel: 200,
    delai: '2-3 semaines',
    roi: '4-8 semaines',
    is_golden: false,
    color: '#15803D',
    case_study_slug: null,
    agents_complementaires: ['luna', 'mae', 'isis'],
    order: 16,
  },
  {
    name: 'Talia',
    slug: 'talia',
    section_slug: 'support-relation-client',
    subsection: 'Relation Client',
    accroche: "J'analyse l'historique d'achat de chaque client et je detecte les opportunites cachees \u2014 un produit complementaire qu'il n'a jamais essaye, un forfait superieur adapte a son usage, un renouvellement qui approche. Resultat : une augmentation du panier moyen de 15 a 30% en exploitant votre base existante.",
    description_steps: [
      { step: 1, text: "Connexion au CRM / outil de facturation et analyse de l'historique d'achat de chaque client" },
      { step: 2, text: "Detection des opportunites d'upsell et cross-sell (produit complementaire, forfait superieur, renouvellement)" },
      { step: 3, text: "Generation de recommandations personnalisees avec message adapte a chaque client" },
      { step: 4, text: "Envoi automatique des propositions au bon moment (fin de contrat, saisonalite, seuil d'usage)" },
      { step: 5, text: "Suivi des conversions et ajustement des recommandations" },
    ],
    resultats: {
      metrics: [
        'Augmentation du panier moyen de 15-30%',
        'Revenus supplementaires sur base existante : 3 000\u20ac-12 000\u20ac/mois',
      ],
      heures_liberees: '3-5h/semaine d\'analyse client et relance manuelle',
      roi_semaines: '3-6 semaines',
    },
    prix_setup: 3000,
    prix_mensuel: 250,
    delai: '2-3 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#15803D',
    case_study_slug: null,
    agents_complementaires: ['mae', 'lara', 'isis'],
    order: 17,
  },

  // --- Agent dore ---
  {
    name: 'Isis',
    slug: 'isis',
    section_slug: 'support-relation-client',
    subsection: null,
    accroche: "Chaque fois qu'un client vous contacte pour une question ou un probleme, je resous sa demande impeccablement \u2014 puis je transforme cette interaction en opportunite. Un client satisfait ? Je lui demande un avis Google dans la foulee. Un client qui pose une question sur un produit ? Je lui suggere l'offre parfaite. Un client frustre bien rattrape ? Je lui envoie un geste commercial 48h plus tard. Resultat : votre support client passe de centre de couts a generateur de revenus.",
    description_steps: [
      { step: 1, text: "Prise en charge de chaque demande client entrante (chat, email, reseaux sociaux)" },
      { step: 2, text: "Resolution rapide et impeccable du probleme ou de la question" },
      { step: 3, text: "Analyse du contexte client en temps reel (historique, potentiel, satisfaction)" },
      { step: 4, text: "Transformation de l'interaction en opportunite : demande d'avis, suggestion d'offre, geste commercial cible" },
      { step: 5, text: "Suivi post-interaction pour maximiser la conversion et la satisfaction" },
    ],
    resultats: {
      metrics: [
        'Support client transforme en generateur de revenus',
        '15-25% des interactions support converties en opportunites commerciales',
        'Note Google en hausse grace aux demandes d\'avis post-resolution',
        'Panier moyen en hausse de 10-20% via suggestions intelligentes',
      ],
      heures_liberees: '20-30h/semaine de support et suivi commercial',
      roi_semaines: '4-8 semaines',
    },
    prix_setup: 7000,
    prix_mensuel: 400,
    delai: '3-4 semaines',
    roi: '4-8 semaines',
    is_golden: true,
    color: '#F5C842',
    case_study_slug: null,
    agents_complementaires: ['mira', 'gabriel', 'talia'],
    order: 18,
  },

  // ═══════════════════════════════════════════
  // RH & RECRUTEMENT (4 agents)
  // ═══════════════════════════════════════════
  {
    name: 'Vitoria',
    slug: 'vitoria',
    section_slug: 'rh-recrutement',
    subsection: null,
    accroche: "Vous me donnez un besoin en 5 minutes, je redige une annonce attractive, je la publie sur LinkedIn, Indeed, France Travail et les jobboards de votre secteur, et je la maintiens visible jusqu'a ce que vous trouviez la perle. Resultat : une offre diffusee partout en 10 minutes au lieu d'une demi-journee, avec un volume de candidatures 2 a 3 fois superieur.",
    description_steps: [
      { step: 1, text: "Recueil du besoin en 5 minutes (poste, competences, localisation, salaire)" },
      { step: 2, text: "Redaction d'une annonce attractive et optimisee pour chaque plateforme" },
      { step: 3, text: "Publication simultanee sur LinkedIn, Indeed, France Travail et jobboards specialises" },
      { step: 4, text: "Optimisation continue de l'annonce pour maximiser la visibilite (mots-cles, renouvellement)" },
      { step: 5, text: "Rapport sur les candidatures recues et les performances par plateforme" },
    ],
    resultats: {
      metrics: [
        'Offre diffusee partout en 10 minutes au lieu d\'une demi-journee',
        'Volume de candidatures 2-3x superieur',
        'Visibilite sur 5-10 plateformes simultanement',
      ],
      heures_liberees: '4-8h par recrutement sur la redaction et diffusion',
      roi_semaines: '2-4 semaines',
    },
    prix_setup: 2000,
    prix_mensuel: 200,
    delai: '2-3 semaines',
    roi: '2-4 semaines',
    is_golden: false,
    color: '#FB923C',
    case_study_slug: null,
    agents_complementaires: ['raul', 'davi', 'attila'],
    order: 19,
  },
  {
    name: 'Raul',
    slug: 'raul',
    section_slug: 'rh-recrutement',
    subsection: null,
    accroche: "Je recois tous les CV de toutes les plateformes, je les lis, je les classe par pertinence, et je vous livre une shortlist de 5 candidats avec une fiche synthetique pour chacun. Resultat : vous passez de 3 heures a eplucher 80 CV a 15 minutes pour lire 5 fiches de candidats deja qualifies.",
    description_steps: [
      { step: 1, text: "Centralisation de tous les CV recus depuis toutes les plateformes (email, LinkedIn, Indeed, France Travail)" },
      { step: 2, text: "Lecture et analyse automatique de chaque CV (competences, experience, formation, localisation)" },
      { step: 3, text: "Scoring de pertinence par rapport au poste et aux criteres definis" },
      { step: 4, text: "Generation d'une fiche synthetique pour chaque candidat (points forts, points d'attention, compatibilite)" },
      { step: 5, text: "Livraison d'une shortlist de 5 candidats avec fiches detaillees" },
    ],
    resultats: {
      metrics: [
        '80 CV tries en 15 minutes au lieu de 3 heures',
        'Shortlist de 5 candidats qualifies par poste',
        'Precision de scoring >90%',
      ],
      heures_liberees: '3-6h par recrutement sur le tri de CV',
      roi_semaines: '2-4 semaines',
    },
    prix_setup: 2500,
    prix_mensuel: 200,
    delai: '2-3 semaines',
    roi: '2-4 semaines',
    is_golden: false,
    color: '#FB923C',
    case_study_slug: null,
    agents_complementaires: ['vitoria', 'davi', 'attila'],
    order: 20,
  },
  {
    name: 'Davi',
    slug: 'davi',
    section_slug: 'rh-recrutement',
    subsection: null,
    accroche: "Je scrape LinkedIn, les CVtheques et les annuaires pour trouver des candidats qui ne postulent nulle part mais qui correspondent exactement a votre poste. Je leur envoie un message d'approche personnalise qui fait reference a leur parcours. Resultat : un vivier de talents invisibles que vos concurrents ne contactent jamais, sans passer par un cabinet a 15-20% du salaire annuel.",
    description_steps: [
      { step: 1, text: "Definition du profil ideal avec le client (competences, experience, secteur, localisation)" },
      { step: 2, text: "Scraping de profils passifs sur LinkedIn, CVtheques et annuaires professionnels" },
      { step: 3, text: "Enrichissement de chaque profil (parcours, competences, coordonnees)" },
      { step: 4, text: "Generation de messages d'approche personnalises faisant reference au parcours de chaque candidat" },
      { step: 5, text: "Envoi des messages et suivi des reponses + relances" },
      { step: 6, text: "Livraison des candidats interesses avec fiche detaillee" },
    ],
    resultats: {
      metrics: [
        'Vivier de talents invisibles inaccessibles par voie classique',
        'Taux de reponse 15-30% (profils contactes personnellement)',
        'Cout 5-10x inferieur a un cabinet de recrutement',
      ],
      heures_liberees: '10-20h par recrutement sur la chasse de profils',
      roi_semaines: '3-6 semaines',
    },
    prix_setup: 3500,
    prix_mensuel: 300,
    delai: '3-4 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#FB923C',
    case_study_slug: null,
    agents_complementaires: ['vitoria', 'raul', 'attila'],
    order: 21,
  },

  // --- Agent dore ---
  {
    name: 'Attila',
    slug: 'attila',
    section_slug: 'rh-recrutement',
    subsection: null,
    accroche: "Vous me dites 'j'ai besoin d'un technicien CVC experimente sur Lille' \u2014 et je fais tout. Je redige l'offre, je la diffuse partout, je chasse en parallele, je trie les candidatures, je pre-qualifie, et je vous livre 3 a 5 candidats prets a passer en entretien. Resultat : un recrutement complet en quelques jours au lieu de plusieurs semaines, pour une fraction du cout d'un chasseur de tetes.",
    description_steps: [
      { step: 1, text: "Recueil du besoin en une phrase (poste, localisation, competences cles)" },
      { step: 2, text: "Redaction et diffusion simultanee de l'offre sur toutes les plateformes pertinentes" },
      { step: 3, text: "Chasse de profils passifs en parallele sur LinkedIn, CVtheques et annuaires" },
      { step: 4, text: "Tri automatique de toutes les candidatures recues (actives + chassees)" },
      { step: 5, text: "Pre-qualification des meilleurs profils (competences, disponibilite, pretentions)" },
      { step: 6, text: "Livraison de 3-5 candidats prets a passer en entretien avec fiche complete" },
    ],
    resultats: {
      metrics: [
        'Recrutement complet en quelques jours au lieu de plusieurs semaines',
        'Fraction du cout d\'un chasseur de tetes (15-20% du salaire annuel)',
        '3-5 candidats qualifies livres par poste',
        'Couverture exhaustive : offres + chasse + tri + pre-qualification',
      ],
      heures_liberees: '20-40h par recrutement',
      roi_semaines: '2-6 semaines',
    },
    prix_setup: 8000,
    prix_mensuel: 450,
    delai: '4-5 semaines',
    roi: '2-6 semaines',
    is_golden: true,
    color: '#F5C842',
    case_study_slug: null,
    agents_complementaires: ['vitoria', 'raul', 'davi'],
    order: 22,
  },

  // ═══════════════════════════════════════════
  // ADMIN & FINANCE (5 agents)
  // ═══════════════════════════════════════════

  // --- Sous-section Finance ---
  {
    name: 'Bruno',
    slug: 'bruno',
    section_slug: 'admin-finance',
    subsection: 'Finance',
    accroche: "Je genere vos factures automatiquement des qu'une prestation est terminee, je les envoie, je surveille les paiements, et je relance les retardataires avec le bon ton au bon moment. Resultat : plus aucune facture oubliee, un delai de paiement moyen qui baisse drastiquement, et des milliers d'euros recuperes chaque annee sur des impayes qui seraient passes a la trappe.",
    description_steps: [
      { step: 1, text: "Connexion au CRM / outil de gestion pour detecter les prestations terminees" },
      { step: 2, text: "Generation automatique de factures conformes aux normes legales" },
      { step: 3, text: "Envoi automatique des factures par email avec suivi de lecture" },
      { step: 4, text: "Surveillance des paiements et detection des retards" },
      { step: 5, text: "Relances progressives et contextualisees (ton cordial puis ferme)" },
      { step: 6, text: "Rapport mensuel sur les encaissements, retards et impayes" },
    ],
    resultats: {
      metrics: [
        'Zero facture oubliee',
        'Delai de paiement moyen en baisse de 30-50%',
        'Milliers d\'euros recuperes/an sur des impayes',
      ],
      heures_liberees: '5-10h/semaine de facturation et relances',
      roi_semaines: '2-4 semaines',
    },
    prix_setup: 3000,
    prix_mensuel: 250,
    delai: '2-3 semaines',
    roi: '2-4 semaines',
    is_golden: false,
    color: '#818CF8',
    case_study_slug: 'ankes',
    agents_complementaires: ['mila', 'odin', 'matheus'],
    order: 23,
  },
  {
    name: 'Mila',
    slug: 'mila',
    section_slug: 'admin-finance',
    subsection: 'Finance',
    accroche: "Vous sortez d'un rendez-vous client, vous me decrivez le besoin en 2 minutes \u2014 meme a l'oral \u2014 et je vous genere un devis professionnel aux couleurs de votre entreprise, avec les bons tarifs et les bonnes conditions. Resultat : vos devis partent dans l'heure au lieu de 3-4 jours, et votre taux de conversion augmente de 15 a 25%.",
    description_steps: [
      { step: 1, text: "Le client decrit le besoin (vocal, ecrit ou formulaire)" },
      { step: 2, text: "Extraction des elements cles : prestations, quantites, tarifs, conditions" },
      { step: 3, text: "Generation d'un devis professionnel aux couleurs de l'entreprise avec mentions legales" },
      { step: 4, text: "Proposition de variantes si pertinent (standard, premium, avec options)" },
      { step: 5, text: "Ajustements rapides et envoi du document final au client" },
    ],
    resultats: {
      metrics: [
        'Devis envoye dans l\'heure au lieu de 3-4 jours',
        'Taux de conversion +15-25% grace a la reactivite',
        'Documents professionnels et conformes a chaque fois',
      ],
      heures_liberees: '5-10h/semaine de creation de devis',
      roi_semaines: '3-5 semaines',
    },
    prix_setup: 2500,
    prix_mensuel: 200,
    delai: '2-3 semaines',
    roi: '3-5 semaines',
    is_golden: false,
    color: '#818CF8',
    case_study_slug: 'ankes',
    agents_complementaires: ['bruno', 'matheus', 'odin'],
    order: 24,
  },

  // --- Sous-section Admin & Gestion ---
  {
    name: 'Zoe',
    slug: 'zoe',
    section_slug: 'admin-finance',
    subsection: 'Admin & Gestion',
    accroche: "Je trie vos emails, je classe vos documents, je remplis vos formulaires recurrents, je surveille vos echeances, et je redige vos courriers. Resultat : plusieurs heures par semaine liberees sur des taches que personne ne veut faire, et plus aucune echeance importante ratee.",
    description_steps: [
      { step: 1, text: "Connexion a la boite mail et aux outils de gestion documentaire" },
      { step: 2, text: "Tri automatique des emails et classification des documents par categorie" },
      { step: 3, text: "Remplissage des formulaires recurrents (declarations, cerfa, documents administratifs)" },
      { step: 4, text: "Surveillance des echeances (fiscales, contractuelles, reglementaires) et alertes anticipees" },
      { step: 5, text: "Redaction de courriers types et reponses administratives" },
    ],
    resultats: {
      metrics: [
        'Plusieurs heures/semaine liberees sur les taches administratives',
        'Zero echeance importante ratee',
        'Documents toujours classes et retrouvables',
      ],
      heures_liberees: '5-10h/semaine de taches administratives',
      roi_semaines: '3-6 semaines',
    },
    prix_setup: 3000,
    prix_mensuel: 250,
    delai: '3-4 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#4F46E5',
    case_study_slug: null,
    agents_complementaires: ['dino', 'bruno', 'odin'],
    order: 25,
  },
  {
    name: 'Dino',
    slug: 'dino',
    section_slug: 'admin-finance',
    subsection: 'Admin & Gestion',
    accroche: "Je cree les plannings de votre equipe en fonction des competences, des disponibilites et des priorites. Un imprevu ? Je reorganise a la volee et je previens tout le monde. Resultat : un planning toujours a jour qui se gere presque tout seul, et des journees mieux organisees pour toute l'equipe.",
    description_steps: [
      { step: 1, text: "Import des donnees : competences de l'equipe, disponibilites, contraintes, projets en cours" },
      { step: 2, text: "Generation automatique du planning optimal (competences x disponibilites x priorites)" },
      { step: 3, text: "Notifications a chaque membre de l'equipe de son planning" },
      { step: 4, text: "Reorganisation a la volee en cas d'imprevu (absence, urgence, changement de priorite)" },
      { step: 5, text: "Rapport hebdomadaire sur l'occupation de l'equipe et les ajustements effectues" },
    ],
    resultats: {
      metrics: [
        'Planning toujours a jour et auto-gere',
        'Reorganisation en temps reel en cas d\'imprevu',
        'Meilleure occupation de l\'equipe (+15-25%)',
      ],
      heures_liberees: '5-10h/semaine de gestion de planning',
      roi_semaines: '3-6 semaines',
    },
    prix_setup: 4000,
    prix_mensuel: 300,
    delai: '3-4 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#4F46E5',
    case_study_slug: 'batizy',
    agents_complementaires: ['zoe', 'odin', 'mariana'],
    order: 26,
  },

  // --- Agent dore ---
  {
    name: 'Odin',
    slug: 'odin',
    section_slug: 'admin-finance',
    subsection: null,
    accroche: "Chaque matin, je vous envoie un briefing complet de votre journee \u2014 factures a encaisser, devis en attente, echeances de la semaine, planning de l'equipe, anomalies detectees. Vous me repondez en langage naturel \u2014 'relance Martin pour sa facture', 'decale le chantier a jeudi' \u2014 et j'execute. Resultat : vous pilotez toute votre admin et vos finances depuis votre telephone en 10 minutes par jour au lieu de vous noyer dans la paperasse.",
    description_steps: [
      { step: 1, text: "Connexion a tous les outils de l'entreprise (facturation, CRM, planning, banque, emails)" },
      { step: 2, text: "Compilation quotidienne d'un briefing complet : factures, devis, echeances, planning, anomalies" },
      { step: 3, text: "Envoi du briefing chaque matin sur le canal prefere (WhatsApp, email, SMS)" },
      { step: 4, text: "Reception et execution des instructions en langage naturel (relances, modifications de planning, envoi de documents)" },
      { step: 5, text: "Detection proactive des anomalies et alertes en temps reel" },
    ],
    resultats: {
      metrics: [
        'Pilotage complet de l\'admin et finance en 10 min/jour',
        'Zero echeance ratee, zero facture oubliee',
        'Anomalies detectees en heures au lieu de semaines',
        'Equivalent d\'un assistant administratif a temps plein',
      ],
      heures_liberees: '15-25h/semaine de gestion administrative',
      roi_semaines: '4-8 semaines',
    },
    prix_setup: 8000,
    prix_mensuel: 500,
    delai: '4-5 semaines',
    roi: '4-8 semaines',
    is_golden: true,
    color: '#F5C842',
    case_study_slug: 'batizy',
    agents_complementaires: ['bruno', 'mila', 'dino'],
    order: 27,
  },

  // ═══════════════════════════════════════════
  // ANALYSE & PILOTAGE (4 agents)
  // ═══════════════════════════════════════════
  {
    name: 'Mariana',
    slug: 'mariana',
    section_slug: 'analyse-pilotage',
    subsection: null,
    accroche: "Je me connecte a tous vos outils \u2014 CRM, facturation, site web, reseaux sociaux, Google Analytics \u2014 et je compile un tableau de bord unique, mis a jour en temps reel, accessible depuis votre telephone. Resultat : une vision a 360\u00b0 de votre entreprise en 30 secondes, au lieu d'une heure a jongler entre 8 outils differents.",
    description_steps: [
      { step: 1, text: "Connexion a tous les outils de l'entreprise (CRM, facturation, site web, reseaux sociaux, Google Analytics)" },
      { step: 2, text: "Identification des KPIs essentiels avec le dirigeant" },
      { step: 3, text: "Compilation d'un tableau de bord unique, clair et visuel" },
      { step: 4, text: "Mise a jour en temps reel et accessibilite mobile" },
      { step: 5, text: "Alertes automatiques si un KPI sort des seuils normaux" },
    ],
    resultats: {
      metrics: [
        'Vision 360\u00b0 de l\'entreprise en 30 secondes',
        'Fini de jongler entre 8 outils differents',
        'Decisions basees sur des donnees en temps reel',
      ],
      heures_liberees: '3-5h/semaine de compilation de donnees et reporting',
      roi_semaines: '3-6 semaines',
    },
    prix_setup: 3500,
    prix_mensuel: 300,
    delai: '3-4 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#F472B6',
    case_study_slug: null,
    agents_complementaires: ['guto', 'jairo', 'atlas'],
    order: 28,
  },
  {
    name: 'Guto',
    slug: 'guto',
    section_slug: 'analyse-pilotage',
    subsection: null,
    accroche: "Chaque lundi matin, je vous envoie un resume clair de votre semaine \u2014 ce qui a marche, ce qui a moins bien fonctionne, les tendances a surveiller, et les actions prioritaires pour la semaine qui vient. Resultat : vous commencez chaque semaine en sachant exactement ou vous en etes et ce que vous devez prioriser, sans reunion de reporting de 2 heures.",
    description_steps: [
      { step: 1, text: "Collecte automatique des donnees de la semaine depuis tous les outils connectes" },
      { step: 2, text: "Analyse des performances : ce qui a marche, ce qui a moins fonctionne" },
      { step: 3, text: "Detection des tendances a surveiller (hausse, baisse, anomalies)" },
      { step: 4, text: "Generation d'un rapport clair avec actions prioritaires pour la semaine suivante" },
      { step: 5, text: "Envoi chaque lundi matin sur le canal prefere" },
    ],
    resultats: {
      metrics: [
        'Chaque semaine commence avec une vision claire',
        'Fini les reunions de reporting de 2 heures',
        'Tendances detectees des la premiere semaine',
      ],
      heures_liberees: '2-4h/semaine de preparation de reporting',
      roi_semaines: '2-4 semaines',
    },
    prix_setup: 3000,
    prix_mensuel: 250,
    delai: '2-3 semaines',
    roi: '2-4 semaines',
    is_golden: false,
    color: '#F472B6',
    case_study_slug: null,
    agents_complementaires: ['mariana', 'jairo', 'atlas'],
    order: 29,
  },
  {
    name: 'Jairo',
    slug: 'jairo',
    section_slug: 'analyse-pilotage',
    subsection: null,
    accroche: "Je surveille tous les indicateurs de votre entreprise 24h/24 et je vous alerte uniquement quand quelque chose sort de l'ordinaire \u2014 tresorerie qui plonge, avis client qui chute, pipeline qui se vide, charges qui derapent. Resultat : les problemes sont detectes en heures au lieu de semaines, et vous dormez tranquille en sachant que si quelque chose derape, vous serez le premier prevenu.",
    description_steps: [
      { step: 1, text: "Connexion a tous les indicateurs de l'entreprise (tresorerie, CRM, avis, pipeline, charges)" },
      { step: 2, text: "Definition des seuils d'alerte avec le dirigeant pour chaque indicateur" },
      { step: 3, text: "Surveillance continue 24h/24 de tous les indicateurs" },
      { step: 4, text: "Alerte immediate et contextuelle quand un indicateur sort des seuils (avec explication et suggestion d'action)" },
      { step: 5, text: "Historique des alertes et rapport mensuel des anomalies detectees" },
    ],
    resultats: {
      metrics: [
        'Problemes detectes en heures au lieu de semaines',
        'Alertes contextuelles avec suggestion d\'action',
        'Tranquillite d\'esprit : surveillance continue sans effort',
      ],
      heures_liberees: '2-4h/semaine de verification manuelle des indicateurs',
      roi_semaines: '2-4 semaines',
    },
    prix_setup: 2500,
    prix_mensuel: 200,
    delai: '2-3 semaines',
    roi: '2-4 semaines',
    is_golden: false,
    color: '#F472B6',
    case_study_slug: null,
    agents_complementaires: ['mariana', 'guto', 'atlas'],
    order: 30,
  },

  // --- Agent dore ---
  {
    name: 'Atlas',
    slug: 'atlas',
    section_slug: 'analyse-pilotage',
    subsection: null,
    accroche: "Je croise toutes les donnees de votre entreprise pour faire emerger des insights que vous ne verriez jamais seul. 'Vos ventes augmentent de 35% quand vous publiez un article la semaine precedente.' 'Votre client le plus rentable est dans la restauration, pas dans le BTP.' 'Si vous augmentez vos prix de 10%, voici l'impact sur votre marge.' Resultat : vous prenez des decisions strategiques basees sur des donnees reelles, comme les grands groupes \u2014 mais sans le cout d'une equipe de data analysts.",
    description_steps: [
      { step: 1, text: "Connexion a toutes les sources de donnees de l'entreprise (ventes, marketing, finance, operations)" },
      { step: 2, text: "Croisement et correlation des donnees entre sources (ventes x marketing, clients x rentabilite, etc.)" },
      { step: 3, text: "Generation d'insights actionables que le dirigeant ne verrait jamais seul" },
      { step: 4, text: "Simulations de scenarios (impact d'un changement de prix, d'un investissement marketing, etc.)" },
      { step: 5, text: "Recommandations strategiques mensuelles basees sur les donnees" },
    ],
    resultats: {
      metrics: [
        'Decisions strategiques basees sur des donnees reelles',
        'Insights impossibles a detecter manuellement',
        'Simulations de scenarios pour anticiper les impacts',
        'Equivalent d\'une equipe data analyst pour une fraction du cout',
      ],
      heures_liberees: '5-10h/semaine d\'analyse et reflexion strategique',
      roi_semaines: '6-12 semaines',
    },
    prix_setup: 9000,
    prix_mensuel: 600,
    delai: '5-6 semaines',
    roi: '6-12 semaines',
    is_golden: true,
    color: '#F5C842',
    case_study_slug: null,
    agents_complementaires: ['mariana', 'guto', 'jairo'],
    order: 31,
  },
]

// ---------------------------------------------------------------------------
// 8 CASE STUDIES
// ---------------------------------------------------------------------------
const caseStudies: CaseStudySeed[] = [
  // ── 1. RAPID CAMPAIGN ──
  {
    title: 'Rapid Campaign — Application de campagnes emailing produit',
    slug: 'rapid-campaign',
    type: 'detailed',
    context: "Rapid-Pub, imprimeur en ligne base a Comines (59), propose des centaines de produits publicitaires — flyers, goodies, baches, cartes de visite. Le dirigeant souhaitait prospecter activement des entreprises susceptibles de commander, mais ne disposait d'aucun outil pour le faire a l'echelle.",
    problem: "Zero campagne de prospection par mois — le dirigeant n'avait tout simplement pas le temps. Identifier manuellement les entreprises a cibler pour chaque produit prenait des heures, personnaliser les emails un par un etait impossible a tenir dans la duree, et il n'existait aucun suivi des resultats : pas de tracking d'ouvertures ni de clics.",
    solution: "Application Next.js/Supabase/n8n avec un parcours product-first : selection du produit a promouvoir, definition de la cible (ex : 100 avocats a Paris), scraping automatique des entreprises correspondantes, generation d'un email personnalise selon le produit et la cible, envoi via Brevo avec relances automatiques, et dashboard de suivi avec KPIs.",
    tech: ['Next.js', 'Supabase', 'n8n', 'Brevo API', 'Claude API'],
    results: [
      'De 0 a 5 campagnes/mois',
      'Lancement d\'une campagne en moins de 20 minutes',
      '~1 200 prospects contactes/mois',
      'Taux d\'ouverture moyen de 38%, taux de clic 4,7%',
      '14 nouveaux clients generes sur les 3 premiers mois',
    ],
    agent_slugs: ['pablo', 'marco'],
  },
  // ── 2. VEDET ──
  {
    title: 'Vedet — Pilotage automatique de contenu LinkedIn',
    slug: 'vedet',
    type: 'detailed',
    context: "Outil developpe en interne par Gralt pour maintenir une presence LinkedIn reguliere et professionnelle sans y consacrer des heures chaque semaine.",
    problem: "3 a 5h/semaine passees a reflechir, rediger et publier du contenu. Rythme de publication irregulier : parfois 3 posts en une semaine, puis silence radio pendant 15 jours. Difficulte a rester dans les tendances du secteur tout en gardant un ton coherent.",
    solution: "8 workflows n8n interconnectes : veille automatique des tendances du secteur, generation de suggestions de posts chaque lundi via Claude API, validation en 15 minutes dans une interface Supabase, publication automatique chaque semaine a l'horaire optimal via l'API LinkedIn.",
    tech: ['n8n (8 workflows)', 'Claude API', 'Supabase', 'Fal.ai'],
    results: [
      '3-5h/semaine reduites a 15 min de validation',
      'Publication constante 1x/semaine depuis la mise en place',
      '+180% d\'impressions moyennes par post en 3 mois',
      '+65% de visites de profil',
      'Taux d\'engagement moyen de 4,2%',
    ],
    agent_slugs: ['camila', 'apollo'],
  },
  // ── 3. RAPID PUB LINKEDIN ──
  {
    title: 'Rapid-Pub LinkedIn — Automatisation de contenu pour un imprimeur en ligne',
    slug: 'rapid-pub-linkedin',
    type: 'detailed',
    context: "Le dirigeant de Rapid-Pub, imprimeur en ligne a Comines (59), n'avait aucune presence sur LinkedIn. Pas de temps, pas de competences en redaction de contenu.",
    problem: "Zero publication LinkedIn — le dirigeant n'avait jamais poste. Pas de temps a consacrer a la creation de contenu, pas de competences en redaction ou strategie de contenu, et perte de visibilite face a des concurrents actifs sur les reseaux.",
    solution: "Deploiement du meme systeme que Vedet, adapte a l'univers goodies et objets publicitaires. 8 workflows n8n pour la generation de contenu cible sur le secteur de l'impression et du marketing physique. Le dirigeant valide les posts en moins de 2 minutes par semaine.",
    tech: ['n8n (8 workflows)', 'Claude API', 'Supabase'],
    results: [
      'De 0 a 2 posts/semaine publies regulierement',
      'Moins de 2 min/semaine pour la validation',
      'Presence LinkedIn professionnelle creee a partir de zero',
    ],
    agent_slugs: ['camila'],
  },
  // ── 4. BATIZY (SA Barbieux) ──
  {
    title: 'Batizy — Application de suivi de chantier pour SA Barbieux',
    slug: 'batizy',
    type: 'detailed',
    context: "SA Barbieux, entreprise familiale de couverture, plomberie et chauffage a Lille, presente depuis plus de 110 ans et aujourd'hui dirigee par la 4eme generation. 10 employes, des dizaines de chantiers en parallele. Le suivi se faisait integralement sur papier.",
    problem: "Suivi de chantier integralement sur papier : rapports perdus, incomplets ou jamais remplis. Les chefs d'equipe sur le terrain n'avaient aucun outil numerique. Ruptures de stock non anticipees. Le dirigeant passait des heures chaque semaine a compiler les informations manuellement. Aucune tracabilite photo des chantiers.",
    solution: "Application web progressive (PWA) React/Supabase, fonctionnant hors reseau grace aux service workers. Photos avant/apres, rapports de chantier guides, suivi de stock en temps reel, panneau admin pour le dirigeant avec vue d'ensemble sur tous les chantiers en cours.",
    tech: ['React (PWA)', 'Supabase', 'Service Workers'],
    results: [
      '~8h/semaine d\'administratif en moins pour le dirigeant',
      'Rapports de chantier remplis systematiquement (vs ~40% avant)',
      'Zero rupture de stock non anticipee depuis la mise en place',
      'Fonctionne meme sans reseau sur les chantiers',
      '10 utilisateurs actifs au quotidien',
    ],
    agent_slugs: ['dino', 'odin'],
  },
  // ── 5. JOBSNIPER ──
  {
    title: "JobSniper — Prospection par detection d'offres d'emploi",
    slug: 'jobsniper',
    type: 'detailed',
    context: "Systeme de prospection automatisee developpe en interne par Gralt. Detecte des offres d'emploi qui revelent un besoin automatisable chez l'entreprise, puis la contacte avec une proposition sur mesure et une page d'analyse personnalisee.",
    problem: "La prospection manuelle par cold emailing classique a des taux de reponse tres faibles (~1-2%). Identifier les entreprises qui ont un vrai besoin prend des heures de recherche. Aucune personnalisation reelle des approches. Impossible de scaler sans y passer tout son temps.",
    solution: "8 workflows n8n orchestres : SCRAPE (detection d'offres d'emploi), QUALIF (qualification du potentiel), ENRICH (enrichissement des donnees), MATCH (matching avec les agents Gralt pertinents), PAGE (generation d'une landing page d'analyse personnalisee sur audit.gralt.fr), MAIL (redaction d'un email ultra-personnalise), SEND (envoi), TRACK (suivi, relances et analytics).",
    tech: ['n8n (8 workflows)', 'Claude API', 'Supabase', 'Next.js'],
    results: [
      '~80 prospects qualifies contactes/semaine',
      'Taux de reponse de 6,4% (vs 1-2% en cold emailing classique)',
      'Landing page personnalisee generee pour chaque prospect',
      '5 rendez-vous qualifies/mois en moyenne',
      '2 clients signes sur le premier mois d\'exploitation',
      'Systeme 100% automatise de bout en bout',
    ],
    agent_slugs: ['pablo', 'zeus'],
  },
  // ── 6. ANKÈS ──
  {
    title: "Ankes — Application de facturation pour artisans",
    slug: 'ankes',
    type: 'detailed',
    context: "L'idee est nee d'un constat personnel : un ami proche, artisan, passait ses dimanches sur Excel a faire ses factures au lieu de profiter de sa famille. Des heures volees a ses proches, chaque semaine, depuis 15 ans. Avec Jeremie Verwaerde, on a decide de creer Ankes.",
    problem: "Des artisans qui passent leurs dimanches sur Excel a remplir des cellules, chercher des numeros de devis, relancer des clients manuellement. Des heures volees a leur famille et a leur metier. Des outils de facturation existants trop complexes pour des non-techniques. Des erreurs de mentions legales, des relances oubliees, des factures perdues.",
    solution: "Application Next.js/Supabase ultra-intuitive : creation de devis et factures en quelques clics, mentions legales automatiques et conformes, suivi des impayes en temps reel, relances automatiques, tableau de bord des chiffres cles de l'activite. Application completement fonctionnelle developpee en 16 heures.",
    tech: ['Next.js', 'Supabase'],
    results: [
      'Devis et factures generes en quelques secondes',
      'Mentions legales toujours conformes automatiquement',
      'Relances d\'impayes automatiques',
      'Tableau de bord clair et visuel des chiffres cles',
      'Application livree fonctionnelle en 16h de developpement',
    ],
    agent_slugs: ['mila', 'bruno'],
  },
  // ── 7. APP PLANNING ──
  {
    title: 'App Planning — Application de planning pour formatrice independante',
    slug: 'planning-formatrice',
    type: 'detailed',
    context: "Une formatrice independante en entrepreneuriat et management, intervenant dans 6 ecoles de la metropole lilloise. Sa gestion de planning etait un cauchemar quotidien entierement gere par email.",
    problem: "Planning gere par email entre 6 ecoles differentes — des dizaines d'echanges pour caler un seul creneau. Double-bookings reguliers. Attente de reponses mails parfois pendant plusieurs jours. Redaction manuelle de son propre planning a la main. Chaque changement necessitait de prevenir tout le monde individuellement.",
    solution: "2 applications interconnectees Next.js/Supabase. App ecoles : chaque ecole accede a ses creneaux disponibles et reserve directement. App formatrice : vue planning complete, export PDF en un clic, notifications automatiques. Integration Google Calendar pour la synchronisation.",
    tech: ['Next.js', 'Supabase', 'Google Calendar API'],
    results: [
      '6 ecoles utilisent l\'app pour reserver directement',
      'Zero double-booking depuis la mise en place',
      'Prise de rendez-vous en quelques clics au lieu de chaines d\'emails',
      '~2h/semaine gagnees sur la gestion de planning',
      'Export PDF du planning en un clic',
      'Image plus professionnelle aupres des ecoles partenaires',
    ],
    agent_slugs: ['dino'],
  },
  // ── 8. AGENT IA PISCINISTE ──
  {
    title: 'Agent IA Pisciniste — Classement automatique de documents pour HL Piscines & Spas',
    slug: 'hl-piscines',
    type: 'detailed',
    context: "HL Piscines & Spas, pisciniste base a Baisieux (59), specialise depuis 20 ans dans la conception, l'installation et l'entretien de piscines, spas et saunas. L'assistante commerciale croulait sous les dossiers papier accumules au fil des annees.",
    problem: "Des milliers de dossiers papier stockes dans des armoires. A chaque appel client (~3 par jour), l'assistante devait se lever physiquement, chercher le dossier dans l'armoire, pendant que le client attendait en ligne. 30 secondes a 3 minutes perdues par dossier. Retrouver un bon de livraison specifique, le scanner, l'envoyer : une galere a chaque fois.",
    solution: "Agent IA de classement automatique de documents. L'assistante prend une photo du document avec son telephone. L'agent identifie automatiquement le type (bon de livraison, bon de commande, facture), extrait les informations cles, et classe le document dans le bon dossier Google Drive — trie par client et par type de document.",
    tech: ['n8n', 'Claude API (Vision)', 'Google Drive API'],
    results: [
      '~6h/mois gagnees sur la recherche et le classement de documents',
      'Classement d\'un document en quelques secondes',
      'Tous les documents accessibles depuis n\'importe ou',
      'Fin de la frustration quotidienne pour l\'assistante commerciale',
      '100% des documents classes correctement et retrouvables instantanement',
    ],
    agent_slugs: [],
  },
  // ── 9. SITE SA BARBIEUX ──
  {
    title: 'Site SA Barbieux — Creation du site vitrine',
    slug: 'site-sa-barbieux',
    type: 'detailed',
    context: "SA Barbieux, entreprise familiale de couverture, plomberie et chauffage a Lille depuis 1913, aujourd'hui dirigee par la 4eme generation. 10 employes, plus de 5 000 projets realises. Malgre 110 ans d'existence, l'entreprise n'avait aucune presence digitale.",
    problem: "Aucun site internet — l'entreprise etait totalement invisible en ligne malgre plus de 110 ans d'existence. Pas de vitrine digitale pour presenter les services et rassurer les prospects. Perte de clients potentiels qui cherchent un artisan sur Google. Plaquette papier vieillissante comme seul support commercial.",
    solution: "Creation complete du site vitrine sabarbieux.fr : presentation des 3 poles d'activite (couverture et zinguerie, plomberie et sanitaire, chauffage et climatisation), mise en avant de l'histoire familiale et des certifications (Qualibat RGE, garantie decennale), formulaire de demande de devis, optimisation SEO local.",
    tech: ['Next.js', 'Vercel'],
    results: [
      'Premiere presence digitale de l\'entreprise en 110 ans d\'existence',
      'Site vitrine professionnel refletant le serieux et l\'anciennete de l\'entreprise',
      'Formulaire de devis accessible 24h/24',
      'Referencement local sur les requetes cles',
      'Base solide pour la suite de la digitalisation',
    ],
    agent_slugs: [],
  },
]

// ---------------------------------------------------------------------------
// SEED FUNCTION
// ---------------------------------------------------------------------------
async function seed() {
  console.log('Starting Gralt database seed...\n')

  // ── 1. Clear existing data (order matters for FK) ──
  console.log('Clearing existing data...')
  const { error: delAgents } = await supabase.from('agents').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (delAgents) console.warn('  Warning clearing agents:', delAgents.message)
  const { error: delCS } = await supabase.from('case_studies').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (delCS) console.warn('  Warning clearing case_studies:', delCS.message)
  const { error: delSections } = await supabase.from('sections').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (delSections) console.warn('  Warning clearing sections:', delSections.message)
  console.log('  Done.\n')

  // ── 2. Insert sections ──
  console.log('Inserting 6 sections...')
  const { data: insertedSections, error: secErr } = await supabase
    .from('sections')
    .insert(sections)
    .select()

  if (secErr) {
    console.error('Failed to insert sections:', secErr)
    process.exit(1)
  }
  console.log(`  Inserted ${insertedSections.length} sections.`)

  // Build slug -> id map
  const sectionMap = new Map<string, string>()
  for (const s of insertedSections) {
    sectionMap.set(s.slug, s.id)
  }
  console.log('  Section ID map built.\n')

  // ── 3. Insert agents ──
  console.log('Inserting 31 agents...')
  const agentRows = agents.map((a) => {
    const section_id = sectionMap.get(a.section_slug)
    if (!section_id) {
      console.error(`  No section found for slug "${a.section_slug}" (agent: ${a.name})`)
      process.exit(1)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { section_slug, ...rest } = a
    return { ...rest, section_id }
  })

  const { data: insertedAgents, error: agErr } = await supabase
    .from('agents')
    .insert(agentRows)
    .select()

  if (agErr) {
    console.error('Failed to insert agents:', agErr)
    process.exit(1)
  }
  console.log(`  Inserted ${insertedAgents.length} agents.\n`)

  // ── 4. Insert case studies ──
  console.log('Inserting 8 case studies...')
  const { data: insertedCS, error: csErr } = await supabase
    .from('case_studies')
    .insert(caseStudies)
    .select()

  if (csErr) {
    console.error('Failed to insert case studies:', csErr)
    process.exit(1)
  }
  console.log(`  Inserted ${insertedCS.length} case studies.\n`)

  // ── 5. Summary ──
  console.log('='.repeat(50))
  console.log('Seed completed successfully!')
  console.log(`  Sections:     ${insertedSections.length}`)
  console.log(`  Agents:       ${insertedAgents.length}`)
  console.log(`  Case Studies: ${insertedCS.length}`)
  console.log('='.repeat(50))

  // Verify golden agents
  const goldenAgents = insertedAgents.filter((a: { is_golden: boolean }) => a.is_golden)
  console.log(`\nGolden agents (${goldenAgents.length}):`)
  for (const g of goldenAgents) {
    console.log(`  - ${g.name} (${g.slug})`)
  }
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
