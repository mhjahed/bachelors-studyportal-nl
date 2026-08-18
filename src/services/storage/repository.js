/**
Repository
Generic CRUD wrapper around a LocalStorage array collection.
All entity services (UserService, BlogService, etc.) use one of these.
 */

import { StorageManager } from './storageManager.js'
import { STORAGE_KEYS } from './constants.js'
import { generateId } from '@utils/idGenerator.js'
import { nowIso } from '@utils/dateHelpers.js'

export class Repository {
  /**
   * @param {string} storageKey    - The LocalStorage key
   * @param {string} idPrefix      - Prefix for auto-generated IDs
   * @param {object} options       - { idField: 'id' }
   */
  constructor(storageKey, idPrefix = 'id', options = {}) {
    this.storageKey = storageKey
    this.idPrefix = idPrefix
    this.idField = options.idField || 'id'
  }

  // ------------------------------------------------------------------
  // Internal
  // ------------------------------------------------------------------

  _read() {
    const data = StorageManager.get(this.storageKey)
    return Array.isArray(data) ? data : []
  }

  _write(list) {
    StorageManager.set(this.storageKey, list)
    // Update meta
    const meta = StorageManager.get(STORAGE_KEYS.META) || {}
    StorageManager.set(STORAGE_KEYS.META, { ...meta, lastUpdated: nowIso() })
  }

  // ------------------------------------------------------------------
  // Read
  // ------------------------------------------------------------------

  getAll() {
    return this._read()
  }

  findById(id) {
    if (!id) return null
    return this._read().find((item) => item[this.idField] === id) || null
  }

  findOne(predicate) {
    return this._read().find(predicate) || null
  }

  findMany(predicate) {
    return this._read().filter(predicate)
  }

  count(predicate) {
    if (!predicate) return this._read().length
    return this._read().filter(predicate).length
  }

  exists(id) {
    return this.findById(id) !== null
  }

  // ------------------------------------------------------------------
  // Search & Filter
  // ------------------------------------------------------------------

  /**
   * Case-insensitive substring search across specified fields.
   * @param {string} query
   * @param {string[]} fields
   */
  search(query, fields = []) {
    const q = String(query || '').trim().toLowerCase()
    if (!q) return this._read()
    return this._read().filter((item) =>
      fields.some((field) => {
        const val = getNestedValue(item, field)
        return val && String(val).toLowerCase().includes(q)
      })
    )
  }

  /**
   * Filter by field equality map.
   * Example: filter({ status: 'active', role: 'student' })
   */
  filter(criteria = {}) {
    const entries = Object.entries(criteria)
    if (entries.length === 0) return this._read()
    return this._read().filter((item) =>
      entries.every(([key, value]) => getNestedValue(item, key) === value)
    )
  }

  // ------------------------------------------------------------------
  // Write
  // ------------------------------------------------------------------

  create(payload) {
    const list = this._read()
    const record = {
      [this.idField]: payload[this.idField] || generateId(this.idPrefix),
      createdAt: nowIso(),
      updatedAt: nowIso(),
      ...payload,
    }
    // Ensure id and timestamps are set (payload may override — keep intent, but guarantee id)
    if (!record[this.idField]) record[this.idField] = generateId(this.idPrefix)
    if (!record.createdAt) record.createdAt = nowIso()
    record.updatedAt = nowIso()

    list.push(record)
    this._write(list)
    return record
  }

  update(id, patch) {
    if (!id) return null
    const list = this._read()
    const index = list.findIndex((item) => item[this.idField] === id)
    if (index === -1) return null

    const updated = {
      ...list[index],
      ...patch,
      [this.idField]: id, // never let the id change
      updatedAt: nowIso(),
    }
    list[index] = updated
    this._write(list)
    return updated
  }

  upsert(payload) {
    const id = payload[this.idField]
    if (id && this.exists(id)) return this.update(id, payload)
    return this.create(payload)
  }

  remove(id) {
    if (!id) return false
    const list = this._read()
    const next = list.filter((item) => item[this.idField] !== id)
    if (next.length === list.length) return false
    this._write(next)
    return true
  }

  removeMany(predicate) {
    const list = this._read()
    const next = list.filter((item) => !predicate(item))
    const removed = list.length - next.length
    this._write(next)
    return removed
  }

  clear() {
    this._write([])
  }

  // ------------------------------------------------------------------
  // Bulk
  // ------------------------------------------------------------------

  bulkCreate(items = []) {
    const list = this._read()
    const now = nowIso()
    const created = items.map((item) => ({
      [this.idField]: item[this.idField] || generateId(this.idPrefix),
      createdAt: now,
      updatedAt: now,
      ...item,
    }))
    this._write([...list, ...created])
    return created
  }

  replaceAll(items = []) {
    this._write(items)
    return items
  }
}

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

function getNestedValue(obj, path) {
  if (!obj || !path) return undefined
  return path.split('.').reduce((acc, part) => (acc == null ? undefined : acc[part]), obj)
}