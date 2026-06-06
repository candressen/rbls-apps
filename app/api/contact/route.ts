import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY not set')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const payload = {
      from: 'RBLS <onboarding@resend.dev>',
      to: ['rblssoftware@gmail.com'],
      subject: 'New Contact from RBLS Website',
      text: `New contact from rblsapps.com\n\nEmail: ${email}`,
      reply_to: email,
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Resend error:', JSON.stringify(data))
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
