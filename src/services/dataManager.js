//Handles export/import/backup/reset of the entire data store.
//Used by the admin Data Management panel 

import { StorageManager } from './storage/storageManager.js'
import { STORAGE_KEYS, STORAGE_VERSION, SEED_MAP } from './storage/constants.js'
import { resetStorage } from './storage/seeder.js'
import { nowIso } from '@utils/dateHelpers.js'

const EXPORTABLE_KEYS = Object.keys(SEED_MAP)

class DataManagerClass {
  /**
   * Export all data as a single object.
   */
  exportAll() {
    const payload = {
      version: STORAGE_VERSION,
      exportedAt: nowIso(),
      data: {},
    }
    EXPORTABLE_KEYS.forEach((key) => {
      payload.data[key] = StorageManager.get(key)
    })
    return payload
  }

  /**
   * Export a single collection.
   */
  exportCollection(storageKey) {
    if (!EXPORTABLE_KEYS.includes(storageKey)) {
      throw new Error(`Unknown collection: ${storageKey}`)
    }
    return {
      version: STORAGE_VERSION,
      exportedAt: nowIso(),
      collection: storageKey,
      data: StorageManager.get(storageKey),
    }
  }

  /**
   * Convert an export payload into a downloadable blob URL.
   */
  toBlobUrl(payload) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    return URL.createObjectURL(blob)
  }

  /**
   * Trigger a browser download.
   */
  download(payload, filename = 'bpnl-backup.json') {
    const url = this.toBlobUrl(payload)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  /**
   * Validate an imported payload.
   */
  validateImport(payload) {
    const errors = []
    if (!payload || typeof payload !== 'object') {
      errors.push('Invalid file format.')
      return { valid: false, errors }
    }
    if (!payload.version) {
      errors.push('Missing storage version.')
    }
    if (!payload.data || typeof payload.data !== 'object') {
      errors.push('Missing "data" field.')
    }
    return { valid: errors.length === 0, errors }
  }

  /**
   * Compute a change summary between current data and imported data.
   */
  computeChanges(imported) {
    const summary = {}
    Object.entries(imported.data || {}).forEach(([key, incoming]) => {
      const current = StorageManager.get(key)
      const currentArr = Array.isArray(current) ? current : []
      const incomingArr = Array.isArray(incoming) ? incoming : []

      const currentIds = new Set(currentArr.map((x) => x?.id).filter(Boolean))
      const incomingIds = new Set(incomingArr.map((x) => x?.id).filter(Boolean))

      const added = [...incomingIds].filter((id) => !currentIds.has(id)).length
      const removed = [...currentIds].filter((id) => !incomingIds.has(id)).length
      const modified = [...incomingIds].filter((id) => currentIds.has(id)).length

      summary[key] = { current: currentArr.length, incoming: incomingArr.length, added, removed, modified }
    })
    return summary
  }

  /**
   * Import data.
   * @param {object} payload
   * @param {'replace'|'merge'} mode
   */
  import(payload, mode = 'replace') {
    const { valid, errors } = this.validateImport(payload)
    if (!valid) throw new Error(errors.join(' '))

    Object.entries(payload.data).forEach(([key, incoming]) => {
      if (mode === 'replace') {
        StorageManager.set(key, incoming)
      } else if (mode === 'merge' && Array.isArray(incoming)) {
        const current = StorageManager.get(key) || []
        const byId = new Map()
        ;[...current, ...incoming].forEach((item) => {
          if (item?.id) byId.set(item.id, item)
        })
        StorageManager.set(key, Array.from(byId.values()))
      } else {
        // Non-array (settings) — just replace
        StorageManager.set(key, incoming)
      }
    })

    StorageManager.set(STORAGE_KEYS.META, {
      version: STORAGE_VERSION,
      lastUpdated: nowIso(),
      lastImportedAt: nowIso(),
    })

    return true
  }

  /**
   * Reset back to JSON seed data.
   */
  reset() {
    return resetStorage()
  }

  /**
   * Storage stats.
   */
  getStats() {
    return {
      version: STORAGE_VERSION,
      keys: StorageManager.getAllKeys(),
      approxSizeBytes: StorageManager.getSize(),
      meta: StorageManager.get(STORAGE_KEYS.META),
    }
  }
}

export const DataManager = new DataManagerClass()