import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Gralt',
}

export default function PolitiqueConfidentialite() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-text-primary">Politique de confidentialité</h1>
      <div className="space-y-6 text-sm leading-relaxed text-text-secondary">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Responsable du traitement</h2>
          <p>
            Raphaël Marques — Gralt<br />
            Siège social : Lille, France<br />
            Contact : <a href="mailto:raphael@gralt.fr" className="text-accent hover:underline">raphael@gralt.fr</a>
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Données collectées</h2>
          <p>
            Je collecte uniquement les données que vous fournissez volontairement
            via le formulaire de prise de rendez-vous :
          </p>
          <ul className="mt-2 ml-4 list-disc space-y-1">
            <li>Nom et prénom</li>
            <li>Nom de l&apos;entreprise</li>
            <li>Site web (optionnel)</li>
            <li>Nombre d&apos;employés</li>
            <li>Secteur d&apos;activité</li>
            <li>Agents IA qui vous intéressent</li>
            <li>Description de votre besoin (optionnel)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Finalité du traitement</h2>
          <p>
            Vos données sont utilisées exclusivement pour :
          </p>
          <ul className="mt-2 ml-4 list-disc space-y-1">
            <li>Préparer votre audit gratuit en comprenant votre contexte</li>
            <li>Vous recontacter pour planifier le rendez-vous</li>
            <li>Vous proposer les agents IA adaptés à vos besoins</li>
          </ul>
          <p className="mt-2">
            Vos données ne sont jamais vendues, louées ou partagées avec des tiers à des fins commerciales.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Base légale</h2>
          <p>
            Le traitement de vos données repose sur votre consentement (soumission volontaire
            du formulaire) et sur l&apos;intérêt légitime de Gralt à répondre à votre demande.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Stockage et sécurité</h2>
          <p>
            Les données sont stockées de manière sécurisée sur Supabase (infrastructure cloud,
            hébergement UE). L&apos;accès est restreint et protégé par des clés d&apos;authentification.
            Les données sont conservées pour la durée nécessaire au traitement de votre demande,
            et au maximum 3 ans après le dernier contact.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Cookies</h2>
          <p>
            Ce site n&apos;utilise pas de cookies publicitaires ni de traceurs tiers.
            Seul le stockage local du navigateur (localStorage) est utilisé pour sauvegarder
            votre sélection d&apos;agents lors de la navigation. Aucune donnée personnelle
            n&apos;est stockée dans les cookies.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Vos droits</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD),
            vous disposez des droits suivants :
          </p>
          <ul className="mt-2 ml-4 list-disc space-y-1">
            <li><strong className="text-text-primary">Droit d&apos;accès</strong> : obtenir une copie de vos données personnelles</li>
            <li><strong className="text-text-primary">Droit de rectification</strong> : corriger des données inexactes</li>
            <li><strong className="text-text-primary">Droit de suppression</strong> : demander l&apos;effacement de vos données</li>
            <li><strong className="text-text-primary">Droit d&apos;opposition</strong> : vous opposer au traitement de vos données</li>
            <li><strong className="text-text-primary">Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
          </ul>
          <p className="mt-2">
            Pour exercer ces droits, contactez-moi à{' '}
            <a href="mailto:raphael@gralt.fr" className="text-accent hover:underline">raphael@gralt.fr</a>.
            Je m&apos;engage à répondre dans un délai de 30 jours.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Réclamation</h2>
          <p>
            Si vous estimez que le traitement de vos données ne respecte pas la réglementation,
            vous pouvez adresser une réclamation à la CNIL (Commission Nationale de l&apos;Informatique
            et des Libertés) : <span className="text-text-primary">cnil.fr</span>.
          </p>
        </section>
      </div>
    </div>
  )
}
