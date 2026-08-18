import React from 'react'
import { Link } from 'react-router-dom'
import { Container, SectionHeading } from '@components/common'
import './JourneySection.scss'

const JOURNEY_STAGES = [
  { number: '01', icon: 'bx-buildings', title: 'University Admission', description: 'Apply to Dutch Universities of Applied Sciences.', link: '/instructions' },
  { number: '02', icon: 'bx-conversation', title: 'University Interview', description: 'Prepare for the admission interview.', link: '/instructions' },
  { number: '03', icon: 'bx-id-card', title: 'IND Appointment', description: 'Immigration authority appointment.', link: '/instructions' },
  { number: '04', icon: 'bx-world', title: 'Embassy Visit', description: 'Submit your passport for visa processing.', link: '/instructions' },
  { number: '05', icon: 'bx-book', title: 'Passport Submission', description: 'Complete passport submission process.', link: '/instructions' },
  { number: '06', icon: 'bx-package', title: 'Passport Collection', description: 'Collect passport after visa approval.', link: '/instructions' },
  { number: '07', icon: 'bx-plane-take-off', title: 'Travel Preparation', description: 'Prepare for your move to the Netherlands.', link: '/instructions' },
  { number: '08', icon: 'bx-home-heart', title: 'Arrival', description: 'Your first days in the Netherlands.', link: '/instructions' },
]

function JourneySection() {
  return (
    <section className="journey">
      <Container size="lg">
        <SectionHeading
          eyebrow="Your Complete Path"
          title="Eight Stages, One Journey"
          subtitle="From application to arrival — explore every stage of your Netherlands bachelor experience."
          align="center"
          size="lg"
          className="journey__heading"
        />

        <div className="journey__grid">
        {JOURNEY_STAGES.map((stage) => (
          <Link key={stage.number} to={stage.link} className="journey__card">
            <div className="journey__card-top">
              <span className="journey__number">{stage.number}</span>
              <span className="journey__accent-line" />
            </div>
            <h3 className="journey__title">{stage.title}</h3>
            <p className="journey__description">{stage.description}</p>
            <span className="journey__link">
              Explore <i className="bx bx-right-arrow-alt"></i>
            </span>
          </Link>
        ))}
        </div>
      </Container>
    </section>
  )
}

export default JourneySection