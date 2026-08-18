import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@components/common'
import './UniversityCard.scss'

function UniversityCard({ university }) {
  return (
    <Link to={`/universities/${university.id}`} className="uni-list-card">
      <div className="uni-list-card__cover">
        <img src={university.coverImage} alt={university.name} className="uni-list-card__cover-image" />
        <div className="uni-list-card__cover-overlay" />
        {university.featured && (
          <Badge variant="accent" size="sm" className="uni-list-card__featured-badge">
            Featured
          </Badge>
        )}
        <div className="uni-list-card__cover-content">
          <span className="uni-list-card__short-name">{university.shortName}</span>
        </div>
      </div>

      <div className="uni-list-card__body">
        <div className="uni-list-card__location">
          <i className="bx bx-map"></i>
          {university.location}
        </div>

        <h3 className="uni-list-card__title">{university.name}</h3>
        <p className="uni-list-card__description">{university.description}</p>

        <div className="uni-list-card__stats">
          <div className="uni-list-card__stat">
            <span className="uni-list-card__stat-value">{university.programs?.length || 0}</span>
            <span className="uni-list-card__stat-label">Programs</span>
          </div>
          <div className="uni-list-card__stat">
            <span className="uni-list-card__stat-value">
              {university.students ? `${Math.round(university.students / 1000)}k+` : '—'}
            </span>
            <span className="uni-list-card__stat-label">Students</span>
          </div>
          <div className="uni-list-card__stat">
            <span className="uni-list-card__stat-value">{university.established || '—'}</span>
            <span className="uni-list-card__stat-label">Founded</span>
          </div>
        </div>

        <div className="uni-list-card__footer">
          <span className="uni-list-card__type">{university.type}</span>
          <span className="uni-list-card__link">
            View details <i className="bx bx-right-arrow-alt"></i>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default UniversityCard