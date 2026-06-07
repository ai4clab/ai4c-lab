import { getProjects, Project } from '@/lib/notion'
import Image from 'next/image'

export const revalidate = 60

function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="group border border-border overflow-hidden transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-lg"
      style={{ background: 'var(--paper)' }}>
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden"
        style={{ background: 'var(--surface)' }}>
        {p.thumbnailUrl ? (
          <Image src={p.thumbnailUrl} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-4xl" style={{ color: 'var(--border)' }}>◈</span>
          </div>
        )}
        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className="font-mono text-xs px-2 py-1"
            style={{
              background: p.status === 'Ongoing' ? 'var(--accent)' : 'rgba(0,0,0,0.5)',
              color: 'white',
            }}>
            {p.status || 'Project'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl text-ink mb-2 group-hover:text-accent transition-colors">
          {p.title}
        </h3>
        {p.period && (
          <p className="font-mono text-xs mb-3" style={{ color: 'var(--highlight)' }}>{p.period}</p>
        )}
        {p.description && (
          <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: 'var(--muted)' }}>
            {p.description}
          </p>
        )}
        {/* Tags */}
        {p.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
            {p.tags.map(tag => (
              <span key={tag} className="font-mono text-xs px-2 py-0.5"
                style={{ background: 'var(--surface)', color: 'var(--muted)' }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const ongoing = projects.filter(p => p.status === 'Ongoing')
  const completed = projects.filter(p => p.status !== 'Ongoing')

  return (
    <div className="max-w-6xl mx-auto px-8 py-20">
      {/* Header */}
      <div className="border-b border-border pb-8 mb-16">
        <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--highlight)' }}>Portfolio</p>
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
