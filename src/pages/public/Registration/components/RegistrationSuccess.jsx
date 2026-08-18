import React from 'react'
import { Button } from '@components/common'
import './RegistrationSuccess.scss'

function RegistrationSuccess({ requestId }) {
  return (
    <div className="registration-success">
      <div className="registration-success__icon-wrap">
        <div className="registration-success__ring" />
        <div className="registration-success__ring registration-success__ring--delay" />
        <div className="registration-success__check">
          <i className="bx bx-check"></i>
        </div>
      </div>

      <h2 className="registration-success__title">Registration Request Submitted</h2>
      <p className="registration-success__message">
        Thank you for registering with Bachelors Portal Netherlands.
        Your request is now under review by our administrator.
      </p>

      {requestId && (
        <div className="registration-success__reference">
          <span className="registration-success__reference-label">Reference ID</span>
          <span className="registration-success__reference-value">{requestId}</span>
        </div>
      )}

      <div className="registration-success__next">
        <h3>What happens next?</h3>
        <ol>
          <li>
            <span className="registration-success__step-number">01</span>
            <span>Our administrator will review your submission within 1-2 business days.</span>
          </li>
          <li>
            <span className="registration-success__step-number">02</span>
            <span>You will receive your login credentials by email once approved.</span>
          </li>
          <li>
            <span className="registration-success__step-number">03</span>
            <span>Sign in to access your dashboard and book practice interviews.</span>
          </li>
        </ol>
      </div>

      <div className="registration-success__actions">
        <Button variant="outline" to="/" icon="bx-home" iconPos="left">
          Back to Home
        </Button>
        <Button variant="primary" to="/instructions" icon="bx-book-open" iconPos="left">
          Explore Instructions
        </Button>
      </div>
    </div>
  )
}

export default RegistrationSuccess