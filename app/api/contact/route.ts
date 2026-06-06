import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, message } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('RESEND_API_KEY not configured')
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'RBLS Contact <onboarding@resend.dev>',
        to: ['rblssoftware@gmail.com'],
        subject: 'New Contact from RBLS Website',
        text: `New contact from rblsapps.com\n\nEmail: ${email}${message ? `\nMessage: ${message}` : ''}`,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Resend failed: ${err}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
