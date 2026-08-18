/**
 * Date/time formatting helpers.
 */

export function nowIso() {
  return new Date().toISOString()
}

export function formatDate(value, options = {}) {
  if (!value) return ''
  const d = new Date(value)
  if (isNaN(d.getTime())) return ''

  const opts = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  }
  return d.toLocaleDateString('en-GB', opts)
}

export function formatDateTime(value) {
  if (!value) return ''
  const d = new Date(value)
  if (isNaN(d.getTime())) return ''

  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function timeAgo(value) {
  if (!value) return ''
  const d = new Date(value)
  if (isNaN(d.getTime())) return ''

  const seconds = Math.floor((Date.now() - d.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `${weeks}w ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.floor(days / 365)
  return `${years}y ago`
}