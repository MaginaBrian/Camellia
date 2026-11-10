import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Seasons() {
  const { t } = useTranslation()
  const months = t('months', { returnObjects: true })
  const [i, setI] = useState(new Date().getMonth())
  const cur = months[i]

  return (
    <section className="section section--tint" id="seasons">
      <div className="wrap seasons">
        <div className="section__head">
          <h2>{t('seasons.heading')}</h2>
          <p>{t('seasons.intro')}</p>
        </div>
        <div className="months" role="group" aria-label={t('seasons.month')}>
          {months.map((x, idx) => (
            <button key={x.m} aria-pressed={i === idx} className={i === idx ? 'is-active' : ''} onClick={() => setI(idx)}>
              {x.m}
            </button>
          ))}
        </div>
        <div className="month-detail" aria-live="polite">
          <dl>
            <div><dt>{t('seasons.weather')}</dt><dd>{cur.climate}</dd></div>
            <div><dt>{t('seasons.visitors')}</dt><dd>{cur.crowds}</dd></div>
          </dl>
          <p>{cur.note}</p>
        </div>
      </div>
    </section>
  )
}
