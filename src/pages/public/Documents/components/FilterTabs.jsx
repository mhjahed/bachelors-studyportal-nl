import React from 'react'
import './FilterTabs.scss'

function FilterTabs({ categories, active, onChange }) {
  return (
    <div className="doc-filter-tabs">
      <div className="doc-filter-tabs__inner">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            className={`doc-filter-tabs__tab ${active === cat.value ? 'doc-filter-tabs__tab--active' : ''}`}
            onClick={() => onChange(cat.value)}
          >
            <span className="doc-filter-tabs__label">{cat.label}</span>
            <span className="doc-filter-tabs__count">{cat.count}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterTabs