import React from 'react'
import './FormError.scss'

function FormError({ children, className = '' }) {
  if (!children) return null

  return (
    <div className={`form-error ${className}`}>
      <i className="bx bx-error-circle"></i>
      <span>{children}</span>
    </div>
  )
}

export default FormError