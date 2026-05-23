# PRODUCT.md — Gralt

## Register

**brand** — gralt.fr est un site marketing / brand. Chaque page est en elle-même un livrable de communication. Le design EST le produit. Le visiteur juge Gralt sur l'impression visuelle autant que sur le texte.

(Note : `/audit` et l'app interne sont produit, mais 90 % du site est brand.)

## Users

**Cible principale : dirigeants de PME 20-100 salariés, non-tech.**

Persona pivot : Pierre, 47 ans, gérant d'une PME de 35 personnes dans le BTP. Il a entendu parler de l'IA, son comptable lui dit qu'il faudrait s'y intéresser. Il tombe sur gralt.fr. En 8 secondes il doit comprendre : "Ce gars automatise les trucs chiants que je fais tous les jours. Ça pourrait me faire gagner du temps."

Pierre ne lit pas, il scanne. Pierre ne sait pas ce qu'est une API. Pierre n'a pas le temps de réfléchir à un acronyme. Pierre veut sentir le sérieux et la concrétion.

Secondaires : prospects 1-20 salariés (héritage réseau, déjà clients) et prospects 100-500 (vague intérêt, pas la cible commerciale active).

## Brand voice

Trois mots-objet :
1. **Concret** — comme une fiche outil dans un manuel d'atelier, pas comme un pitch SaaS.
2. **Direct** — comme un consultant senior qui te dit en deux phrases ce qu'il ferait à ta place.
3. **Humble + confiant** — sait ce qu'il livre (9 cas, 85h/sem), ne sur-promet pas (refus du "transformez", "révolutionnez").

Voix : vouvoiement systématique (B2B FR). Pas de "boost", "scale", "explose". Pas de "agents qui travaillent 24h/24 pour vous".

## Anti-references

Ce que Gralt ne doit **pas** ressembler :
- Site SaaS US générique (Stripe-minimal sur fond blanc, dégradés violet→bleu, Inter partout, icon-tile au-dessus de chaque titre)
- Agence digitale française clichée (gradients hero, "Transformez votre business", chiffres rotatifs animés)
- Site de freelance tech (terminal noir, monospace, faux dashboard, glow violet)
- Site magazine éditorial italique (Fraunces drop caps, ruled separators, lowercase tracked metadata) — pas la voix Gralt

## Strategic principles

1. **Promesse temps gagné > promesse techno.** Le mot central est "automatisation". "Agent IA" est un format spécialisé parmi 3, jamais la promesse principale.
2. **Verbe d'action > nom abstrait.** "Relancer les impayés" > "Système de relance automatisé".
3. **Chiffre > adjectif.** "~15h/semaine libérées" > "un gain considérable".
4. **Cas concret > généralité.** "Vous prenez une photo, le document atterrit dans le bon dossier client" > "automatisation documentaire".
5. **Schéma > paragraphe.** À chaque concept abstrait, un visuel (SVG inline, diagramme, illustration).
6. **Aucun jargon visible.** Bannis : n8n, Supabase, API, webhook, workflow technique, pipeline, orchestration, RGB.

## Constraint: design system existant

Le design system actuel (glass cards translucides, `NeonText` avec glow, fond sombre `#0A0E1A`, framer-motion, accent cyan `#00E5CC`, couleurs par fonction métier) **reste**. C'est l'identité visuelle de Gralt.

Toute itération design (polish, audit, critique) doit améliorer **dans ces contraintes** :
- pas de switch vers fond clair
- pas de retrait global de la glassmorphism
- pas de changement de typo principale sans validation explicite

Les améliorations possibles : variation des structures de cards (sortir du "5 cards identiques en grille"), rythme spatial varié, hiérarchie typographique plus contrastée, copy resserré, retrait des em-dashes décoratifs.

## Tone exemples

✅ "Vos tâches répétitives, automatisées. Récupérez plusieurs heures par semaine."
✅ "Une photo du document, et il atterrit dans le bon dossier client."
✅ "On automatise pour 6 clients. 85 heures rendues chaque semaine."

❌ "Boostez votre productivité avec nos agents IA dernière génération."
❌ "Transformez votre entreprise grâce à l'intelligence artificielle."
❌ "Des workflows orchestrés pour scaler vos opérations 24h/24."
