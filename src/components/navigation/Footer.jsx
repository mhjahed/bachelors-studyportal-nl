import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import './Footer.scss'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__container">
          <div className="footer__grid">
            <div className="footer__brand">
              <Logo variant="light" size="sm" />
              <p className="footer__tagline">
                Your complete guide to studying in the Netherlands. Supporting students through every step of the journey.
              </p>
            </div>

            <div className="footer__section">
              <h4 className="footer__heading">Platform</h4>
              <ul className="footer__links">
                <li><Link to="/instructions">Instructions</Link></li>
                <li><Link to="/visa-updates">Visa Updates</Link></li>
                <li><Link to="/universities">Universities</Link></li>
                <li><Link to="/documents">Documents</Link></li>
              </ul>
            </div>

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

            <div className="footer__section">
              <h4 className="footer__heading">Contact</h4>
              <ul className="footer__contact-info">
                <li>
                  <i className="bx bx-envelope"></i>
                  <span>admin@bachelorsportal.nl</span>
                </li>
                <li>
                  <i className="bx bx-map"></i>
                  <span>Netherlands</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__container">
          <p className="footer__copyright">
            &copy; {currentYear} Bachelors Portal Netherlands. All rights reserved.
          </p>
          <p className="footer__note">
            This is a student support platform. Not affiliated with any government body.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer