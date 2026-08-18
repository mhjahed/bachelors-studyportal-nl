import React from 'react'
import { SectionHeading, EmptyState, Badge } from '@components/common'
import './ProgramsTable.scss'

function ProgramsTable({ programs = [] }) {
  return (
    <section className="programs-table">
      <SectionHeading
        eyebrow="Programs"
        title="Available Bachelor Programs"
        size="sm"
        className="programs-table__heading"
      />

      {programs.length === 0 ? (
        <EmptyState
          icon="bx-book-content"
          title="No programs listed"
          description="Program details will be added soon."
        />
      ) : (
        <>
          {/* Desktop: Table view */}
          <div className="programs-table__wrap">
            <table className="programs-table__table">
              <thead>
                <tr>
                  <th>Program</th>
                  <th>Duration</th>
                  <th>Language</th>
                  <th>IELTS</th>
                  <th>Tuition (EU)</th>
                  <th>Tuition (Non-EU)</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((prog) => (
                  <tr key={prog.id}>
                    <td>
                      <div className="programs-table__program-name">{prog.name}</div>
                      <div className="programs-table__program-level">{prog.level}</div>
                    </td>
                    <td>{prog.duration}</td>
                    <td>{prog.language}</td>
                    <td>{prog.ielts}</td>
                    <td>€{prog.tuitionEU?.toLocaleString()}</td>
                    <td>€{prog.tuitionNonEU?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: Card view */}
          <div className="programs-table__cards">
            {programs.map((prog) => (
              <div key={prog.id} className="program-card">
                <div className="program-card__header">
                  <h4 className="program-card__name">{prog.name}</h4>
                  <Badge variant="primary" size="sm">{prog.level}</Badge>
                </div>
                <div className="program-card__grid">
                  <div className="program-card__item">
                    <span className="program-card__label">Duration</span>
                    <span className="program-card__value">{prog.duration}</span>
                  </div>
                  <div className="program-card__item">
                    <span className="program-card__label">Language</span>
                    <span className="program-card__value">{prog.language}</span>
                  </div>
                  <div className="program-card__item">
                    <span className="program-card__label">IELTS</span>
                    <span className="program-card__value">{prog.ielts}</span>
                  </div>
                  <div className="program-card__item">
                    <span className="program-card__label">Tuition (EU)</span>
                    <span className="program-card__value">€{prog.tuitionEU?.toLocaleString()}</span>
                  </div>
                  <div className="program-card__item program-card__item--full">
                    <span className="program-card__label">Tuition (Non-EU)</span>
                    <span className="program-card__value">€{prog.tuitionNonEU?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default ProgramsTable