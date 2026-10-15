import { useState } from 'react'
import { months } from '../content.js'

export default function Seasons() {
  const [i, setI] = useState(new Date().getMonth())
  const cur = months[i]

  return (
    <section className="section section--tint" id="seasons">
      <div className="wrap seasons">
        <div className="section__head">
          <h2>When to go</h2>
          <p>Pick a month to see what the weather, the crowds and the wildlife are usually like. Patterns shift from year to year, so we confirm details when we plan your trip.</p>
        </div>
        <div className="months" role="group" aria-label="Month">
          {months.map((x, idx) => (
            <button key={x.m} aria-pressed={i === idx} className={i === idx ? 'is-active' : ''} onClick={() => setI(idx)}>
              {x.m}
            </button>
          ))}
        </div>
        <div className="month-detail" aria-live="polite">
          <dl>
            <div><dt>Weather</dt><dd>{cur.climate}</dd></div>
            <div><dt>Visitors</dt><dd>{cur.crowds}</dd></div>
          </dl>
          <p>{cur.note}</p>
        </div>
      </div>
    </section>
  )
}
