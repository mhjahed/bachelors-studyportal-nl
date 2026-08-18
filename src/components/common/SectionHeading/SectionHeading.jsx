import React from 'react'
import './SectionHeading.scss'

/**
 * SectionHeading — Consistent page/section titles
 *
 * @param {string} eyebrow  - Small label above title
 * @param {string} title    - Main heading
 * @param {string} subtitle - Description below
 * @param {string} align    - 'left' | 'center'
 * @param {string} size     - 'sm' | 'md' | 'lg' | 'xl'
 * @param {string} variant  - 'default' | 'light'
 */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  size = 'md',
  variant = 'default',
  className = '',
  children,
}) {
  const classes = [
    'section-heading',
    `section-heading--${align}`,
    `section-heading--${size}`,
    `section-heading--${variant}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {eyebrow && <span className="section-heading__eyebrow">{eyebrow}</span>}
      {title && <h2 className="section-heading__title">{title}</h2>}
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
      {children}
    </div>
  )
}

export default SectionHeading