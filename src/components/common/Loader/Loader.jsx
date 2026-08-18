import React from 'react'
import './Loader.scss'

/**
 * Loader — inline spinner
 *
 * @param {string} size    - 'sm' | 'md' | 'lg'
 * @param {string} variant - 'primary' | 'light' | 'dark'
 * @param {string} label   - Optional text below
 */
function Loader({ size = 'md', variant = 'primary', label, className = '' }) {
  return (
    <div className={`loader loader--${size} loader--${variant} ${className}`}>
      <div className="loader__spinner" />
      {label && <span className="loader__label">{label}</span>}
    </div>
  )
}

export default Loader