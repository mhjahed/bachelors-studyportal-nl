import React from 'react'
import StepAccordion from './StepAccordion.jsx'
import './InstructionCard.scss'

function InstructionCard({ instruction }) {
  const {
    title,
    introduction,
    icon,
    category,
    steps = [],
    warnings = [],
    documents = [],
    image,
  } = instruction

  return (
    <article className="instruction-card">
          <header className="instruction-card__header">
      <span className="instruction-card__accent-bar" />
      <div className="instruction-card__header-text">
        <span className="instruction-card__category">{category}</span>
        <h2 className="instruction-card__title">{title}</h2>
      </div>
    </header>

      {introduction && (
        <p className="instruction-card__intro">{introduction}</p>
      )}

      {image && (
        <div className="instruction-card__image-wrap">
          <img src={image} alt={title} className="instruction-card__image" />
        </div>
      )}

      {steps.length > 0 && (
        <section className="instruction-card__section">
          <h3 className="instruction-card__section-title">
            <i className="bx bx-list-ol"></i>
            Steps to Follow
          </h3>
          <div className="instruction-card__steps">
            {steps.map((step, index) => (
              <StepAccordion
                key={step.id || index}
                step={step}
                index={index}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        </section>
      )}

      {warnings.length > 0 && (
        <section className="instruction-card__section">
          <h3 className="instruction-card__section-title">
            <i className="bx bx-error"></i>
            Important Warnings
          </h3>
          <ul className="instruction-card__warnings">
            {warnings.map((warning, index) => (
              <li key={index} className="instruction-card__warning">
                <i className="bx bx-error-circle"></i>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {documents.length > 0 && (
        <section className="instruction-card__section">
          <h3 className="instruction-card__section-title">
            <i className="bx bx-folder"></i>
            Required Documents
          </h3>
          <ul className="instruction-card__docs">
            {documents.map((doc, index) => (
              <li key={index} className="instruction-card__doc">
                <i className="bx bx-check-circle"></i>
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {steps.length === 0 && warnings.length === 0 && documents.length === 0 && (
        <div className="instruction-card__empty">
          <i className="bx bx-info-circle"></i>
          <span>Detailed information for this section will be published soon.</span>
        </div>
      )}
    </article>
  )
}

export default InstructionCard