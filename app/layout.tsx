import type { Metadata } from 'next'
import Image from 'next/image'
import './globals.css'
import Nav from '@/components/Nav'
import DisableContextMenu from '@/components/DisableContextMenu'

export const metadata: Metadata = {
  title: '한양대학교 AI4C Lab',
  description: 'AI for Construction Laboratory',
  icons: {
    icon: '/src/logo4.png',
    shortcut: '/src/logo4.png',
    apple: '/src/logo4.png',
  },
  metadataBase: new URL('https://ai4c.hanyang.ac.kr'),
  openGraph: {
    title: '한양대학교 건설인공지능연구실',
    description: 'AI for Construction Laboratory',
    url: 'https://ai4c.hanyang.ac.kr',
    siteName: '한양대학교 건설인공지능연구실',
    type: 'website',
    images: [
      {
        url: '/src/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI4C Lab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI4C Lab',
    description: 'AI for Construction Laboratory',
    images: ['/src/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise">
        <DisableContextMenu />
        <Nav />
        <main>{children}</main>
        <footer className="border-t border-border mt-24 py-10 px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex items-center gap-4">
              <Image src="/src/footer-logo.png" alt="AI4C Lab logo" width={120} height={56} className="shrink-0" unoptimized />
              <div>
                <span className="font-display text-xl text-accent">AI4C Lab</span>
                <p className="text-muted text-sm mt-1 font-mono">한양대학교 건축공학부 건설인공지능연구실</p>
              </div>
            </div>
            <div className="text-muted text-sm font-mono space-y-2 md:text-right">
              <p>© {new Date().getFullYear()} AI4C Lab. All rights reserved.</p>
              <p>서울특별시 성동구 왕십로 222 한양대학교 과학기술관 608-2 / TEL : 02-2220-0327 / 이메일 무단수집거부</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
