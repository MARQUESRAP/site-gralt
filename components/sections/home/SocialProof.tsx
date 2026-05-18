const items = [
  '~95h/semaine libérées chez mes clients',
  '10 automatisations en production',
  '6 entreprises clientes',
  '5 fonctions métier couvertes',
  '31 agents IA au catalogue',
  'Mis en place en 2-5 semaines',
]

export default function SocialProof() {
  return (
    <section className="overflow-hidden border-y border-dark-border bg-[rgba(19,24,41,0.8)] py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-12 pr-12 text-sm text-text-secondary">
            {items.map((item, i) => (
              <span key={i} className="flex items-center gap-12">
                <span>{item}</span>
                <span className="text-accent/40">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
