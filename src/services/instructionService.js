import { Repository } from './storage/repository.js'
import { STORAGE_KEYS } from './storage/constants.js'

class InstructionServiceClass extends Repository {
  constructor() {
    super(STORAGE_KEYS.INSTRUCTIONS, 'inst')
  }

  getActive() {
    return this.filter({ status: 'active' }).sort((a, b) => (a.order || 0) - (b.order || 0))
  }

  getCategories() {
    const map = new Map()
    this.getActive().forEach((i) => {
      if (!map.has(i.categorySlug)) {
        map.set(i.categorySlug, { slug: i.categorySlug, label: i.category, icon: i.icon })
      }
    })
    return Array.from(map.values())
  }

  getByCategory(categorySlug) {
    return this.findMany((i) => i.status === 'active' && i.categorySlug === categorySlug)
  }
}

export const InstructionService = new InstructionServiceClass()