import React from 'react'
import { SectionHeading } from '@components/common'
import './OverviewSection.scss'

function OverviewSection({ university }) {
  return (
    <section className="uni-overview">
      <SectionHeading
        eyebrow="About"
        title="University Overview"
        size="sm"
        className="uni-overview__heading"
      />

      <p className="uni-overview__description">{university.description}</p>

      {university.highlights?.length > 0 && (
        <div className="uni-overview__highlights">
          <h3 className="uni-overview__highlights-title">Key Highlights</h3>
          <ul className="uni-overview__highlights-list">
            {university.highlights.map((highlight, i) => (
              <li key={i} className="uni-overview__highlight">
                <i className="bx bx-check-circle"></i>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default OverviewSection