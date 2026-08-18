import { Repository } from './storage/repository.js'
import { STORAGE_KEYS } from './storage/constants.js'
import { generateIsoCode, generatePasscode } from '@utils/idGenerator.js'

class UserServiceClass extends Repository {
  constructor() {
    super(STORAGE_KEYS.USERS, 'user')
  }

  findByUsername(username) {
    if (!username) return null
    return this.findOne((u) => u.username?.toLowerCase() === String(username).toLowerCase())
  }

  findByIsoCode(iso) {
    if (!iso) return null
    return this.findOne((u) => u.isoCode?.toUpperCase() === String(iso).toUpperCase())
  }

  findByCredentials(username, passcode) {
    const user = this.findByUsername(username)
    if (!user) return null
    if (String(user.passcode) !== String(passcode)) return null
    return user
  }

  searchUsers(query) {
    return this.search(query, [
      'firstName', 'lastName', 'username', 'isoCode', 'university', 'passportNumber'
    ])
  }

  filterByStatus(status) {
    return this.filter({ status })
  }

  activate(id) { return this.update(id, { status: 'active' }) }
  deactivate(id) { return this.update(id, { status: 'inactive' }) }

  generateIsoForUser(id) {
    let iso
    let attempts = 0
    do {
      iso = generateIsoCode()
      attempts++
      if (attempts > 20) throw new Error('Failed to generate unique ISO code')
    } while (this.findByIsoCode(iso))

    return this.update(id, { isoCode: iso })
  }

  regenerateCredentials(id) {
    const passcode = generatePasscode(8)
    return this.update(id, { passcode })
  }

  createUser(payload) {
    // Ensure required fields, defaults, and uniqueness
    const record = {
      firstName: '',
      lastName: '',
      username: '',
      passcode: payload.passcode || generatePasscode(8),
      isoCode: payload.isoCode || generateIsoCode(),
      profilePicture: '',
      passportNumber: '',
      passportExpiry: '',
      dateOfBirth: '',
      university: '',
      course: '',
      status: 'active',
      role: 'student',
      ...payload,
    }
    return this.create(record)
  }
}

export const UserService = new UserServiceClass()