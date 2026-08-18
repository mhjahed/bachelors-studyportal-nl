import React, { useState, useCallback } from 'react'
import { Input, Button, FormError } from '@components/common'
import { isNonEmpty, isPassport, isValidDate, isFutureDate } from '@utils/validators.js'

const FIELDS = ['firstName', 'lastName', 'passportNumber', 'passportExpiry', 'dateOfBirth']

function PersonalDetailsStep({ values, onChange, onNext, formError }) {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validateField = useCallback((field, value) => {
    let error = ''
    switch (field) {
      case 'firstName':
        if (!isNonEmpty(value)) error = 'First name is required'
        else if (value.trim().length < 2) error = 'Please enter a valid first name'
        break
      case 'lastName':
        if (!isNonEmpty(value)) error = 'Last name is required'
        else if (value.trim().length < 2) error = 'Please enter a valid last name'
        break
      case 'passportNumber':
        if (!isNonEmpty(value)) error = 'Passport number is required'
        else if (!isPassport(value)) error = 'Passport number should be 6-12 alphanumeric characters'
        break
      case 'passportExpiry':
        if (!isNonEmpty(value)) error = 'Passport expiry date is required'
        else if (!isValidDate(value)) error = 'Invalid date'
        else if (!isFutureDate(value)) error = 'Passport must not be expired'
        else {
          // Warn if expiry is within 6 months
          const expiry = new Date(value)
          const sixMonths = new Date()
          sixMonths.setMonth(sixMonths.getMonth() + 6)
          if (expiry < sixMonths) {
            error = 'Passport must be valid for at least 6 more months'
          }
        }
        break
      case 'dateOfBirth':
        if (!isNonEmpty(value)) error = 'Date of birth is required'
        else if (!isValidDate(value)) error = 'Invalid date'
        else {
          const dob = new Date(value)
          const age = (Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
          if (age < 15) error = 'You must be at least 15 years old'
          else if (age > 100) error = 'Please enter a valid date of birth'
        }
        break
      default:
        break
    }
    setErrors((prev) => ({ ...prev, [field]: error }))
    return !error
  }, [])

  const handleField = (field, value) => {
    onChange(field, value)
    if (touched[field]) {
      validateField(field, value)
    }
  }

  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validateField(field, values[field])
  }

  const handleNext = () => {
    const allTouched = {}
    let ok = true
    FIELDS.forEach((f) => {
      allTouched[f] = true
      if (!validateField(f, values[f])) ok = false
    })
    setTouched(allTouched)
    if (ok) onNext()
  }

  const today = new Date().toISOString().split('T')[0]
  const minDob = (() => {
    const d = new Date()
    d.setFullYear(d.getFullYear() - 100)
    return d.toISOString().split('T')[0]
  })()
  const maxDob = (() => {
    const d = new Date()
    d.setFullYear(d.getFullYear() - 15)
    return d.toISOString().split('T')[0]
  })()

  return (
    <div className="registration-step">
      <div className="registration-step__header">
        <h2 className="registration-step__title">Personal Details</h2>
        <p className="registration-step__subtitle">
          Enter your details exactly as they appear on your passport.
        </p>
      </div>

      <div className="registration-step__form">
        <div className="registration-step__row">
          <Input
            label="First Name (Given Name)"
            placeholder="e.g. Jane"
            required
            value={values.firstName || ''}
            onChange={(e) => handleField('firstName', e.target.value)}
            onBlur={() => markTouched('firstName')}
            error={touched.firstName ? errors.firstName : ''}
          />
          <Input
            label="Last Name (Surname)"
            placeholder="e.g. Doe"
            required
            value={values.lastName || ''}
            onChange={(e) => handleField('lastName', e.target.value)}
            onBlur={() => markTouched('lastName')}
            error={touched.lastName ? errors.lastName : ''}
          />
        </div>

        <Input
          label="Passport Number"
          placeholder="e.g. A1234567"
          required
          value={values.passportNumber || ''}
          onChange={(e) => handleField('passportNumber', e.target.value.toUpperCase())}
          onBlur={() => markTouched('passportNumber')}
          error={touched.passportNumber ? errors.passportNumber : ''}
          hint="6 to 12 alphanumeric characters"
        />

        <div className="registration-step__row">
          <Input
            label="Passport Expiry Date"
            type="date"
            required
            min={today}
            value={values.passportExpiry || ''}
            onChange={(e) => handleField('passportExpiry', e.target.value)}
            onBlur={() => markTouched('passportExpiry')}
            error={touched.passportExpiry ? errors.passportExpiry : ''}
          />
          <Input
            label="Date of Birth"
            type="date"
            required
            min={minDob}
            max={maxDob}
            value={values.dateOfBirth || ''}
            onChange={(e) => handleField('dateOfBirth', e.target.value)}
            onBlur={() => markTouched('dateOfBirth')}
            error={touched.dateOfBirth ? errors.dateOfBirth : ''}
          />
        </div>

        {formError && <FormError>{formError}</FormError>}
      </div>

      <div className="registration-step__footer">
        <div />
        <Button variant="primary" size="lg" icon="bx-right-arrow-alt" onClick={handleNext}>
          Continue
        </Button>
      </div>
    </div>
  )
}

export default PersonalDetailsStep