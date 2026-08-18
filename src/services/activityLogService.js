import { StorageManager } from './storage/storageManager.js'
import { STORAGE_KEYS } from './storage/constants.js'
import { generateId } from '@utils/idGenerator.js'
import { nowIso } from '@utils/dateHelpers.js'

const MAX_LOG_ENTRIES = 500

class ActivityLogServiceClass {
  getAll() {
    return StorageManager.get(STORAGE_KEYS.ACTIVITY_LOG) || []
  }

  log({ action, description, actor = 'system', metadata = {} }) {
    const list = this.getAll()
    const entry = {
      id: generateId('log'),
      action,
      description,
      actor,
      metadata,
      timestamp: nowIso(),
    }
    const next = [entry, ...list].slice(0, MAX_LOG_ENTRIES)
    StorageManager.set(STORAGE_KEYS.ACTIVITY_LOG, next)
    return entry
  }

  clear() {
    StorageManager.set(STORAGE_KEYS.ACTIVITY_LOG, [])
  }
}

export const ActivityLogService = new ActivityLogServiceClass()