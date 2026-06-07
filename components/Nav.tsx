'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/members', label: 'Members' },
  { href: '/publications', label: 'Publications' },
  { href: '/projects', label: 'Projects' },
  { href: '/news', label: 'News' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header style={{ borderBottom: '1px solid var(--border)', background: '#ffffff' }}
      className="sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" aria-label="AI4C Lab home">
          <Image
            src="/src/logo3.svg"
            alt="AI4C Lab logo"
            width={220}
            height={80}
            priority
            className="h-11 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[1.05rem] font-display uppercase tracking-[0.01em] transition-colors"
                style={{ color: pathname === l.href ? 'var(--accent)' : 'var(--muted)', fontWeight: pathname === l.href ? '600' : '400' }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)}>
          <span style={{ width: 22, height: 1.5, background: 'var(--ink)', display: 'block', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
          <span style={{ width: 22, height: 1.5, background: 'var(--ink)', display: 'block', opacity: open ? 0 : 1 }} />
          <span style={{ width: 22, height: 1.5, background: 'var(--ink)', display: 'block', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border px-8 py-6 flex flex-col gap-4" style={{ background: 'var(--paper)' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-[1.05rem] font-display uppercase tracking-[0.01em]"
              style={{ color: pathname === l.href ? 'var(--accent)' : 'var(--ink)' }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
