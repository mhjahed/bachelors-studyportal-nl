import React from 'react'
import { Input, Select } from '@components/common'
import './FilterBar.scss'

function FilterBar({
  search,
  onSearchChange,
  location,
  onLocationChange,
  locations = [],
  resultsCount,
  totalCount,
  onReset,
}) {
  const hasFilters = search || (location && location !== 'all')

  return (
    <div className="filter-bar">
      <div className="filter-bar__row">
        <div className="filter-bar__search">
          <Input
            placeholder="Search by name, city or keyword..."
            icon="bx-search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="filter-bar__select">
          <Select
            placeholder="All Locations"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            options={[
              { value: 'all', label: 'All Locations' },
              ...locations.map((loc) => ({ value: loc, label: loc })),
            ]}
          />
        </div>
      </div>

      <div className="filter-bar__meta">
        <span className="filter-bar__count">
          Showing <strong>{resultsCount}</strong> of {totalCount} universities
        </span>
        {hasFilters && (
          <button type="button" className="filter-bar__reset" onClick={onReset}>
            <i className="bx bx-x"></i>
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}

export default FilterBar