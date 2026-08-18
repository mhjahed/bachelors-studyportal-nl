import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Container, EmptyState } from '@components/common'
import { InstructionService } from '@services'
import { PageHero } from '@components/common'
import CategorySidebar from './components/CategorySidebar.jsx'
import InstructionCard from './components/InstructionCard.jsx'
import './Instructions.scss'

function Instructions() {
  const [activeSlug, setActiveSlug] = useState(null)
  const contentRef = useRef(null)

  const categories = useMemo(() => InstructionService.getCategories(), [])
  const allInstructions = useMemo(() => InstructionService.getActive(), [])

  // Initialize active category
  useEffect(() => {
    if (categories.length > 0 && !activeSlug) {
      setActiveSlug(categories[0].slug)
    }
  }, [categories, activeSlug])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const visibleInstructions = useMemo(() => {
    if (!activeSlug) return allInstructions
    return allInstructions.filter((i) => i.categorySlug === activeSlug)
  }, [activeSlug, allInstructions])

  const handleCategorySelect = (slug) => {
    setActiveSlug(slug)

    // Smooth scroll to the top of the content area on mobile
    if (window.innerWidth < 992 && contentRef.current) {
      const y = contentRef.current.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="instructions-page">
      <PageHero
        eyebrow="Complete Guidance"
        title="Instructions for Every Stage"
        subtitle="Detailed guidance for every step of your Netherlands journey — from application to arrival."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Instructions' },
        ]}
      />

      <Container size="lg" className="instructions-page__body">
        <div className="instructions-page__layout">
          <div className="instructions-page__sidebar">
            <CategorySidebar
              categories={categories}
              activeSlug={activeSlug}
              onSelect={handleCategorySelect}
            />
          </div>

          <div className="instructions-page__content" ref={contentRef}>
            {visibleInstructions.length === 0 ? (
              <EmptyState
                icon="bx-book-open"
                title="No instructions in this category"
                description="Content for this category will be added soon."
              />
            ) : (
              <div className="instructions-page__list">
                {visibleInstructions.map((instruction) => (
                  <InstructionCard key={instruction.id} instruction={instruction} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Instructions