import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.scss'

/**
 * Logo Component
 * Pure typographic mark — no icon boxes
 *
 * @param {string} variant - 'default' | 'light' | 'dark'
 * @param {string} size    - 'sm' | 'md' | 'lg'
 * @param {boolean} link   - Wrap in Link (default true)
 */
function Logo({ variant = 'default', size = 'md', link = true }) {
  const content = (
    <div className={`logo logo--${variant} logo--${size}`}>
      <span className="logo__mark">B</span>
     <br></br> <span className="logo__text">
        <span className="logo__primary">Bachelors Portal</span>
        <span className="logo__secondary">Netherlands</span>
      </span>
    </div>
  )

  if (link) {
    return <Link to="/" className="logo-link">{content}</Link>
  }
  return content
}

export default Logo