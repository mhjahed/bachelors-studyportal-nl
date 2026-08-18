import React, { useState, useEffect } from 'react'
import { Input, Button, FormError } from '@components/common'
import { isNonEmpty, isUrl } from '@utils/validators.js'
import { toDisplayableImageUrl, isGoogleDriveUrl } from '@utils/googleDriveHelper.js'
import ProfilePreview from './ProfilePreview.jsx'
import DriveHelpModal from './DriveHelpModal.jsx'

function ProfilePictureStep({ values, onChange, onNext, onBack }) {
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [displayUrl, setDisplayUrl] = useState('')

  useEffect(() => {
    if (values.profilePicture) {
      setDisplayUrl(toDisplayableImageUrl(values.profilePicture))
    } else {
      setDisplayUrl('')
    }
  }, [values.profilePicture])

  const validate = (value) => {
    let err = ''
    if (!isNonEmpty(value)) {
      err = 'Profile picture URL is required'
    } else if (!isUrl(value)) {
      err = 'Please enter a valid URL (starting with http:// or https://)'
    }
    setError(err)
    return !err
  }

  const handleChange = (value) => {
    onChange('profilePicture', value)
    if (touched) validate(value)
  }

  const handleBlur = () => {
    setTouched(true)
    validate(values.profilePicture)
  }

  const handleNext = () => {
    setTouched(true)
    if (validate(values.profilePicture)) onNext()
  }

  const initials = `${(values.firstName || '?')[0] || ''}${(values.lastName || '?')[0] || ''}`.toUpperCase()
  const isDriveLink = isGoogleDriveUrl(values.profilePicture)

  return (
    <div className="registration-step">
      <div className="registration-step__header">
        <h2 className="registration-step__title">Profile Picture</h2>
        <p className="registration-step__subtitle">
          Upload your photo to Google Drive and share the link below.
        </p>
      </div>

      <div className="registration-step__form">
        <div className="registration-step__preview-block">
          <ProfilePreview
            src={displayUrl}
            initials={initials}
            size="lg"
          />
          <div className="registration-step__preview-text">
            {values.profilePicture ? (
              <>
                <span className="registration-step__preview-label">Preview</span>
                <span className="registration-step__preview-hint">
                  {isDriveLink
                    ? 'Google Drive link detected — image will be automatically converted'
                    : 'If the image does not load, verify the URL is publicly accessible'}
                </span>
              </>
            ) : (
              <>
                <span className="registration-step__preview-label">No image yet</span>
                <span className="registration-step__preview-hint">Enter a URL below to see the preview</span>
              </>
            )}
          </div>
        </div>

        <Input
          label="Profile Picture URL"
          placeholder="https://drive.google.com/file/d/..."
          required
          value={values.profilePicture || ''}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          error={touched ? error : ''}
          icon="bx-link"
        />

        <button
          type="button"
          className="registration-step__help-link"
          onClick={() => setHelpOpen(true)}
        >
          <i className="bx bx-help-circle"></i>
          How do I get a Google Drive URL?
        </button>

        <div className="registration-step__info-box">
          <i className="bx bx-info-circle"></i>
          <div>
            <strong>Tips for a good profile picture</strong>
            <ul>
              <li>Use a clear, front-facing photo</li>
              <li>Make sure the image is publicly viewable</li>
              <li>Square images work best</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="registration-step__footer">
        <Button variant="ghost" size="lg" icon="bx-left-arrow-alt" iconPos="left" onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" size="lg" icon="bx-right-arrow-alt" onClick={handleNext}>
          Continue
        </Button>
      </div>

      <DriveHelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  )
}

export default ProfilePictureStep