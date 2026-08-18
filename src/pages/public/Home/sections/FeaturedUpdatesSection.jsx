import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Container, SectionHeading, Button, Badge, EmptyState } from '@components/common'
import { BlogService } from '@services'
import { formatDate } from '@utils/dateHelpers.js'
import './FeaturedUpdatesSection.scss'

function FeaturedUpdatesSection() {
  const posts = useMemo(() => {
    const featured = BlogService.getFeatured()
    const published = BlogService.getPublished()
    // Show up to 3 posts, preferring featured
    const combined = [...featured, ...published.filter((p) => !featured.find((f) => f.id === p.id))]
    return combined.slice(0, 3)
  }, [])

  return (
    <section className="featured-updates">
      <Container size="lg">
        <div className="featured-updates__header">
          <SectionHeading
            eyebrow="Latest News"
            title="Featured Visa Updates"
            subtitle="Stay informed with the most recent immigration and study updates."
            size="lg"
          />
          <Button
            variant="outline"
            to="/visa-updates"
            icon="bx-right-arrow-alt"
            className="featured-updates__cta-desktop"
          >
            View All Updates
          </Button>
        </div>

        {posts.length === 0 ? (
          <EmptyState
            icon="bx-news"
            title="No updates yet"
            description="Check back soon for the latest visa and study updates."
          />
        ) : (
          <div className="featured-updates__grid">
            {posts.map((post) => (
              <Link key={post.id} to={`/visa-updates/${post.slug}`} className="update-card">
                <div className="update-card__image-wrap">
                  <img src={post.heroImage} alt={post.title} className="update-card__image" />
                  <Badge variant="accent" size="sm" className="update-card__badge">
                    {post.category}
                  </Badge>
                </div>
                <div className="update-card__body">
                  <div className="update-card__meta">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readTime || 5} min read</span>
                  </div>
                  <h3 className="update-card__title">{post.title}</h3>
                  <p className="update-card__subtitle">{post.subtitle}</p>
                  <span className="update-card__link">
                    Read article <i className="bx bx-right-arrow-alt"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="featured-updates__cta-mobile">
          <Button variant="outline" to="/visa-updates" icon="bx-right-arrow-alt" fullWidth>
            View All Updates
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default FeaturedUpdatesSection