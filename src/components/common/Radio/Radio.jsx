import React, { forwardRef } from 'react'
import './Radio.scss'

const Radio = forwardRef(({
  label,
  description,
  id,
  className = '',
  ...rest
}, ref) => {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`

  return (
    <label htmlFor={radioId} className={`radio-field ${className}`}>
      <input
        ref={ref}
        id={radioId}
        type="radio"
        className="radio-field__input"
        {...rest}
      />
      <span className="radio-field__circle">
        <span className="radio-field__dot" />
      </span>
      {(label || description) && (
        <span className="radio-field__content">
          {label && <span className="radio-field__label">{label}</span>}
          {description && <span className="radio-field__description">{description}</span>}
        </span>
      )}
    </label>
  )
})

Radio.displayName = 'Radio'
export default Radio