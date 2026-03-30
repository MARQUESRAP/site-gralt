import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site gralt.fr — éditeur, hébergement, propriété intellectuelle, données personnelles.',
  alternates: { canonical: 'https://gralt.fr/mentions-legales' },
}

export default function MentionsLegales() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-text-primary">Mentions légales</h1>
      <div className="space-y-6 text-sm leading-relaxed text-text-secondary">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Éditeur du site</h2>
          <p>Gralt — Agence d&apos;automatisation IA</p>
          <p>Créateur et responsable de la publication : Raphaël Marques</p>
          <p>Siège social : Lille, France</p>
          <p>Contact : <a href="mailto:raphael@gralt.fr" className="text-accent hover:underline">raphael@gralt.fr</a></p>
          <p>Site web : <a href="https://gralt.fr" className="text-accent hover:underline">gralt.fr</a></p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Hébergement</h2>
          <p>Ce site est hébergé par Hostinger International Ltd.</p>
          <p>61 Lordou Vironos Street, 6023 Larnaca, Chypre</p>
          <p>Site web : hostinger.fr</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes,
            illustrations, code source) est la propriété exclusive de Gralt / Raphaël Marques,
            sauf mention contraire. Toute reproduction, distribution, modification ou
            utilisation sans autorisation écrite préalable est interdite conformément aux
            dispositions du Code de la Propriété Intellectuelle.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Données personnelles</h2>
          <p>
            Les informations collectées via le formulaire de contact sont destinées
            exclusivement à Raphaël Marques (Gralt) et ne sont jamais transmises à des tiers.
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification
            et de suppression de vos données. Pour exercer ces droits, contactez{' '}
            <a href="mailto:raphael@gralt.fr" className="text-accent hover:underline">raphael@gralt.fr</a>.
          </p>
          <p className="mt-2">
            Pour en savoir plus, consultez notre{' '}
            <a href="/politique-de-confidentialite" className="text-accent hover:underline">politique de confidentialité</a>.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Cookies</h2>
          <p>
            Ce site n&apos;utilise pas de cookies publicitaires ni de cookies de suivi tiers.
            Seuls des cookies techniques strictement nécessaires au fonctionnement du site
            peuvent être utilisés.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Limitation de responsabilité</h2>
          <p>
            Les informations fournies sur ce site le sont à titre indicatif. Gralt s&apos;efforce
            de maintenir des informations exactes et à jour, mais ne saurait être tenu
            responsable d&apos;éventuelles erreurs, omissions ou résultats obtenus suite à
            l&apos;utilisation de ces informations.
          </p>
        </section>
      </div>
    </div>
  )
}
