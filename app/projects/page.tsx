import { getProjects, Project } from '@/lib/notion'
import Image from 'next/image'

export const revalidate = 60

function isOngoingStatus(status: string): boolean {
  return status.toLowerCase().replace(/[^a-z]/g, '') === 'ongoing'
}

function ProjectCard({ p }: { p: Project }) {
  const isOngoing = isOngoingStatus(p.status || '')

  return (
    <div className="group border border-border overflow-hidden flex flex-col h-[600px] transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-lg"
      style={{ background: 'var(--paper)' }}>
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden"
        style={{ background: 'var(--surface)' }}>
        {p.thumbnailUrl ? (
          <Image src={p.thumbnailUrl} alt={p.title} fill className="object-contain p-2" unoptimized />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-4xl" style={{ color: 'var(--border)' }}>◈</span>
          </div>
        )}
        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className="font-bold text-xs px-2 py-1"
            style={{
              background: isOngoing ? '#dff1ff' : 'rgba(0,0,0,0.5)',
              color: isOngoing ? '#3a78a8' : 'white',
            }}>
            {isOngoing ? '진행 중' : '완료'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 min-h-0">
        <h3 className="font-display text-xl text-ink mb-2 group-hover:text-accent transition-colors">
          {p.title}
        </h3>
        {p.period && (
          <p className="font-mono text-xs mb-3" style={{ color: 'var(--highlight)' }}>{p.period}</p>
        )}
        {p.description && (
          <p className="text-sm leading-relaxed mb-4 overflow-hidden flex-1 min-h-0" style={{ color: 'var(--muted)' }}>
            {p.description}
          </p>
        )}
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border min-h-[44px] content-start">
          {p.tags.map(tag => (
            <span key={tag} className="font-mono text-xs px-2 py-0.5"
              style={{ background: 'var(--surface)', color: 'var(--muted)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const ongoing = projects.filter(p => isOngoingStatus(p.status || ''))
  const completed = projects.filter(p => !isOngoingStatus(p.status || ''))

  return (
    <div className="max-w-6xl mx-auto px-8 pt-10 pb-20">
      {/* Header */}
      <div className="border-b border-border pb-8 mb-16">
        <p className="font-mono text-xs tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--highlight)' }}>Portfolio</p>
        <div className="flex items-end justify-between">
          <h1 className="font-display text-5xl md:text-6xl text-accent">Projects</h1>
          <div className="flex gap-4 pb-2 font-mono text-xs" style={{ color: 'var(--muted)' }}>
            <span>{ongoing.length} ongoing</span>
            <span>·</span>
            <span>{completed.length} completed</span>
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="font-mono text-sm text-center py-24" style={{ color: 'var(--muted)' }}>
          No projects yet. Add them in Notion.
        </p>
      ) : (
        <>
          {/* Ongoing */}
          {ongoing.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
                <h2 className="font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--muted)' }}>Ongoing Research</h2>
                <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ongoing.map(p => <ProjectCard key={p.id} p={p} />)}
              </div>
            </div>
          )}

          {/* Completed */}
          {completed.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--muted)' }}>Completed Projects</h2>
                <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completed.map(p => <ProjectCard key={p.id} p={p} />)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
