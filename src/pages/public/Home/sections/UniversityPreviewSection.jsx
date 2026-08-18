import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Container, SectionHeading, Button, Badge, EmptyState } from '@components/common'
import { UniversityService } from '@services'
import './UniversityPreviewSection.scss'

function UniversityPreviewSection() {
  const universities = useMemo(() => {
    const featured = UniversityService.getFeatured()
    const all = UniversityService.getActive()
    const combined = [...featured, ...all.filter((u) => !featured.find((f) => f.id === u.id))]
    return combined.slice(0, 3)
  }, [])

  return (
    <section className="university-preview">
      <Container size="lg">
        <div className="university-preview__header">
          <SectionHeading
            eyebrow="Universities"
            title="Universities of Applied Sciences"
            subtitle="Discover top Dutch universities offering bachelor programs in English."
            size="lg"
          />
          <Button
            variant="outline"
            to="/universities"
            icon="bx-right-arrow-alt"
            className="university-preview__cta-desktop"
          >
            View All Universities
          </Button>
        </div>

        {universities.length === 0 ? (
          <EmptyState
            icon="bx-buildings"
            title="No universities yet"
            description="University listings will appear here."
          />
        ) : (
          <div className="university-preview__grid">
            {universities.map((uni) => (
              <Link key={uni.id} to={`/universities/${uni.id}`} className="uni-card">
                <div className="uni-card__cover">
                  <img src={uni.coverImage} alt={uni.name} className="uni-card__cover-image" />
                  <div className="uni-card__overlay" />
                  <div className="uni-card__cover-content">
                    <Badge variant="accent" size="sm">{uni.type}</Badge>
                  </div>
                </div>

                <div className="uni-card__body">
                  <div className="uni-card__location">
                    <i className="bx bx-map"></i>
                    {uni.location}
                  </div>

                  <h3 className="uni-card__title">{uni.name}</h3>
                  <p className="uni-card__description">{uni.description}</p>

                  <div className="uni-card__meta">
                    <span className="uni-card__meta-item">
                      <i className="bx bx-book-content"></i>
                      {uni.programs?.length || 0} Programs
                    </span>
                    <span className="uni-card__link">
                      Details <i className="bx bx-right-arrow-alt"></i>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="university-preview__cta-mobile">
          <Button variant="outline" to="/universities" icon="bx-right-arrow-alt" fullWidth>
            View All Universities
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default UniversityPreviewSection