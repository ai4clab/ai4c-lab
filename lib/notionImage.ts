export function buildNotionImageProxyUrl(
  src: string,
  width = 480,
  height = 480,
  fit: 'cover' | 'contain' = 'cover',
): string {
  const params = new URLSearchParams({
    src,
    w: String(width),
    h: String(height),
    fit,
  })

  return `/api/notion-image?${params.toString()}`
}
