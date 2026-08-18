import { Repository } from './storage/repository.js'
import { STORAGE_KEYS } from './storage/constants.js'

class ScoreServiceClass extends Repository {
  constructor() {
    super(STORAGE_KEYS.SCORES, 'score')
  }

  getByInterview(interviewId) {
    return this.findOne((s) => s.interviewId === interviewId)
  }

  getByUser(userId) {
    return this.filter({ userId })
  }

  getPublishedByUser(userId) {
    return this.findMany((s) => s.userId === userId && s.status === 'published')
  }

  publish(id) { return this.update(id, { status: 'published', publishedAt: new Date().toISOString() }) }

  calculateTotals(criteria = []) {
    const total = criteria.reduce((sum, c) => sum + (Number(c.score) || 0), 0)
    const max = criteria.reduce((sum, c) => sum + (Number(c.maxScore) || 0), 0)
    const percentage = max > 0 ? Math.round((total / max) * 100) : 0
    return { total, max, percentage }
  }
}

export const ScoreService = new ScoreServiceClass()