import React from 'react'
import './StepIndicator.scss'

function StepIndicator({ steps, currentStep }) {
  return (
    <div className="step-indicator">
      <div className="step-indicator__track">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <React.Fragment key={step.key}>
              <div
                className={`step-indicator__node ${isCompleted ? 'step-indicator__node--completed' : ''} ${isCurrent ? 'step-indicator__node--current' : ''}`}
              >
                <div className="step-indicator__circle">
                  {isCompleted ? <i className="bx bx-check"></i> : stepNumber}
                </div>
                <span className="step-indicator__label">{step.label}</span>
              </div>

              {index < steps.length - 1 && (
                <div className={`step-indicator__connector ${stepNumber < currentStep ? 'step-indicator__connector--completed' : ''}`} />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default StepIndicator