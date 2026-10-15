import { useEffect, useState } from 'react'
import { brand, destinations } from '../content.js'

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

export default function Header({ onPlan, onPick }) {
  const [open, setOpen] = useState(false)
  const [destOpen, setDestOpen] = useState(false)
  const [active, setActive] = useState(destinations[0].id)
  const current = destinations.find((d) => d.id === active) || destinations[0]

  useEffect(() => {
    if (!destOpen) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setDestOpen(false) }
    const onDown = (e) => { if (!e.target.closest('.header')) setDestOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [destOpen])

  function pick(destination, place) {
    onPick({ destination, place })
    setDestOpen(false)
    setOpen(false)
    document.getElementById('journeys')?.scrollIntoView({ behavior: 'smooth' })
  }

  function plan(partial) {
    setOpen(false)
    setDestOpen(false)
    onPlan(partial)
  }

  return (
    <header className="header">
      <div className="header__bar wrap">
        <a className="brand" href="#top" aria-label={`${brand.name}, home`} onClick={() => { setOpen(false); setDestOpen(false) }}>
          <Mark />
          <span>{brand.name}</span>
        </a>
        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main">
          <button
            className="nav__link"
            type="button"
            aria-expanded={destOpen}
            aria-controls="dest-panel"
            onClick={() => { setDestOpen((v) => !v); setOpen(false) }}
          >
            Destinations
          </button>
          <a href="#journeys" onClick={() => { setOpen(false); setDestOpen(false) }}>Journeys</a>
          <a href="#seasons" onClick={() => { setOpen(false); setDestOpen(false) }}>When to go</a>
          <button className="nav__link" type="button" onClick={() => plan({ advisor: 'yes', topic: 'Travel agent partnership', message: 'I am a travel advisor and would like to work with you on a trip.' })}>
            For travel agents
          </button>
          <button className="btn btn--camellia nav__cta" type="button" onClick={() => plan({})}>Plan a trip</button>
        </nav>
        <button className="menu-btn" aria-expanded={open} aria-label="Menu" onClick={() => { setOpen((o) => !o); setDestOpen(false) }}>
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
    </header>
  )
}
