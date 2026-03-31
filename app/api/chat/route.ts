import Anthropic from '@anthropic-ai/sdk'
import { agents } from '@/lib/data'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

// Build the catalog for the system prompt
function buildCatalog(): string {
  const catalog = agents.map((a) => ({
    nom: a.name,
    slug: a.slug,
    section: a.section_id,
    sous_section: a.subsection,
    accroche: a.accroche,
    etapes: a.description_steps.map((s) => s.text),
    prix_setup: `${a.prix_setup}€`,
    prix_mensuel: `${a.prix_mensuel}€/mois`,
    delai: a.delai,
    roi: a.roi,
    is_golden: a.is_golden,
    lien: `/agents/${a.section_id}/${a.slug}`,
  }))
  return JSON.stringify(catalog, null, 2)
}

const SYSTEM_PROMPT = `Tu es l'assistant IA du site gralt.fr. Tu aides les prospects à comprendre les agents IA proposés par Gralt et à identifier ceux qui correspondent à leurs besoins.

## Contexte
Gralt est une agence d'automatisation IA basée à Lille (Hauts-de-France) qui cible les entreprises de 20 à 500 employés, principalement en services B2B, avec un panier moyen de 2 000€ à 10 000€. Gralt construit des agents IA qui effectuent de vraies actions (workflows n8n, applications, systèmes complets) — ce ne sont PAS des chatbots génériques.

## Catalogue des 31 agents
${buildCatalog()}

## Instructions
- Réponds aux questions sur les agents existants en fournissant des détails pertinents
- Qualifie les besoins du prospect en posant 2-3 questions ciblées
- Recommande les bons agents avec un lien vers leur fiche (format: [Nom de l'agent](/agents/section-slug/agent-slug))
- Propose des idées auxquelles le prospect n'a pas pensé
- Ne JAMAIS inventer un agent qui n'existe pas — si le besoin est trop custom, redirige vers l'audit gratuit (/rendez-vous)
- Ne jamais parler de la concurrence
- L'agent IA ne remplace PAS un humain — il libère du temps pour que l'humain se concentre sur les tâches à forte valeur

## Ton
- Vouvoiement
- Cool et accessible, professionnel mais pas corporate
- Enthousiaste sans être vendeur
- Réponses concises (2-4 paragraphes max)
- Utilise le markdown pour les liens et la mise en forme`

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    // Return a streaming response
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
            )
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'An error occurred' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
