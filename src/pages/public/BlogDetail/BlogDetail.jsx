import React, { useEffect, useMemo } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { Container, Badge, Button, Loader } from '@components/common'
import { BlogService } from '@services'
import { formatDate } from '@utils/dateHelpers.js'
import ShareBar from './components/ShareBar.jsx'
import RelatedArticles from './components/RelatedArticles.jsx'
import './BlogDetail.scss'

function BlogDetail() {
  const { slug } = useParams()

  const article = useMemo(() => BlogService.findBySlug(slug), [slug])

  const related = useMemo(() => {
    if (!article) return []
    const all = BlogService.getPublished()
    return all
      .filter((a) => a.id !== article.id && a.category === article.category)
      .slice(0, 3)
  }, [article])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (article) {
      BlogService.incrementViews(article.id)
    }
  }, [article])

  if (!slug) return <Navigate to="/visa-updates" replace />

  if (!article) {
    return (
      <div className="blog-detail-page blog-detail-page--not-found">
        <Container size="md">
          <div className="blog-detail-page__not-found">
            <h1>Article not found</h1>
            <p>The article you are looking for does not exist or has been removed.</p>
            <Button variant="primary" to="/visa-updates" icon="bx-left-arrow-alt" iconPos="left">
              Back to Visa Updates
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  // Split body into paragraphs
  const paragraphs = article.body ? article.body.split('\n').filter(Boolean) : []

  return (
    <article className="blog-detail-page">
      {/* Hero image */}
      <div className="blog-detail-page__hero">
        <img src={article.heroImage} alt={article.title} className="blog-detail-page__hero-image" />
        <div className="blog-detail-page__hero-overlay" />
      </div>

      {/* Header block */}
      <Container size="md" className="blog-detail-page__header-container">
        <div className="blog-detail-page__header">
          <div className="blog-detail-page__breadcrumbs">
            <Link to="/">Home</Link>
            <i className="bx bx-chevron-right"></i>
            <Link to="/visa-updates">Visa Updates</Link>
            <i className="bx bx-chevron-right"></i>
            <span>{article.category}</span>
          </div>

          <div className="blog-detail-page__badges">
            <Badge variant="accent" size="md">{article.category}</Badge>
            {article.featured && <Badge variant="primary" size="md">Featured</Badge>}
          </div>

          <h1 className="blog-detail-page__title">{article.title}</h1>
          <p className="blog-detail-page__subtitle">{article.subtitle}</p>

          <div className="blog-detail-page__meta">
            <div className="blog-detail-page__meta-item">
              <i className="bx bx-user"></i>
              <span>{article.author}</span>
            </div>
            <div className="blog-detail-page__meta-item">
              <i className="bx bx-calendar"></i>
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="blog-detail-page__meta-item">
              <i className="bx bx-time"></i>
              <span>{article.readTime || 5} min read</span>
            </div>
          </div>

          <ShareBar url={currentUrl} title={article.title} />
        </div>
      </Container>

      {/* Body */}
      <Container size="md" className="blog-detail-page__body-container">
        <div className="blog-detail-page__body">
          {paragraphs.map((para, index) => (
            <p key={index} className="blog-detail-page__paragraph">{para}</p>
          ))}

          {article.conclusion && (
            <div className="blog-detail-page__conclusion">
              <h3 className="blog-detail-page__conclusion-title">In summary</h3>
              <p>{article.conclusion}</p>
            </div>
          )}

          {article.tags?.length > 0 && (
            <div className="blog-detail-page__tags">
              {article.tags.map((tag) => (
                <span key={tag} className="blog-detail-page__tag">#{tag}</span>
              ))}
            </div>
          )}

          <div className="blog-detail-page__footer">
            <ShareBar url={currentUrl} title={article.title} />
            <Button variant="outline" to="/visa-updates" icon="bx-left-arrow-alt" iconPos="left">
              Back to All Updates
            </Button>
          </div>
        </div>
      </Container>

      <RelatedArticles articles={related} />
    </article>
  )
}

export default BlogDetail