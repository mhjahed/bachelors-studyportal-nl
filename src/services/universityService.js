import { Repository } from './storage/repository.js'
import { STORAGE_KEYS } from './storage/constants.js'

class UniversityServiceClass extends Repository {
  constructor() {
    super(STORAGE_KEYS.UNIVERSITIES, 'uni')
  }

  getActive() {
    return this.filter({ status: 'active' })
  }

  getFeatured() {
    return this.findMany((u) => u.status === 'active' && u.featured === true)
  }

  searchUniversities(query) {
    return this.search(query, ['name', 'shortName', 'location', 'description'])
  }

  filterByLocation(location) {
    return this.findMany((u) => u.status === 'active' && u.location === location)
  }

  getLocations() {
    const set = new Set(this.getActive().map((u) => u.location))
    return Array.from(set).sort()
  }
}

export const UniversityService = new UniversityServiceClass()