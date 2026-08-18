import React from 'react'
import { Link } from 'react-router-dom'
import './Button.scss'

/**
 * Button Component
 *
 * @param {string} variant  - 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger'
 * @param {string} size     - 'sm' | 'md' | 'lg'
 * @param {string} icon     - Boxicon class (e.g., 'bx-arrow-right')
 * @param {string} iconPos  - 'left' | 'right'
 * @param {boolean} loading
 * @param {boolean} fullWidth
 * @param {string} to       - If provided, renders as react-router Link
 * @param {string} href     - If provided, renders as <a>
 */
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPos = 'right',
  loading = false,
  fullWidth = false,
  disabled = false,
  to,
  href,
  type = 'button',
  onClick,
  children,
  className = '',
  ...rest
}) {
  const classes = [
    'btn-custom',
    `btn-custom--${variant}`,
    `btn-custom--${size}`,
    fullWidth && 'btn-custom--full',
    loading && 'btn-custom--loading',
    className
  ].filter(Boolean).join(' ')

  const content = (
    <>
      {loading && <span className="btn-custom__spinner" />}
      {!loading && icon && iconPos === 'left' && (
        <i className={`bx ${icon} btn-custom__icon btn-custom__icon--left`}></i>
      )}
      <span className="btn-custom__label">{children}</span>
      {!loading && icon && iconPos === 'right' && (
        <i className={`bx ${icon} btn-custom__icon btn-custom__icon--right`}></i>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {content}
    </button>
  )
}

export default Button