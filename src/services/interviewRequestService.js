import { Repository } from './storage/repository.js'
import { STORAGE_KEYS } from './storage/constants.js'
import { generateRequestId } from '@utils/idGenerator.js'

class InterviewRequestServiceClass extends Repository {
  constructor() {
    super(STORAGE_KEYS.INTERVIEW_REQUESTS, 'ir')
  }

  createRequest(payload) {
    return this.create({
      requestId: generateRequestId('IR'),
      status: 'pending',
      type: payload.type || 'university',
      ...payload,
    })
  }

  getPending() {
    return this.filter({ status: 'pending' })
  }

  getByUser(userId) {
    return this.filter({ userId })
  }

  getByType(type) {
    return this.filter({ type })
  }

  approve(id) { return this.update(id, { status: 'approved' }) }
  reject(id, reason) { return this.update(id, { status: 'rejected', rejectionReason: reason }) }
}

export const InterviewRequestService = new InterviewRequestServiceClass()