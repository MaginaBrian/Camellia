import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getJourneys } from '../api.js'
import { destinations } from '../content.js'

export default function Journeys({ destination, place, category = '', onClear, onAsk }) {
  const { t, i18n } = useTranslation()
  const [all, setAll] = useState([])
  const [filter, setFilter] = useState('All')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => { getJourneys().then(setAll) }, [])
  useEffect(() => { setFilter('All') }, [destination, place, category])

  const numberLocale = { en: 'en-US', es: 'es-ES', pt: 'pt-PT', fr: 'fr-FR', de: 'de-DE' }[i18n.language.slice(0, 2)] || 'en-US'
  const price = (n) => `$${n.toLocaleString(numberLocale)}`
  const pool = all.filter((j) => {
    if (place) return (j.places || []).includes(place)
    if (destination) return (j.destinations || []).includes(destination)
    return true
  })
  const byCategory = category && category !== 'all' ? pool.filter((j) => j.category === category) : pool
  const narrowed = Boolean(destination || place || (category && category !== 'all'))
  const expanded = showAll || category === 'all'
  const listed = !narrowed && !expanded ? byCategory.filter((j) => j.lead) : byCategory
  const cats = ['All', ...new Set(listed.map((j) => j.category))]
  const shown = filter === 'All' ? listed : listed.filter((j) => j.category === filter)
  const country = destinations.find((d) => d.id === destination)

  let heading = t('journeysHead.usual')
  if (place) heading = t('journeysHead.in', { place })
  else if (destination === 'coast') heading = t('journeysHead.coast')
  else if (country) heading = t('journeysHead.in', { place: t(`destinations.${country.id}.name`) })
  else if (category && category !== 'all') heading = t('journeysHead.category', { category: t(`categories.${category}`) })
  else if (expanded) heading = t('journeysHead.all')

  return (
    <section className="section section--journeys" id="journeys">
      <div className="wrap">
        <div className="section__head">
          <h2>{heading}</h2>
          <p>{t('journeysHead.intro')}</p>
        </div>
        {(narrowed || expanded) && cats.length > 2 && (
          <div className="tabs" role="tablist" aria-label={t('journeysHead.type')}>
            {cats.map((c) => (
              <button key={c} type="button" role="tab" aria-selected={filter === c} className={filter === c ? 'is-active' : ''} onClick={() => setFilter(c)}>
                {t(`categories.${c}`)}
              </button>
            ))}
          </div>
        )}
        <ul className="journeys">
          {shown.map((j) => (
            <li key={j.id} className="journey">
              <img className="journey__art" src={j.image} alt="" />
              <div className="journey__body">
                <p className="journey__meta">{t(`categories.${j.category}`)}, {t('journeysHead.days', { count: j.days })}{(j.places || []).length ? ` · ${(j.places || []).join(', ')}` : ''}</p>
                <h3>{t(`journeys.${j.id}.title`)}</h3>
                <p>{t(`journeys.${j.id}.blurb`)}</p>
                <div className="journey__foot">
                  <span>{t('journeysHead.from', { price: price(j.from) })}</span>
                  <button className="link" type="button" onClick={() => onAsk(j)}>{t('journeysHead.ask')}</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="journeys__more">
          {!narrowed && !expanded && pool.length > listed.length && (
            <button className="link" type="button" onClick={() => setShowAll(true)}>{t('journeysHead.all')}</button>
          )}
          {(narrowed || expanded) && (
            <button className="link" type="button" onClick={() => { setShowAll(false); onClear() }}>{t('journeysHead.showMain')}</button>
          )}
        </div>
        <p className="fineprint">{t('journeysHead.fineprint')}</p>
      </div>
    </section>
  )
}
