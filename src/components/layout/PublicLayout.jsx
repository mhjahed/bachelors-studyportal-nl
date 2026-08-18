import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import PublicNavbar from '../navigation/PublicNavbar.jsx'
import Footer from '../navigation/Footer.jsx'
import './PublicLayout.scss'

// Routes that have a full-bleed hero (navbar starts transparent)
const HERO_ROUTES = ['/']

function PublicLayout() {
  const location = useLocation()
  const hasHero = HERO_ROUTES.includes(location.pathname)

  return (
    <div className="public-layout">
      <PublicNavbar />
      <main className={`public-layout__main ${!hasHero ? 'public-layout__main--offset' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout