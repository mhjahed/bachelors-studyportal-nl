import React, { forwardRef } from 'react'
import './Checkbox.scss'

const Checkbox = forwardRef(({
  label,
  description,
  error,
  id,
  className = '',
  ...rest
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  return (
    <label htmlFor={checkboxId} className={`checkbox-field ${error ? 'checkbox-field--error' : ''} ${className}`}>
      <input
        ref={ref}
        id={checkboxId}
        type="checkbox"
        className="checkbox-field__input"
        {...rest}
      />
      <span className="checkbox-field__box">
        <i className="bx bx-check"></i>
      </span>
      {(label || description) && (
        <span className="checkbox-field__content">
          {label && <span className="checkbox-field__label">{label}</span>}
          {description && <span className="checkbox-field__description">{description}</span>}
          {error && <span className="checkbox-field__error">{error}</span>}
        </span>
      )}
    </label>
  )
})

Checkbox.displayName = 'Checkbox'
export default Checkbox