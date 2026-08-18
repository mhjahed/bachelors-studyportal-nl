/**
 * Seeder
 *
 * Bootstraps LocalStorage from JSON files on first load.
 * Also handles storage version migration.
 */

import { StorageManager } from './storageManager.js'
import contactRequestsSeed from '@data/contactRequests.json'
import {
  STORAGE_KEYS,
  STORAGE_VERSION,
  SEED_MAP,
  ARRAY_COLLECTIONS,
} from './constants.js'

// Import JSON seed files
import usersSeed from '@data/users.json'
import blogsSeed from '@data/blogs.json'
import universitiesSeed from '@data/universities.json'
import instructionsSeed from '@data/instructions.json'
import documentsSeed from '@data/documents.json'
import interviewsSeed from '@data/interviews.json'
import interviewRequestsSeed from '@data/interviewRequests.json'
import scoresSeed from '@data/scores.json'
import notificationsSeed from '@data/notifications.json'
import registrationRequestsSeed from '@data/registrationRequests.json'
import settingsSeed from '@data/settings.json'

const SEED_FILES = {
  users: usersSeed,
  blogs: blogsSeed,
  universities: universitiesSeed,
  instructions: instructionsSeed,
  documents: documentsSeed,
  interviews: interviewsSeed,
  interviewRequests: interviewRequestsSeed,
  scores: scoresSeed,
  notifications: notificationsSeed,
  registrationRequests: registrationRequestsSeed,
  contactRequests: contactRequestsSeed,
  settings: settingsSeed,
}

function getSeedData(seedName) {
  const seed = SEED_FILES[seedName]
  if (!seed) return null
  return seed.data
}

/**
 * Seed a single collection if it doesn't exist yet.
 */
function seedCollection(storageKey, seedName) {
  if (StorageManager.has(storageKey)) return

  const data = getSeedData(seedName)
  if (data !== null && data !== undefined) {
    StorageManager.set(storageKey, data)
  } else {
    StorageManager.set(storageKey, ARRAY_COLLECTIONS.includes(storageKey) ? [] : {})
  }
}

/**
 * Storage version + migration handling.
 * Each future breaking change adds a case to this switch.
 */
function migrate(fromVersion) {
  // No migrations yet. Placeholder for future.
  // Example:
  //   if (fromVersion === '1.0.0') { ...migrate to 1.1.0... }

  console.info(`[Seeder] No migration needed (from ${fromVersion} to ${STORAGE_VERSION})`)
}

/**
 * Main entry — call once when the app boots.
 */
export function initializeStorage({ force = false } = {}) {
  if (!StorageManager.isAvailable()) {
    console.warn('[Seeder] LocalStorage is not available. App will run without persistence.')
    return { seeded: false, reason: 'unavailable' }
  }

  const meta = StorageManager.get(STORAGE_KEYS.META)

  // Fresh install
  if (!meta || force) {
    if (force) StorageManager.clearAll()

    Object.entries(SEED_MAP).forEach(([storageKey, seedName]) => {
      seedCollection(storageKey, seedName)
    })

    StorageManager.set(STORAGE_KEYS.META, {
      version: STORAGE_VERSION,
      seededAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    })

    console.info(`[Seeder] Storage initialized (v${STORAGE_VERSION})`)
    return { seeded: true, reason: force ? 'forced' : 'fresh' }
  }

  // Existing install — check version
  if (meta.version !== STORAGE_VERSION) {
    console.info(`[Seeder] Migrating storage: ${meta.version} → ${STORAGE_VERSION}`)
    migrate(meta.version)

    StorageManager.set(STORAGE_KEYS.META, {
      ...meta,
      version: STORAGE_VERSION,
      lastUpdated: new Date().toISOString(),
    })

    return { seeded: false, reason: 'migrated' }
  }

  // Ensure any missing collections are backfilled
  Object.entries(SEED_MAP).forEach(([storageKey, seedName]) => {
    if (!StorageManager.has(storageKey)) {
      seedCollection(storageKey, seedName)
    }
  })

  return { seeded: false, reason: 'existing' }
}

/**
 * Reset every collection back to JSON seeds.
 */
export function resetStorage() {
  return initializeStorage({ force: true })
}

/**
 * Reset a single collection.
 */
export function resetCollection(storageKey) {
  const seedName = SEED_MAP[storageKey]
  if (!seedName) {
    console.warn(`[Seeder] No seed mapping for "${storageKey}"`)
    return false
  }
  StorageManager.remove(storageKey)
  seedCollection(storageKey, seedName)
  return true
}