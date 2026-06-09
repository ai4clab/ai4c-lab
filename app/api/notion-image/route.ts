import sharp from 'sharp'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

function isAllowedNotionHost(hostname: string): boolean {
  return (
    hostname === 'prod-files-secure.s3.us-west-2.amazonaws.com' ||
    hostname.endsWith('.notion-static.com') ||
    hostname.endsWith('.notion.site')
  )
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export async function GET(req: NextRequest) {
  const src = req.nextUrl.searchParams.get('src')
  const widthParam = Number(req.nextUrl.searchParams.get('w') ?? '480')
  const heightParam = Number(req.nextUrl.searchParams.get('h') ?? '480')
  const fitParam = req.nextUrl.searchParams.get('fit')

  if (!src) {
    return NextResponse.json({ error: 'Missing src parameter' }, { status: 400 })
  }

  let url: URL
  try {
    url = new URL(src)
  } catch {
    return NextResponse.json({ error: 'Invalid src URL' }, { status: 400 })
  }

  if (!isAllowedNotionHost(url.hostname)) {
    return NextResponse.json({ error: 'Host is not allowed' }, { status: 403 })
  }

  const width = clamp(Number.isFinite(widthParam) ? Math.round(widthParam) : 480, 64, 2000)
  const height = clamp(Number.isFinite(heightParam) ? Math.round(heightParam) : 480, 64, 2000)
  const fit = fitParam === 'contain' ? 'contain' : 'cover'

  const upstream = await fetch(url.toString(), {
    next: { revalidate: 86400 },
  })
  if (!upstream.ok) {
    return NextResponse.json({ error: 'Failed to fetch upstream image' }, { status: 502 })
  }

  const input = Buffer.from(await upstream.arrayBuffer())
  const output = await sharp(input)
    .rotate()
    .resize(width, height, { fit, position: 'centre' })
    .webp({ quality: 82 })
    .toBuffer()

  return new NextResponse(output as unknown as BodyInit, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000',
    },
  })
}
