import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RBLS Apps — The Future is Apps by Creators',
  description: 'We help creators turn their audience into real products. Partners, not vendors.',
}

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen font-sans">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
        <span className="text-2xl font-bold tracking-tight" style={{fontFamily: 'Space Grotesk, sans-serif'}}>RBLS</span>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 
          className="font-black leading-none tracking-tight mb-6"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(40px, 8vw, 96px)',
            maxWidth: '900px'
          }}
        >
          The Future is Apps<br />by Creators
        </h1>
        <p 
          className="text-white/70 font-light"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(18px, 2.5vw, 24px)',
          }}
        >
          And we are here to support it.
        </p>
      </section>

      {/* MANIFESTO */}
      <section className="bg-[#111111] py-32 px-6">
        <div className="max-w-[700px] mx-auto">
          <h2 
            className="font-bold mb-16"
            style={{fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)'}}
          >
            Why We Exist
          </h2>
          {[
            "Creators already did the hard part. They built the audience. They earned attention, trust, and loyalty from real people who come back again and again.",
            "An app is the natural next step. It gives creators a place that is truly theirs — where their community can go deeper than a feed, a post, or a link in bio.",
            "Views are power now. Attention is the new currency, and niche audiences matter more than ever because they are real, focused, and ready to move. You do not need millions of followers to matter. A strong audience that truly cares can build something lasting.",
            "The old gatekeepers are losing their grip. Distribution used to belong to big companies, big budgets, and closed doors. Now it belongs to the people who know how to gather attention and keep it. Creators are no longer waiting to be picked.",
            "RBLS is here to support that future. We are not a platform trying to own your business. We are not a vendor looking to charge big fees and disappear. We are partners. We help creators turn their audience into real products — while keeping ownership where it belongs.",
            "The future of apps will not be built only by corporations in boardrooms. It will be built by the people who already have communities, culture, and trust. It will be built by creators. And we want to help make that happen.",
          ].map((p, i) => (
            <p 
              key={i}
              className="text-white/80 leading-relaxed mb-10"
              style={{fontFamily: 'Inter, sans-serif', fontSize: 'clamp(16px, 1.8vw, 20px)'}}
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="bg-[#0A0A0A] py-32 px-6">
        <div className="max-w-[1100px] mx-auto">
          <h2 
            className="font-bold mb-4 text-center"
            style={{fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)'}}
          >
            Things That Change the Temperature
          </h2>
          <p className="text-white/60 text-center mb-20 max-w-[600px] mx-auto" style={{fontFamily: 'Inter, sans-serif', fontSize: '18px'}}>
            We build experiences that open doors, shift perspective, and turn instinct into movement. Work that feels immediate, cultural, and just a little ahead of where the world is standing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Somlr', desc: 'For finding the bottle that feels like you.' },
              { name: 'PostPerk', desc: 'Where attention turns into something real.' },
              { name: 'More Coming', desc: 'Some ideas arrive like a warning shot.' },
            ].map((app) => (
              <div 
                key={app.name}
                className="border border-[#222] rounded-2xl p-8"
              >
                <h3 
                  className="font-bold text-[#E8FF47] mb-3 text-xl"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  {app.name}
                </h3>
                <p className="text-white/60 text-base" style={{fontFamily: 'Inter, sans-serif'}}>
                  {app.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0A] border-t border-[#222] px-8 py-8">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm" style={{fontFamily: 'Inter, sans-serif'}}>
          <span>RBLS Apps LLC</span>
          <span className="italic">Different is the starting point.</span>
          <span>rblsapps.com</span>
        </div>
      </footer>

    </main>
  )
}
