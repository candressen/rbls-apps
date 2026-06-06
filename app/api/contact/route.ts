import { readFileSync } from 'node:fs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, message } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const credsPath = process.env.GOOGLE_TOKEN_PATH || '/Users/bobagent/Projects/Passwords/google_token.json'
    const creds = JSON.parse(readFileSync(credsPath, 'utf8'))

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: creds.refresh_token,
        client_id: creds.client_id,
        client_secret: creds.client_secret,
        grant_type: 'refresh_token',
      }),
    })

    if (!tokenRes.ok) {
      throw new Error('Failed to refresh Gmail OAuth token')
    }

    const { access_token } = await tokenRes.json()

    const emailContent = [
      'From: bobtheaiagent@gmail.com',
      'To: rblssoftware@gmail.com',
      'Subject: New Contact from RBLS Website',
      'Content-Type: text/plain; charset=utf-8',
      '',
      'New contact form submission from rblsapps.com',
      '',
      `From: ${email}`,
      message ? `Message: ${message}` : '',
    ].join('\n')

    const encoded = Buffer.from(emailContent).toString('base64url')

    const sendRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw: encoded }),
    })

    if (!sendRes.ok) {
      throw new Error('Gmail send failed')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
