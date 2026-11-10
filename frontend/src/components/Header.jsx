import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import journeys from '../../../backend/journeys.json'
import { languages } from '../i18n.js'
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

export default function Header({ view, onPlan, onPick, onAskJourney }) {
  const { t, i18n } = useTranslation()
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
      <div className="header__bar">
        <div className="wrap header__inner">
        <a className="brand" href="#top" aria-label={t('nav.home')} onClick={closeMenus}>
          <img className="brand__mark" src="/images/logo-mark.png" alt="" />
          <span>{brand.name}</span>
        </a>
        <div className="header__end">
        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label={t('nav.main')}>
          <button
            className="nav__link"
            type="button"
            aria-expanded={destOpen}
            aria-controls="dest-panel"
            onClick={() => { setDestOpen((v) => !v); setJourneysOpen(false); setOpen(false) }}
          >
            {t('nav.destinations')}
          </button>
          <button
            className="nav__link"
            type="button"
            aria-expanded={journeysOpen}
            aria-controls="journey-panel"
            onClick={() => { setJourneysOpen((v) => !v); setDestOpen(false); setOpen(false) }}
          >
            {t('nav.journeys')}
          </button>
          <a href="#philanthropy" aria-current={view === 'philanthropy' ? 'page' : undefined} onClick={closeMenus}>{t('nav.philanthropy')}</a>
          <a href="#seasons" onClick={closeMenus}>{t('nav.when')}</a>
          <button className="btn btn--camellia nav__cta" type="button" onClick={() => plan({})}>{t('nav.planTrip')}</button>
        </nav>
        <label className="lang">
          <span className="sr-only">{t('lang.label')}</span>
          <select
            aria-label={t('lang.label')}
            value={i18n.language.slice(0, 2)}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            {languages.map((language) => (
              <option key={language.code} value={language.code}>{language.label}</option>
            ))}
          </select>
        </label>
        <button className="menu-btn" aria-expanded={open} aria-label={t('nav.menu')} onClick={() => { setOpen((o) => !o); setDestOpen(false); setJourneysOpen(false) }}>
          <span /><span />
        </button>
        </div>
        </div>
      </div>
      <div className="util">
        <div className="wrap util__inner">
          <a className="util__phone" href={brand.phoneHref}>
            <span className="util__speak">{t('nav.speak')}</span> {brand.phone}
          </a>
          <div className="util__right">
            <a href="#agents" onClick={closeMenus}>
              <span className="util__long">{t('nav.agentsLong')}</span>
              <span className="util__short">{t('nav.agentsShort')}</span>
            </a>
            <a className="util__email" href={`mailto:${brand.email}`}>{brand.email}</a>
          </div>
        </div>
      </div>
      {destOpen && (
        <div className="dest" id="dest-panel" role="region" aria-label={t('nav.destinationsPanel')}>
          <figure className="dest__photo">
            <img src={current.image} alt={t(`destinations.${current.id}.alt`)} />
            <figcaption>{t(`destinations.${current.id}.credit`)}</figcaption>
          </figure>
          <div className="dest__col">
            <p className="kicker">{t('nav.countries')}</p>
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
                    {t(`destinations.${d.id}.name`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="dest__col">
            <p className="kicker">{t('nav.places')}</p>
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
        <div className="dest dest--journeys" id="journey-panel" role="region" aria-label={t('nav.journeysPanel')}>
          <figure className="dest__photo">
            <img src={currentSet.image} alt={t(`journeySets.${currentSet.id}.alt`)} />
            <figcaption>{t(`journeySets.${currentSet.id}.credit`)}</figcaption>
          </figure>
          {journeySets.map((set) => (
            <div className="dest__col" key={set.id} onMouseEnter={() => setJourneyCat(set.id)}>
              <button type="button" className="kicker kicker--btn" onClick={() => pickCategory(set.id)}>{t(`categories.${set.id}`)}</button>
              <ul>
                {journeys.filter((journey) => journey.category === set.id).map((journey) => (
                  <li key={journey.id}>
                    <button type="button" onFocus={() => setJourneyCat(set.id)} onClick={() => askJourney(journey)}>
                      {t(`journeys.${journey.id}.title`)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="dest__foot">
            <button type="button" className="link" onClick={() => pickCategory('all')}>{t('nav.allJourneys')}</button>
          </div>
        </div>
      )}
    </header>
  )
}
