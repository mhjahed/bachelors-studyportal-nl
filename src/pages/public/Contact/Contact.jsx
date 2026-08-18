import React, { useEffect, useState } from 'react'
import { Container, PageHero, useToast } from '@components/common'
import { ContactService } from '@services'
import ContactInfoCards from './components/ContactInfoCards.jsx'
import ContactForm from './components/ContactForm.jsx'
import ContactSuccess from './components/ContactSuccess.jsx'
import './Contact.scss'

function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(null)
  const toast = useToast()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (values) => {
    setSubmitting(true)
    try {
      // Simulate a small network delay for realism
      await new Promise((r) => setTimeout(r, 800))

      // Persist locally. Phase 7 will connect EmailJS here.
      const record = ContactService.createRequest({
        ...values,
        source: 'contact_page',
        submittedAt: new Date().toISOString(),
      })

      toast.success('Message sent successfully')
      setSubmitted(record)
    } catch (err) {
      toast.error('Failed to send message. Please try again.')
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setSubmitted(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="contact-page">
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        subtitle="Questions, feedback or need guidance? We are here to help you throughout your Netherlands journey."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Contact' },
        ]}
      />

      <Container size="lg" className="contact-page__body">
        {submitted ? (
          <div className="contact-page__success-wrap">
            <ContactSuccess
              requestId={submitted.requestId}
              onReset={handleReset}
            />
          </div>
        ) : (
          <div className="contact-page__grid">
            <aside className="contact-page__aside">
              <div className="contact-page__aside-header">
                <h2 className="contact-page__aside-title">We are here to help</h2>
                <p className="contact-page__aside-subtitle">
                  Reach out via the form or use one of the direct channels below.
                </p>
              </div>
              <ContactInfoCards />
              <div className="contact-page__aside-note">
                <i className="bx bx-message-rounded-check"></i>
                <div>
                  <strong>Quick tip</strong>
                  <p>For faster support, include your reference ID (if any) and be as specific as possible.</p>
                </div>
              </div>
            </aside>

            <div className="contact-page__form-wrap">
              <ContactForm onSubmit={handleSubmit} submitting={submitting} />
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}

export default Contact