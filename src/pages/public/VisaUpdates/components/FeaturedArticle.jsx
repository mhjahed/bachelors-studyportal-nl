import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@components/common'
import { formatDate } from '@utils/dateHelpers.js'
import './FeaturedArticle.scss'

function FeaturedArticle({ article }) {
  if (!article) return null

  return (
    <Link to={`/visa-updates/${article.slug}`} className="featured-article">
      <div className="featured-article__image-wrap">
        <img src={article.heroImage} alt={article.title} className="featured-article__image" />
        <div className="featured-article__overlay" />
      </div>

      <div className="featured-article__content">
        <div className="featured-article__badges">
          <Badge variant="accent" size="md">Featured</Badge>
          <Badge variant="primary" size="md">{article.category}</Badge>
        </div>

        <h2 className="featured-article__title">{article.title}</h2>
        <p className="featured-article__subtitle">{article.subtitle}</p>

        <div className="featured-article__meta">
          <span>{formatDate(article.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime || 5} min read</span>
        </div>

        <span className="featured-article__cta">
          Read the full article
          <i className="bx bx-right-arrow-alt"></i>
        </span>
      </div>
    </Link>
  )
}

export default FeaturedArticle