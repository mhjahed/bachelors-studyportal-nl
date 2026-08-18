import React from 'react'
import { Select } from '@components/common'
import './StageFilter.scss'

function StageFilter({ stages, active, onChange, showRequiredOnly, onToggleRequired }) {
  return (
    <div className="stage-filter">
      <div className="stage-filter__group">
        <label className="stage-filter__label">Filter by stage</label>
        <Select
          value={active}
          onChange={(e) => onChange(e.target.value)}
          options={[
            { value: 'all', label: 'All Stages' },
            ...stages.map((s) => ({ value: s, label: s })),
          ]}
          placeholder=""
        />
      </div>

      <label className="stage-filter__switch">
        <input
          type="checkbox"
          checked={showRequiredOnly}
          onChange={(e) => onToggleRequired(e.target.checked)}
        />
        <span className="stage-filter__switch-track">
          <span className="stage-filter__switch-thumb" />
        </span>
        <span className="stage-filter__switch-label">Required only</span>
      </label>
    </div>
  )
}

export default StageFilter