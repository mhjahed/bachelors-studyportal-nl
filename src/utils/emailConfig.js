/**
 EmailJS Multi-Account Configuration
 Account 1: Registration + Contact (2 templates)
 Account 2: University Interview + IND Interview (2 templates)
 Account 3: Embassy Interview (1 template)
 This structure respects the 2-template-per-free-account limitation.
 */

export const EMAIL_ACCOUNTS = {
  /**
   * Account 1
   * Handles: Registration requests, Contact form submissions
   */
  account1: {
    publicKey: import.meta.env.VITE_EMAILJS_ACCOUNT1_PUBLIC_KEY || '',
    serviceId: import.meta.env.VITE_EMAILJS_ACCOUNT1_SERVICE_ID || '',
    templates: {
      registration: import.meta.env.VITE_EMAILJS_ACCOUNT1_REGISTRATION_TEMPLATE || '',
      contact: import.meta.env.VITE_EMAILJS_ACCOUNT1_CONTACT_TEMPLATE || '',
    }
  },

  /**
   * Account 2
   * Handles: University interview requests, IND interview requests
   */
  account2: {
    publicKey: import.meta.env.VITE_EMAILJS_ACCOUNT2_PUBLIC_KEY || '',
    serviceId: import.meta.env.VITE_EMAILJS_ACCOUNT2_SERVICE_ID || '',
    templates: {
      university: import.meta.env.VITE_EMAILJS_ACCOUNT2_UNIVERSITY_TEMPLATE || '',
      ind: import.meta.env.VITE_EMAILJS_ACCOUNT2_IND_TEMPLATE || '',
    }
  },

  /**
   * Account 3
   * Handles: Embassy interview requests
   */
  account3: {
    publicKey: import.meta.env.VITE_EMAILJS_ACCOUNT3_PUBLIC_KEY || '',
    serviceId: import.meta.env.VITE_EMAILJS_ACCOUNT3_SERVICE_ID || '',
    templates: {
      embassy: import.meta.env.VITE_EMAILJS_ACCOUNT3_EMBASSY_TEMPLATE || '',
    }
  }
}

/**
 * Route-to-account mapping
 * This is the single source of truth for which account handles which email type
 */
export const EMAIL_ROUTING = {
  registration: {
    account: 'account1',
    template: 'registration',
    description: 'Student registration request'
  },
  contact: {
    account: 'account1',
    template: 'contact',
    description: 'Contact form submission'
  },
  universityInterview: {
    account: 'account2',
    template: 'university',
    description: 'University interview request'
  },
  indInterview: {
    account: 'account2',
    template: 'ind',
    description: 'IND interview request'
  },
  embassyInterview: {
    account: 'account3',
    template: 'embassy',
    description: 'Embassy interview request'
  }
}