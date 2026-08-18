import React, { useEffect } from 'react'
import HeroSection from './sections/HeroSection.jsx'
import JourneySection from './sections/JourneySection.jsx'
import FeaturedUpdatesSection from './sections/FeaturedUpdatesSection.jsx'
import InterviewAssistanceSection from './sections/InterviewAssistanceSection.jsx'
import DocumentPreviewSection from './sections/DocumentPreviewSection.jsx'
import UniversityPreviewSection from './sections/UniversityPreviewSection.jsx'
import FinalCtaSection from './sections/FinalCtaSection.jsx'
import './Home.scss'

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="home">
      <HeroSection />
      <JourneySection />
      <FeaturedUpdatesSection />
      <InterviewAssistanceSection />
      <DocumentPreviewSection />
      <UniversityPreviewSection />
      <FinalCtaSection />
    </div>
  )
}

export default Home