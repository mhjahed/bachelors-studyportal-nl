import React from 'react'
import './ContactInfoCards.scss'

const INFO = [
  {
    icon: 'bx-envelope',
    label: 'Email',
    value: 'infogicuofficial@gmail.com',
    href: 'mailto:infogicuofficial@gmail.com',
  },
  {
    icon: 'bx-time',
    label: 'Response Time',
    value: 'Within 12 hours',
    subtext: 'Monday to Friday',
  },
  {
    icon: 'bx-map',
    label: 'Location',
    value: 'Netherlands',
    subtext: 'Serving international students worldwide',
  },
]

function ContactInfoCards() {
  return (
    <div className="contact-info-cards">
      {INFO.map((item) => (
        <div key={item.label} className="contact-info-card">
          <div className="contact-info-card__accent" />
          <span className="contact-info-card__label">{item.label}</span>

          {item.href ? (
            <a href={item.href} className="contact-info-card__value contact-info-card__value--link">
              {item.value}
            </a>
          ) : (
            <span className="contact-info-card__value">{item.value}</span>
          )}

          {item.subtext && (
            <span className="contact-info-card__subtext">{item.subtext}</span>
          )}
        </div>
      ))}
    </div>
  )
}

export default ContactInfoCards