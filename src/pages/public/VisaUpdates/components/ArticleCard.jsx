import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@components/common'
import { formatDate } from '@utils/dateHelpers.js'
import './ArticleCard.scss'

/**
 * ArticleCard
 * @param {object} article
 * @param {string} variant - 'default' | 'compact' | 'horizontal'
 */
function ArticleCard({ article, variant = 'default' }) {
  const classes = `article-card article-card--${variant}`

  return (
    <Link to={`/visa-updates/${article.slug}`} className={classes}>
      <div className="article-card__image-wrap">
        <img src={article.heroImage} alt={article.title} className="article-card__image" />
        <Badge variant="accent" size="sm" className="article-card__badge">
          {article.category}
        </Badge>
      </div>
      <div className="article-card__body">
        <div className="article-card__meta">
          <span>{formatDate(article.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime || 5} min read</span>
        </div>
        <h3 className="article-card__title">{article.title}</h3>
        {variant !== 'compact' && (
          <p className="article-card__subtitle">{article.subtitle}</p>
        )}
        <span className="article-card__link">
          Read article <i className="bx bx-right-arrow-alt"></i>
        </span>
      </div>
    </Link>
  )
}

export default ArticleCard