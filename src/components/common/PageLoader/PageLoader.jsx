import React from 'react'
import './PageLoader.scss'

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="page-loader__inner">
        <div className="page-loader__spinner">
          <div className="page-loader__ring"></div>
          <div className="page-loader__ring"></div>
          <div className="page-loader__ring"></div>
        </div>
        <p className="page-loader__text">Loading</p>
      </div>
    </div>
  )
}

export default PageLoader