'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      })

      if (!res.ok) {
        throw new Error('Request failed')
      }

      setStatus('sent')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Your email"
        className="bg-[#1a1a1a] border border-[#333] rounded-xl px-5 py-4 text-white placeholder-white/30 outline-none w-full text-base"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tell us about your idea"
        rows={5}
        className="bg-[#1a1a1a] border border-[#333] rounded-xl px-5 py-4 text-white placeholder-white/30 outline-none w-full text-base resize-none"
      />
      <button
        type="submit"
        disabled={status === 'sending' || status === 'sent'}
        className="bg-[#E8FF47] text-black font-bold rounded-xl px-8 py-4 w-full text-base hover:opacity-90 transition cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent ✓' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-sm">Something went wrong. Try again.</p>
      )}
      {status === 'sent' && (
        <p className="text-[#E8FF47] text-sm">Thanks, we got it.</p>
      )}
    </form>
  )
}
