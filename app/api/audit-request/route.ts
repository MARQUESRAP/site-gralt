import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import {
  normalizeWebsiteDomain,
  normalizeLinkedinSlug,
  isValidEmail,
  signHermesPayload,
  generateRequestId,
} from '@/lib/audit-utils'

export const runtime = 'nodejs'

interface AuditRequestBody {
  website_url?: string
  linkedin_url?: string
  email?: string
}

export async function POST(request: NextRequest) {
  let body: AuditRequestBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const websiteUrl = body.website_url?.trim() || null
  const linkedinUrl = body.linkedin_url?.trim() || null
  const email = body.email?.trim() || null

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: 'invalid_email', message: 'Email pas reconnu. Format attendu : nom@entreprise.com' },
      { status: 400 }
    )
  }

  const domainNormalized = normalizeWebsiteDomain(websiteUrl)
  const linkedinSlug = normalizeLinkedinSlug(linkedinUrl)

  if (!domainNormalized && !linkedinSlug) {
    return NextResponse.json(
      {
        error: 'missing_urls',
        message: 'Au moins une URL valide est requise (site ou LinkedIn).',
      },
      { status: 400 }
    )
  }

  if (websiteUrl && !domainNormalized) {
    return NextResponse.json(
      {
        error: 'invalid_website_url',
        message: 'URL de site pas reconnue. Format attendu : https://exemple.com',
      },
      { status: 400 }
    )
  }

  if (linkedinUrl && !linkedinSlug) {
    return NextResponse.json(
      {
        error: 'invalid_linkedin_url',
        message: 'URL LinkedIn pas reconnue. Format attendu : linkedin.com/company/votre-entreprise',
      },
      { status: 400 }
    )
  }

  const supabase = createServiceClient()
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    null

  const requestId = generateRequestId()

  const { error: insertError } = await supabase.from('audits_public').insert({
    request_id: requestId,
    email,
    website_url: websiteUrl,
    linkedin_url: linkedinUrl,
    domain_normalized: domainNormalized,
    linkedin_slug: linkedinSlug,
    ip,
    status: 'pending',
  })

  if (insertError) {
    if (insertError.code === '23505') {
      return NextResponse.json(
        {
          error: 'duplicate',
          message: 'Cette entreprise a deja fait son audit. Pour en relancer un, ecrivez a raphael@gralt.fr.',
        },
        { status: 409 }
      )
    }
    console.error('[audit-request] supabase insert error', insertError)
    return NextResponse.json(
      {
        error: 'storage_error',
        message: 'Notre service est indisponible quelques instants. Reessayez dans 2-3 minutes.',
      },
      { status: 500 }
    )
  }

  const hermesUrl = process.env.HERMES_WEBHOOK_URL
  const hermesSecret = process.env.HERMES_HMAC_SECRET
  const callbackUrl =
    process.env.NEXT_PUBLIC_GRALT_BASE_URL ?? 'https://gralt.fr'

  if (hermesUrl && hermesSecret) {
    const hermesPayload = {
      event: 'audit.request',
      timestamp: new Date().toISOString(),
      data: {
        request_id: requestId,
        submitted_at: new Date().toISOString(),
        email,
        website_url: websiteUrl,
        linkedin_url: linkedinUrl,
        domain_normalized: domainNormalized,
        linkedin_slug: linkedinSlug,
        callback_url: `${callbackUrl}/api/webhooks/audit-complete`,
        reply_to: 'raphael@gralt.fr',
      },
    }

    try {
      const signature = signHermesPayload(hermesPayload, hermesSecret)
      const hermesResponse = await fetch(hermesUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Hub-Signature-256': `sha256=${signature}`,
        },
        body: JSON.stringify(hermesPayload),
      })

      if (!hermesResponse.ok) {
        console.error('[audit-request] hermes responded with', hermesResponse.status)
        await supabase
          .from('audits_public')
          .update({ status: 'failed', error_message: `hermes_http_${hermesResponse.status}` })
          .eq('request_id', requestId)
        return NextResponse.json(
          {
            error: 'pipeline_unavailable',
            message:
              'Notre agent est indisponible quelques instants. Reessayez dans 2-3 minutes ou ecrivez a raphael@gralt.fr.',
          },
          { status: 502 }
        )
      }

      await supabase
        .from('audits_public')
        .update({ status: 'running' })
        .eq('request_id', requestId)
    } catch (err) {
      console.error('[audit-request] hermes fetch error', err)
      await supabase
        .from('audits_public')
        .update({ status: 'failed', error_message: 'hermes_network_error' })
        .eq('request_id', requestId)
      return NextResponse.json(
        {
          error: 'pipeline_unavailable',
          message:
            'Notre agent est indisponible quelques instants. Reessayez dans 2-3 minutes ou ecrivez a raphael@gralt.fr.',
        },
        { status: 502 }
      )
    }
  } else {
    console.warn('[audit-request] HERMES_WEBHOOK_URL or HERMES_HMAC_SECRET missing, skipping forward')
  }

  return NextResponse.json({ ok: true, request_id: requestId, email }, { status: 202 })
}
