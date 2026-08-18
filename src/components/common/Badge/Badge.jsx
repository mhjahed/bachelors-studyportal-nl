import React from 'react'
import './Badge.scss'

/**
 * Badge — Status and label indicators
 *
 * @param {string} variant - 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'info'
 * @param {string} size    - 'sm' | 'md'
 * @param {boolean} dot    - Show status dot
 * @param {string} icon    - Optional Boxicon
 */
function Badge({
  variant = 'default',
  size = 'sm',
  dot = false,
  icon,
  className = '',
  children,
}) {
  const classes = [
    'badge-custom',
    `badge-custom--${variant}`,
    `badge-custom--${size}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <span className={classes}>
      {dot && <span className="badge-custom__dot" />}
      {icon && <i className={`bx ${icon}`}></i>}
      {children}
    </span>
  )
}

export default Badge