import React from 'react'
import Button from '../Button/Button.jsx'
import './ErrorState.scss'

function ErrorState({
  title = 'Something went wrong',
  description = 'We encountered an unexpected error. Please try again.',
  action,
  className = ''
}) {
  return (
    <div className={`error-state ${className}`}>
      <div className="error-state__icon">
        <i className="bx bx-error"></i>
      </div>
      <h3 className="error-state__title">{title}</h3>
      <p className="error-state__description">{description}</p>
      {action && (
        <Button
          variant="primary"
          size="md"
          onClick={action.onClick}
          to={action.to}
          icon={action.icon || 'bx-refresh'}
          iconPos="left"
        >
          {action.label || 'Try Again'}
        </Button>
      )}
    </div>
  )
}

export default ErrorState