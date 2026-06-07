import { getPublications, Publication } from '@/lib/notion'
import PublicationsKpi from './PublicationsKpi'

export const revalidate = 60

function PublicationRow({ pub }: { pub: Publication }) {
  const year = pub.date ? new Date(pub.date).getFullYear() : null

  return (
    <div className="group border-b border-border bg-white transition-colors duration-700 ease-in-out hover:bg-[#eef7ff]"
      style={{
        paddingTop: '1.333rem',
        paddingBottom: '1.333rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        marginLeft: '-1rem',
        marginRight: '-1rem',
      }}>
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-display text-2xl text-ink mb-2 leading-snug" style={{ fontWeight: 600 }}>
            {pub.url ? (
              <a href={pub.url} target="_blank" rel="noopener noreferrer"
                className="transition-colors cursor-pointer">
                {pub.title}
                <span className="ml-2 text-sm font-mono" style={{ color: 'var(--muted)' }}>↗</span>
              </a>
            ) : pub.title}
          </h3>
          {/* Authors */}
          {pub.authors && (
            <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>{pub.authors}</p>
          )}
          {/* Meta tags */}
          <div className="flex flex-wrap items-center gap-3">
            {pub.journal && (
              <span className="font-mono text-xs px-3 py-1 border border-border"
                style={{ color: 'var(--accent)', borderColor: 'var(--accent)', background: 'rgba(26,58,92,0.04)' }}>
                {pub.journal}
              </span>
            )}
            {year && (
              <span className="font-mono text-xs font-medium" style={{ color: 'var(--accent)' }}>{year}</span>
            )}
          </div>
        </div>

        {/* Citations */}
        {pub.citations > 0 && (
          <div className="flex-shrink-0 text-center min-w-[60px]">
            <p className="font-display text-3xl text-accent leading-none">{pub.citations}</p>
            <p className="font-mono text-xs mt-1" style={{ color: 'var(--muted)' }}>cited</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default async function PublicationsPage() {
  const pubs = await getPublications()
  const paperCount = pubs.length
  const totalCitations = pubs.reduce((sum, p) => sum + (p.citations || 0), 0)
  const hIndex = (() => {
    const sorted = pubs
      .map(p => p.citations || 0)
      .sort((a, b) => b - a)
    let h = 0
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] >= i + 1) h = i + 1
      else break
    }
    return h
  })()

  // Group by year
  const byYear = pubs.reduce<Record<string, Publication[]>>((acc, p) => {
    const y = p.date ? new Date(p.date).getFullYear().toString() : 'Unknown'
    if (!acc[y]) acc[y] = []
    acc[y].push(p)
    return acc
  }, {})

  const sortedYears = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="max-w-6xl mx-auto px-8 py-20">
      {/* Header */}
      <div className="border-b border-border pb-8 mb-16">
        <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--highlight)' }}>Research Output</p>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="font-display text-5xl md:text-6xl text-accent">Publications</h1>
          <PublicationsKpi
            paperCount={paperCount}
            totalCitations={totalCitations}
            hIndex={hIndex}
          />
        </div>
      </div>

      {pubs.length === 0 ? (
        <p className="font-mono text-sm text-center py-24" style={{ color: 'var(--muted)' }}>
          No publications yet. Add them in Notion.
        </p>
      ) : (
        sortedYears.map(year => (
          <div key={year} className="mb-16">
            {/* Year header */}
            <div className="flex items-center gap-4 mb-2 sticky top-16 py-3"
              style={{ background: 'var(--paper)', zIndex: 10 }}>
              <span className="font-display text-4xl" style={{ color: 'var(--accent)' }}>{year}</span>
              <span className="font-mono text-xs font-medium" style={{ color: 'var(--ink)' }}>
                {byYear[year].length} {byYear[year].length === 1 ? 'paper' : 'papers'}
              </span>
            </div>
            <div>
              {byYear[year].map(pub => <PublicationRow key={pub.id} pub={pub} />)}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
