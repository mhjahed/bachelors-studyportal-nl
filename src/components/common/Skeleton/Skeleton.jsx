import React from 'react'
import './Skeleton.scss'

/**
 * Skeleton — Loading placeholder
 *
 * @param {string} variant - 'text' | 'title' | 'circle' | 'rect'
 * @param {string} width   - CSS width value
 * @param {string} height  - CSS height value
 * @param {number} lines   - For 'text' variant
 */
function Skeleton({ variant = 'text', width, height, lines = 1, className = '' }) {
  const style = { width, height }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`skeleton-group ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className={`skeleton skeleton--text`}
            style={i === lines - 1 ? { ...style, width: '70%' } : style}
          />
        ))}
      </div>
    )
  }

  return <span className={`skeleton skeleton--${variant} ${className}`} style={style} />
}

export default Skeleton