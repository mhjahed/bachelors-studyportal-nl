import React, { useState, useCallback } from 'react'
import { Input, Select, Textarea, Button, FormError } from '@components/common'
import { isNonEmpty, isEmail } from '@utils/validators.js'
import './ContactForm.scss'

const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'registration', label: 'Registration Help' },
  { value: 'interview', label: 'Interview Assistance' },
  { value: 'visa', label: 'Visa Guidance' },
  { value: 'university', label: 'University Information' },
  { value: 'technical', label: 'Technical Issue' },
  { value: 'other', label: 'Other' },
]

const INITIAL = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

function ContactForm({ onSubmit, submitting = false }) {
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [touched, setTouched] = useState({})

  const setField = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }, [errors])

  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validateField(field, values[field])
  }

  const validateField = (field, value) => {
    let error = ''
    switch (field) {
      case 'fullName':
        if (!isNonEmpty(value)) error = 'Full name is required'
        else if (value.trim().length < 2) error = 'Please enter your full name'
        break
      case 'email':
        if (!isNonEmpty(value)) error = 'Email is required'
        else if (!isEmail(value)) error = 'Please enter a valid email address'
        break
      case 'subject':
        if (!isNonEmpty(value)) error = 'Please choose a subject'
        break
      case 'message':
        if (!isNonEmpty(value)) error = 'Please write a message'
        else if (value.trim().length < 20) error = 'Message must be at least 20 characters'
        break
      default:
        break
    }
    if (error) setErrors((prev) => ({ ...prev, [field]: error }))
    return !error
  }

  const validateAll = () => {
    const fields = ['fullName', 'email', 'subject', 'message']
    const allTouched = {}
    let ok = true
    fields.forEach((f) => {
      allTouched[f] = true
      if (!validateField(f, values[f])) ok = false
    })
    setTouched(allTouched)
    return ok
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!validateAll()) {
      setFormError('Please correct the errors above before submitting.')
      return
    }

    try {
      await onSubmit(values)
      setValues(INITIAL)
      setErrors({})
      setTouched({})
    } catch (err) {
      setFormError(err?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__header">
        <h2 className="contact-form__title">Send us a message</h2>
        <p className="contact-form__subtitle">
          Fill in the form below and we will get back to you within 24 hours.
        </p>
      </div>

      <div className="contact-form__grid">
        <Input
          label="Full Name"
          placeholder="e.g. Jane Doe"
          required
          value={values.fullName}
          onChange={(e) => setField('fullName', e.target.value)}
          onBlur={() => markTouched('fullName')}
          error={touched.fullName ? errors.fullName : ''}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          required
          icon="bx-envelope"
          value={values.email}
          onChange={(e) => setField('email', e.target.value)}
          onBlur={() => markTouched('email')}
          error={touched.email ? errors.email : ''}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Optional"
          icon="bx-phone"
          value={values.phone}
          onChange={(e) => setField('phone', e.target.value)}
          hint="Optional — helpful for urgent matters"
        />

        <Select
          label="Subject"
          required
          placeholder="Select a subject"
          value={values.subject}
          onChange={(e) => setField('subject', e.target.value)}
          onBlur={() => markTouched('subject')}
          error={touched.subject ? errors.subject : ''}
          options={SUBJECT_OPTIONS}
        />
      </div>

      <Textarea
        label="Message"
        placeholder="Tell us how we can help..."
        required
        rows={6}
        value={values.message}
        onChange={(e) => setField('message', e.target.value)}
        onBlur={() => markTouched('message')}
        error={touched.message ? errors.message : ''}
        hint={`${values.message.length} characters (min. 20)`}
      />

      {formError && <FormError>{formError}</FormError>}

      <div className="contact-form__footer">
        <p className="contact-form__note">
          <i className="bx bx-lock"></i>
          Your information is kept private and never shared.
        </p>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon="bx-send"
          loading={submitting}
        >
          Send Message
        </Button>
      </div>
    </form>
  )
}

export default ContactForm