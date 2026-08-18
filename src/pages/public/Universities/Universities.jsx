import React, { useEffect, useMemo, useState } from 'react'
import { Container, PageHero, EmptyState } from '@components/common'
import { UniversityService } from '@services'
import UniversityCard from './components/UniversityCard.jsx'
import FilterBar from './components/FilterBar.jsx'
import './Universities.scss'

function Universities() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('all')

  const allUniversities = useMemo(() => UniversityService.getActive(), [])
  const locations = useMemo(() => UniversityService.getLocations(), [])

  const filtered = useMemo(() => {
    let list = allUniversities

    if (location !== 'all') {
      list = list.filter((u) => u.location === location)
    }

    if (search.trim()) {
      const query = search.toLowerCase().trim()
      list = list.filter((u) =>
        u.name?.toLowerCase().includes(query) ||
        u.shortName?.toLowerCase().includes(query) ||
        u.location?.toLowerCase().includes(query) ||
        u.description?.toLowerCase().includes(query)
      )
    }

    // Featured first, then by ranking
    return [...list].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return (a.ranking || 999) - (b.ranking || 999)
    })
  }, [allUniversities, search, location])

  const handleReset = () => {
    setSearch('')
    setLocation('all')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="universities-page">
      <PageHero
        eyebrow="Universities"
        title="Universities of Applied Sciences"
        subtitle="Explore top Dutch universities offering bachelor programs in English. Compare locations, programs and admission requirements."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Universities' },
        ]}
      />

      <Container size="lg" className="universities-page__body">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          location={location}
          onLocationChange={setLocation}
          locations={locations}
          resultsCount={filtered.length}
          totalCount={allUniversities.length}
          onReset={handleReset}
        />

        {filtered.length === 0 ? (
          <EmptyState
            icon="bx-search-alt"
            title="No universities match your filters"
            description="Try adjusting your search terms or clearing the filters."
            action={{ label: 'Clear filters', onClick: handleReset, icon: 'bx-refresh' }}
          />
        ) : (
          <div className="universities-page__grid">
            {filtered.map((uni) => (
              <UniversityCard key={uni.id} university={uni} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default Universities