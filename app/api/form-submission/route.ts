import { createServiceClient } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, website, employees, sector, agentsInterested, selectedAgents, need } = body

    // 1. Insert into Supabase
    const supabase = createServiceClient()
    const { error: dbError } = await supabase.from('form_submissions').insert({
      name,
      company,
      website: website || null,
      employees,
      sector,
      agents_interested: {
        sections: agentsInterested || [],
        agents: selectedAgents || [],
      },
      need_description: need || null,
    })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return new Response(
        JSON.stringify({ error: 'Erreur lors de l\'enregistrement' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 2. Send email notification
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Gralt <notifications@gralt.fr>',
          to: 'raphael@gralt.fr',
          subject: `Nouvelle demande d'audit — ${name} (${company})`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #00E5CC;">Nouvelle demande d'audit</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #666; border-bottom: 1px solid #eee;">Nom</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #666; border-bottom: 1px solid #eee;">Entreprise</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${company}</td>
                </tr>
                ${website ? `<tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #666; border-bottom: 1px solid #eee;">Site web</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="${website}">${website}</a></td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #666; border-bottom: 1px solid #eee;">Employés</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${employees}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #666; border-bottom: 1px solid #eee;">Secteur</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${sector}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #666; border-bottom: 1px solid #eee;">Sections</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${(agentsInterested || []).join(', ') || 'Non spécifié'}</td>
                </tr>
                ${(selectedAgents && selectedAgents.length > 0) ? `<tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #00E5CC; border-bottom: 1px solid #eee;">🎯 Agents sélectionnés</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee; font-weight: bold;">${selectedAgents.join(', ')}</td>
                </tr>` : ''}
                ${need ? `<tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #666; border-bottom: 1px solid #eee;">Besoin</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${need}</td>
                </tr>` : ''}
              </table>
            </div>
          `,
        })
      } catch (emailError) {
        // Don't fail the request if email fails — data is already saved
        console.error('Email send error:', emailError)
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Form submission error:', error)
    return new Response(
      JSON.stringify({ error: 'Erreur serveur' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
