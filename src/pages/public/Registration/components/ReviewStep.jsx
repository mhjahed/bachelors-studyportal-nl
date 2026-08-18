import React, { useState } from 'react'
import { Button, Checkbox, FormError } from '@components/common'
import { toDisplayableImageUrl } from '@utils/googleDriveHelper.js'
import { formatDate } from '@utils/dateHelpers.js'
import ProfilePreview from './ProfilePreview.jsx'

function ReviewStep({ values, onBack, onSubmit, submitting, formError }) {
  const [confirmed, setConfirmed] = useState(false)
  const [confirmError, setConfirmError] = useState('')

  const displayUrl = toDisplayableImageUrl(values.profilePicture)
  const initials = `${(values.firstName || '?')[0] || ''}${(values.lastName || '?')[0] || ''}`.toUpperCase()

  const handleSubmit = () => {
    if (!confirmed) {
      setConfirmError('You must confirm that the information is correct.')
      return
    }
    setConfirmError('')
    onSubmit()
  }

  const rows = [
    { label: 'First Name', value: values.firstName },
    { label: 'Last Name', value: values.lastName },
    { label: 'Passport Number', value: values.passportNumber },
    { label: 'Passport Expiry', value: formatDate(values.passportExpiry) },
    { label: 'Date of Birth', value: formatDate(values.dateOfBirth) },
  ]

  return (
    <div className="registration-step">
      <div className="registration-step__header">
        <h2 className="registration-step__title">Review Your Information</h2>
        <p className="registration-step__subtitle">
          Please verify every detail before submitting. Changes after submission require administrator help.
        </p>
      </div>

      <div className="registration-step__review">
        <div className="registration-step__review-header">
          <ProfilePreview src={displayUrl} initials={initials} size="md" />
          <div className="registration-step__review-name">
            <h3>{values.firstName} {values.lastName}</h3>
            <p>Registration Request</p>
          </div>
        </div>

        <div className="registration-step__review-grid">
          {rows.map((row) => (
            <div key={row.label} className="registration-step__review-row">
              <span className="registration-step__review-label">{row.label}</span>
              <span className="registration-step__review-value">{row.value || '—'}</span>
            </div>
          ))}
        </div>

        <div className="registration-step__review-note">
          <i className="bx bx-shield-quarter"></i>
          <div>
            <strong>What happens next?</strong>
            <p>
              Your registration request will be reviewed by our administrator. Once verified, you will receive
              your login credentials by email within 1-2 business days.
            </p>
          </div>
        </div>
      </div>

      <div className="registration-step__confirm">
        <Checkbox
          label="I confirm that the information provided is correct."
          description="I understand that submitting inaccurate information may delay or prevent my registration."
          checked={confirmed}
          onChange={(e) => {
            setConfirmed(e.target.checked)
            if (e.target.checked) setConfirmError('')
          }}
          error={confirmError}
        />
      </div>

      {formError && <FormError>{formError}</FormError>}

      <div className="registration-step__footer">
        <Button variant="ghost" size="lg" icon="bx-left-arrow-alt" iconPos="left" onClick={onBack} disabled={submitting}>
          Back
        </Button>
        <Button
          variant="accent"
          size="lg"
          icon="bx-check"
          iconPos="left"
          onClick={handleSubmit}
          loading={submitting}
        >
          Submit Registration
        </Button>
      </div>
    </div>
  )
}

export default ReviewStep