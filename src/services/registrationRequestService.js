import { Repository } from './storage/repository.js'
import { STORAGE_KEYS } from './storage/constants.js'
import { generateRequestId } from '@utils/idGenerator.js'

class RegistrationRequestServiceClass extends Repository {
  constructor() {
    super(STORAGE_KEYS.REGISTRATION_REQUESTS, 'reg')
  }

  createRequest(payload) {
    return this.create({
      requestId: generateRequestId('REG'),
      status: 'pending',
      ...payload,
    })
  }

  getPending() {
    return this.filter({ status: 'pending' })
  }

  approve(id) { return this.update(id, { status: 'approved' }) }
  reject(id, reason) { return this.update(id, { status: 'rejected', rejectionReason: reason }) }

  isDuplicate({ passportNumber, firstName, lastName }) {
    if (!passportNumber) return false
    return this.findMany(
      (r) =>
        r.status === 'pending' &&
        r.passportNumber?.toUpperCase() === String(passportNumber).toUpperCase() &&
        r.firstName?.toLowerCase() === String(firstName || '').toLowerCase() &&
        r.lastName?.toLowerCase() === String(lastName || '').toLowerCase()
    ).length > 0
  }
}

export const RegistrationRequestService = new RegistrationRequestServiceClass()