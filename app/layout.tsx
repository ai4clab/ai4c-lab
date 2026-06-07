import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'AI4C Lab',
  description: 'AI for Construction Laboratory',
  icons: {
    icon: '/src/logo4.png',
    shortcut: '/src/logo4.png',
    apple: '/src/logo4.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise">
        <Nav />
        <main>{children}</main>
        <footer className="border-t border-border mt-24 py-10 px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <span className="font-display text-xl text-accent">AI4C Lab</span>
              <p className="text-muted text-sm mt-1 font-mono">AI for Construction Laboratory</p>
            </div>
            <p className="text-muted text-sm font-mono">© {new Date().getFullYear()} AI4C Lab. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
