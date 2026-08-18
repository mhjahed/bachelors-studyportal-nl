import { Repository } from './storage/repository.js'
import { STORAGE_KEYS } from './storage/constants.js'
import { StorageManager } from './storage/storageManager.js'

class DocumentServiceClass extends Repository {
  constructor() {
    super(STORAGE_KEYS.DOCUMENTS, 'doc')
  }

  getActive() {
    return this.filter({ status: 'active' }).sort((a, b) => (a.order || 0) - (b.order || 0))
  }

  getCategories() {
    const map = new Map()
    this.getActive().forEach((d) => {
      if (!map.has(d.categorySlug)) {
        map.set(d.categorySlug, { slug: d.categorySlug, label: d.category })
      }
    })
    return Array.from(map.values())
  }

  getByCategory(categorySlug) {
    return this.findMany((d) => d.status === 'active' && d.categorySlug === categorySlug)
  }

  // -------- Progress tracking (per anonymous device or per user) --------

  _progressKey(scope = 'guest') {
    return `${STORAGE_KEYS.DOCUMENT_PROGRESS}_${scope}`
  }

  getProgress(scope = 'guest') {
    return StorageManager.get(this._progressKey(scope)) || {}
  }

  setDocumentChecked(docId, checked, scope = 'guest') {
    const key = this._progressKey(scope)
    const progress = this.getProgress(scope)
    if (checked) {
      progress[docId] = true
    } else {
      delete progress[docId]
    }
    StorageManager.set(key, progress)
    return progress
  }

  clearProgress(scope = 'guest') {
    StorageManager.remove(this._progressKey(scope))
  }
}

export const DocumentService = new DocumentServiceClass()