import Image from 'next/image'
import { getMembers } from '@/lib/notion'
import { buildNotionImageProxyUrl } from '@/lib/notionImage'

export const revalidate = 60

export default async function ProfessorPage() {
  const members = await getMembers()
  const professor =
    members.find(m => m.course === 'Professor') ||
    members.find(m => m.name.toLowerCase().includes('seo')) ||
    null

  const name = professor?.name || 'JoonOh Seo'
  const email = professor?.email || 'junoseo@hanyang.ac.kr'
  const period = professor?.period || 'Associate Professor'
  const tel = '02-2220-0327'
  const researchInterests = [
    'Computer Vision & Sensing Technologies',
    'AR/VR for Construction Training',
    'Wearable Robotics & Exoskeletons',
    'Generative AI with BIM',
    'Construction Worker Safety',
    'Deep Learning for Activity Recognition',
    'Situation Awareness & Hazard Recognition',
    'Digital Twin Technologies',
  ]

  return (
    <div className="max-w-6xl mx-auto px-8 pt-10 pb-20">
      {/* Header */}
      <div className="border-b border-border pb-8 mb-12">
        <p className="font-mono text-xs tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--highlight)' }}>
          Faculty
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-accent fade-up fade-up-delay-1">Professor</h1>
      </div>

      {/* Profile */}
      <section className="grid md:grid-cols-[320px_1fr] gap-10 md:gap-14 items-start mb-14">
        <div className="border p-4" style={{ background: 'var(--paper)', borderColor: 'var(--surface)' }}>
          <div className="relative w-full aspect-[4/5] overflow-hidden" style={{ background: 'var(--surface)' }}>
            {professor?.imageUrl ? (
              <Image
                src={buildNotionImageProxyUrl(professor.imageUrl, 800, 1000, 'cover')}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-display text-6xl text-accent">
                {name.charAt(0)}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--surface)' }}>
            <div className="mb-3">
              <p className="font-mono text-[10px] uppercase mb-1" style={{ color: 'var(--highlight)' }}>Affiliation</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Hanyang University, Department of Architectural Engineering</p>
            </div>
            <div className="mb-3">
              <p className="font-mono text-[10px] uppercase mb-1" style={{ color: 'var(--highlight)' }}>Mail</p>
              <a href={`mailto:${email}`} className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>{email}</a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase mb-1" style={{ color: 'var(--highlight)' }}>Tel</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{tel}</p>
            </div>
            <div className="mt-3">
              <p className="font-mono text-[10px] uppercase mb-1" style={{ color: 'var(--highlight)' }}>Google Scholar</p>
              <a
                href="https://scholar.google.com/citations?user=egT87vMAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                View profile
              </a>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display text-4xl text-ink mb-3">{name}</h2>
          <p className="text-lg mb-6" style={{ color: 'var(--muted)' }}>{period}</p>

          <div className="border-t border-border pt-6">
            <h3 className="font-display text-2xl text-accent mb-4">Biography</h3>
            <div className="space-y-4 text-sm" style={{ color: 'var(--muted)' }}>
              <p>
                서준오 교수는 한양대학교 건축공학과 부교수로 재직 중입니다(2026년 3월 부임).
                그의 연구는 최첨단 인공지능 기술을 통해 건설 산업과 건조환경을 혁신하는 데 초점을 맞추고 있습니다.
              </p>
              <p>
                이전에는 홍콩이공대학교 건축·부동산학과 부교수로 재직하며(2016–2026)
                AI 기반 건설 연구의 토대를 다졌습니다.
              </p>
              <p>
                그의 연구는 딥러닝, 센싱 기술, AR/VR, 로보틱스, 생성형 AI 등
                첨단 인공지능 기술을 통합하여 건설 및 건조환경의 효율성, 지속가능성,
                그리고 인간 중심 설계를 향상시키는 것을 목표로 합니다.
              </p>
              <p>
                Dr. JoonOh Seo is an Associate Professor in the Department of Architectural Engineering at Hanyang University
                (starting March 2026). His research focuses on revolutionizing the construction industry and built
                environment through cutting-edge artificial intelligence solutions.
              </p>
              <p>
                Previously, he served as Associate Professor at the Department of Building and Real Estate, Hong Kong
                Polytechnic University (2016-2026), where he established a strong foundation in AI-driven construction
                research.
              </p>
              <p>
                His work integrates advanced AI technologies, including deep learning, sensing technologies, AR/VR,
                robotics, and generative AI, to enhance efficiency, sustainability, and human-centric design in
                construction and the built environment.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-display text-2xl text-accent mb-4">Research Interests</h3>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {researchInterests.map((interest) => (
                <div
                  key={interest}
                  className="flex items-center gap-2.5 border px-3 py-2.5"
                  style={{ borderColor: 'var(--surface)', background: 'var(--paper)' }}
                >
                  <span className="w-1.5 h-1.5" style={{ background: 'var(--highlight)' }} />
                  <span className="text-sm" style={{ color: 'var(--muted)' }}>{interest}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-display text-2xl text-accent mb-4">Education</h3>
            <div className="border-t border-border">
              <div className="py-4 border-b border-border">
                <p className="text-[15px] font-semibold text-ink">Ph.D. in Civil and Environmental Engineering</p>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>University of Michigan, Ann Arbor</p>
                <p className="text-xs mt-1" style={{ color: 'var(--highlight)' }}>Focus: Construction Engineering and Management</p>
              </div>
              <div className="py-4 border-b border-border">
                <p className="text-[15px] font-semibold text-ink">M.S. in Industrial and Operations Engineering</p>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>University of Michigan, Ann Arbor</p>
                <p className="text-xs mt-1" style={{ color: 'var(--highlight)' }}>Specialized in Ergonomics</p>
              </div>
              <div className="py-4 border-b border-border">
                <p className="text-[15px] font-semibold text-ink">M.S. in Architectural Engineering</p>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>Seoul National University</p>
              </div>
              <div className="py-4 border-b border-border">
                <p className="text-[15px] font-semibold text-ink">B.S. in Architectural Engineering</p>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>Seoul National University</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
