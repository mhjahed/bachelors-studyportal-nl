import React from 'react'
import { Container, Button } from '@components/common'
import './FinalCtaSection.scss'

function FinalCtaSection() {
  return (
    <section className="final-cta">
      <Container size="lg">
        <div className="final-cta__box">
          <div className="final-cta__content">
            <h2 className="final-cta__title">
              Ready to Begin Your Netherlands Journey?
            </h2>
            <p className="final-cta__subtitle">
              Register today to unlock personalized interview scheduling, progress tracking and dedicated support from our team.
            </p>
          </div>
<div className="final-cta__actions">
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
  <Button variant="secondary" size="lg" to="/contact">
    Contact Us
  </Button>
</div>
        </div>
      </Container>
    </section>
  )
}

export default FinalCtaSection