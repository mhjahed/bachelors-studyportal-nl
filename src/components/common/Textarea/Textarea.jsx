import React, { forwardRef } from 'react'
import './Textarea.scss'

const Textarea = forwardRef(({
  label,
  error,
  hint,
  required = false,
  rows = 4,
  id,
  className = '',
  ...rest
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`textarea-field ${error ? 'textarea-field--error' : ''} ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="textarea-field__label">
          {label}
          {required && <span className="textarea-field__required"> *</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className="textarea-field__textarea"
        {...rest}
      />
      {error && (
        <span className="textarea-field__message textarea-field__message--error">
          <i className="bx bx-error-circle"></i>
          {error}
        </span>
      )}
      {!error && hint && (
        <span className="textarea-field__message textarea-field__message--hint">{hint}</span>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'
export default Textarea