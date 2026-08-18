import { Repository } from './storage/repository.js'
import { STORAGE_KEYS } from './storage/constants.js'

class NotificationServiceClass extends Repository {
  constructor() {
    super(STORAGE_KEYS.NOTIFICATIONS, 'notif')
  }

  getByUser(userId) {
    return this.filter({ userId })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  getUnread(userId) {
    return this.findMany((n) => n.userId === userId && !n.read)
  }

  getUnreadCount(userId) {
    return this.getUnread(userId).length
  }

  createNotification({ userId, type, title, message, link = null }) {
    return this.create({
      userId,
      type,
      title,
      message,
      link,
      read: false,
    })
  }

  markRead(id) { return this.update(id, { read: true }) }

  markAllRead(userId) {
    const items = this.getUnread(userId)
    items.forEach((n) => this.update(n.id, { read: true }))
    return items.length
  }

  clearAllForUser(userId) {
    return this.removeMany((n) => n.userId === userId)
  }
}

export const NotificationService = new NotificationServiceClass()