import Link from 'next/link'

const researchAreas = [
  {
    icon: '⬡',
    title: 'AI-Driven Design',
    desc: 'Leveraging machine learning to automate and optimize architectural design workflows, enabling intelligent generation of building layouts and structural configurations.',
  },
  {
    icon: '◈',
    title: 'Computer Vision for Construction',
    desc: 'Applying deep learning and image recognition to monitor construction progress, detect defects, and analyze building documentation from 2D drawings.',
  },
  {
    icon: '◎',
    title: 'Robotics & Automation',
    desc: 'Developing autonomous robotic systems and drone-based platforms for inspection, surveying, and collaborative construction site management.',
  },
  {
    icon: '⬙',
    title: 'Smart Building Systems',
    desc: 'Integrating AI with building management systems for predictive maintenance, energy optimization, and occupant-responsive environments.',
  },
]

const quickLinks = [
  { href: '/members', label: 'Meet the Team', sub: 'Faculty & Researchers' },
  { href: '/publications', label: 'Publications', sub: 'Journals & Conferences' },
  { href: '/projects', label: 'Projects', sub: 'Ongoing & Completed' },
  { href: '/news', label: 'Lab News', sub: 'Updates & Announcements' },
]

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden px-8">
        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.5,
        }} />
        {/* Accent blob */}
        <div className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(26,58,92,0.06) 0%, transparent 70%)', transform: 'translate(30%, 0)' }} />

        <div className="max-w-6xl mx-auto w-full relative z-10 py-24">
          <p className="font-mono text-sm tracking-[0.25em] uppercase mb-6 fade-up fade-up-delay-1"
            style={{ color: 'var(--highlight)' }}>
            Hanyang University · Architectural Engineering
          </p>
          <h1 className="font-display text-6xl md:text-8xl leading-none text-accent mb-8 fade-up fade-up-delay-2"
            style={{ letterSpacing: '-0.02em' }}>
            AI for<br />
            <span style={{ fontStyle: 'italic' }}>Construction</span><br />
            Laboratory
          </h1>
          <p className="text-lg md:text-xl max-w-xl mb-12 fade-up fade-up-delay-3"
            style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
            We pioneer the intersection of artificial intelligence and the built environment —
            developing intelligent systems that transform how buildings are designed, constructed, and operated.
          </p>
          <div className="flex flex-wrap gap-4 fade-up fade-up-delay-4">
            <Link href="/research" className="px-6 py-3 text-sm font-mono tracking-wide transition-all"
              style={{ background: 'var(--accent)', color: 'white', letterSpacing: '0.05em' }}>
              Our Research →
            </Link>
            <Link href="/members" className="px-6 py-3 text-sm font-mono tracking-wide border transition-all hover:bg-ink hover:text-paper"
              style={{ borderColor: 'var(--ink)', color: 'var(--ink)', letterSpacing: '0.05em' }}>
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      {/* ── Research Areas ── */}
      <section className="px-8 py-24" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16 border-b border-border pb-6">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--highlight)' }}>Focus Areas</p>
              <h2 className="font-display text-4xl md:text-5xl text-accent">Research Domains</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-px" style={{ border: '1px solid var(--border)', background: 'var(--border)' }}>
            {researchAreas.map((area, i) => (
              <div key={i} className="p-10 group transition-colors duration-300 hover:bg-accent"
                style={{ background: 'var(--paper)' }}>
                <div className="text-3xl mb-6 transition-colors" style={{ fontFamily: 'monospace' }}>{area.icon}</div>
                <h3 className="font-display text-xl mb-3 transition-colors">{area.title}</h3>
                <p className="text-sm leading-relaxed transition-colors" style={{ color: 'var(--muted)' }}>{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Links ── */}
      <section className="px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-12 text-center" style={{ color: 'var(--muted)' }}>
            Explore the Lab
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map(q => (
              <Link key={q.href} href={q.href}
                className="group p-8 border border-border text-center transition-all duration-300 hover:border-accent hover:-translate-y-1"
                style={{ background: 'var(--paper)' }}>
                <p className="font-display text-xl mb-2 group-hover:text-accent transition-colors">{q.label}</p>
                <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{q.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Strip ── */}
      <section className="px-8 py-20" style={{ background: 'var(--accent)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl text-white mb-2">Get in Touch</h2>
            <p className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Interested in collaboration or joining the lab?
            </p>
          </div>
          <a href="mailto:junoseo@hanyang.ac.kr"
            className="px-8 py-4 font-mono text-sm tracking-wide border border-white text-white transition-all hover:bg-white hover:text-accent"
            style={{ letterSpacing: '0.08em' }}>
            e-mail
          </a>
        </div>
      </section>
    </div>
  )
}
