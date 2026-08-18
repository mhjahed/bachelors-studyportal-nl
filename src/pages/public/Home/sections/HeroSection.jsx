import React from 'react'
import { Container, Button, Badge } from '@components/common'
import { IMAGES } from '@/assets/images'
import './HeroSection.scss'

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__background">
        <img
          src={IMAGES.end_3}
          alt="Netherlands"
          className="hero__image"
        />
        <div className="hero__overlay" />
      </div>

      <Container size="lg" className="hero__container">
        <div className="hero__content">
          <Badge variant="accent" size="md" className="hero__badge">
            Bachelor Studies · Netherlands
          </Badge>

          <h1 className="hero__title">
            Your Complete Guide to
            <span className="hero__title-accent"> Studying in the Netherlands</span>
          </h1>

          <p className="hero__subtitle">
            From your first university application to your arrival in Amsterdam —
            we walk you through every step of the journey with clarity, structure and support.
          </p>

          <div className="hero__actions">
            {/* External Link */}
            <Button 
              variant="accent" 
              size="lg" 
              href="https://studyportal-nl.pages.dev/register" 
              icon="bx-right-arrow-alt"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
            </Button>

            {/* Internal Link (Unchanged) */}
            <Button variant="secondary" size="lg" to="/instructions">
              View Instructions
            </Button>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">8</span>
              <span className="hero__stat-label">Journey Stages</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">3</span>
              <span className="hero__stat-label">Interview Types</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">100%</span>
              <span className="hero__stat-label">Free to Explore</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default HeroSection