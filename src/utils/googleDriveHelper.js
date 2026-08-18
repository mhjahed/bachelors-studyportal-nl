/**
 * Google Drive shareable URLs come in a few formats:
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   https://drive.google.com/open?id=FILE_ID
 *   https://drive.google.com/uc?id=FILE_ID
 *
 * To display them as an <img src>, we need:
 *   https://drive.google.com/uc?export=view&id=FILE_ID
 * or (more reliable in modern browsers):
 *   https://lh3.googleusercontent.com/d/FILE_ID
 */

const GDRIVE_PATTERNS = [
  /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{15,})/,
  /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]{15,})/,
  /drive\.google\.com\/uc\?(?:export=view&)?id=([a-zA-Z0-9_-]{15,})/,
  /docs\.google\.com\/uc\?(?:export=view&)?id=([a-zA-Z0-9_-]{15,})/,
]

/**
 * Extract file ID from any Google Drive URL variant.
 */
export function extractGoogleDriveId(url) {
  if (!url || typeof url !== 'string') return null
  for (const pattern of GDRIVE_PATTERNS) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

/**
 * Convert any Google Drive URL to a directly-viewable image URL.
 * If it is not a Drive URL, returns the input unchanged.
 */
export function toDisplayableImageUrl(url) {
  if (!url) return ''
  const id = extractGoogleDriveId(url)
  if (id) {
    return `https://lh3.googleusercontent.com/d/${id}`
  }
  return url
}

/**
 * Check whether a URL looks like a Google Drive share link.
 */
export function isGoogleDriveUrl(url) {
  return extractGoogleDriveId(url) !== null
}