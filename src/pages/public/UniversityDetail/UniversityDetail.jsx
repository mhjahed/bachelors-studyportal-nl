import React, { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Button, Badge } from '@components/common'
import { UniversityService } from '@services'
import OverviewSection from './components/OverviewSection.jsx'
import ProgramsTable from './components/ProgramsTable.jsx'
import RequirementsSection from './components/RequirementsSection.jsx'
import InterviewInfoSection from './components/InterviewInfoSection.jsx'
import './UniversityDetail.scss'

function UniversityDetail() {
  const { id } = useParams()

  const university = useMemo(() => UniversityService.findById(id), [id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!university) {
    return (
      <div className="uni-detail-page uni-detail-page--not-found">
        <Container size="md">
          <div className="uni-detail-page__not-found">
            <h1>University not found</h1>
            <p>The university you are looking for does not exist or has been removed.</p>
            <Button variant="primary" to="/universities" icon="bx-left-arrow-alt" iconPos="left">
              Back to Universities
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <article className="uni-detail-page">
      {/* Cover */}
      <div className="uni-detail-page__cover">
        <img src={university.coverImage} alt={university.name} className="uni-detail-page__cover-image" />
        <div className="uni-detail-page__cover-overlay" />
      </div>

      {/* Header */}
      <Container size="lg" className="uni-detail-page__header-container">
        <div className="uni-detail-page__header">
          <nav className="uni-detail-page__breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <i className="bx bx-chevron-right"></i>
            <Link to="/universities">Universities</Link>
            <i className="bx bx-chevron-right"></i>
            <span>{university.shortName}</span>
          </nav>

          <div className="uni-detail-page__header-top">
            <div className="uni-detail-page__short-mark">{university.shortName}</div>
            <div className="uni-detail-page__header-info">
              <div className="uni-detail-page__badges">
                {university.featured && <Badge variant="accent">Featured</Badge>}
                <Badge variant="primary">{university.type}</Badge>
                <Badge variant="default">
                  <i className="bx bx-map"></i>
                  {university.location}
                </Badge>
              </div>
              <h1 className="uni-detail-page__title">{university.name}</h1>
            </div>
          </div>

          <div className="uni-detail-page__quick-stats">
            <div className="uni-detail-page__quick-stat">
              <span className="uni-detail-page__quick-stat-value">
                {university.students ? `${university.students.toLocaleString()}+` : '—'}
              </span>
              <span className="uni-detail-page__quick-stat-label">Students</span>
            </div>
            <div className="uni-detail-page__quick-stat">
              <span className="uni-detail-page__quick-stat-value">
                {university.programs?.length || 0}
              </span>
              <span className="uni-detail-page__quick-stat-label">Programs</span>
            </div>
            <div className="uni-detail-page__quick-stat">
              <span className="uni-detail-page__quick-stat-value">
                {university.established || '—'}
              </span>
              <span className="uni-detail-page__quick-stat-label">Established</span>
            </div>
            {university.website && (
              <div className="uni-detail-page__quick-stat uni-detail-page__quick-stat--action">
                <Button
                  variant="outline"
                  size="sm"
                  href={university.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon="bx-link-external"
                >
                  Visit Website
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Body */}
      <Container size="lg" className="uni-detail-page__body">
        <div className="uni-detail-page__sections">
          <OverviewSection university={university} />
          <ProgramsTable programs={university.programs} />
          <RequirementsSection requirements={university.admissionRequirements} />
          <InterviewInfoSection interviewInfo={university.interviewInfo} />
        </div>
      </Container>
    </article>
  )
}

export default UniversityDetail