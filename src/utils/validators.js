/**
 * Shared validation functions.
 */

export const isNonEmpty = (v) =>
  v !== null && v !== undefined && String(v).trim().length > 0

export const isEmail = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())

export const isUrl = (v) => {
  if (!isNonEmpty(v)) return false
  try {
    const u = new URL(v)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

export const isPassport = (v) =>
  /^[A-Z0-9]{6,12}$/i.test(String(v || '').trim())

export const isFutureDate = (v) => {
  if (!v) return false
  const d = new Date(v)
  return !isNaN(d.getTime()) && d.getTime() > Date.now()
}

export const isPastDate = (v) => {
  if (!v) return false
  const d = new Date(v)
  return !isNaN(d.getTime()) && d.getTime() < Date.now()
}

export const isValidDate = (v) => {
  if (!v) return false
  const d = new Date(v)
  return !isNaN(d.getTime())
}

export const is8DigitNumeric = (v) =>
  /^\d{8}$/.test(String(v || '').trim())

export const isValidIsoCode = (v) =>
  /^NL[A-Z0-9]{6}$/.test(String(v || '').trim().toUpperCase())