import React from 'react'
import { Badge } from '@components/common'
import './DocumentItem.scss'

function DocumentItem({ document, checked, onToggle }) {
  const handleClick = () => {
    onToggle(document.id, !checked)
  }

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className={`doc-item ${checked ? 'doc-item--checked' : ''} ${document.required ? 'doc-item--required' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="checkbox"
      aria-checked={checked}
    >
      <div className="doc-item__checkbox">
        <i className="bx bx-check"></i>
      </div>

      <div className="doc-item__body">
        <div className="doc-item__header">
          <h3 className="doc-item__name">{document.name}</h3>
          <div className="doc-item__badges">
            {document.required ? (
              <Badge variant="danger" size="sm">Required</Badge>
            ) : (
              <Badge variant="default" size="sm">Optional</Badge>
            )}
          </div>
        </div>

        {document.description && (
          <p className="doc-item__description">{document.description}</p>
        )}

        <div className="doc-item__meta">
          {document.stage && (
            <span className="doc-item__meta-item">
              <i className="bx bx-flag"></i>
              {document.stage}
            </span>
          )}
          {document.category && (
            <span className="doc-item__meta-item">
              <i className="bx bx-category-alt"></i>
              {document.category}
            </span>
          )}
        </div>

        {document.notes && (
          <div className="doc-item__note">
            <i className="bx bx-info-circle"></i>
            <span>{document.notes}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentItem