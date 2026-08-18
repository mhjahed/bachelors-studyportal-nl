import React from 'react'
import { Button } from '@components/common'
import './ProgressPanel.scss'

function ProgressPanel({
  totalRequired,
  completedRequired,
  totalOptional,
  completedOptional,
  onReset,
}) {
  const percentage = totalRequired > 0
    ? Math.round((completedRequired / totalRequired) * 100)
    : 0

  const circumference = 2 * Math.PI * 52
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="progress-panel">
      <div className="progress-panel__ring-wrap">
        <svg className="progress-panel__ring" viewBox="0 0 120 120">
          <circle
            className="progress-panel__ring-bg"
            cx="60"
            cy="60"
            r="52"
            fill="none"
            strokeWidth="10"
          />
          <circle
            className="progress-panel__ring-fill"
            cx="60"
            cy="60"
            r="52"
            fill="none"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="progress-panel__ring-content">
          <span className="progress-panel__percentage">{percentage}%</span>
          <span className="progress-panel__percentage-label">Complete</span>
        </div>
      </div>

      <div className="progress-panel__stats">
        <div className="progress-panel__stat">
          <span className="progress-panel__stat-value">
            {completedRequired}<span className="progress-panel__stat-total">/{totalRequired}</span>
          </span>
          <span className="progress-panel__stat-label">Required Documents</span>
        </div>

        <div className="progress-panel__stat progress-panel__stat--divider">
          <span className="progress-panel__stat-value">
            {completedOptional}<span className="progress-panel__stat-total">/{totalOptional}</span>
          </span>
          <span className="progress-panel__stat-label">Optional Documents</span>
        </div>
      </div>

      <div className="progress-panel__actions">
        <div className="progress-panel__note">
          <i className="bx bx-info-circle"></i>
          <span>Your progress is saved on this device.</span>
        </div>
        {(completedRequired > 0 || completedOptional > 0) && (
          <Button
            variant="ghost"
            size="sm"
            icon="bx-refresh"
            iconPos="left"
            onClick={onReset}
          >
            Reset Progress
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProgressPanel