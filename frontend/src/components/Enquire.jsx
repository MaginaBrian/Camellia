import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { sendInquiry } from '../api.js'
import { brand, destinations } from '../content.js'

const empty = {
  first: '',
  last: '',
  email: '',
  phone: '',
  advisor: 'no',
  destination: '',
  place: '',
  month: '',
  travelers: '2',
  message: '',
  consent: false,
  website: '',
}

export default function Enquire({ request, onClose }) {
  const { t } = useTranslation()
  const months = t('months', { returnObjects: true })
  const titleId = useId()
  const dialogRef = useRef(null)
  const [form, setForm] = useState(empty)
  const [state, setState] = useState({ status: 'idle', errors: {}, message: '' })

  useEffect(() => {
    setForm({
      ...empty,
      advisor: request.advisor || 'no',
      destination: request.destination || '',
      place: request.place || '',
      message: request.message || '',
    })
    setState({ status: 'idle', errors: {}, message: '' })
  }, [request])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const node = dialogRef.current
    node?.querySelector('input:not(.hp):not([type="checkbox"]):not([type="radio"])')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !node) return
      const items = [...node.querySelectorAll('button, input, select, textarea, a[href]')].filter((el) => !el.disabled && el.tabIndex !== -1)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const country = destinations.find((d) => d.id === form.destination)
  const photo = country
    ? { image: country.image, alt: t(`destinations.${country.id}.alt`), credit: t(`destinations.${country.id}.credit`) }
    : { image: '/images/hero.jpg', alt: t('enquire.fallbackAlt'), credit: t('enquire.fallbackCredit') }
  const label = !country ? t('enquire.eastAfrica') : country.id === 'coast' ? t('destinations.coast.short') : t(`destinations.${country.id}.name`)
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  function chooseCountry(e) {
    const destination = e.target.value
    setForm((f) => ({ ...f, destination, place: '' }))
  }

  async function submit(e) {
    e.preventDefault()
    const errors = {}
    const name = `${form.first} ${form.last}`.trim()
    if (form.first.trim().length < 1) errors.first = t('enquire.errors.first')
    if (form.last.trim().length < 1) errors.last = t('enquire.errors.last')
    if (form.message.trim().length < 10) errors.message = t('enquire.errors.message')
    if (!form.consent) errors.consent = t('enquire.errors.consent')
    if (Object.keys(errors).length) {
      setState({ status: 'error', errors, message: '' })
      return
    }
    setState({ status: 'sending', errors: {}, message: '' })
    const placeName = form.place
    const topic = [request.topic, country ? t(`destinations.${country.id}.name`) : '', placeName].filter(Boolean).join(' · ')
    const res = await sendInquiry({
      name,
      email: form.email,
      phone: form.phone,
      topic,
      month: form.month,
      travelers: form.travelers,
      message: `${form.advisor === 'yes' ? t('enquire.advisorPrefix') : ''}${form.message.trim()}`,
      website: form.website,
    })
    if (res.ok) setState({ status: 'done', errors: {}, message: '' })
    else {
      const serverErrors = {}
      for (const [key, value] of Object.entries(res.errors || {})) {
        const field = key === 'name' ? 'first' : key
        serverErrors[field] = t(`enquire.errors.${key}`, { defaultValue: value })
      }
      setState({ status: 'error', errors: serverErrors, message: res.code ? t(`errors.${res.code}`) : '' })
    }
  }

  const err = (key) => state.errors[key] && <span className="field__error">{state.errors[key]}</span>

  return (
    <div className="enquire" onMouseDown={onClose}>
      <div
        className="enquire__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <figure className="enquire__photo">
          <img src={photo.image} alt={photo.alt} />
          <figcaption>
            <span className="enquire__label">{t('enquire.for', { place: label })}</span>
            <span className="enquire__credit">{photo.credit}</span>
          </figcaption>
        </figure>
        <div className="enquire__body">
          <button className="enquire__close" type="button" onClick={onClose} aria-label={t('enquire.close')}>×</button>
          {state.status === 'done' ? (
            <div className="enquire__done" role="status">
              <h2 id={titleId}>{t('enquire.thanks')}</h2>
              <p>{t('enquire.reply')}</p>
              <button className="btn btn--forest" type="button" onClick={onClose}>{t('enquire.close')}</button>
            </div>
          ) : (
            <>
              <h2 id={titleId}>{t('enquire.title')}</h2>
              <form className="form" onSubmit={submit} noValidate>
                <label className="field">{t('enquire.first')}
                  <input value={form.first} onChange={set('first')} autoComplete="given-name" required />
                  {err('first')}
                  {state.errors.name && <span className="field__error">{state.errors.name}</span>}
                </label>
                <label className="field">{t('enquire.last')}
                  <input value={form.last} onChange={set('last')} autoComplete="family-name" required />
                  {err('last')}
                </label>
                <label className="field">{t('enquire.phone')}
                  <input value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="+254" />
                </label>
                <label className="field">{t('enquire.email')}
                  <input type="email" value={form.email} onChange={set('email')} autoComplete="email" required />
                  {err('email')}
                </label>
                <fieldset className="field field--wide choice">
                  <legend>{t('enquire.advisor')}</legend>
                  <label><input type="radio" name="advisor" value="no" checked={form.advisor === 'no'} onChange={set('advisor')} /> {t('enquire.no')}</label>
                  <label><input type="radio" name="advisor" value="yes" checked={form.advisor === 'yes'} onChange={set('advisor')} /> {t('enquire.yes')}</label>
                </fieldset>
                <label className="field">{t('enquire.country')}
                  <select value={form.destination} onChange={chooseCountry}>
                    <option value="">{t('enquire.eastAfrica')}</option>
                    {destinations.map((d) => <option key={d.id} value={d.id}>{t(`destinations.${d.id}.name`)}</option>)}
                  </select>
                </label>
                <label className="field">{t('enquire.place')}
                  <select value={form.place} onChange={set('place')} disabled={!country}>
                    <option value="">{country ? t('enquire.anyPlace') : t('enquire.countryFirst')}</option>
                    {country?.places.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </label>
                <label className="field">{t('enquire.month')}
                  <select value={form.month} onChange={set('month')}>
                    <option value="">{t('enquire.unsure')}</option>
                    {months.map((m) => <option key={m.m}>{m.m}</option>)}
                  </select>
                </label>
                <label className="field">{t('enquire.travellers')}
                  <input type="number" min="1" max="40" value={form.travelers} onChange={set('travelers')} />
                </label>
                <label className="field field--wide">{t('enquire.about')}
                  <textarea rows="4" value={form.message} onChange={set('message')} required placeholder={t('enquire.placeholder')} />
                  {err('message')}
                </label>
                <label className="consent">
                  <input type="checkbox" checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} />
                  <span>{t('enquire.consent', { name: brand.name })}</span>
                </label>
                {err('consent')}
                <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" value={form.website} onChange={set('website')} />
                {state.message && <p className="form__error" role="alert">{state.message}</p>}
                <button className="btn btn--camellia" disabled={state.status === 'sending'}>
                  {state.status === 'sending' ? t('enquire.sending') : t('enquire.send')}
                </button>
                <a className="link enquire__chat" href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">{t('enquire.chat')}</a>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
