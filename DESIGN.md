# DESIGN.md — Gralt design system

## Theme

**Dark, committed.** Fond `#0A0E1A` (presque-noir teinté bleu). Surfaces de cards en `rgba(19, 24, 41, 0.6)` avec `backdrop-blur(16px)`.

Scène mentale : dirigeant qui consulte le site sur son MacBook un soir tard, lumière tamisée. Le sombre est posé, sérieux, premium — pas geek.

Pas de mode clair pour l'instant. Si un jour on doit l'ajouter, ce sera un fork conscient, pas un toggle.

## Color tokens

Tokens dans `app/globals.css` (Tailwind v4 `@theme`) et `types/index.ts`.

### Neutres

- `--color-dark-bg: #0A0E1A` — fond global
- `--color-dark-card: #131829` — surface interne
- `--color-dark-border: #1E2436` — séparateurs discrets
- `--color-text-primary: #E8EAF0` — titres
- `--color-text-secondary: #8B92A5` — paragraphes

Les neutres sont déjà teintés (chroma faible vers le bleu). Ne pas introduire de gris pur ou de noir pur.

### Accent + couleurs sectorielles

| Rôle | Hex | Usage |
|---|---|---|
| Accent général | `#00E5CC` | CTA principaux, glow par défaut, Prospection & Vente |
| Marketing | `#B44AFF` | Marketing & contenu, fonctions IA créatives |
| Support | `#22C55E` | Support & relation client |
| RH | `#FB923C` | RH & recrutement |
| Admin | `#818CF8` | Admin & finance |
| Analyse | `#F472B6` | Analytics, opérations & pilotage |
| Golden | `#F5C842` | Agents IA "dorés" (catalogue premium) |

Chaque couleur a une variante `bg` (alpha 12 %) pour les tints de fond.

**Stratégie couleur** : Committed — l'accent cyan porte 30-40 % des surfaces brand (hero, CTA, glow). Les 5 couleurs sectorielles servent à distinguer les fonctions métier dans les sections de catégories. Ne pas mélanger plus de 2 couleurs sur une même fold.

## Typography

**Font** : Inter (hérité, dans la reflex-reject list Impeccable). À **rediscuter** dans un chantier dédié — un changement de typo touche tout le site et demande validation explicite.

Pour cette refonte : on garde Inter, on travaille le contraste de poids et l'échelle.

### Échelle

- H1 hero (`<NeonText size="xl">`) : `text-5xl md:text-6xl font-bold`
- H2 section (`<NeonText size="lg">`) : `text-4xl font-bold`
- H3 carte : `text-xl` ou `text-2xl font-bold`
- Body : `text-base leading-relaxed` (text-secondary)
- Petites étiquettes : `text-xs uppercase tracking-wider` (à utiliser avec parcimonie — pas au-dessus de chaque h2)

### Règles

- Line length body : `max-w-2xl` (~65ch) pour les paragraphes d'intro.
- Light-on-dark : `leading-relaxed` (1.625) au minimum sur le body, le texte clair sur fond sombre paraît plus léger et a besoin d'air.
- Pas d'em dash décoratif (`—`) en copy. Utiliser virgule, deux-points, point. Si un dash structurel est nécessaire (ex: "Workflow back-end — tourne tout seul" en énumération), accepter sciemment.

## Spacing

Tailwind v4 spacing scale. Sections sur la home et `/automatisations` :
- Section verticale **généreuse** : `py-24` (= 96px) pour les sections narratives
- Section verticale **hero** : `pt-32 pb-16` pour le hero
- Padding card : `p-6` à `p-7`
- Gap entre cards en grille : `gap-6`

**Vary the rhythm.** Ne pas avoir toutes les sections en `py-[120px]`. Alterner `py-20` (sections de transition courtes) et `py-28` (sections de fond).

## Layout

- Container principal : `max-w-6xl mx-auto px-6` pour les pages contenu
- Container hero/CTA : `max-w-3xl mx-auto` (resserrer le narratif)
- Container catégories : `max-w-6xl` (respiration pour la grille)
- Centrer la copy hero est OK (centered-stack autorisé sur la home pour la solennité), mais **alterner** : sections catégories en grille asymétrique ou alignée à gauche pour casser le rythme centré.

**Évite la grille 100 % uniforme**. Si 5 catégories en grille 2×3 → la 5ème seule sur sa ligne casse l'uniformité, ou alors mettre la "principale" en pleine largeur en feature.

## Elevation / glassmorphism

- `GlassCard` : surface glass + border teintée à la couleur catégorie. C'est la signature visuelle Gralt.
- Hover : `borderColor` passe de `${color}26` → `${color}66` + glow shadow.
- **Pas de cards dans cards.** Un GlassCard peut contenir une `<ul>`, une `<image>`, un schéma SVG, mais jamais un autre GlassCard.
- L'effet glass coûte cher. Pour les sections de pure narration (hero text, transition CTA), pas besoin de GlassCard — utiliser le `SectionBackground` (orbs floutées) seul.

## Motion

- Toutes les animations passent par `framer-motion`.
- Entrée au scroll : `ScrollReveal` (opacity 0→1, y 30→0, duration 0.6s, easeOut). Stagger entre enfants : `ScrollRevealGroup` (0.1s).
- Ease : `easeOut` natif framer-motion (pas de bounce, pas d'elastic).
- `SectionBackground` : 2-3 orbs floutées animées en `float-slow` (18s loop) et `float-slower` (22s). N'oublie pas le `prefers-reduced-motion` (déjà géré globalement dans `globals.css`).
- CTA pulse : optionnel, 2.5s sinusoïdal. À réserver aux CTA principaux du hero/final.

## Components UI réutilisables

Dans `components/ui/` (à utiliser à fond, ne jamais réinventer) :

- `GlassCard` — toute carte avec bordure colorée
- `NeonText` — tout titre avec glow
- `CTAButton` — tout bouton CTA (variants `primary` / `secondary`)
- `SectionBackground` — fond animé orbs
- `ScrollReveal` / `ScrollRevealGroup` / `ScrollRevealItem` — animations d'apparition
- `ChatModal` — chat IA modal (home)
- `AgentCarousel` — carrousel agents

Si tu as besoin d'un nouveau composant : crée-le dans `components/ui/`, exporte-le, ne le hardcode pas dans une page.

## Anti-patterns Gralt-specific

À ne JAMAIS faire :
- Icon-tile arrondi au-dessus de chaque heading (cliché SaaS)
- Big-number hero metric centré avec 3 stats sous une heading (cliché SaaS)
- Gradient violet-bleu sur le hero (cliché AI 2026)
- Gray text on colored background (jamais — utiliser shade de la couleur)
- Em dash décoratif dans la copy française
- Tracked uppercase label répété au-dessus de chaque section (sauf si UN seul utilisé sciemment comme kicker)
- Carousel auto-play silencieux (sauf décision UX explicite)
- 6 cartes identiques alignées en grille (varier, sortir 1-2 en feature)

## Conventions code

- TypeScript strict
- Composants PascalCase, un par fichier
- Pas de comments inutiles
- Pas de hardcoded color hex partout — utiliser les constantes locales (`const ACCENT = '#00E5CC'`) ou les variables CSS si possible
- Imports via alias `@/...`
- Pas de `any`
