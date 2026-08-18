import { Repository } from './storage/repository.js'
import { STORAGE_KEYS } from './storage/constants.js'
import { generateRequestId } from '@utils/idGenerator.js'

class ContactServiceClass extends Repository {
  constructor() {
    super(STORAGE_KEYS.CONTACT_REQUESTS, 'contact')
  }

  createRequest(payload) {
    return this.create({
      requestId: generateRequestId('CON'),
      status: 'new',
      ...payload,
    })
  }

  getByStatus(status) {
    return this.filter({ status })
  }

  markResolved(id) {
    return this.update(id, { status: 'resolved' })
  }

  markInProgress(id) {
    return this.update(id, { status: 'in_progress' })
  }
}

export const ContactService = new ContactServiceClass()