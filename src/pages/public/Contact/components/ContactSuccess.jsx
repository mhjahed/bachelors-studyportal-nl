import React from 'react'
import { Button } from '@components/common'
import './ContactSuccess.scss'

function ContactSuccess({ requestId, onReset }) {
  return (
    <div className="contact-success">
      <div className="contact-success__icon-wrap">
        <div className="contact-success__ring" />
        <div className="contact-success__ring contact-success__ring--delay" />
        <div className="contact-success__check">
          <i className="bx bx-check"></i>
        </div>
      </div>

      <h2 className="contact-success__title">Message Received</h2>
      <p className="contact-success__message">
        Thank you for reaching out. We have received your message and will respond within 24 hours.
      </p>

      {requestId && (
        <div className="contact-success__reference">
          <span className="contact-success__reference-label">Reference ID</span>
          <span className="contact-success__reference-value">{requestId}</span>
        </div>
      )}

      <div className="contact-success__actions">
        <Button variant="outline" onClick={onReset} icon="bx-message-square-add" iconPos="left">
          Send Another Message
        </Button>
        <Button variant="primary" to="/" icon="bx-home">
          Back to Home
        </Button>
      </div>
    </div>
  )
}

export default ContactSuccess