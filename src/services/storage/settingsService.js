//Settings is an object, not an array — so it needs its own tiny service

import { StorageManager } from './storageManager.js'
import { STORAGE_KEYS } from './constants.js'

class SettingsServiceClass {
  get() {
    return StorageManager.get(STORAGE_KEYS.SETTINGS) || {}
  }

  update(patch) {
    const current = this.get()
    const next = { ...current, ...patch }
    StorageManager.set(STORAGE_KEYS.SETTINGS, next)
    return next
  }

  replace(newSettings) {
    StorageManager.set(STORAGE_KEYS.SETTINGS, newSettings)
    return newSettings
  }
}

export const SettingsService = new SettingsServiceClass()