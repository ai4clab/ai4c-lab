import { getMembers, Member } from '@/lib/notion'
import { buildNotionImageProxyUrl } from '@/lib/notionImage'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

const courseOrder: Record<string, number> = {
  Professor: 0, PhD: 1, Master: 2, Undergraduate: 3,
}
const courseLabel: Record<string, string> = {
  Professor: 'Faculty', PhD: 'Ph.D. Course', Master: 'M.Sc. Course', Undergraduate: 'Undergraduate Internship',
}

function normalizeCourse(course: string): string {
  const c = course.trim().toLowerCase()

  if (c === 'professor' || c === 'faculty') return 'Professor'
  if (c === 'phd' || c === 'ph.d.' || c === 'ph.d. course' || c === 'phd course') return 'PhD'
  if (c === 'master' || c === "master's" || c === 'm.sc.' || c === 'm.sc. course' || c === 'msc' || c === 'msc course') return 'Master'
  if (c === 'undergraduate' || c === 'undergraduate internship') return 'Undergraduate'

  return course || 'Other'
}

function groupByRole(members: Member[]) {
  return members.reduce<Record<string, Member[]>>((acc, m) => {
    const key = normalizeCourse(m.course)
    if (!acc[key]) acc[key] = []
    acc[key].push(m)
    return acc
  }, {})
}

function MemberCard({ m }: { m: Member }) {
  const isProfessor = normalizeCourse(m.course) === 'Professor'

  const card = (
    <div className="group min-w-0 border border-border p-6 transition-all duration-300 hover:border-accent hover:-translate-y-1"
      style={{ background: 'var(--paper)', borderColor: 'var(--surface)' }}>
      <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 mx-auto"
        style={{ background: 'var(--surface)', border: '0.75px solid var(--border)' }}>
        {m.imageUrl ? (
          <Image
            src={buildNotionImageProxyUrl(m.imageUrl, 480, 480, 'cover')}
            alt={m.name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-display text-2xl text-accent">
            {m.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="text-center">
        <h3 className="font-display text-lg text-ink mb-1">{m.name}</h3>
        <p className="font-mono text-xs mb-2" style={{ color: 'var(--highlight)' }}>
          {isProfessor ? 'Professor' : (courseLabel[normalizeCourse(m.course)] ?? m.course)}
        </p>
        {m.period && <p className="font-mono text-xs mb-3" style={{ color: 'var(--muted)' }}>{m.period}</p>}
        {m.email && (
          isProfessor ? (
            <span className="block break-all font-mono text-xs" style={{ color: 'var(--muted)' }}>
              {m.email}
            </span>
          ) : (
            <a href={`mailto:${m.email}`} className="block break-all font-mono text-xs transition-colors hover:text-accent"
              style={{ color: 'var(--muted)' }}>
              {m.email}
            </a>
          )
        )}
      </div>
    </div>
  )

  if (isProfessor) {
    return (
      <Link href="/professor" aria-label={`${m.name} profile`} className="block">
        {card}
      </Link>
    )
  }

  return (
    card
  )
}

export default async function MembersPage() {
  const members = await getMembers()
  const active = members.filter(m => m.active)
  const alumni = members.filter(m => !m.active)
  const grouped = groupByRole(active)
  const sortedRoles = Object.keys(grouped).sort((a, b) => (courseOrder[a] ?? 99) - (courseOrder[b] ?? 99))

  return (
    <div className="max-w-6xl mx-auto px-8 pt-10 pb-20">
      {/* Header */}
      <div className="border-b border-border pb-8 mb-16">
        <p className="font-mono text-xs tracking-[0.15em] uppercase mb-4 fade-up" style={{ color: 'var(--highlight)' }}>People</p>
        <h1 className="font-display text-5xl md:text-6xl text-accent fade-up fade-up-delay-1">Lab Members</h1>
      </div>

      {/* Active members grouped by role */}
      {sortedRoles.map(role => (
        <div key={role} className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
              {courseLabel[role] ?? role}
            </h2>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="font-mono text-xs px-3 py-1" style={{ background: 'var(--surface)', color: 'var(--muted)' }}>
              {grouped[role].length}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {grouped[role].map(m => <MemberCard key={m.id} m={m} />)}
          </div>
        </div>
      ))}

      {/* Alumni */}
      {alumni.length > 0 && (
        <div className="mt-20 pt-12 border-t border-border">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--muted)' }}>Alumni</h2>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {alumni.map(m => (
              <div key={m.id} className="min-w-0 text-center p-4 border border-border"
                style={{ background: 'var(--surface)' }}>
                <p className="font-display text-sm break-words">{m.name}</p>
                <p className="font-mono text-xs mt-1" style={{ color: 'var(--muted)' }}>{m.period}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
