import { Repository } from './storage/repository.js'
import { STORAGE_KEYS } from './storage/constants.js'

class InterviewServiceClass extends Repository {
  constructor() {
    super(STORAGE_KEYS.INTERVIEWS, 'iv')
  }

  getByUser(userId) {
    return this.filter({ userId })
  }

  getByIsoCode(iso) {
    return this.findMany((i) => i.isoCode?.toUpperCase() === String(iso || '').toUpperCase())
  }

  getUpcoming(userId) {
    const now = Date.now()
    return this.findMany(
      (i) =>
        i.userId === userId &&
        new Date(i.dateTime).getTime() > now &&
        i.status !== 'cancelled'
    ).sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
  }

  getCompleted(userId) {
    return this.findMany((i) => i.userId === userId && i.status === 'completed')
  }

  markCompleted(id) { return this.update(id, { status: 'completed' }) }
  cancel(id) { return this.update(id, { status: 'cancelled' }) }
  reschedule(id, dateTime) { return this.update(id, { dateTime, status: 'scheduled' }) }
}

export const InterviewService = new InterviewServiceClass()