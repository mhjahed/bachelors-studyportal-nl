import React from 'react'
import ArticleCard from '../../VisaUpdates/components/ArticleCard.jsx'
import { SectionHeading } from '@components/common'
import './RelatedArticles.scss'

function RelatedArticles({ articles = [] }) {
  if (articles.length === 0) return null

  return (
    <section className="related-articles">
      <SectionHeading
        eyebrow="Keep Reading"
        title="Related Articles"
        size="sm"
        align="center"
        className="related-articles__heading"
      />
      <div className="related-articles__grid">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

export default RelatedArticles