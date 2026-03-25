// ═══════════════════════════════════════════
// GRALT — Static Data Layer
// import { getSections, getAgentBySlug, ... } from '@/lib/data'
// ═══════════════════════════════════════════

import type { Section, Agent, AgentStep, AgentResultats, CaseStudy } from '@/types'

// ---------------------------------------------------------------------------
// 6 SECTIONS
// ---------------------------------------------------------------------------

export const sections: Section[] = [
  {
    id: 'prospection-vente',
    name: 'Prospection & Vente',
    slug: 'prospection-vente',
    color_primary: '#00E5CC',
    color_secondary: '#0099AA',
    color_bg: 'rgba(0, 229, 204, 0.12)',
    description: 'Trouvez des clients, suivez vos deals, et closez plus vite grâce à vos agents IA de prospection et de vente.',
    order: 1,
  },
  {
    id: 'marketing-contenu',
    name: 'Marketing & Contenu',
    slug: 'marketing-contenu',
    color_primary: '#B44AFF',
    color_secondary: '#7928CA',
    color_bg: 'rgba(180, 74, 255, 0.12)',
    description: 'Créez du contenu, boostez votre visibilité et développez votre audience avec des agents marketing IA.',
    order: 2,
  },
  {
    id: 'support-relation-client',
    name: 'Support & Relation Client',
    slug: 'support-relation-client',
    color_primary: '#22C55E',
    color_secondary: '#15803D',
    color_bg: 'rgba(34, 197, 94, 0.12)',
    description: 'Répondez à vos clients 24h/24, fidélisez-les et transformez votre support en générateur de revenus.',
    order: 3,
  },
  {
    id: 'rh-recrutement',
    name: 'RH',
    slug: 'rh-recrutement',
    color_primary: '#FB923C',
    color_secondary: null,
    color_bg: 'rgba(251, 146, 60, 0.12)',
    description: 'Recrutez plus vite, triez les candidatures automatiquement et chassez les meilleurs profils.',
    order: 4,
  },
  {
    id: 'admin-finance',
    name: 'Admin & Finance',
    slug: 'admin-finance',
    color_primary: '#818CF8',
    color_secondary: '#4F46E5',
    color_bg: 'rgba(129, 140, 248, 0.12)',
    description: 'Automatisez votre facturation, vos relances, votre admin et pilotez tout depuis votre téléphone.',
    order: 5,
  },
  {
    id: 'analyse-pilotage',
    name: 'Analytics',
    slug: 'analyse-pilotage',
    color_primary: '#F472B6',
    color_secondary: null,
    color_bg: 'rgba(244, 114, 182, 0.12)',
    description: 'Visualisez vos KPIs, recevez des rapports intelligents et détectez les anomalies avant tout le monde.',
    order: 6,
  },
]

// ---------------------------------------------------------------------------
// 31 AGENTS
// ---------------------------------------------------------------------------

export const agents: Agent[] = [
  // ═══════════════════════════════════════════
  // PROSPECTION & VENTE (6 agents)
  // ═══════════════════════════════════════════

  // --- Sous-section Prospection ---
  {
    id: 'pablo',
    name: 'Pablo',
    section_id: 'prospection-vente',
    subsection: 'Prospection',
    slug: 'pablo',
    accroche: "Je détecte les entreprises qui ont un vrai besoin grâce à des signaux business précis — offres d'emploi, créations d'entreprises, annonces légales. Je qualifie en profondeur chaque prospect, je génère une page d'analyse personnalisée, et je lui envoie un email ultra-ciblé. Résultat : 2 à 7 nouveaux clients par mois, avec un taux de conversion bien supérieur au cold emailing classique.",
    description_steps: [
      { step: 1, text: "Surveille en continu des sources business (offres d'emploi, créations d'entreprises, annonces légales) et détecte les entreprises avec un besoin lié à l'activité du client" },
      { step: 2, text: "Qualifie chaque entreprise (taille, secteur, localisation, pertinence) et écarte les non-pertinentes" },
      { step: 3, text: "Trouve le bon interlocuteur et récupère ses coordonnées (email pro, LinkedIn, poste)" },
      { step: 4, text: "Génère une page d'analyse personnalisée pour chaque prospect" },
      { step: 5, text: "Envoie un email ultra-personnalisé renvoyant vers cette page + relances automatiques" },
      { step: 6, text: "Livre les réponses positives dans la boîte mail du client" },
    ],
    resultats: {
      metrics: [
        '400-600 prospects qualifiés contactés/mois',
        'Taux de réponse 5-8% (supérieur au cold emailing classique)',
        '2 à 7 nouveaux clients/mois (10 000\u20ac \u2014 35 000\u20ac CA supplémentaire/mois pour panier moyen 5 000\u20ac)',
      ],
      heures_liberees: '15-20h/semaine de travail de prospection',
      roi_semaines: '3-6 semaines',
    },
    prix_setup_min: 2500,
    prix_setup_max: 4500,
    prix_mensuel_min: 200,
    prix_mensuel_max: 350,
    delai: '2-3 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#00E5CC',
    image: '/agents/pablo.png',
    case_study_slug: 'jobsniper',
    agents_complementaires: ['eloa', 'zeus', 'lara'],
  },
  {
    id: 'eloa',
    name: 'Eloa',
    section_id: 'prospection-vente',
    subsection: 'Prospection',
    slug: 'eloa',
    accroche: "Je trouve vos futurs clients sur LinkedIn, j'engage la conversation avec eux, et je vous passe la main quand ils sont prêts à parler. Résultat : 12 à 30 conversations qualifiées par mois avec des décideurs de votre cible.",
    description_steps: [
      { step: 1, text: "Identifie des décideurs correspondant à la cible idéale (poste, secteur, taille, zone géographique)" },
      { step: 2, text: "Engage progressivement (visite de profil, interaction sur publications, signaux d'intérêt naturels)" },
      { step: 3, text: "Envoie une demande de connexion avec message personnalisé" },
      { step: 4, text: "Déroule une séquence de messages conversationnels sur plusieurs jours" },
      { step: 5, text: "Passe la main dès qu'un prospect montre de l'intérêt" },
    ],
    resultats: {
      metrics: [
        '80-120 demandes de connexion ciblées/semaine',
        "Taux d'acceptation 25-35%, taux de réponse 15-25%",
        '12-30 conversations qualifiées/mois',
        '1-4 nouveaux clients/mois (5 000\u20ac \u2014 20 000\u20ac CA/mois)',
      ],
      heures_liberees: '10-15h/semaine de prospection LinkedIn',
      roi_semaines: '4-8 semaines',
    },
    prix_setup_min: 2500,
    prix_setup_max: 4000,
    prix_mensuel_min: 200,
    prix_mensuel_max: 300,
    delai: '2-3 semaines',
    roi: '4-8 semaines',
    is_golden: false,
    color: '#00E5CC',
    image: '/agents/eloa.png',
    case_study_slug: null,
    agents_complementaires: ['pablo', 'camila', 'zeus'],
  },
  {
    id: 'marco',
    name: 'Marco',
    section_id: 'prospection-vente',
    subsection: 'Prospection',
    slug: 'marco',
    accroche: "Vous me donnez un secteur et une zone géographique, et je fais le reste. Je scrape des milliers d'entreprises, je les qualifie, et je lance des campagnes email en volume à votre place. Résultat : un pipeline massif de 400 à 800 prospects contactés chaque mois, pour un coût par lead imbattable.",
    description_steps: [
      { step: 1, text: "Scrape en masse des entreprises depuis Google Maps, annuaires et bases légales selon le secteur et la zone ciblés" },
      { step: 2, text: "Nettoie, dédoublonne et vérifie automatiquement la base collectée" },
      { step: 3, text: "Enrichit rapidement chaque fiche (email dirigeant, téléphone, site web)" },
      { step: 4, text: "Lance des campagnes email en volume avec séquences de relance automatiques" },
      { step: 5, text: "Livre les réponses positives et un tableau de bord des résultats" },
    ],
    resultats: {
      metrics: [
        "1 000-3 000 entreprises identifiées/mois, 400-800 contactées",
        'Taux de réponse 3-6%',
        '1-7 nouveaux clients/mois (5 000\u20ac \u2014 35 000\u20ac CA/mois)',
      ],
      heures_liberees: '15-25h/semaine de prospection et constitution de bases',
      roi_semaines: '3-6 semaines',
    },
    prix_setup_min: 1500,
    prix_setup_max: 3000,
    prix_mensuel_min: 150,
    prix_mensuel_max: 250,
    delai: '1-2 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#00E5CC',
    image: '/agents/marco.png',
    case_study_slug: 'rapid-campaign',
    agents_complementaires: ['pablo', 'lara', 'zeus'],
  },

  // --- Sous-section Vente ---
  {
    id: 'lara',
    name: 'Lara',
    section_id: 'prospection-vente',
    subsection: 'Vente',
    slug: 'lara',
    accroche: "Je surveille tous vos devis, je relance au bon moment avec le bon message, et je vous alerte quand un prospect montre un signal d'intérêt. Résultat : 20 à 30% de deals récupérés qui seraient partis sans réponse.",
    description_steps: [
      { step: 1, text: "Se connecte à l'outil commercial existant (CRM, Excel, email) et cartographie toutes les opportunités" },
      { step: 2, text: "Surveille les signaux d'activité (ouverture email, revisite site, téléchargement document)" },
      { step: 3, text: "Déclenche des séquences de relance progressives et contextualisées sur les devis sans réponse" },
      { step: 4, text: 'Classe les "pas maintenant" et les recontacte à 3, 6 ou 12 mois avec message contextualisé' },
      { step: 5, text: "Alerte immédiatement quand un signal chaud est détecté (ancien prospect qui réouvre un devis)" },
    ],
    resultats: {
      metrics: [
        'Récupère 20-30% des deals perdus par manque de suivi',
        'Sur 15 devis/mois à 5 000\u20ac, récupère 3 000\u20ac \u2014 9 000\u20ac de CA/mois',
      ],
      heures_liberees: '30min-1h/jour de suivi commercial',
      roi_semaines: '2-4 semaines (le plus rapide car travaille sur des deals déjà avancés)',
    },
    prix_setup_min: 2000,
    prix_setup_max: 3500,
    prix_mensuel_min: 200,
    prix_mensuel_max: 300,
    delai: '2-3 semaines',
    roi: '2-4 semaines',
    is_golden: false,
    color: '#0099AA',
    image: '/agents/lara.png',
    case_study_slug: null,
    agents_complementaires: ['pablo', 'matheus', 'zeus'],
  },
  {
    id: 'matheus',
    name: 'Matheus',
    section_id: 'prospection-vente',
    subsection: 'Vente',
    slug: 'matheus',
    accroche: "Je transforme vos briefs en devis et propositions commerciales prêts à envoyer en 15 minutes au lieu de 3 heures. Résultat : vos devis partent dans l'heure, votre taux de conversion augmente de 15 à 25%.",
    description_steps: [
      { step: 1, text: "Le client décrit le besoin (écrit, formulaire, ou même message vocal)" },
      { step: 2, text: "Structure la proposition, applique les bons tarifs depuis la grille tarifaire" },
      { step: 3, text: "Génère un document professionnel aux couleurs de l'entreprise (devis ou proposition commerciale complète)" },
      { step: 4, text: "Peut proposer plusieurs variantes (standard, premium, avec options)" },
      { step: 5, text: "Ajustements en une phrase, document final prêt à envoyer" },
    ],
    resultats: {
      metrics: [
        'Temps par devis : 10-15 minutes au lieu de 1-3 heures',
        'Sur 15 devis/mois : 15-45 heures libérées',
        'Taux de conversion +15-25% grâce à la réactivité',
        '2-3 devis convertis en plus/mois = 10 000\u20ac \u2014 15 000\u20ac CA supplémentaire',
      ],
      heures_liberees: '15-45h/mois sur la génération de devis',
      roi_semaines: '3-5 semaines',
    },
    prix_setup_min: 1500,
    prix_setup_max: 3000,
    prix_mensuel_min: 150,
    prix_mensuel_max: 250,
    delai: '1-2 semaines',
    roi: '3-5 semaines',
    is_golden: false,
    color: '#0099AA',
    image: '/agents/matheus.png',
    case_study_slug: null,
    agents_complementaires: ['lara', 'mila', 'bruno'],
  },

  // --- Agent doré ---
  {
    id: 'zeus',
    name: 'Zeus',
    section_id: 'prospection-vente',
    subsection: null,
    slug: 'zeus',
    accroche: "Je surveille le web 24h/24 pour détecter les gens qui cherchent exactement ce que vous proposez, et je les contacte dans l'heure \u2014 avant vos concurrents. Résultat : des leads ultra-chauds avec un taux de conversion 3 à 5 fois supérieur à la prospection classique.",
    description_steps: [
      { step: 1, text: "Configuration des sources à surveiller (groupes Facebook, profils LinkedIn, avis Google concurrents, forums, plateformes d'appels d'offres)" },
      { step: 2, text: "Définition des signaux d'achat (expressions trahissant besoin, frustration, recherche active)" },
      { step: 3, text: "Surveillance continue 24h/24, analyse IA de chaque publication/commentaire/avis" },
      { step: 4, text: "Enrichissement instantané du contact quand un signal est détecté" },
      { step: 5, text: "Génération d'un message d'approche ultra-contextualisé envoyé dans l'heure" },
      { step: 6, text: "Suivi de la conversation + alerte des réponses positives" },
    ],
    resultats: {
      metrics: [
        'Taux de réponse 20-40% (vs 3-8% en prospection classique)',
        'Taux de conversion 3-5x supérieur',
        '5-15 signaux exploitables/mois \u2192 2-6 nouveaux clients (10 000\u20ac \u2014 30 000\u20ac CA/mois)',
        'Intelligence commerciale continue en bonus',
      ],
      heures_liberees: '20-30h/semaine de veille et prospection manuelle',
      roi_semaines: '4-8 semaines',
    },
    prix_setup_min: 4000,
    prix_setup_max: 7000,
    prix_mensuel_min: 300,
    prix_mensuel_max: 500,
    delai: '3-4 semaines',
    roi: '4-8 semaines',
    is_golden: true,
    color: '#F5C842',
    image: '/agents/zeus.png',
    case_study_slug: null,
    agents_complementaires: ['pablo', 'eloa', 'marco'],
  },

  // ═══════════════════════════════════════════
  // MARKETING & CONTENU (6 agents)
  // ═══════════════════════════════════════════

  // --- Sous-section Création de contenu ---
  {
    id: 'camila',
    name: 'Camila',
    section_id: 'marketing-contenu',
    subsection: 'Création de contenu',
    slug: 'camila',
    accroche: "Chaque semaine, je vous propose 10 idées de posts, je les rédige, je crée les visuels, et je publie à votre place. Résultat : une présence LinkedIn professionnelle en 15 minutes par semaine au lieu de 5 heures.",
    description_steps: [
      { step: 1, text: "Analyse le secteur, la cible, les concurrents et l'actualité du marché" },
      { step: 2, text: "Propose 10 idées de posts par semaine avec résumé de l'angle" },
      { step: 3, text: "Le client coche ceux qui lui plaisent (30 secondes)" },
      { step: 4, text: "Rédige chaque post dans le ton de la marque + génère visuel adapté" },
      { step: 5, text: "Publie automatiquement aux horaires optimaux après validation" },
      { step: 6, text: "Surveille les commentaires et suggère des réponses" },
    ],
    resultats: {
      metrics: [
        'Croissance 2 000-6 000 abonnés qualifiés en 6 mois',
        'Visibilité x5-10',
        '3-10 demandes entrantes/mois',
      ],
      heures_liberees: '3-8h/semaine \u2192 15 min/semaine',
      roi_semaines: '6-12 semaines',
    },
    prix_setup_min: 2500,
    prix_setup_max: 4000,
    prix_mensuel_min: 200,
    prix_mensuel_max: 300,
    delai: '2-3 semaines',
    roi: '6-12 semaines',
    is_golden: false,
    color: '#B44AFF',
    image: '/agents/camila.png',
    case_study_slug: 'vedet',
    agents_complementaires: ['tiago', 'apollo', 'luna'],
  },
  {
    id: 'tiago',
    name: 'Tiago',
    section_id: 'marketing-contenu',
    subsection: 'Création de contenu',
    slug: 'tiago',
    accroche: "J'identifie les mots-clés que vos clients tapent sur Google, je rédige des articles optimisés chaque mois, et je les publie sur votre site. Résultat : un trafic organique qui croît mois après mois sans dépenser un euro en publicité.",
    description_steps: [
      { step: 1, text: "Analyse sectorielle + identification des requêtes clients sur Google" },
      { step: 2, text: "Calendrier éditorial mensuel (sujets classés par potentiel et pertinence commerciale)" },
      { step: 3, text: "Rédige 2-4 articles/mois optimisés SEO (balisage, structure, meta, maillage interne)" },
      { step: 4, text: "Publication automatique après validation" },
      { step: 5, text: "Suivi du positionnement + ajustement de la stratégie" },
    ],
    resultats: {
      metrics: [
        '500-2 000 visiteurs organiques supplémentaires/mois à 6 mois',
        '1 000-5 000 à 12 mois',
        'Taux de conversion 1-2% = 5-100 leads entrants/mois',
      ],
      heures_liberees: '8-15h/mois de rédaction et publication',
      roi_semaines: '12-24 semaines (cumulatif et durable)',
    },
    prix_setup_min: 2000,
    prix_setup_max: 3500,
    prix_mensuel_min: 200,
    prix_mensuel_max: 350,
    delai: '1-2 semaines',
    roi: '3-6 mois',
    is_golden: false,
    color: '#B44AFF',
    image: '/agents/tiago.png',
    case_study_slug: null,
    agents_complementaires: ['camila', 'apollo', 'caio'],
  },
  {
    id: 'ivy',
    name: 'Ivy',
    section_id: 'marketing-contenu',
    subsection: 'Création de contenu',
    slug: 'ivy',
    accroche: "Je rédige et j'envoie votre newsletter chaque semaine \u2014 segmentée, personnalisée, avec un taux d'ouverture que vos concurrents vous envieraient. Résultat : votre base clients reste engagée et vous génère des demandes entrantes régulières.",
    description_steps: [
      { step: 1, text: "Compile contenus pertinents (actualités secteur, publications, promotions, projets)" },
      { step: 2, text: "Segmente la base d'abonnés par intérêts/historique/profil" },
      { step: 3, text: "Rédige la newsletter dans le ton de la marque + objets optimisés" },
      { step: 4, text: "Validation en 5 minutes + envoi programmé au meilleur créneau" },
      { step: 5, text: "Analyse des résultats + ajustement" },
    ],
    resultats: {
      metrics: [
        "Taux d'ouverture 25-40% (vs 18% moyenne)",
        '1-5 demandes entrantes/mois via newsletter',
        'Réduction du churn client',
      ],
      heures_liberees: '3-6h/semaine de rédaction newsletter',
      roi_semaines: '4-8 semaines',
    },
    prix_setup_min: 1500,
    prix_setup_max: 2500,
    prix_mensuel_min: 150,
    prix_mensuel_max: 250,
    delai: '1-2 semaines',
    roi: '4-8 semaines',
    is_golden: false,
    color: '#B44AFF',
    image: '/agents/ivy.png',
    case_study_slug: null,
    agents_complementaires: ['camila', 'apollo', 'mae'],
  },

  // --- Sous-section Visibilité & Diffusion ---
  {
    id: 'luna',
    name: 'Luna',
    section_id: 'marketing-contenu',
    subsection: 'Visibilité & Diffusion',
    slug: 'luna',
    accroche: "Je surveille vos avis Google, vos mentions sur les réseaux, et les avis de vos concurrents 24h/24. Un avis négatif ? Je vous alerte et je propose une réponse. Une bonne prestation ? Je demande un avis au client pour vous. Résultat : votre note Google monte mécaniquement et vos concurrents perdent du terrain.",
    description_steps: [
      { step: 1, text: "Connexion à toutes les présences en ligne (Google Business, réseaux sociaux, sites d'avis)" },
      { step: 2, text: "Alerte en temps réel sur avis négatif + proposition de réponse" },
      { step: 3, text: "Envoi automatique de demandes d'avis après prestations réussies" },
      { step: 4, text: "Surveillance des avis concurrents (avis négatif concurrent = prospect potentiel)" },
      { step: 5, text: "Rapport mensuel de réputation" },
    ],
    resultats: {
      metrics: [
        'Note Google +0,5 point = +25-35% de contacts entrants',
        "Avis négatifs traités en <1h au lieu de semaines",
      ],
      heures_liberees: '2-4h/semaine de gestion de réputation',
      roi_semaines: '4-8 semaines',
    },
    prix_setup_min: 1500,
    prix_setup_max: 2500,
    prix_mensuel_min: 150,
    prix_mensuel_max: 250,
    delai: '2-3 semaines',
    roi: '4-8 semaines',
    is_golden: false,
    color: '#7928CA',
    image: '/agents/luna.png',
    case_study_slug: null,
    agents_complementaires: ['caio', 'gabriel', 'apollo'],
  },
  {
    id: 'caio',
    name: 'Caio',
    section_id: 'marketing-contenu',
    subsection: 'Visibilité & Diffusion',
    slug: 'caio',
    accroche: "J'inscris votre entreprise sur tous les annuaires qui comptent, j'optimise votre fiche Google, et je maintiens tout à jour partout. Résultat : quand quelqu'un cherche votre métier + votre ville sur Google, c'est vous qui apparaissez en premier.",
    description_steps: [
      { step: 1, text: "Audit de visibilité locale actuelle" },
      { step: 2, text: "Inscription/mise à jour sur tous les annuaires pertinents (15-40 selon secteur)" },
      { step: 3, text: "Optimisation complète de la fiche Google Business Profile" },
      { step: 4, text: "Maintien de la cohérence des informations partout" },
      { step: 5, text: "Publication régulière sur la fiche Google (posts, offres, événements)" },
    ],
    resultats: {
      metrics: [
        'Apparition dans le pack local Google = visibilité x5-10',
        'Fiche Google optimisée = 2-5x plus de clics et appels',
      ],
      heures_liberees: '2-3h/semaine de gestion d\'annuaires et fiche Google',
      roi_semaines: '4-10 semaines',
    },
    prix_setup_min: 1500,
    prix_setup_max: 2500,
    prix_mensuel_min: 150,
    prix_mensuel_max: 200,
    delai: '1-2 semaines',
    roi: '4-10 semaines',
    is_golden: false,
    color: '#7928CA',
    image: '/agents/caio.png',
    case_study_slug: null,
    agents_complementaires: ['luna', 'tiago', 'apollo'],
  },

  // --- Agent doré ---
  {
    id: 'apollo',
    name: 'Apollo',
    section_id: 'marketing-contenu',
    subsection: null,
    slug: 'apollo',
    accroche: "Vous enregistrez un message vocal de 3 minutes sur un sujet que vous maîtrisez. Je le transforme en post LinkedIn, article de blog, newsletter, carrousel, story, et email pour votre base clients \u2014 le tout en moins d'une heure. Résultat : une stratégie de contenu omnicanale complète pour 20 minutes de votre temps par semaine.",
    description_steps: [
      { step: 1, text: "Le client produit UNE matière brute (message vocal, vidéo, article, email d'idées)" },
      { step: 2, text: "Extraction des messages clés, insights, chiffres, anecdotes" },
      { step: 3, text: "Génération de 6-10 formats (post LinkedIn, carrousel, thread, newsletter, article blog, story, email clients, infographie)" },
      { step: 4, text: "Adaptation aux codes de chaque plateforme" },
      { step: 5, text: "Validation + diffusion sur chaque canal au bon moment" },
    ],
    resultats: {
      metrics: [
        '240-400 contenus publiés en 6 mois sur tous les canaux',
        "3-10 nouveaux clients/mois au bout de 6 mois via l'omniprésence",
        "20 min/semaine du dirigeant au lieu d'un community manager à temps plein (25 000\u20ac-35 000\u20ac/an)",
      ],
      heures_liberees: '15-25h/semaine de création et diffusion de contenu',
      roi_semaines: '6-12 semaines',
    },
    prix_setup_min: 4000,
    prix_setup_max: 6000,
    prix_mensuel_min: 300,
    prix_mensuel_max: 450,
    delai: '3-4 semaines',
    roi: '6-12 semaines',
    is_golden: true,
    color: '#F5C842',
    image: '/agents/apollo.png',
    case_study_slug: null,
    agents_complementaires: ['camila', 'tiago', 'ivy'],
  },

  // ═══════════════════════════════════════════
  // SUPPORT & RELATION CLIENT (6 agents)
  // ═══════════════════════════════════════════

  // --- Sous-section Support ---
  {
    id: 'pedro',
    name: 'Pedro',
    section_id: 'support-relation-client',
    subsection: 'Support',
    slug: 'pedro',
    accroche: "Je réponds à vos clients sur votre site, WhatsApp, Instagram et Facebook en même temps, 24h/24, 7j/7. Résultat : 70 à 80% des demandes traitées instantanément sans intervention humaine, temps de réponse moyen de 30 secondes au lieu de plusieurs heures.",
    description_steps: [
      { step: 1, text: "Connexion à tous les canaux de communication (site web chat, WhatsApp Business, Instagram DM, Facebook Messenger)" },
      { step: 2, text: "Apprentissage de la base de connaissances de l'entreprise (FAQ, produits, tarifs, procédures)" },
      { step: 3, text: "Réponse instantanée aux questions courantes avec le ton de la marque" },
      { step: 4, text: "Escalade intelligente vers un humain pour les demandes complexes avec contexte complet" },
      { step: 5, text: "Rapport quotidien des demandes traitées et des tendances détectées" },
    ],
    resultats: {
      metrics: [
        '70-80% des demandes traitées sans intervention humaine',
        'Temps de réponse moyen : 30 secondes au lieu de plusieurs heures',
        'Disponibilité 24h/24, 7j/7',
      ],
      heures_liberees: '15-25h/semaine de support client',
      roi_semaines: '3-6 semaines',
    },
    prix_setup_min: 2500,
    prix_setup_max: 4500,
    prix_mensuel_min: 200,
    prix_mensuel_max: 350,
    delai: '2-3 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#22C55E',
    image: '/agents/pedro.png',
    case_study_slug: null,
    agents_complementaires: ['mira', 'isis', 'gabriel'],
  },
  {
    id: 'mira',
    name: 'Mira',
    section_id: 'support-relation-client',
    subsection: 'Support',
    slug: 'mira',
    accroche: "Je lis chaque email, chaque message, chaque formulaire qui arrive dans votre boîte. Je classe, je rédige un brouillon de réponse, et je route vers la bonne personne. Résultat : plus aucune demande client oubliée, et vos devis partent en 10 minutes au lieu de 48 heures.",
    description_steps: [
      { step: 1, text: "Connexion à la boîte mail et aux formulaires de contact de l'entreprise" },
      { step: 2, text: "Lecture et classification automatique de chaque message entrant (demande de devis, réclamation, question, spam)" },
      { step: 3, text: "Rédaction d'un brouillon de réponse adapté au type de demande" },
      { step: 4, text: "Routage vers la bonne personne selon le sujet et l'urgence" },
      { step: 5, text: "Suivi des demandes non traitées avec relances internes" },
    ],
    resultats: {
      metrics: [
        'Zéro demande client oubliée',
        'Temps de traitement des devis : 10 min au lieu de 48h',
        'Classification automatique à 95%+ de précision',
      ],
      heures_liberees: '5-10h/semaine de tri et réponse aux emails',
      roi_semaines: '2-4 semaines',
    },
    prix_setup_min: 1500,
    prix_setup_max: 2500,
    prix_mensuel_min: 150,
    prix_mensuel_max: 250,
    delai: '1-2 semaines',
    roi: '2-4 semaines',
    is_golden: false,
    color: '#22C55E',
    image: '/agents/mira.png',
    case_study_slug: null,
    agents_complementaires: ['mira', 'lara', 'isis'],
  },

  // --- Sous-section Relation Client ---
  {
    id: 'mae',
    name: 'Mae',
    section_id: 'support-relation-client',
    subsection: 'Relation Client',
    slug: 'mae',
    accroche: "Je détecte vos clients qui s'éloignent avant qu'ils ne partent, et je les ramène avec le bon message au bon moment. Résultat : une baisse significative des clients perdus et des revenus récupérés sur des clients que vous pensiez partis.",
    description_steps: [
      { step: 1, text: "Analyse de l'historique d'interactions et d'achats de chaque client" },
      { step: 2, text: "Détection des signaux de désengagement (baisse de fréquence, absence de commande, ticket non résolu)" },
      { step: 3, text: "Envoi automatique de messages de réactivation personnalisés (offre spéciale, prise de nouvelles, geste commercial)" },
      { step: 4, text: "Suivi de la réactivation et escalade vers un commercial si nécessaire" },
      { step: 5, text: "Rapport mensuel sur le taux de rétention et les clients réactivés" },
    ],
    resultats: {
      metrics: [
        'Réduction du churn de 15-30%',
        'Revenus récupérés sur clients inactifs : 2 000\u20ac-8 000\u20ac/mois',
      ],
      heures_liberees: '3-5h/semaine de suivi client manuel',
      roi_semaines: '4-8 semaines',
    },
    prix_setup_min: 2000,
    prix_setup_max: 3500,
    prix_mensuel_min: 200,
    prix_mensuel_max: 300,
    delai: '2-3 semaines',
    roi: '4-8 semaines',
    is_golden: false,
    color: '#15803D',
    image: '/agents/mae.png',
    case_study_slug: null,
    agents_complementaires: ['talia', 'isis', 'ivy'],
  },
  {
    id: 'gabriel',
    name: 'Gabriel',
    section_id: 'support-relation-client',
    subsection: 'Relation Client',
    slug: 'gabriel',
    accroche: "Après chaque prestation, j'envoie une enquête de satisfaction au bon moment. Score excellent ? Je redirige le client vers Google pour un avis. Score mauvais ? Je vous alerte avant que ça devienne public. Résultat : un flux constant d'avis 5 étoiles et les problèmes rattrapés avant qu'ils n'explosent.",
    description_steps: [
      { step: 1, text: "Détection automatique de fin de prestation / livraison via CRM ou email" },
      { step: 2, text: "Envoi d'une enquête de satisfaction courte et personnalisée au bon moment" },
      { step: 3, text: "Score excellent (4-5/5) : redirection automatique vers Google pour déposer un avis" },
      { step: 4, text: "Score faible (<3/5) : alerte immédiate au dirigeant avec contexte complet" },
      { step: 5, text: "Rapport mensuel sur la satisfaction globale et l'évolution de la note Google" },
    ],
    resultats: {
      metrics: [
        "Flux constant d'avis 5 étoiles sur Google",
        'Problèmes détectés et rattrapés avant qu\'ils deviennent publics',
        'Note Google en hausse mécanique de +0,3-0,5 point',
      ],
      heures_liberees: '2-3h/semaine de suivi de satisfaction',
      roi_semaines: '4-8 semaines',
    },
    prix_setup_min: 1500,
    prix_setup_max: 2500,
    prix_mensuel_min: 150,
    prix_mensuel_max: 200,
    delai: '1-2 semaines',
    roi: '4-8 semaines',
    is_golden: false,
    color: '#15803D',
    image: '/agents/gabriel.png',
    case_study_slug: null,
    agents_complementaires: ['luna', 'mae', 'isis'],
  },
  {
    id: 'talia',
    name: 'Talia',
    section_id: 'support-relation-client',
    subsection: 'Relation Client',
    slug: 'talia',
    accroche: "J'analyse l'historique d'achat de chaque client et je détecte les opportunités cachées \u2014 un produit complémentaire qu'il n'a jamais essayé, un forfait supérieur adapté à son usage, un renouvellement qui approche. Résultat : une augmentation du panier moyen de 15 à 30% en exploitant votre base existante.",
    description_steps: [
      { step: 1, text: "Connexion au CRM / outil de facturation et analyse de l'historique d'achat de chaque client" },
      { step: 2, text: "Détection des opportunités d'upsell et cross-sell (produit complémentaire, forfait supérieur, renouvellement)" },
      { step: 3, text: "Génération de recommandations personnalisées avec message adapté à chaque client" },
      { step: 4, text: "Envoi automatique des propositions au bon moment (fin de contrat, saisonnalité, seuil d'usage)" },
      { step: 5, text: "Suivi des conversions et ajustement des recommandations" },
    ],
    resultats: {
      metrics: [
        'Augmentation du panier moyen de 15-30%',
        'Revenus supplémentaires sur base existante : 3 000\u20ac-12 000\u20ac/mois',
      ],
      heures_liberees: '3-5h/semaine d\'analyse client et relance manuelle',
      roi_semaines: '3-6 semaines',
    },
    prix_setup_min: 2000,
    prix_setup_max: 3500,
    prix_mensuel_min: 200,
    prix_mensuel_max: 300,
    delai: '2-3 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#15803D',
    image: '/agents/talia.png',
    case_study_slug: null,
    agents_complementaires: ['mae', 'lara', 'isis'],
  },

  // --- Agent doré ---
  {
    id: 'isis',
    name: 'Isis',
    section_id: 'support-relation-client',
    subsection: null,
    slug: 'isis',
    accroche: "Chaque fois qu'un client vous contacte pour une question ou un problème, je résous sa demande impeccablement \u2014 puis je transforme cette interaction en opportunité. Un client satisfait ? Je lui demande un avis Google dans la foulée. Un client qui pose une question sur un produit ? Je lui suggère l'offre parfaite. Un client frustré bien rattrapé ? Je lui envoie un geste commercial 48h plus tard. Résultat : votre support client passe de centre de coûts à générateur de revenus.",
    description_steps: [
      { step: 1, text: "Prise en charge de chaque demande client entrante (chat, email, réseaux sociaux)" },
      { step: 2, text: "Résolution rapide et impeccable du problème ou de la question" },
      { step: 3, text: "Analyse du contexte client en temps réel (historique, potentiel, satisfaction)" },
      { step: 4, text: "Transformation de l'interaction en opportunité : demande d'avis, suggestion d'offre, geste commercial ciblé" },
      { step: 5, text: "Suivi post-interaction pour maximiser la conversion et la satisfaction" },
    ],
    resultats: {
      metrics: [
        'Support client transformé en générateur de revenus',
        '15-25% des interactions support converties en opportunités commerciales',
        'Note Google en hausse grâce aux demandes d\'avis post-résolution',
        'Panier moyen en hausse de 10-20% via suggestions intelligentes',
      ],
      heures_liberees: '20-30h/semaine de support et suivi commercial',
      roi_semaines: '4-8 semaines',
    },
    prix_setup_min: 4000,
    prix_setup_max: 6000,
    prix_mensuel_min: 300,
    prix_mensuel_max: 450,
    delai: '3-4 semaines',
    roi: '4-8 semaines',
    is_golden: true,
    color: '#F5C842',
    image: '/agents/isis.png',
    case_study_slug: null,
    agents_complementaires: ['mira', 'gabriel', 'talia'],
  },

  // ═══════════════════════════════════════════
  // RH & RECRUTEMENT (4 agents)
  // ═══════════════════════════════════════════
  {
    id: 'vitoria',
    name: 'Vitoria',
    section_id: 'rh-recrutement',
    subsection: null,
    slug: 'vitoria',
    accroche: "Vous me donnez un besoin en 5 minutes, je rédige une annonce attractive, je la publie sur LinkedIn, Indeed, France Travail et les jobboards de votre secteur, et je la maintiens visible jusqu'à ce que vous trouviez la perle. Résultat : une offre diffusée partout en 10 minutes au lieu d'une demi-journée, avec un volume de candidatures 2 à 3 fois supérieur.",
    description_steps: [
      { step: 1, text: "Recueil du besoin en 5 minutes (poste, compétences, localisation, salaire)" },
      { step: 2, text: "Rédaction d'une annonce attractive et optimisée pour chaque plateforme" },
      { step: 3, text: "Publication simultanée sur LinkedIn, Indeed, France Travail et jobboards spécialisés" },
      { step: 4, text: "Optimisation continue de l'annonce pour maximiser la visibilité (mots-clés, renouvellement)" },
      { step: 5, text: "Rapport sur les candidatures reçues et les performances par plateforme" },
    ],
    resultats: {
      metrics: [
        'Offre diffusée partout en 10 minutes au lieu d\'une demi-journée',
        'Volume de candidatures 2-3x supérieur',
        'Visibilité sur 5-10 plateformes simultanément',
      ],
      heures_liberees: '4-8h par recrutement sur la rédaction et diffusion',
      roi_semaines: '2-4 semaines',
    },
    prix_setup_min: 1500,
    prix_setup_max: 2500,
    prix_mensuel_min: 150,
    prix_mensuel_max: 200,
    delai: '2-3 semaines',
    roi: '2-4 semaines',
    is_golden: false,
    color: '#FB923C',
    image: '/agents/vitoria.png',
    case_study_slug: null,
    agents_complementaires: ['raul', 'davi', 'attila'],
  },
  {
    id: 'raul',
    name: 'Raul',
    section_id: 'rh-recrutement',
    subsection: null,
    slug: 'raul',
    accroche: "Je reçois tous les CV de toutes les plateformes, je les lis, je les classe par pertinence, et je vous livre une shortlist de 5 candidats avec une fiche synthétique pour chacun. Résultat : vous passez de 3 heures à éplucher 80 CV à 15 minutes pour lire 5 fiches de candidats déjà qualifiés.",
    description_steps: [
      { step: 1, text: "Centralisation de tous les CV reçus depuis toutes les plateformes (email, LinkedIn, Indeed, France Travail)" },
      { step: 2, text: "Lecture et analyse automatique de chaque CV (compétences, expérience, formation, localisation)" },
      { step: 3, text: "Scoring de pertinence par rapport au poste et aux critères définis" },
      { step: 4, text: "Génération d'une fiche synthétique pour chaque candidat (points forts, points d'attention, compatibilité)" },
      { step: 5, text: "Livraison d'une shortlist de 5 candidats avec fiches détaillées" },
    ],
    resultats: {
      metrics: [
        '80 CV triés en 15 minutes au lieu de 3 heures',
        'Shortlist de 5 candidats qualifiés par poste',
        'Précision de scoring >90%',
      ],
      heures_liberees: '3-6h par recrutement sur le tri de CV',
      roi_semaines: '2-4 semaines',
    },
    prix_setup_min: 2000,
    prix_setup_max: 3500,
    prix_mensuel_min: 200,
    prix_mensuel_max: 250,
    delai: '2-3 semaines',
    roi: '2-4 semaines',
    is_golden: false,
    color: '#FB923C',
    image: '/agents/raul.png',
    case_study_slug: null,
    agents_complementaires: ['vitoria', 'davi', 'attila'],
  },
  {
    id: 'davi',
    name: 'Davi',
    section_id: 'rh-recrutement',
    subsection: null,
    slug: 'davi',
    accroche: "Je scrape LinkedIn, les CVthèques et les annuaires pour trouver des candidats qui ne postulent nulle part mais qui correspondent exactement à votre poste. Je leur envoie un message d'approche personnalisé qui fait référence à leur parcours. Résultat : un vivier de talents invisibles que vos concurrents ne contactent jamais, sans passer par un cabinet à 15-20% du salaire annuel.",
    description_steps: [
      { step: 1, text: "Définition du profil idéal avec le client (compétences, expérience, secteur, localisation)" },
      { step: 2, text: "Scraping de profils passifs sur LinkedIn, CVthèques et annuaires professionnels" },
      { step: 3, text: "Enrichissement de chaque profil (parcours, compétences, coordonnées)" },
      { step: 4, text: "Génération de messages d'approche personnalisés faisant référence au parcours de chaque candidat" },
      { step: 5, text: "Envoi des messages et suivi des réponses + relances" },
      { step: 6, text: "Livraison des candidats intéressés avec fiche détaillée" },
    ],
    resultats: {
      metrics: [
        'Vivier de talents invisibles inaccessibles par voie classique',
        'Taux de réponse 15-30% (profils contactés personnellement)',
        'Coût 5-10x inférieur à un cabinet de recrutement',
      ],
      heures_liberees: '10-20h par recrutement sur la chasse de profils',
      roi_semaines: '3-6 semaines',
    },
    prix_setup_min: 1500,
    prix_setup_max: 3000,
    prix_mensuel_min: 150,
    prix_mensuel_max: 250,
    delai: '2-3 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#FB923C',
    image: '/agents/davi.png',
    case_study_slug: null,
    agents_complementaires: ['vitoria', 'raul', 'attila'],
  },

  // --- Agent doré ---
  {
    id: 'attila',
    name: 'Attila',
    section_id: 'rh-recrutement',
    subsection: null,
    slug: 'attila',
    accroche: "Vous me dites 'j'ai besoin d'un technicien CVC expérimenté sur Lille' \u2014 et je fais tout. Je rédige l'offre, je la diffuse partout, je chasse en parallèle, je trie les candidatures, je pré-qualifie, et je vous livre 3 à 5 candidats prêts à passer en entretien. Résultat : un recrutement complet en quelques jours au lieu de plusieurs semaines, pour une fraction du coût d'un chasseur de têtes.",
    description_steps: [
      { step: 1, text: "Recueil du besoin en une phrase (poste, localisation, compétences clés)" },
      { step: 2, text: "Rédaction et diffusion simultanée de l'offre sur toutes les plateformes pertinentes" },
      { step: 3, text: "Chasse de profils passifs en parallèle sur LinkedIn, CVthèques et annuaires" },
      { step: 4, text: "Tri automatique de toutes les candidatures reçues (actives + chassées)" },
      { step: 5, text: "Pré-qualification des meilleurs profils (compétences, disponibilité, prétentions)" },
      { step: 6, text: "Livraison de 3-5 candidats prêts à passer en entretien avec fiche complète" },
    ],
    resultats: {
      metrics: [
        'Recrutement complet en quelques jours au lieu de plusieurs semaines',
        'Fraction du coût d\'un chasseur de têtes (15-20% du salaire annuel)',
        '3-5 candidats qualifiés livrés par poste',
        'Couverture exhaustive : offres + chasse + tri + pré-qualification',
      ],
      heures_liberees: '20-40h par recrutement',
      roi_semaines: '2-6 semaines',
    },
    prix_setup_min: 4500,
    prix_setup_max: 7000,
    prix_mensuel_min: 300,
    prix_mensuel_max: 450,
    delai: '3-4 semaines',
    roi: '2-6 semaines',
    is_golden: true,
    color: '#F5C842',
    image: '/agents/attila.png',
    case_study_slug: null,
    agents_complementaires: ['vitoria', 'raul', 'davi'],
  },

  // ═══════════════════════════════════════════
  // ADMIN & FINANCE (5 agents)
  // ═══════════════════════════════════════════

  // --- Sous-section Finance ---
  {
    id: 'bruno',
    name: 'Bruno',
    section_id: 'admin-finance',
    subsection: 'Finance',
    slug: 'bruno',
    accroche: "Je génère vos factures automatiquement dès qu'une prestation est terminée, je les envoie, je surveille les paiements, et je relance les retardataires avec le bon ton au bon moment. Résultat : plus aucune facture oubliée, un délai de paiement moyen qui baisse drastiquement, et des milliers d'euros récupérés chaque année sur des impayés qui seraient passés à la trappe.",
    description_steps: [
      { step: 1, text: "Connexion au CRM / outil de gestion pour détecter les prestations terminées" },
      { step: 2, text: "Génération automatique de factures conformes aux normes légales" },
      { step: 3, text: "Envoi automatique des factures par email avec suivi de lecture" },
      { step: 4, text: "Surveillance des paiements et détection des retards" },
      { step: 5, text: "Relances progressives et contextualisées (ton cordial puis ferme)" },
      { step: 6, text: "Rapport mensuel sur les encaissements, retards et impayés" },
    ],
    resultats: {
      metrics: [
        'Zéro facture oubliée',
        'Délai de paiement moyen en baisse de 30-50%',
        'Milliers d\'euros récupérés/an sur des impayés',
      ],
      heures_liberees: '5-10h/semaine de facturation et relances',
      roi_semaines: '2-4 semaines',
    },
    prix_setup_min: 2000,
    prix_setup_max: 3500,
    prix_mensuel_min: 200,
    prix_mensuel_max: 300,
    delai: '2-3 semaines',
    roi: '2-4 semaines',
    is_golden: false,
    color: '#818CF8',
    image: '/agents/bruno.png',
    case_study_slug: 'ankes',
    agents_complementaires: ['mila', 'odin', 'matheus'],
  },
  {
    id: 'mila',
    name: 'Mila',
    section_id: 'admin-finance',
    subsection: 'Finance',
    slug: 'mila',
    accroche: "Vous sortez d'un rendez-vous client, vous me décrivez le besoin en 2 minutes \u2014 même à l'oral \u2014 et je vous génère un devis professionnel aux couleurs de votre entreprise, avec les bons tarifs et les bonnes conditions. Résultat : vos devis partent dans l'heure au lieu de 3-4 jours, et votre taux de conversion augmente de 15 à 25%.",
    description_steps: [
      { step: 1, text: "Le client décrit le besoin (vocal, écrit ou formulaire)" },
      { step: 2, text: "Extraction des éléments clés : prestations, quantités, tarifs, conditions" },
      { step: 3, text: "Génération d'un devis professionnel aux couleurs de l'entreprise avec mentions légales" },
      { step: 4, text: "Proposition de variantes si pertinent (standard, premium, avec options)" },
      { step: 5, text: "Ajustements rapides et envoi du document final au client" },
    ],
    resultats: {
      metrics: [
        'Devis envoyé dans l\'heure au lieu de 3-4 jours',
        'Taux de conversion +15-25% grâce à la réactivité',
        'Documents professionnels et conformes à chaque fois',
      ],
      heures_liberees: '5-10h/semaine de création de devis',
      roi_semaines: '3-5 semaines',
    },
    prix_setup_min: 1500,
    prix_setup_max: 3000,
    prix_mensuel_min: 150,
    prix_mensuel_max: 250,
    delai: '1-2 semaines',
    roi: '3-5 semaines',
    is_golden: false,
    color: '#818CF8',
    image: '/agents/mila.png',
    case_study_slug: 'ankes',
    agents_complementaires: ['bruno', 'matheus', 'odin'],
  },

  // --- Sous-section Admin & Gestion ---
  {
    id: 'zoe',
    name: 'Zoe',
    section_id: 'admin-finance',
    subsection: 'Admin & Gestion',
    slug: 'zoe',
    accroche: "Je trie vos emails, je classe vos documents, je remplis vos formulaires récurrents, je surveille vos échéances, et je rédige vos courriers. Résultat : plusieurs heures par semaine libérées sur des tâches que personne ne veut faire, et plus aucune échéance importante ratée.",
    description_steps: [
      { step: 1, text: "Connexion à la boîte mail et aux outils de gestion documentaire" },
      { step: 2, text: "Tri automatique des emails et classification des documents par catégorie" },
      { step: 3, text: "Remplissage des formulaires récurrents (déclarations, cerfa, documents administratifs)" },
      { step: 4, text: "Surveillance des échéances (fiscales, contractuelles, réglementaires) et alertes anticipées" },
      { step: 5, text: "Rédaction de courriers types et réponses administratives" },
    ],
    resultats: {
      metrics: [
        'Plusieurs heures/semaine libérées sur les tâches administratives',
        'Zéro échéance importante ratée',
        'Documents toujours classés et retrouvables',
      ],
      heures_liberees: '5-10h/semaine de tâches administratives',
      roi_semaines: '3-6 semaines',
    },
    prix_setup_min: 2500,
    prix_setup_max: 4000,
    prix_mensuel_min: 200,
    prix_mensuel_max: 300,
    delai: '2-3 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#4F46E5',
    image: '/agents/zoe.png',
    case_study_slug: null,
    agents_complementaires: ['dino', 'bruno', 'odin'],
  },
  {
    id: 'dino',
    name: 'Dino',
    section_id: 'admin-finance',
    subsection: 'Admin & Gestion',
    slug: 'dino',
    accroche: "Je crée les plannings de votre équipe en fonction des compétences, des disponibilités et des priorités. Un imprévu ? Je réorganise à la volée et je préviens tout le monde. Résultat : un planning toujours à jour qui se gère presque tout seul, et des journées mieux organisées pour toute l'équipe.",
    description_steps: [
      { step: 1, text: "Import des données : compétences de l'équipe, disponibilités, contraintes, projets en cours" },
      { step: 2, text: "Génération automatique du planning optimal (compétences x disponibilités x priorités)" },
      { step: 3, text: "Notifications à chaque membre de l'équipe de son planning" },
      { step: 4, text: "Réorganisation à la volée en cas d'imprévu (absence, urgence, changement de priorité)" },
      { step: 5, text: "Rapport hebdomadaire sur l'occupation de l'équipe et les ajustements effectués" },
    ],
    resultats: {
      metrics: [
        'Planning toujours à jour et auto-géré',
        'Réorganisation en temps réel en cas d\'imprévu',
        'Meilleure occupation de l\'équipe (+15-25%)',
      ],
      heures_liberees: '5-10h/semaine de gestion de planning',
      roi_semaines: '3-6 semaines',
    },
    prix_setup_min: 1500,
    prix_setup_max: 3000,
    prix_mensuel_min: 150,
    prix_mensuel_max: 250,
    delai: '2-3 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#4F46E5',
    image: '/agents/dino.png',
    case_study_slug: 'batizy',
    agents_complementaires: ['zoe', 'odin', 'mariana'],
  },

  // --- Agent doré ---
  {
    id: 'odin',
    name: 'Odin',
    section_id: 'admin-finance',
    subsection: null,
    slug: 'odin',
    accroche: "Chaque matin, je vous envoie un briefing complet de votre journée \u2014 factures à encaisser, devis en attente, échéances de la semaine, planning de l'équipe, anomalies détectées. Vous me répondez en langage naturel \u2014 'relance Martin pour sa facture', 'décale le chantier à jeudi' \u2014 et j'exécute. Résultat : vous pilotez toute votre admin et vos finances depuis votre téléphone en 10 minutes par jour au lieu de vous noyer dans la paperasse.",
    description_steps: [
      { step: 1, text: "Connexion à tous les outils de l'entreprise (facturation, CRM, planning, banque, emails)" },
      { step: 2, text: "Compilation quotidienne d'un briefing complet : factures, devis, échéances, planning, anomalies" },
      { step: 3, text: "Envoi du briefing chaque matin sur le canal préféré (WhatsApp, email, SMS)" },
      { step: 4, text: "Réception et exécution des instructions en langage naturel (relances, modifications de planning, envoi de documents)" },
      { step: 5, text: "Détection proactive des anomalies et alertes en temps réel" },
    ],
    resultats: {
      metrics: [
        'Pilotage complet de l\'admin et finance en 10 min/jour',
        'Zéro échéance ratée, zéro facture oubliée',
        'Anomalies détectées en heures au lieu de semaines',
        'Équivalent d\'un assistant administratif à temps plein',
      ],
      heures_liberees: '15-25h/semaine de gestion administrative',
      roi_semaines: '4-8 semaines',
    },
    prix_setup_min: 5000,
    prix_setup_max: 8000,
    prix_mensuel_min: 350,
    prix_mensuel_max: 500,
    delai: '3-4 semaines',
    roi: '4-8 semaines',
    is_golden: true,
    color: '#F5C842',
    image: '/agents/odin.png',
    case_study_slug: 'batizy',
    agents_complementaires: ['bruno', 'mila', 'dino'],
  },

  // ═══════════════════════════════════════════
  // ANALYSE & PILOTAGE (4 agents)
  // ═══════════════════════════════════════════
  {
    id: 'mariana',
    name: 'Mariana',
    section_id: 'analyse-pilotage',
    subsection: null,
    slug: 'mariana',
    accroche: "Je me connecte à tous vos outils \u2014 CRM, facturation, site web, réseaux sociaux, Google Analytics \u2014 et je compile un tableau de bord unique, mis à jour en temps réel, accessible depuis votre téléphone. Résultat : une vision à 360\u00b0 de votre entreprise en 30 secondes, au lieu d'une heure à jongler entre 8 outils différents.",
    description_steps: [
      { step: 1, text: "Connexion à tous les outils de l'entreprise (CRM, facturation, site web, réseaux sociaux, Google Analytics)" },
      { step: 2, text: "Identification des KPIs essentiels avec le dirigeant" },
      { step: 3, text: "Compilation d'un tableau de bord unique, clair et visuel" },
      { step: 4, text: "Mise à jour en temps réel et accessibilité mobile" },
      { step: 5, text: "Alertes automatiques si un KPI sort des seuils normaux" },
    ],
    resultats: {
      metrics: [
        'Vision 360\u00b0 de l\'entreprise en 30 secondes',
        'Fini de jongler entre 8 outils différents',
        'Décisions basées sur des données en temps réel',
      ],
      heures_liberees: '3-5h/semaine de compilation de données et reporting',
      roi_semaines: '3-6 semaines',
    },
    prix_setup_min: 1500,
    prix_setup_max: 3000,
    prix_mensuel_min: 150,
    prix_mensuel_max: 250,
    delai: '2-3 semaines',
    roi: '3-6 semaines',
    is_golden: false,
    color: '#F472B6',
    image: '/agents/mariana.png',
    case_study_slug: null,
    agents_complementaires: ['guto', 'jairo', 'atlas'],
  },
  {
    id: 'guto',
    name: 'Guto',
    section_id: 'analyse-pilotage',
    subsection: null,
    slug: 'guto',
    accroche: "Chaque lundi matin, je vous envoie un résumé clair de votre semaine \u2014 ce qui a marché, ce qui a moins bien fonctionné, les tendances à surveiller, et les actions prioritaires pour la semaine qui vient. Résultat : vous commencez chaque semaine en sachant exactement où vous en êtes et ce que vous devez prioriser, sans réunion de reporting de 2 heures.",
    description_steps: [
      { step: 1, text: "Collecte automatique des données de la semaine depuis tous les outils connectés" },
      { step: 2, text: "Analyse des performances : ce qui a marché, ce qui a moins fonctionné" },
      { step: 3, text: "Détection des tendances à surveiller (hausse, baisse, anomalies)" },
      { step: 4, text: "Génération d'un rapport clair avec actions prioritaires pour la semaine suivante" },
      { step: 5, text: "Envoi chaque lundi matin sur le canal préféré" },
    ],
    resultats: {
      metrics: [
        'Chaque semaine commence avec une vision claire',
        'Fini les réunions de reporting de 2 heures',
        'Tendances détectées dès la première semaine',
      ],
      heures_liberees: '2-4h/semaine de préparation de reporting',
      roi_semaines: '2-4 semaines',
    },
    prix_setup_min: 1500,
    prix_setup_max: 2500,
    prix_mensuel_min: 150,
    prix_mensuel_max: 250,
    delai: '1-2 semaines',
    roi: '2-4 semaines',
    is_golden: false,
    color: '#F472B6',
    image: '/agents/guto.png',
    case_study_slug: null,
    agents_complementaires: ['mariana', 'jairo', 'atlas'],
  },
  {
    id: 'jairo',
    name: 'Jairo',
    section_id: 'analyse-pilotage',
    subsection: null,
    slug: 'jairo',
    accroche: "Je surveille tous les indicateurs de votre entreprise 24h/24 et je vous alerte uniquement quand quelque chose sort de l'ordinaire \u2014 trésorerie qui plonge, avis client qui chute, pipeline qui se vide, charges qui dérapent. Résultat : les problèmes sont détectés en heures au lieu de semaines, et vous dormez tranquille en sachant que si quelque chose dérape, vous serez le premier prévenu.",
    description_steps: [
      { step: 1, text: "Connexion à tous les indicateurs de l'entreprise (trésorerie, CRM, avis, pipeline, charges)" },
      { step: 2, text: "Définition des seuils d'alerte avec le dirigeant pour chaque indicateur" },
      { step: 3, text: "Surveillance continue 24h/24 de tous les indicateurs" },
      { step: 4, text: "Alerte immédiate et contextuelle quand un indicateur sort des seuils (avec explication et suggestion d'action)" },
      { step: 5, text: "Historique des alertes et rapport mensuel des anomalies détectées" },
    ],
    resultats: {
      metrics: [
        'Problèmes détectés en heures au lieu de semaines',
        'Alertes contextuelles avec suggestion d\'action',
        'Tranquillité d\'esprit : surveillance continue sans effort',
      ],
      heures_liberees: '2-4h/semaine de vérification manuelle des indicateurs',
      roi_semaines: '2-4 semaines',
    },
    prix_setup_min: 1500,
    prix_setup_max: 3000,
    prix_mensuel_min: 150,
    prix_mensuel_max: 250,
    delai: '2-3 semaines',
    roi: '2-4 semaines',
    is_golden: false,
    color: '#F472B6',
    image: '/agents/jairo.png',
    case_study_slug: null,
    agents_complementaires: ['mariana', 'guto', 'atlas'],
  },

  // --- Agent doré ---
  {
    id: 'atlas',
    name: 'Atlas',
    section_id: 'analyse-pilotage',
    subsection: null,
    slug: 'atlas',
    accroche: "Je croise toutes les données de votre entreprise pour faire émerger des insights que vous ne verriez jamais seul. 'Vos ventes augmentent de 35% quand vous publiez un article la semaine précédente.' 'Votre client le plus rentable est dans la restauration, pas dans le BTP.' 'Si vous augmentez vos prix de 10%, voici l'impact sur votre marge.' Résultat : vous prenez des décisions stratégiques basées sur des données réelles, comme les grands groupes \u2014 mais sans le coût d'une équipe de data analysts.",
    description_steps: [
      { step: 1, text: "Connexion à toutes les sources de données de l'entreprise (ventes, marketing, finance, opérations)" },
      { step: 2, text: "Croisement et corrélation des données entre sources (ventes x marketing, clients x rentabilité, etc.)" },
      { step: 3, text: "Génération d'insights actionables que le dirigeant ne verrait jamais seul" },
      { step: 4, text: "Simulations de scénarios (impact d'un changement de prix, d'un investissement marketing, etc.)" },
      { step: 5, text: "Recommandations stratégiques mensuelles basées sur les données" },
    ],
    resultats: {
      metrics: [
        'Décisions stratégiques basées sur des données réelles',
        'Insights impossibles à détecter manuellement',
        'Simulations de scénarios pour anticiper les impacts',
        'Équivalent d\'une équipe data analyst pour une fraction du coût',
      ],
      heures_liberees: '5-10h/semaine d\'analyse et réflexion stratégique',
      roi_semaines: '6-12 semaines',
    },
    prix_setup_min: 5000,
    prix_setup_max: 8000,
    prix_mensuel_min: 350,
    prix_mensuel_max: 500,
    delai: '3-4 semaines',
    roi: '6-12 semaines',
    is_golden: true,
    color: '#F5C842',
    image: '/agents/atlas.png',
    case_study_slug: null,
    agents_complementaires: ['mariana', 'guto', 'jairo'],
  },
]

// ---------------------------------------------------------------------------
// 8 CASE STUDIES
// ---------------------------------------------------------------------------

export const caseStudies: CaseStudy[] = [
  // -- 5 detailed --
  {
    id: 'vedet',
    title: 'Vedet \u2014 Pilotage automatique de contenu LinkedIn',
    slug: 'vedet',
    type: 'detailed',
    context: 'Application personnelle de gestion LinkedIn permettant de maintenir une présence régulière sans y consacrer des heures chaque semaine.',
    problem: 'Passer 3-5h/semaine à créer et publier du contenu LinkedIn manuellement, avec un rythme irrégulier et une qualité variable.',
    solution: '8 workflows n8n, Claude API, Supabase, Fal.ai. Chaque lundi : 8 suggestions de posts générées automatiquement. Validation de 2 posts en 15 minutes. Publication automatique mardi et jeudi aux horaires optimaux.',
    tech: ['n8n (8 workflows)', 'Claude API', 'Supabase', 'Fal.ai'],
    results: [
      '3-5h/semaine réduites à 15 min de validation',
      'Publication régulière et constante',
      'Qualité de contenu professionnelle et cohérente',
    ],
    agent_slugs: ['camila', 'apollo'],
    image: '/projects/vedet.png',
    workflows: [
      { image: '/projects/wf-vedet-publication.png', title: 'Publication automatique', description: 'Publie automatiquement les posts approuvés sur LinkedIn aux horaires optimaux.' },
      { image: '/projects/wf-vedet-veille.png', title: 'Veille tendances', description: 'Analyse les tendances de la semaine passée pour générer des posts dans l\'air du temps.' },
    ],
  },
  {
    id: 'rapid-pub-linkedin',
    title: 'Rapid-Pub LinkedIn \u2014 Automatisation de contenu pour un imprimeur en ligne',
    slug: 'rapid-pub-linkedin',
    type: 'detailed',
    context: "Système de gestion de contenu LinkedIn adapté à l'univers goodies/objets publicitaires pour un imprimeur en ligne.",
    problem: 'Absence de présence LinkedIn structurée. Pas de temps ni de compétences internes pour créer du contenu régulier.',
    solution: "Système similaire à Vedet, adapté à l'univers goodies/objets publicitaires. 8 workflows n8n pour la génération, validation et publication automatique.",
    tech: ['n8n (8 workflows)', 'Claude API', 'Supabase'],
    results: [
      'De 0 à 2 posts/semaine publiés',
      'Moins de 2 minutes/semaine pour la validation',
      'Présence LinkedIn professionnelle maintenue sans effort',
    ],
    agent_slugs: ['camila'],
    image: '/projects/rapid-pub.png',
    workflows: [
      { image: '/projects/wf-rapid-pub-generation.png', title: 'Génération de posts', description: 'Génère des suggestions de posts basées sur les tendances du moment dans le secteur du client.' },
      { image: '/projects/wf-rapid-pub-publication.png', title: 'Publication automatique', description: 'Récupère les posts programmés du jour et les publie automatiquement sur LinkedIn.' },
    ],
  },
  {
    id: 'rapid-campaign',
    title: 'Rapid Campaign \u2014 Application de campagnes emailing produit',
    slug: 'rapid-campaign',
    type: 'detailed',
    context: 'Application Next.js/Supabase/n8n construite pour Rapid-Pub, permettant de lancer des campagnes emailing centrées sur un produit spécifique.',
    problem: 'Lancement de campagnes emailing long et fastidieux. Une seule campagne par mois au lieu de plusieurs par semaine. Processus manuel chronophage.',
    solution: 'Application avec navigation product-first : choisir un produit, identifier les professions ciblées, scraper les entreprises correspondantes, générer des emails personnalisés, envoyer et relancer automatiquement.',
    tech: ['Next.js', 'Supabase', 'n8n'],
    results: [
      'Lancement de campagne en moins de 30 min au lieu de plusieurs jours',
      '3-5 campagnes/semaine au lieu de 1/mois',
      'Pipeline de prospects consid\u00e9rablement élargi',
    ],
    agent_slugs: ['pablo', 'marco'],
    image: '/projects/rapid-campaign.png',
    workflows: [
      { image: '/projects/wf-rapid-campaign-scraping.png', title: 'Scraping entreprises', description: 'Recherche et collecte les informations d\'entreprises ciblées via Google Maps.' },
    ],
  },
  {
    id: 'jobsniper',
    title: "JobSniper \u2014 Prospection par détection d'offres d'emploi",
    slug: 'jobsniper',
    type: 'detailed',
    context: "Système complet de prospection automatisée qui détecte des offres d'emploi révélant un besoin automatisable, puis contacte l'entreprise avec une proposition sur mesure.",
    problem: 'La prospection manuelle par cold emailing a des taux de réponse faibles. Identifier les entreprises ayant un vrai besoin est chronophage et imprécis.',
    solution: "8 workflows n8n : SCRAPE (détection d'offres), QUALIF (qualification du potentiel), ENRICH (enrichissement de l'entreprise), MATCH (matching avec les agents Gralt), PAGE (génération de landing page personnalisée sur audit.gralt.fr/slug), MAIL (génération d'email), SEND (envoi), TRACK (suivi et relances).",
    tech: ['n8n (8 workflows)', 'Claude API', 'Supabase', 'Next.js'],
    results: [
      'Dizaines de prospects qualifiés/semaine',
      "Taux de réponse supérieur au cold emailing classique",
      'Landing pages personnalisées pour chaque prospect',
      'Système entièrement automatisé de bout en bout',
    ],
    agent_slugs: ['pablo', 'zeus'],
    image: '/projects/jobsniper.png',
    workflows: [
      { image: '/projects/wf-jobsniper.png', title: 'Enrichissement de données', description: 'Enrichit les données de contact d\'une entreprise à partir de ses informations publiques.' },
    ],
  },
  {
    id: 'batizy',
    title: 'Batizy \u2014 Application de suivi de chantier sur mesure',
    slug: 'batizy',
    type: 'detailed',
    context: "PWA React/Supabase construite pour une entreprise BTP de 10 personnes, permettant le suivi complet des chantiers depuis le terrain.",
    problem: "Suivi de chantier papier, rapports oubliés ou incomplets, ruptures de stock non anticipées, perte de temps administratif énorme pour les équipes terrain.",
    solution: "Application web progressive (PWA) fonctionnant hors réseau grâce aux service workers. Photos avant/après, rapports de chantier, suivi de stock, panneau admin complet.",
    tech: ['React (PWA)', 'Supabase', 'Service Workers'],
    results: [
      '-60-70% de temps administratif',
      'Rapports de chantier remplis systématiquement',
      'Fin des ruptures de stock non anticipées',
      'Fonctionne même sans réseau sur les chantiers',
    ],
    agent_slugs: ['dino', 'odin'],
    image: '/projects/batizy.png',
  },

  // -- 3 mini --
  {
    id: 'ankes',
    title: "Ankes \u2014 Application de facturation pour artisans",
    slug: 'ankes',
    type: 'detailed',
    context: "Application Next.js/Supabase ultra-intuitive conçue pour des artisans non-techniques, permettant de gérer devis et factures simplement.",
    problem: 'Artisans non-techniques perdant du temps avec des outils de facturation complexes ou le papier.',
    solution: "Devis et factures en quelques secondes, mentions légales automatiques, relances automatiques d'impayés.",
    tech: ['Next.js', 'Supabase'],
    results: [
      'Devis/factures générés en quelques secondes',
      'Mentions légales toujours conformes',
      'Relances automatiques des impayés',
    ],
    agent_slugs: ['mila', 'bruno'],
    image: '/projects/ankes.jpg',
  },
  {
    id: 'planning-formatrice',
    title: 'Application de planning pour formatrice indépendante',
    slug: 'planning-formatrice',
    type: 'detailed',
    context: "2 applications interconnectées pour une formatrice indépendante : une app pour les écoles (réservation de créneaux) et une app personnelle (vue planning et export PDF).",
    problem: 'Gestion de planning manuelle entre plusieurs écoles, risque de double-booking, pas de vue d\'ensemble, exports PDF chronophages.',
    solution: "App écoles pour la réservation de créneaux + app personnelle avec vue planning complète et export PDF. Intégration Google Calendar et notifications automatiques.",
    tech: ['Next.js', 'Supabase', 'Google Calendar API'],
    results: [
      'Planning centralisé et auto-géré',
      'Zéro double-booking',
      'Notifications automatiques à toutes les parties',
      'Export PDF en un clic',
    ],
    agent_slugs: ['dino'],
    image: '/projects/planning-formatrice.png',
  },
]

// ---------------------------------------------------------------------------
// Representative agents for homepage display (one per section)
// ---------------------------------------------------------------------------
const REPRESENTATIVE_AGENTS: Record<string, string> = {
  'prospection-vente': 'pablo',
  'marketing-contenu': 'camila',
  'support-relation-client': 'pedro',
  'rh-recrutement': 'vitoria',
  'admin-finance': 'bruno',
  'analyse-pilotage': 'mariana',
}

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

/** Returns all sections ordered by `order` */
export function getSections(): Section[] {
  return [...sections].sort((a, b) => a.order - b.order)
}

/** Returns a single section by slug, or undefined */
export function getSectionBySlug(slug: string): Section | undefined {
  return sections.find((s) => s.slug === slug)
}

/** Returns agents for a given section slug, preserving insertion order */
export function getAgentsBySection(sectionSlug: string): Agent[] {
  return agents.filter((a) => a.section_id === sectionSlug)
}

/** Returns a single agent by slug, or undefined */
export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug)
}

/** Returns the golden agent for a section, or undefined */
export function getGoldenAgent(sectionSlug: string): Agent | undefined {
  return agents.find((a) => a.section_id === sectionSlug && a.is_golden)
}

/** Returns non-golden agents for a section */
export function getRegularAgents(sectionSlug: string): Agent[] {
  return agents.filter((a) => a.section_id === sectionSlug && !a.is_golden)
}

/** Returns agents in a given subsection of a section */
export function getAgentsBySubsection(sectionSlug: string, subsection: string): Agent[] {
  return agents.filter(
    (a) => a.section_id === sectionSlug && a.subsection === subsection,
  )
}

/** Returns unique subsection names for a section (excludes null — i.e. golden agents) */
export function getSubsections(sectionSlug: string): string[] {
  const subs = agents
    .filter((a) => a.section_id === sectionSlug && a.subsection !== null)
    .map((a) => a.subsection as string)
  return [...new Set(subs)]
}

/** Returns all case studies */
export function getCaseStudies(): CaseStudy[] {
  return caseStudies
}

/** Returns a single case study by slug, or undefined */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

/** Returns case studies with type 'detailed' */
export function getDetailedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.type === 'detailed')
}

/** Returns the complementary Agent objects for a given agent slug */
export function getComplementaryAgents(agentSlug: string): Agent[] {
  const agent = getAgentBySlug(agentSlug)
  if (!agent) return []
  return agent.agents_complementaires
    .map((slug) => getAgentBySlug(slug))
    .filter((a): a is Agent => a !== undefined)
}

/** Returns the "representative" agent for homepage display for a given section */
export function getRepresentativeAgent(sectionSlug: string): Agent | undefined {
  const slug = REPRESENTATIVE_AGENTS[sectionSlug]
  if (!slug) return undefined
  return getAgentBySlug(slug)
}

export function getAgentSectionSlug(agentSlug: string): string | undefined {
  const agent = getAgentBySlug(agentSlug)
  if (!agent) return undefined
  return agent.section_id // section_id === section slug in our static data
}
