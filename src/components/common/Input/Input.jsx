import React, { forwardRef } from 'react'
import './Input.scss'

/**
 * Input — Text input with label, icon, error handling
 *
 * @param {string} label
 * @param {string} error
 * @param {string} hint
 * @param {string} icon     - Boxicon prefix
 * @param {string} iconPos  - 'left' | 'right'
 * @param {boolean} required
 */
const Input = forwardRef(({
  label,
  error,
  hint,
  icon,
  iconPos = 'left',
  required = false,
  type = 'text',
  id,
  className = '',
  ...rest
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`input-field ${error ? 'input-field--error' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-field__label">
          {label}
          {required && <span className="input-field__required"> *</span>}
        </label>
      )}
      <div className={`input-field__wrapper ${icon ? `input-field__wrapper--icon-${iconPos}` : ''}`}>
        {icon && iconPos === 'left' && (
          <i className={`bx ${icon} input-field__icon input-field__icon--left`}></i>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className="input-field__input"
          {...rest}
        />
        {icon && iconPos === 'right' && (
          <i className={`bx ${icon} input-field__icon input-field__icon--right`}></i>
        )}
      </div>
      {error && (
        <span className="input-field__message input-field__message--error">
          <i className="bx bx-error-circle"></i>
          {error}
        </span>
      )}
      {!error && hint && (
        <span className="input-field__message input-field__message--hint">{hint}</span>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input