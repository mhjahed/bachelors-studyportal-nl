import React from 'react'
import { SectionHeading, Badge, Button } from '@components/common'
import './InterviewInfoSection.scss'

function InterviewInfoSection({ interviewInfo }) {
  if (!interviewInfo) return null

  const { hasInterview, format, duration, topics = [], tips = [] } = interviewInfo

  if (!hasInterview) {
    return (
      <section className="interview-info interview-info--none">
        <SectionHeading
          eyebrow="Interview"
          title="Admission Interview"
          size="sm"
          className="interview-info__heading"
        />
        <div className="interview-info__none">
          <i className="bx bx-info-circle"></i>
          <div>
            <strong>No admission interview required.</strong>
            <p>This university admits applicants based on documentation review alone.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="interview-info">
      <SectionHeading
        eyebrow="Interview"
        title="Admission Interview"
        size="sm"
        className="interview-info__heading"
      />

      <div className="interview-info__summary">
        <div className="interview-info__stat">
          <span className="interview-info__stat-label">Format</span>
          <span className="interview-info__stat-value">{format}</span>
        </div>
        <div className="interview-info__stat">
          <span className="interview-info__stat-label">Duration</span>
          <span className="interview-info__stat-value">{duration}</span>
        </div>
        <div className="interview-info__stat">
          <span className="interview-info__stat-label">Status</span>
          <Badge variant="success" dot>Required</Badge>
        </div>
      </div>

      <div className="interview-info__grid">
        {topics.length > 0 && (
          <div className="interview-info__block">
            <h3 className="interview-info__block-title">Common Topics</h3>
            <ul className="interview-info__list">
              {topics.map((topic, i) => (
                <li key={i}>
                  <i className="bx bx-message-square-detail"></i>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tips.length > 0 && (
          <div className="interview-info__block interview-info__block--tips">
            <h3 className="interview-info__block-title">Preparation Tips</h3>
            <ul className="interview-info__list">
              {tips.map((tip, i) => (
                <li key={i}>
                  <i className="bx bx-bulb"></i>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="interview-info__cta">
        <div className="interview-info__cta-text">
          <h4>Practice with us</h4>
          <p>Register to book a guided practice interview session with our team.</p>
        </div>
        <Button variant="accent" size="md" to="/register" icon="bx-right-arrow-alt">
          Register
        </Button>
      </div>
    </section>
  )
}

export default InterviewInfoSection