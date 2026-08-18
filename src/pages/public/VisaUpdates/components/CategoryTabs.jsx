import React from 'react'
import './CategoryTabs.scss'

function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="category-tabs">
      <div className="category-tabs__inner">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            className={`category-tabs__tab ${active === cat.value ? 'category-tabs__tab--active' : ''}`}
            onClick={() => onChange(cat.value)}
          >
            {cat.label}
            {cat.count !== undefined && (
              <span className="category-tabs__count">{cat.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryTabs