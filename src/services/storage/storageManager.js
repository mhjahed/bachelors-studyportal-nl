/**
 * StorageManager
 *
 * The ONLY module that touches window.localStorage directly.
 * Provides safe, typed read/write with error handling.
 */

const isBrowser = typeof window !== 'undefined' && !!window.localStorage

class StorageManagerClass {
  /**
   * Check if LocalStorage is available.
   */
  isAvailable() {
    if (!isBrowser) return false
    try {
      const test = '__bpnl_test__'
      window.localStorage.setItem(test, test)
      window.localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }

  /**
   * Read a value. Returns null if not found or if parsing fails.
   */
  get(key) {
    if (!isBrowser) return null
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null || raw === undefined) return null
      return JSON.parse(raw)
    } catch (err) {
      console.error(`[Storage] Failed to read "${key}":`, err)
      return null
    }
  }

  /**
   * Write a value. Returns true on success.
   */
  set(key, value) {
    if (!isBrowser) return false
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (err) {
      console.error(`[Storage] Failed to write "${key}":`, err)
      if (err.name === 'QuotaExceededError') {
        console.error('[Storage] LocalStorage quota exceeded.')
      }
      return false
    }
  }

  /**
   * Remove a specific key.
   */
  remove(key) {
    if (!isBrowser) return false
    try {
      window.localStorage.removeItem(key)
      return true
    } catch (err) {
      console.error(`[Storage] Failed to remove "${key}":`, err)
      return false
    }
  }

  /**
   * Check if a key exists.
   */
  has(key) {
    if (!isBrowser) return false
    return window.localStorage.getItem(key) !== null
  }

  /**
   * Get every bpnl_* key currently stored.
   */
  getAllKeys() {
    if (!isBrowser) return []
    const keys = []
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i)
      if (k && k.startsWith('bpnl_')) keys.push(k)
    }
    return keys
  }

  /**
   * Clear every bpnl_* key. Does not touch other applications' keys.
   */
  clearAll() {
    if (!isBrowser) return false
    try {
      const keys = this.getAllKeys()
      keys.forEach((k) => window.localStorage.removeItem(k))
      return true
    } catch (err) {
      console.error('[Storage] clearAll failed:', err)
      return false
    }
  }

  /**
   * Approximate size of BPNL data in bytes.
   */
  getSize() {
    if (!isBrowser) return 0
    let total = 0
    this.getAllKeys().forEach((k) => {
      const v = window.localStorage.getItem(k)
      total += (k.length + (v ? v.length : 0)) * 2 // UTF-16
    })
    return total
  }
}

export const StorageManager = new StorageManagerClass()