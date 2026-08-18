import React, { useEffect, useState } from 'react'
import { Container, PageHero, useToast } from '@components/common'
import { RegistrationRequestService } from '@services'
import { toDisplayableImageUrl } from '@utils/googleDriveHelper.js'
import StepIndicator from './components/StepIndicator.jsx'
import PersonalDetailsStep from './components/PersonalDetailsStep.jsx'
import ProfilePictureStep from './components/ProfilePictureStep.jsx'
import ReviewStep from './components/ReviewStep.jsx'
import RegistrationSuccess from './components/RegistrationSuccess.jsx'
import './Registration.scss'

const STEPS = [
  { key: 'personal', label: 'Personal' },
  { key: 'photo', label: 'Photo' },
  { key: 'review', label: 'Review' },
]

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  passportNumber: '',
  passportExpiry: '',
  dateOfBirth: '',
  profilePicture: '',
}

function Registration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [values, setValues] = useState(INITIAL_VALUES)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [submitted, setSubmitted] = useState(null)
  const toast = useToast()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep, submitted])

  const setField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (formError) setFormError('')
  }

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length))
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 1))

  const handleSubmit = async () => {
    setSubmitting(true)
    setFormError('')

    try {
      // Duplicate detection
      if (RegistrationRequestService.isDuplicate({
        passportNumber: values.passportNumber,
        firstName: values.firstName,
        lastName: values.lastName,
      })) {
        throw new Error('A registration request with these details is already pending review.')
      }

      // Simulate network delay
      await new Promise((r) => setTimeout(r, 800))

      const record = RegistrationRequestService.createRequest({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        passportNumber: values.passportNumber.trim().toUpperCase(),
        passportExpiry: values.passportExpiry,
        dateOfBirth: values.dateOfBirth,
        profilePicture: values.profilePicture.trim(),
        profilePictureDisplay: toDisplayableImageUrl(values.profilePicture.trim()),
        source: 'public_registration',
      })

      toast.success('Registration submitted successfully')
      setSubmitted(record)
    } catch (err) {
      setFormError(err.message || 'Failed to submit registration. Please try again.')
      toast.error(err.message || 'Failed to submit registration')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="registration-page">
      <PageHero
        eyebrow="Get Started"
        title="Student Registration"
        subtitle="Register your details to receive login credentials from our administrator."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Register' },
        ]}
      />

      <Container size="md" className="registration-page__body">
        {submitted ? (
          <RegistrationSuccess requestId={submitted.requestId} />
        ) : (
          <div className="registration-page__card">
            <StepIndicator steps={STEPS} currentStep={currentStep} />

            <div className="registration-page__step-wrap">
              {currentStep === 1 && (
                <PersonalDetailsStep
                  values={values}
                  onChange={setField}
                  onNext={goNext}
                  formError={formError}
                />
              )}
              {currentStep === 2 && (
                <ProfilePictureStep
                  values={values}
                  onChange={setField}
                  onNext={goNext}
                  onBack={goBack}
                />
              )}
              {currentStep === 3 && (
                <ReviewStep
                  values={values}
                  onBack={goBack}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  formError={formError}
                />
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}

export default Registration