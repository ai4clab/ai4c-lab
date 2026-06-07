import Link from 'next/link'
import Image from 'next/image'

const researchAreas = [
  {
    icon: 'sensing',
    title: 'Sensing Technologies',
    desc: 'Computer vision and wearable sensors for automated worker monitoring, safety analysis, productivity tracking, and health assessment.',
    papers: '55+',
    citations: '2,800+',
    image: '/src/sensing.webp',
  },
  {
    icon: 'arvr',
    title: 'AR/VR Technologies',
    desc: 'Immersive virtual reality training and augmented reality-assisted tasks for design collaboration and safety awareness.',
    papers: '28+',
    citations: '850+',
    image: '/src/arvr.webp',
  },
  {
    icon: 'exoskeleton',
    title: 'Exoskeleton Systems',
    desc: 'Active and passive wearable robots for reducing musculoskeletal disorders and enhancing worker performance in construction.',
    papers: '22+',
    citations: '480+',
    image: '/src/exoskeleton.webp',
  },
  {
    icon: 'bim',
    title: 'Generative AI with BIM',
    desc: 'AI-powered architectural conceptual design generation and BIM data tokenization for intelligent project management.',
    papers: '15+',
    citations: '320+',
    image: '/src/bim.webp',
  },
]

function TechnologyIcon({ kind }: { kind: string }) {
  if (kind === 'sensing') {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 17v-2a8 8 0 0 1 16 0v2" />
        <path d="M7 17v2M12 15v4M17 17v2" />
        <circle cx="12" cy="7" r="2.5" />
      </svg>
    )
  }

  if (kind === 'arvr') {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v3h-4l-2-3h-6l-2 3H3z" />
        <circle cx="9" cy="10" r="1.6" />
        <circle cx="15" cy="10" r="1.6" />
      </svg>
    )
  }

  if (kind === 'exoskeleton') {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 4h8v4H8z" />
        <path d="M10 8v4M14 8v4" />
        <path d="M6 12h12" />
        <path d="M8 12v5M16 12v5" />
        <path d="M6 17h4M14 17h4" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
      <path d="M7 4v16M12 4v16M17 4v16" />
    </svg>
  )
}

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
          style={{ background: 'radial-gradient(circle, rgba(58,58,58,0.08) 0%, transparent 70%)', transform: 'translate(30%, 0)' }} />

        <div className="max-w-6xl mx-auto w-full relative z-10 py-24">
          <p className="font-mono text-sm tracking-[0.125em] uppercase mb-6 fade-up fade-up-delay-1"
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
            건축과 인공지능의 교차점에서, 우리는 건물이 설계되고 시공되고 운영되는 방식을 근본적으로 재정의합니다.
            컴퓨터 비전, 로보틱스, 생성형 AI를 건축공학에 접목하여 더 스마트하고 지속가능한 건조환경을 만들어갑니다.
          </p>
          <div className="flex flex-wrap gap-4 fade-up fade-up-delay-4">
            <Link href="/publications" className="px-6 py-3 text-sm font-mono tracking-wide transition-all"
              style={{ background: 'var(--accent)', color: 'white', letterSpacing: '0.05em' }}>
              Our Research →
            </Link>
            <Link href="/members" className="px-6 py-3 text-sm font-mono tracking-wide border transition-all hover:bg-[#eaf6ff] hover:text-accent"
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
              <p className="font-mono text-xs tracking-[0.15em] uppercase mb-3" style={{ color: 'var(--highlight)' }}>Focus Areas</p>
              <h2 className="font-display text-4xl md:text-5xl text-accent">Research Domains</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {researchAreas.map((area, i) => (
              <div key={i} className="border overflow-hidden"
                style={{ borderColor: 'var(--border)', background: 'var(--paper)' }}>
                <div className="grid grid-cols-1 sm:grid-cols-[40%_60%] min-h-[280px]">
                  <div className="relative min-h-[220px] sm:min-h-0">
                    <Image src={area.image} alt={area.title} fill className="object-cover" unoptimized />
                    <div className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center font-mono text-sm"
                      style={{ background: '#111111', color: 'white' }}>
                      <TechnologyIcon kind={area.icon} />
                    </div>
                  </div>
                  <div className="p-8 flex flex-col min-h-[280px]">
                    <h3 className="font-display text-2xl leading-[1.15] mb-4" style={{ color: 'var(--ink)' }}>{area.title}</h3>
                    <p className="font-mono text-[13px] leading-6 flex-1" style={{ color: 'var(--muted)' }}>{area.desc}</p>
                    <div className="mt-auto pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
                      <div className="flex items-end">
                        <div className="flex gap-7">
                          <div>
                            <p className="font-display text-xl leading-none" style={{ color: 'var(--ink)' }}>{area.papers}</p>
                            <p className="font-mono text-[10px] tracking-[0.15em] uppercase mt-1" style={{ color: 'var(--muted)' }}>Papers</p>
                          </div>
                          <div>
                            <p className="font-display text-xl leading-none" style={{ color: 'var(--ink)' }}>{area.citations}</p>
                            <p className="font-mono text-[10px] tracking-[0.15em] uppercase mt-1" style={{ color: 'var(--muted)' }}>Citations</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              함께 연구하고 싶으신가요? 공동 연구나 연구실 합류에 관심 있으시면 언제든 연락 주세요.
            </p>
          </div>
          <a href="mailto:junoseo@hanyang.ac.kr"
            className="px-8 py-4 font-mono text-sm font-bold tracking-wide border border-white text-white transition-all hover:bg-white hover:text-accent inline-flex items-center gap-2"
            style={{ letterSpacing: '0.08em' }}>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-[1.35em] h-[1.35em]"
              style={{ transform: 'translateY(1.5px)' }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
              <path d="M4 7l8 6 8-6" />
            </svg>
            <span>메일 보내기</span>
          </a>
        </div>
      </section>
    </div>
  )
}
