import React from 'react'
import './IconButton.scss'

/**
 * IconButton — circular button with an icon
 *
 * @param {string} icon    - Boxicon class
 * @param {string} variant - 'default' | 'primary' | 'ghost' | 'glass'
 * @param {string} size    - 'sm' | 'md' | 'lg'
 * @param {string} label   - Aria label (required for accessibility)
 * @param {number} badge   - Optional badge count
 */
function IconButton({
  icon,
  variant = 'default',
  size = 'md',
  label,
  badge,
  onClick,
  className = '',
  ...rest
}) {
  const classes = [
    'icon-btn',
    `icon-btn--${variant}`,
    `icon-btn--${size}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      aria-label={label}
      {...rest}
    >
      <i className={`bx ${icon}`}></i>
      {badge > 0 && (
        <span className="icon-btn__badge">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  )
}

export default IconButton