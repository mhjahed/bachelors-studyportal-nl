    import React from 'react'
import './GlassCard.scss'

/**
 * GlassCard — iOS-inspired glass panel
 *
 * @param {string} variant - 'default' | 'strong' | 'subtle'
 * @param {boolean} hover  - Enable hover elevation
 * @param {string} padding - 'none' | 'sm' | 'md' | 'lg'
 */
function GlassCard({
  variant = 'default',
  hover = false,
  padding = 'md',
  as: Component = 'div',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'glass-card',
    `glass-card--${variant}`,
    `glass-card--pad-${padding}`,
    hover && 'glass-card--hover',
    className
  ].filter(Boolean).join(' ')

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  )
}

export default GlassCard