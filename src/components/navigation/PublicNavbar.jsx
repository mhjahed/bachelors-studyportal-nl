import React, { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import './PublicNavbar.scss'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Instructions', path: '/instructions' },
  { label: 'Visa Updates', path: '/visa-updates' },
  { label: 'Universities', path: '/universities' },
  { label: 'Documents', path: '/documents' },
  { label: 'Contact', path: '/contact' },
]

// Pages that have a hero image behind the navbar
const HERO_ROUTES = ['/']

function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const isHeroRoute = HERO_ROUTES.includes(location.pathname)
  const isTransparent = isHeroRoute && !scrolled

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 30)
  }, [])

  useEffect(() => {
    handleScroll() // initial check
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navClasses = [
    'public-navbar',
    scrolled && 'public-navbar--scrolled',
    isTransparent && 'public-navbar--transparent',
  ].filter(Boolean).join(' ')

  return (
    <>
      <header className={navClasses}>
        <div className="public-navbar__container">
          <Logo size="sm" variant={isTransparent ? 'light' : 'default'} />

          <nav className="public-navbar__nav" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `public-navbar__link ${isActive ? 'public-navbar__link--active' : ''}`
                }
                end={link.path === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
<div className="public-navbar__actions">
  <a 
    href="https://studyportal-nl.pages.dev/register" 
    className="public-navbar__btn public-navbar__btn--secondary"
    target="_blank" 
    rel="noopener noreferrer"
  >
    Register
  </a>
  <a 
    href="https://studyportal-nl.pages.dev/login" 
    className="public-navbar__btn public-navbar__btn--primary"
    target="_blank" 
    rel="noopener noreferrer"
  >
    Sign In
  </a>
</div>

          <button
            className="public-navbar__mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <i className={`bx ${mobileOpen ? 'bx-x' : 'bx-menu'}`}></i>
          </button>
        </div>
      </header>

      <div
        className={`mobile-nav ${mobileOpen ? 'mobile-nav--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-nav__overlay" onClick={() => setMobileOpen(false)} />
        <div className="mobile-nav__panel">
          <div className="mobile-nav__header">
            <Logo size="sm" />
            <button
              className="mobile-nav__close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <i className="bx bx-x"></i>
            </button>
          </div>

          <nav className="mobile-nav__links">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `mobile-nav__link ${isActive ? 'mobile-nav__link--active' : ''}`
                }
                end={link.path === '/'}
              >
                {link.label}
                <i className="bx bx-chevron-right"></i>
              </NavLink>
            ))}
          </nav>

<div className="mobile-nav__footer">
  <a 
    href="https://studyportal-nl.pages.dev/register" 
    className="public-navbar__btn public-navbar__btn--secondary mobile-nav__btn"
    target="_blank" 
    rel="noopener noreferrer"
  >
    Register
  </a>
  <a 
    href="https://studyportal-nl.pages.dev/login" 
    className="public-navbar__btn public-navbar__btn--primary mobile-nav__btn"
    target="_blank" 
    rel="noopener noreferrer"
  >
    Sign In
  </a>
</div>
        </div>
      </div>
    </>
  )
}

export default PublicNavbar