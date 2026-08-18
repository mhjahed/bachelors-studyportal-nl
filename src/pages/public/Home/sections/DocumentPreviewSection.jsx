import React, { useMemo } from 'react'
import { Container, SectionHeading, Button, Badge } from '@components/common'
import { DocumentService } from '@services'
import './DocumentPreviewSection.scss'

function DocumentPreviewSection() {
  const preview = useMemo(() => {
    const docs = DocumentService.getActive()
    const required = docs.filter((d) => d.required).slice(0, 5)
    return {
      total: docs.length,
      requiredCount: docs.filter((d) => d.required).length,
      list: required,
    }
  }, [])

  return (
    <section className="document-preview">
      <Container size="lg">
        <div className="document-preview__grid">
          <div className="document-preview__intro">
            <SectionHeading
              eyebrow="Documents"
              title="Master Document Checklist"
              subtitle="Every document you need — organized by stage and requirement. Track your progress as you prepare."
              size="lg"
            />

            <div className="document-preview__stats">
              <div className="document-preview__stat">
                <span className="document-preview__stat-value">{preview.total}</span>
                <span className="document-preview__stat-label">Total Documents</span>
              </div>
              <div className="document-preview__stat">
                <span className="document-preview__stat-value">{preview.requiredCount}</span>
                <span className="document-preview__stat-label">Required</span>
              </div>
              <div className="document-preview__stat">
                <span className="document-preview__stat-value">4</span>
                <span className="document-preview__stat-label">Stages</span>
              </div>
            </div>

            <Button variant="primary" size="lg" to="/documents" icon="bx-right-arrow-alt">
              Open Full Checklist
            </Button>
          </div>

          <div className="document-preview__list">
            <div className="document-preview__list-header">
              <i className="bx bx-list-check"></i>
              <span>Essential Documents</span>
            </div>
            <ul className="document-preview__items">
              {preview.list.map((doc, index) => (
                <li key={doc.id} className="document-preview__item">
                  <span className="document-preview__item-number">{String(index + 1).padStart(2, '0')}</span>
                  <div className="document-preview__item-body">
                    <span className="document-preview__item-title">{doc.name}</span>
                    <span className="document-preview__item-stage">{doc.stage}</span>
                  </div>
                  <Badge variant="danger" size="sm">Required</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default DocumentPreviewSection