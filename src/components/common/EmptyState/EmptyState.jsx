import React from 'react'
import Button from '../Button/Button.jsx'
import './EmptyState.scss'

/**
 * EmptyState — Shown when a list/section has no data
 *
 * @param {string} icon    - Boxicon
 * @param {string} title
 * @param {string} description
 * @param {object} action  - { label, to, onClick, icon }
 */
function EmptyState({ icon = 'bx-folder-open', title, description, action, className = '' }) {
  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state__icon">
        <i className={`bx ${icon}`}></i>
      </div>
      {title && <h3 className="empty-state__title">{title}</h3>}
      {description && <p className="empty-state__description">{description}</p>}
      {action && (
        <Button
          variant="primary"
          size="md"
          to={action.to}
          onClick={action.onClick}
          icon={action.icon}
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}

export default EmptyState