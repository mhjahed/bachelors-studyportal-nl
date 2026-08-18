import React, { useEffect, useMemo, useState } from 'react'
import { Container, PageHero, SectionHeading, EmptyState } from '@components/common'
import { BlogService } from '@services'
import CategoryTabs from './components/CategoryTabs.jsx'
import FeaturedArticle from './components/FeaturedArticle.jsx'
import RecommendedRow from './components/RecommendedRow.jsx'
import ArticleCard from './components/ArticleCard.jsx'
import './VisaUpdates.scss'

function VisaUpdates() {
  const [activeCategory, setActiveCategory] = useState('all')

  const allArticles = useMemo(() => BlogService.getPublished(), [])
  const featured = useMemo(() => {
    const f = BlogService.getFeatured()
    return f.length > 0 ? f[0] : allArticles[0] || null
  }, [allArticles])
  const recommended = useMemo(() => BlogService.getRecommended(), [])

  const categoryList = useMemo(() => {
    const set = new Set(allArticles.map((a) => a.category))
    const cats = [{ value: 'all', label: 'All Articles', count: allArticles.length }]
    Array.from(set).forEach((cat) => {
      cats.push({
        value: cat,
        label: cat,
        count: allArticles.filter((a) => a.category === cat).length,
      })
    })
    return cats
  }, [allArticles])

  const filtered = useMemo(() => {
    // Exclude the featured article from the main grid (already shown above)
    const list = activeCategory === 'all'
      ? allArticles
      : allArticles.filter((a) => a.category === activeCategory)
    return list.filter((a) => a.id !== featured?.id)
  }, [activeCategory, allArticles, featured])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="visa-updates-page">
      <PageHero
        eyebrow="Visa Updates"
        title="Latest News for Netherlands Students"
        subtitle="Stay informed with the most recent immigration updates, embassy news and study guides."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Visa Updates' },
        ]}
      />

      <CategoryTabs
        categories={categoryList}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      <Container size="lg" className="visa-updates-page__body">
        {activeCategory === 'all' && featured && (
          <section className="visa-updates-page__featured-section">
            <FeaturedArticle article={featured} />
          </section>
        )}

        {activeCategory === 'all' && recommended.length > 0 && (
          <RecommendedRow articles={recommended} />
        )}

        <section className="visa-updates-page__list-section">
          <SectionHeading
            eyebrow={activeCategory === 'all' ? 'All Articles' : activeCategory}
            title={activeCategory === 'all' ? 'Latest Articles' : activeCategory}
            size="md"
            className="visa-updates-page__list-heading"
          />

          {filtered.length === 0 ? (
            <EmptyState
              icon="bx-news"
              title="No articles in this category"
              description="Check back soon for new content."
            />
          ) : (
            <div className="visa-updates-page__grid">
              {filtered.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>
      </Container>
    </div>
  )
}

export default VisaUpdates