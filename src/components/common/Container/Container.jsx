import React from 'react'
import './Container.scss'

/**
 * Container — Consistent max-width wrapper
 *
 * @param {string} size - 'sm' | 'md' | 'lg' | 'xl' | 'full'
 */
function Container({ size = 'lg', as: Component = 'div', className = '', children, ...rest }) {
  const classes = ['container-custom', `container-custom--${size}`, className]
    .filter(Boolean).join(' ')

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  )
}

export default Container