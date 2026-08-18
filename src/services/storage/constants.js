export const STORAGE_VERSION = '1.0.0'

export const STORAGE_KEYS = {
  META: 'bpnl_meta',
  USERS: 'bpnl_users',
  BLOGS: 'bpnl_blogs',
  UNIVERSITIES: 'bpnl_universities',
  INSTRUCTIONS: 'bpnl_instructions',
  DOCUMENTS: 'bpnl_documents',
  INTERVIEWS: 'bpnl_interviews',
  INTERVIEW_REQUESTS: 'bpnl_interview_requests',
  SCORES: 'bpnl_scores',
  NOTIFICATIONS: 'bpnl_notifications',
  REGISTRATION_REQUESTS: 'bpnl_registration_requests',
  CONTACT_REQUESTS: 'bpnl_contact_requests',
  SETTINGS: 'bpnl_settings',
  USER_SESSION: 'bpnl_user_session',
  ADMIN_SESSION: 'bpnl_admin_session',
  DOCUMENT_PROGRESS: 'bpnl_document_progress',
  ACTIVITY_LOG: 'bpnl_activity_log',
}

export const SEED_MAP = {
  [STORAGE_KEYS.USERS]: 'users',
  [STORAGE_KEYS.BLOGS]: 'blogs',
  [STORAGE_KEYS.UNIVERSITIES]: 'universities',
  [STORAGE_KEYS.INSTRUCTIONS]: 'instructions',
  [STORAGE_KEYS.DOCUMENTS]: 'documents',
  [STORAGE_KEYS.INTERVIEWS]: 'interviews',
  [STORAGE_KEYS.INTERVIEW_REQUESTS]: 'interviewRequests',
  [STORAGE_KEYS.SCORES]: 'scores',
  [STORAGE_KEYS.NOTIFICATIONS]: 'notifications',
  [STORAGE_KEYS.REGISTRATION_REQUESTS]: 'registrationRequests',
  [STORAGE_KEYS.CONTACT_REQUESTS]: 'contactRequests',
  [STORAGE_KEYS.SETTINGS]: 'settings',
}

export const ARRAY_COLLECTIONS = [
  STORAGE_KEYS.USERS,
  STORAGE_KEYS.BLOGS,
  STORAGE_KEYS.UNIVERSITIES,
  STORAGE_KEYS.INSTRUCTIONS,
  STORAGE_KEYS.DOCUMENTS,
  STORAGE_KEYS.INTERVIEWS,
  STORAGE_KEYS.INTERVIEW_REQUESTS,
  STORAGE_KEYS.SCORES,
  STORAGE_KEYS.NOTIFICATIONS,
  STORAGE_KEYS.REGISTRATION_REQUESTS,
  STORAGE_KEYS.CONTACT_REQUESTS,
]