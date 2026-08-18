/**
 * ID generation utilities.
 * Kept simple and human-readable.
 */

function randomSuffix(len = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let out = ''
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)]
  }
  return out
}

export function generateId(prefix = 'id') {
  const ts = Date.now().toString(36)
  return `${prefix}_${ts}_${randomSuffix(5)}`
}

/**
 * ISO Code — 8-character student code (e.g., NL7XK2AB)
 */
export function generateIsoCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no confusing chars
  let out = 'NL'
  for (let i = 0; i < 6; i++) {
    out += chars[Math.floor(Math.random() * chars.length)]
  }
  return out
}

/**
 * Request ID (e.g., REQ-A3F7K2)
 */
export function generateRequestId(prefix = 'REQ') {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  for (let i = 0; i < 6; i++) {
    out += chars[Math.floor(Math.random() * chars.length)]
  }
  return `${prefix}-${out}`
}

/**
 * 8-digit numeric passcode for user accounts.
 */
export function generatePasscode(length = 8) {
  let out = ''
  for (let i = 0; i < length; i++) {
    out += Math.floor(Math.random() * 10)
  }
  return out
}