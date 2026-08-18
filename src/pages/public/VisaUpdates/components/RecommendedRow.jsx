import React from 'react'
import { SectionHeading } from '@components/common'
import ArticleCard from './ArticleCard.jsx'
import './RecommendedRow.scss'

function RecommendedRow({ articles = [] }) {
  if (articles.length === 0) return null

  return (
    <section className="recommended-row">
      <SectionHeading
        eyebrow="Editor's Picks"
        title="Recommended Reading"
        size="sm"
        className="recommended-row__heading"
      />
      <div className="recommended-row__grid">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

export default RecommendedRow