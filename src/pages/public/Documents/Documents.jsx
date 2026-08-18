import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { Container, PageHero, EmptyState, ConfirmationDialog, useToast } from '@components/common'
import { DocumentService } from '@services'
import ProgressPanel from './components/ProgressPanel.jsx'
import FilterTabs from './components/FilterTabs.jsx'
import StageFilter from './components/StageFilter.jsx'
import DocumentItem from './components/DocumentItem.jsx'
import './Documents.scss'

function Documents() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeStage, setActiveStage] = useState('all')
  const [showRequiredOnly, setShowRequiredOnly] = useState(false)
  const [progress, setProgress] = useState({})
  const [resetOpen, setResetOpen] = useState(false)
  const toast = useToast()

  const allDocs = useMemo(() => DocumentService.getActive(), [])

  useEffect(() => {
    setProgress(DocumentService.getProgress('guest'))
    window.scrollTo(0, 0)
  }, [])

  // Category tabs with counts
  const categoryTabs = useMemo(() => {
    const map = new Map()
    allDocs.forEach((d) => {
      if (!map.has(d.categorySlug)) {
        map.set(d.categorySlug, { value: d.categorySlug, label: d.category, count: 0 })
      }
      map.get(d.categorySlug).count += 1
    })
    return [
      { value: 'all', label: 'All Documents', count: allDocs.length },
      ...Array.from(map.values()),
    ]
  }, [allDocs])

  // Available stages
  const stages = useMemo(() => {
    const set = new Set(allDocs.map((d) => d.stage).filter(Boolean))
    return Array.from(set).sort()
  }, [allDocs])

  // Filter logic
  const visibleDocs = useMemo(() => {
    let list = allDocs

    if (activeCategory !== 'all') {
      list = list.filter((d) => d.categorySlug === activeCategory)
    }
    if (activeStage !== 'all') {
      list = list.filter((d) => d.stage === activeStage)
    }
    if (showRequiredOnly) {
      list = list.filter((d) => d.required)
    }

    // Required first within each stage
    return [...list].sort((a, b) => {
      if (a.required !== b.required) return a.required ? -1 : 1
      return (a.order || 0) - (b.order || 0)
    })
  }, [allDocs, activeCategory, activeStage, showRequiredOnly])

  // Group visible docs by stage for section headers
  const groupedByStage = useMemo(() => {
    const groups = new Map()
    visibleDocs.forEach((doc) => {
      const key = doc.stage || 'Other'
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key).push(doc)
    })
    return Array.from(groups.entries())
  }, [visibleDocs])

  // Stats (based on ALL docs, not filtered)
  const stats = useMemo(() => {
    const required = allDocs.filter((d) => d.required)
    const optional = allDocs.filter((d) => !d.required)
    return {
      totalRequired: required.length,
      completedRequired: required.filter((d) => progress[d.id]).length,
      totalOptional: optional.length,
      completedOptional: optional.filter((d) => progress[d.id]).length,
    }
  }, [allDocs, progress])

  const handleToggle = useCallback((docId, checked) => {
    const next = DocumentService.setDocumentChecked(docId, checked, 'guest')
    setProgress({ ...next })
  }, [])

  const handleResetConfirmed = useCallback(() => {
    DocumentService.clearProgress('guest')
    setProgress({})
    setResetOpen(false)
    toast.success('Progress cleared')
  }, [toast])

  const handleResetFilters = () => {
    setActiveCategory('all')
    setActiveStage('all')
    setShowRequiredOnly(false)
  }

  return (
    <div className="documents-page">
      <PageHero
        eyebrow="Documents"
        title="Master Document Checklist"
        subtitle="Every document you need for your Netherlands journey. Track your progress and stay organized."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Documents' },
        ]}
      />

      <Container size="lg" className="documents-page__body">
        <div className="documents-page__progress-wrap">
          <ProgressPanel
            totalRequired={stats.totalRequired}
            completedRequired={stats.completedRequired}
            totalOptional={stats.totalOptional}
            completedOptional={stats.completedOptional}
            onReset={() => setResetOpen(true)}
          />
        </div>

        <div className="documents-page__filters-wrap">
          <FilterTabs
            categories={categoryTabs}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <StageFilter
          stages={stages}
          active={activeStage}
          onChange={setActiveStage}
          showRequiredOnly={showRequiredOnly}
          onToggleRequired={setShowRequiredOnly}
        />

        {visibleDocs.length === 0 ? (
          <EmptyState
            icon="bx-file"
            title="No documents match your filters"
            description="Try adjusting your filters or clearing them to see all documents."
            action={{ label: 'Clear filters', onClick: handleResetFilters, icon: 'bx-refresh' }}
          />
        ) : (
          <div className="documents-page__groups">
            {groupedByStage.map(([stage, docs]) => (
              <div key={stage} className="documents-page__group">
                <div className="documents-page__group-header">
                  <span className="documents-page__group-line" />
                  <h2 className="documents-page__group-title">{stage}</h2>
                  <span className="documents-page__group-count">
                    {docs.filter((d) => progress[d.id]).length} / {docs.length}
                  </span>
                </div>
                <div className="documents-page__list">
                  {docs.map((doc) => (
                    <DocumentItem
                      key={doc.id}
                      document={doc}
                      checked={!!progress[doc.id]}
                      onToggle={handleToggle}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>

      <ConfirmationDialog
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={handleResetConfirmed}
        variant="warning"
        title="Reset all progress?"
        message="This will clear every checked document. You can always start checking again."
        confirmLabel="Yes, reset"
      />
    </div>
  )
}

export default Documents