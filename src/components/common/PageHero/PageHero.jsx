import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../Container/Container.jsx'
import Badge from '../Badge/Badge.jsx'
import './PageHero.scss'

/**
 * PageHero — Compact header for non-home pages.
 *
 * @param {string} eyebrow
 * @param {string} title
 * @param {string} subtitle
 * @param {Array} breadcrumbs - [{ label, to }]
 */
function PageHero({ eyebrow, title, subtitle, breadcrumbs = [] }) {
  return (
    <section className="page-hero">
      <div className="page-hero__pattern" />
      <Container size="lg" className="page-hero__container">
        {breadcrumbs.length > 0 && (
          <nav className="page-hero__breadcrumbs" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.label}>
                {crumb.to ? (
                  <Link to={crumb.to} className="page-hero__crumb">{crumb.label}</Link>
                ) : (
                  <span className="page-hero__crumb page-hero__crumb--current">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <i className="bx bx-chevron-right page-hero__crumb-sep"></i>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {eyebrow && (
          <Badge variant="accent" size="md" className="page-hero__eyebrow">
            {eyebrow}
          </Badge>
        )}

        <h1 className="page-hero__title">{title}</h1>

        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
      </Container>
    </section>
  )
}

export default PageHero