const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

export function escapeHtml(input: unknown): string {
  if (input === null || input === undefined) return ''
  return String(input).replace(/[&<>"']/g, (c) => HTML_ESCAPE_MAP[c] ?? c)
}
