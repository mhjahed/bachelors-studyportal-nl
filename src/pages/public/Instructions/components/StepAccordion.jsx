import React, { useState } from 'react'
import './StepAccordion.scss'

/**
 * StepAccordion — Expandable step item.
 */
function StepAccordion({ step, index, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`step-accordion ${open ? 'step-accordion--open' : ''} ${step.important ? 'step-accordion--important' : ''}`}>
      <button
        type="button"
        className="step-accordion__header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="step-accordion__number">{String(index + 1).padStart(2, '0')}</span>
        <span className="step-accordion__title">{step.title}</span>
        {step.important && (
          <span className="step-accordion__badge">
            <i className="bx bx-error-circle"></i>
            Important
          </span>
        )}
        <i className="bx bx-chevron-down step-accordion__caret"></i>
      </button>

      <div className="step-accordion__body">
        <div className="step-accordion__content">
          <p>{step.content}</p>
        </div>
      </div>
    </div>
  )
}

export default StepAccordion