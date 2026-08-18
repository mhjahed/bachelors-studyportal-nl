import React from 'react'
import { Container, SectionHeading, Button, GlassCard } from '@components/common'
import './InterviewAssistanceSection.scss'

const INTERVIEW_TYPES = [
  {
    label: '01 · University',
    title: 'University Admission',
    description: 'Practice your admission interview with real questions from Dutch universities.',
    points: ['Motivation questions', 'Subject knowledge', 'Future planning'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
  },
  {
    label: '02 · IND',
    title: 'IND Interview',
    description: 'Prepare for your Dutch immigration appointment with confidence.',
    points: ['Financial preparation', 'Document review', 'Common questions'],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
  },
  {
    label: '03 · Embassy',
    title: 'Embassy Interview',
    description: 'Get ready for your embassy visit and passport submission.',
    points: ['Visa questions', 'Document checklist', 'Interview conduct'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
  },
]

function InterviewAssistanceSection() {
  return (
    <section className="interview-assistance">
      <div className="interview-assistance__background">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
          alt=""
          className="interview-assistance__image"
        />
        <div className="interview-assistance__overlay" />
      </div>

      <Container size="lg" className="interview-assistance__container">
        <SectionHeading
          eyebrow="Practice Interviews"
          title="Prepare with Guided Assistance"
          subtitle="Three interview types, one structured practice framework. Register to schedule a session with our team."
          align="center"
          size="lg"
          variant="light"
          className="interview-assistance__heading"
        />

        <div className="interview-assistance__grid">
          {INTERVIEW_TYPES.map((type) => (
            <GlassCard key={type.title} variant="strong" hover padding="none" className="interview-card">
              <div className="interview-card__image-wrap">
                <img src={type.image} alt={type.title} className="interview-card__image" />
                <div className="interview-card__image-overlay" />
                <span className="interview-card__label">{type.label}</span>
              </div>
              <div className="interview-card__body">
                <h3 className="interview-card__title">{type.title}</h3>
                <p className="interview-card__description">{type.description}</p>
                <ul className="interview-card__points">
                  {type.points.map((point) => (
                    <li key={point}>
                      <i className="bx bx-check"></i>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          ))}
        </div>

<div className="interview-assistance__cta">
  <Button 
    variant="accent" 
    size="lg" 
    href="https://studyportal-nl.pages.dev/register" 
    icon="bx-right-arrow-alt"
    target="_blank"
    rel="noopener noreferrer"
  >
    Register to Book a Session
  </Button>
</div>
      </Container>
    </section>
  )
}

export default InterviewAssistanceSection