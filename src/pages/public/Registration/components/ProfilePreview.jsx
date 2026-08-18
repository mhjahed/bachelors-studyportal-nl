import React, { useState } from 'react'
import './ProfilePreview.scss'

function ProfilePreview({ src, alt = 'Profile preview', size = 'md', initials }) {
  const [errored, setErrored] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const showFallback = !src || errored

  return (
    <div className={`profile-preview profile-preview--${size} ${showFallback ? 'profile-preview--fallback' : ''}`}>
      {showFallback ? (
        <span className="profile-preview__initials">{initials || '?'}</span>
      ) : (
        <>
          {!loaded && <div className="profile-preview__loader" />}
          <img
            src={src}
            alt={alt}
            className={`profile-preview__image ${loaded ? 'profile-preview__image--loaded' : ''}`}
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            referrerPolicy="no-referrer"
          />
        </>
      )}
    </div>
  )
}

export default ProfilePreview