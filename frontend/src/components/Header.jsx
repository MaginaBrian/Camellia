import { useEffect, useState } from 'react'
import journeys from '../../../backend/journeys.json'
import { brand, destinations } from '../content.js'

const journeySets = [
  {
    id: 'Safari',
    image: '/images/journeys/northern-circuit.jpg',
    alt: 'Elephants in the Maasai Mara',
    credit: 'Elephants, Maasai Mara. Photo: Ray in Manila, CC BY 2.0',
  },
  {
    id: 'Trek',
    image: '/images/journeys/kilimanjaro.jpg',
    alt: 'The summit of Kilimanjaro above the clouds',
    credit: 'Kilimanjaro. Photo: Joel Peel, CC0',
  },
  {
    id: 'Beach',
    image: '/images/journeys/island.jpg',
    alt: 'A dhow on the water at Zanzibar',
    credit: 'Dhow, Zanzibar. Photo: Anton Zelenov, CC BY-SA 3.0',
  },
]

export function Mark({ size = 28 }) {
  const petals = [0, 72, 144, 216, 288]
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      {petals.map((r) => (
        <ellipse key={r} cx="20" cy="11" rx="6.5" ry="9" transform={`rotate(${r} 20 20)`} fill="currentColor" opacity="0.55" />
      ))}
      {petals.map((r) => (
        <ellipse key={`i${r}`} cx="20" cy="14" rx="4" ry="6" transform={`rotate(${r + 36} 20 20)`} fill="currentColor" />
      ))}
      <circle cx="20" cy="20" r="2.6" fill="var(--gold)" />
    </svg>
  )
}

export default function Header({ onPlan, onPick, onAskJourney }) {
  const [open, setOpen] = useState(false)
  const [destOpen, setDestOpen] = useState(false)
  const [journeysOpen, setJourneysOpen] = useState(false)
  const [active, setActive] = useState(destinations[0].id)
  const [journeyCat, setJourneyCat] = useState(journeySets[0].id)
  const current = destinations.find((d) => d.id === active) || destinations[0]
  const currentSet = journeySets.find((set) => set.id === journeyCat) || journeySets[0]
  const panelOpen = destOpen || journeysOpen

  useEffect(() => {
    if (!panelOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDestOpen(false)
        setJourneysOpen(false)
      }
    }
    const onDown = (e) => {
      if (!e.target.closest('.header')) {
        setDestOpen(false)
        setJourneysOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [panelOpen])

  function closeMenus() {
    setOpen(false)
    setDestOpen(false)
    setJourneysOpen(false)
  }

  function pick(destination, place) {
    onPick({ destination, place, category: '' })
    closeMenus()
  }

  function pickCategory(category) {
    onPick({ destination: '', place: '', category })
    closeMenus()
  }

  function plan(partial) {
    closeMenus()
    onPlan(partial)
  }

  function askJourney(journey) {
    closeMenus()
    onAskJourney(journey)
  }

  return (
    <header className="header">
      <div className="util">
        <div className="wrap util__inner">
          <a className="util__phone" href={brand.phoneHref}>
            <span className="util__speak">Speak to us</span> {brand.phone}
          </a>
          <div className="util__right">
            <a href="#agents" onClick={closeMenus}>
              <span className="util__long">For travel agents</span>
              <span className="util__short">Advisors</span>
            </a>
            <a className="util__email" href={`mailto:${brand.email}`}>{brand.email}</a>
          </div>
        </div>
      </div>
      <div className="header__bar wrap">
        <a className="brand" href="#top" aria-label={`${brand.name}, home`} onClick={closeMenus}>
          <Mark />
          <span>{brand.name}</span>
        </a>
        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main">
          <button
            className="nav__link"
            type="button"
            aria-expanded={destOpen}
            aria-controls="dest-panel"
            onClick={() => { setDestOpen((v) => !v); setJourneysOpen(false); setOpen(false) }}
          >
            Destinations
          </button>
          <button
            className="nav__link"
            type="button"
            aria-expanded={journeysOpen}
            aria-controls="journey-panel"
            onClick={() => { setJourneysOpen((v) => !v); setDestOpen(false); setOpen(false) }}
          >
            Journeys
          </button>
          <a href="#philanthropy" onClick={closeMenus}>Philanthropy</a>
          <a href="#seasons" onClick={closeMenus}>When to go</a>
          <button className="btn btn--camellia nav__cta" type="button" onClick={() => plan({})}>Plan a trip</button>
        </nav>
        <button className="menu-btn" aria-expanded={open} aria-label="Menu" onClick={() => { setOpen((o) => !o); setDestOpen(false); setJourneysOpen(false) }}>
          <span /><span />
        </button>
      </div>
      {destOpen && (
        <div className="dest" id="dest-panel" role="region" aria-label="Destinations">
          <figure className="dest__photo">
            <img src={current.image} alt={current.alt} />
            <figcaption>{current.credit}</figcaption>
          </figure>
          <div className="dest__col">
            <p className="kicker">Countries</p>
            <ul>
              {destinations.map((d) => (
                <li key={d.id}>
                  <button
                    type="button"
                    className={active === d.id ? 'is-active' : ''}
                    onMouseEnter={() => setActive(d.id)}
                    onFocus={() => setActive(d.id)}
                    onClick={() => pick(d.id, '')}
                  >
                    {d.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="dest__col">
            <p className="kicker">Places</p>
            <ul>
              {current.places.map((place) => (
                <li key={place}>
                  <button type="button" onClick={() => pick(current.id, place)}>{place}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {journeysOpen && (
        <div className="dest dest--journeys" id="journey-panel" role="region" aria-label="Journeys">
          <figure className="dest__photo">
            <img src={currentSet.image} alt={currentSet.alt} />
            <figcaption>{currentSet.credit}</figcaption>
          </figure>
          {journeySets.map((set) => (
            <div className="dest__col" key={set.id} onMouseEnter={() => setJourneyCat(set.id)}>
              <button type="button" className="kicker kicker--btn" onClick={() => pickCategory(set.id)}>{set.id}</button>
              <ul>
                {journeys.filter((journey) => journey.category === set.id).map((journey) => (
                  <li key={journey.id}>
                    <button type="button" onFocus={() => setJourneyCat(set.id)} onClick={() => askJourney(journey)}>
                      {journey.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="dest__foot">
            <button type="button" className="link" onClick={() => pickCategory('all')}>All journeys</button>
          </div>
        </div>
      )}
    </header>
  )
}
