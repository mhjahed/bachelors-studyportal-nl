import React from 'react'
import { SectionHeading } from '@components/common'
import './RequirementsSection.scss'

function RequirementsSection({ requirements }) {
  if (!requirements) return null

  return (
    <section className="requirements-section">
      <SectionHeading
        eyebrow="Admission"
        title="Requirements"
        size="sm"
        className="requirements-section__heading"
      />

      <div className="requirements-section__grid">
        <div className="requirement-block">
          <div className="requirement-block__icon-mark" />
          <h3 className="requirement-block__title">General Requirements</h3>
          <p className="requirement-block__text">{requirements.general}</p>
        </div>

        <div className="requirement-block">
          <div className="requirement-block__icon-mark requirement-block__icon-mark--accent" />
          <h3 className="requirement-block__title">English Proficiency</h3>
          <p className="requirement-block__text">{requirements.english}</p>
        </div>
      </div>

      {requirements.additional?.length > 0 && (
        <div className="requirements-section__additional">
          <h3 className="requirements-section__additional-title">Additional Documents</h3>
          <ul className="requirements-section__list">
            {requirements.additional.map((item, i) => (
              <li key={i}>
                <i className="bx bx-file"></i>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default RequirementsSection