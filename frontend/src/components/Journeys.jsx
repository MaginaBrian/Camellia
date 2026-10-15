import { useEffect, useState } from 'react'
import { getJourneys } from '../api.js'
import { destinations } from '../content.js'

const price = (n) => `$${n.toLocaleString('en-US')}`

export default function Journeys({ destination, place, onClear, onAsk }) {
  const [all, setAll] = useState([])
  const [filter, setFilter] = useState('All')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => { getJourneys().then(setAll) }, [])
  useEffect(() => { setFilter('All') }, [destination, place])

  const pool = all.filter((j) => {
    if (place) return (j.places || []).includes(place)
    if (destination) return (j.destinations || []).includes(destination)
    return true
  })
  const narrowed = Boolean(destination || place)
  const listed = !narrowed && !showAll ? pool.filter((j) => j.lead) : pool
  const cats = ['All', ...new Set(listed.map((j) => j.category))]
  const shown = filter === 'All' ? listed : listed.filter((j) => j.category === filter)
  const country = destinations.find((d) => d.id === destination)

  let heading = 'Journeys we plan most often'
  if (place) heading = `Journeys in ${place}`
  else if (destination === 'coast') heading = 'Journeys on the coast'
  else if (country) heading = `Journeys in ${country.name}`

  return (
    <section className="section" id="journeys">
      <div className="wrap">
        <div className="section__head">
          <h2>{heading}</h2>
          <p>Every one is a starting point. Tell us your dates and who is travelling, and we will reshape it.</p>
        </div>
        {(narrowed || showAll) && cats.length > 2 && (
          <div className="tabs" role="tablist" aria-label="Journey type">
            {cats.map((c) => (
              <button key={c} type="button" role="tab" aria-selected={filter === c} className={filter === c ? 'is-active' : ''} onClick={() => setFilter(c)}>
                {c}
              </button>
            ))}
          </div>
        )}
        <ul className="journeys">
          {shown.map((j) => (
            <li key={j.id} className="journey">
              <img className="journey__art" src={j.image} alt="" />
              <div className="journey__body">
                <p className="journey__meta">{j.category}, {j.days} days</p>
                <h3>{j.title}</h3>
                <p>{j.blurb}</p>
                <div className="journey__foot">
                  <span>From {price(j.from)} per person</span>
                  <button className="link" type="button" onClick={() => onAsk(j)}>Ask about this journey</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="journeys__more">
          {!narrowed && !showAll && pool.length > listed.length && (
            <button className="link" type="button" onClick={() => setShowAll(true)}>All journeys</button>
          )}
          {(narrowed || showAll) && (
            <button className="link" type="button" onClick={() => { setShowAll(false); onClear() }}>Show the main journeys</button>
          )}
        </div>
        <p className="fineprint">
          Prices are guides for two travellers sharing and change with season and camp choice.
          Journey photographs: Ray in Manila; Charles J. Sharp; Bernard Dupont; Joel Peel; Andy Witchger; Anton Zelenov. Via Wikimedia Commons.
        </p>
      </div>
    </section>
  )
}
