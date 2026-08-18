import React from 'react'
import './CategorySidebar.scss'

/**
 * CategorySidebar — Sticky vertical nav on desktop, horizontal scroll on mobile.
 *
 * @param {Array} categories       - [{ slug, label, icon }]
 * @param {string} activeSlug
 * @param {function} onSelect
 */
function CategorySidebar({ categories = [], activeSlug, onSelect }) {
  return (
    <aside className="category-sidebar">
      <div className="category-sidebar__header">
        <i className="bx bx-category-alt"></i>
        <span>Categories</span>
      </div>
      <nav className="category-sidebar__nav">
        {categories.map((cat) => {
          const isActive = cat.slug === activeSlug
          return (
            <button
              key={cat.slug}
              type="button"
              className={`category-sidebar__item ${isActive ? 'category-sidebar__item--active' : ''}`}
              onClick={() => onSelect(cat.slug)}
            >
              <i className={`bx ${cat.icon || 'bx-file'} category-sidebar__icon`}></i>
              <span className="category-sidebar__label">{cat.label}</span>
              {isActive && <i className="bx bx-chevron-right category-sidebar__arrow"></i>}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default CategorySidebar