import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServiceClient } from '@/lib/supabase'
import { verifyHermesSignature } from '@/lib/audit-utils'
import { buildAuditMail } from '@/lib/audit-mail'

export const runtime = 'nodejs'

const PDF_BUCKET = 'audits-public'

interface CompletePayload {
  event?: string
  data?: {
    request_id?: string
    status?: 'completed' | 'failed'
    pdf_path?: string
    pdf_bucket?: string
    company_name?: string | null
    summary?: string | null
    pain_points?: unknown
    error?: string | null
  }
}

export async function POST(request: NextRequest) {
  const secret = process.env.HERMES_HMAC_SECRET
  if (!secret) {
    console.error('[audit-complete] HERMES_HMAC_SECRET missing')
    return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 })
  }

  const rawBody = await request.text()
  const signatureHeader = request.headers.get('x-hub-signature-256')

  if (!verifyHermesSignature(rawBody, signatureHeader, secret)) {
    console.warn('[audit-complete] invalid signature')
    return NextResponse.json({ error: 'invalid_signature' }, { status: 401 })
  }

  let payload: CompletePayload
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const data = payload.data
  const requestId = data?.request_id
  if (!requestId) {
    return NextResponse.json({ error: 'missing_request_id' }, { status: 400 })
  }

  const supabase = createServiceClient()

  const { data: row, error: fetchError } = await supabase
    .from('audits_public')
    .select('id, request_id, email, status, company_name')
    .eq('request_id', requestId)
    .single()

  if (fetchError || !row) {
    console.error('[audit-complete] row not found', requestId, fetchError)
    return NextResponse.json({ error: 'unknown_request_id' }, { status: 404 })
  }

  if (row.status === 'completed') {
    return NextResponse.json({ ok: true, already_completed: true })
  }

  const status = data?.status === 'completed' ? 'completed' : 'failed'

  if (status === 'failed') {
    await supabase
      .from('audits_public')
      .update({
        status: 'failed',
        error_message: data?.error?.toString().slice(0, 500) || 'pipeline_failed',
        completed_at: new Date().toISOString(),
      })
      .eq('request_id', requestId)
    return NextResponse.json({ ok: true, status: 'failed' })
  }

  const pdfPath = data?.pdf_path
  if (!pdfPath) {
    await supabase
      .from('audits_public')
      .update({
        status: 'failed',
        error_message: 'missing_pdf_path',
        completed_at: new Date().toISOString(),
      })
      .eq('request_id', requestId)
    return NextResponse.json({ error: 'missing_pdf_path' }, { status: 400 })
  }

  const bucket = data?.pdf_bucket || PDF_BUCKET
  const { data: pdfFile, error: downloadError } = await supabase.storage
    .from(bucket)
    .download(pdfPath)

  if (downloadError || !pdfFile) {
    console.error('[audit-complete] pdf download failed', pdfPath, downloadError)
    await supabase
      .from('audits_public')
      .update({
        status: 'failed',
        error_message: `pdf_download_failed:${downloadError?.message ?? 'unknown'}`.slice(0, 500),
        completed_at: new Date().toISOString(),
      })
      .eq('request_id', requestId)
    return NextResponse.json({ error: 'pdf_download_failed' }, { status: 500 })
  }

  const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer())
  const companyName = data?.company_name?.toString().trim() || row.company_name || null
  const filename = buildPdfFilename(companyName, requestId)

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.error('[audit-complete] RESEND_API_KEY missing')
    return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 })
  }

  const resend = new Resend(resendKey)
  const fromAddress = process.env.AUDIT_MAIL_FROM || 'Raphael Marques <raphael@gralt.fr>'
  const replyTo = process.env.AUDIT_MAIL_REPLY_TO || 'raphael@gralt.fr'
  const calLink = process.env.AUDIT_CAL_LINK || 'https://cal.com/raphael-gralt/30min'
  const mail = buildAuditMail({ recipientEmail: row.email, companyName, calLink })

  const { error: sendError } = await resend.emails.send({
    from: fromAddress,
    to: row.email,
    replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    attachments: [{ filename, content: pdfBuffer }],
  })

  if (sendError) {
    console.error('[audit-complete] resend send failed', sendError)
    await supabase
      .from('audits_public')
      .update({
        status: 'failed',
        error_message: `mail_send_failed:${sendError.message ?? 'unknown'}`.slice(0, 500),
        completed_at: new Date().toISOString(),
      })
      .eq('request_id', requestId)
    return NextResponse.json({ error: 'mail_send_failed' }, { status: 500 })
  }

  const update: Record<string, unknown> = {
    status: 'completed',
    completed_at: new Date().toISOString(),
    pdf_url: `${bucket}/${pdfPath}`,
  }
  if (companyName) update.company_name = companyName
  if (typeof data?.summary === 'string') update.summary = data.summary
  if (data?.pain_points !== undefined) update.pain_points = data.pain_points

  await supabase.from('audits_public').update(update).eq('request_id', requestId)

  return NextResponse.json({ ok: true, status: 'completed' })
}

function buildPdfFilename(companyName: string | null, requestId: string): string {
  const slug = (companyName || 'audit')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'audit'
  return `audit-ia-${slug}-${requestId.slice(0, 8)}.pdf`
}
