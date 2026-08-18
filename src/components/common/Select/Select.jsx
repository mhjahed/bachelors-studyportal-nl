import React, { forwardRef } from 'react'
import './Select.scss'

const Select = forwardRef(({
  label,
  error,
  hint,
  required = false,
  options = [],
  placeholder = 'Select an option',
  id,
  className = '',
  children,
  ...rest
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`select-field ${error ? 'select-field--error' : ''} ${className}`}>
      {label && (
        <label htmlFor={selectId} className="select-field__label">
          {label}
          {required && <span className="select-field__required"> *</span>}
        </label>
      )}
      <div className="select-field__wrapper">
        <select
          ref={ref}
          id={selectId}
          className="select-field__select"
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
          {children}
        </select>
        <i className="bx bx-chevron-down select-field__caret"></i>
      </div>
      {error && (
        <span className="select-field__message select-field__message--error">
          <i className="bx bx-error-circle"></i>
          {error}
        </span>
      )}
      {!error && hint && (
        <span className="select-field__message select-field__message--hint">{hint}</span>
      )}
    </div>
  )
})

Select.displayName = 'Select'
export default Select