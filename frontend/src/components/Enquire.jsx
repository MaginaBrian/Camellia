import { useEffect, useId, useRef, useState } from 'react'
import { sendInquiry } from '../api.js'
import { brand, destinations, enquireFallback, months } from '../content.js'

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
  const photo = country || enquireFallback
  const label = !country ? enquireFallback.label : country.id === 'coast' ? 'the coast' : country.name
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  function chooseCountry(e) {
    const destination = e.target.value
    setForm((f) => ({ ...f, destination, place: '' }))
  }

  async function submit(e) {
    e.preventDefault()
    const errors = {}
    const name = `${form.first} ${form.last}`.trim()
    if (form.first.trim().length < 1) errors.first = 'Enter your first name.'
    if (form.last.trim().length < 1) errors.last = 'Enter your last name.'
    if (form.message.trim().length < 10) errors.message = 'Tell us a little about the trip (at least 10 characters).'
    if (!form.consent) errors.consent = 'Please confirm we may reply about this trip.'
    if (Object.keys(errors).length) {
      setState({ status: 'error', errors, message: '' })
      return
    }
    setState({ status: 'sending', errors: {}, message: '' })
    const placeName = form.place
    const topic = [request.topic, country?.name, placeName].filter(Boolean).join(' · ')
    const res = await sendInquiry({
      name,
      email: form.email,
      phone: form.phone,
      topic,
      month: form.month,
      travelers: form.travelers,
      message: `${form.advisor === 'yes' ? 'Travel advisor. ' : ''}${form.message.trim()}`,
      website: form.website,
    })
    if (res.ok) setState({ status: 'done', errors: {}, message: '' })
    else setState({ status: 'error', errors: res.errors || {}, message: res.message || '' })
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
            <span className="enquire__label">Enquire for {label}</span>
            <span className="enquire__credit">{photo.credit}</span>
          </figcaption>
        </figure>
        <div className="enquire__body">
          <button className="enquire__close" type="button" onClick={onClose} aria-label="Close">×</button>
          {state.status === 'done' ? (
            <div className="enquire__done" role="status">
              <h2 id={titleId}>Thank you. We have your request.</h2>
              <p>A planner will reply by email within one working day.</p>
              <button className="btn btn--forest" type="button" onClick={onClose}>Close</button>
            </div>
          ) : (
            <>
              <h2 id={titleId}>Plan this journey</h2>
              <form className="form" onSubmit={submit} noValidate>
                <label className="field">First name
                  <input value={form.first} onChange={set('first')} autoComplete="given-name" required />
                  {err('first')}
                  {state.errors.name && <span className="field__error">{state.errors.name}</span>}
                </label>
                <label className="field">Last name
                  <input value={form.last} onChange={set('last')} autoComplete="family-name" required />
                  {err('last')}
                </label>
                <label className="field">Phone or WhatsApp
                  <input value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="+254" />
                </label>
                <label className="field">Email
                  <input type="email" value={form.email} onChange={set('email')} autoComplete="email" required />
                  {err('email')}
                </label>
                <fieldset className="field field--wide choice">
                  <legend>Are you a travel advisor?</legend>
                  <label><input type="radio" name="advisor" value="no" checked={form.advisor === 'no'} onChange={set('advisor')} /> No</label>
                  <label><input type="radio" name="advisor" value="yes" checked={form.advisor === 'yes'} onChange={set('advisor')} /> Yes</label>
                </fieldset>
                <label className="field">Choose a country
                  <select value={form.destination} onChange={chooseCountry}>
                    <option value="">East Africa</option>
                    {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </label>
                <label className="field">Choose a place
                  <select value={form.place} onChange={set('place')} disabled={!country}>
                    <option value="">{country ? 'Any place' : 'Choose a country first'}</option>
                    {country?.places.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </label>
                <label className="field">Travel month
                  <select value={form.month} onChange={set('month')}>
                    <option value="">Not sure yet</option>
                    {months.map((m) => <option key={m.m}>{m.m}</option>)}
                  </select>
                </label>
                <label className="field">Travellers
                  <input type="number" min="1" max="40" value={form.travelers} onChange={set('travelers')} />
                </label>
                <label className="field field--wide">Tell us about the trip
                  <textarea rows="4" value={form.message} onChange={set('message')} required placeholder="Dates, who is travelling, and what you hope to see." />
                  {err('message')}
                </label>
                <label className="consent">
                  <input type="checkbox" checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} />
                  <span>I agree that {brand.name} may use these details to reply about this trip.</span>
                </label>
                {err('consent')}
                <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" value={form.website} onChange={set('website')} />
                {state.message && <p className="form__error" role="alert">{state.message}</p>}
                <button className="btn btn--camellia" disabled={state.status === 'sending'}>
                  {state.status === 'sending' ? 'Sending...' : 'Send my request'}
                </button>
                <a className="link enquire__chat" href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">Prefer to chat? Message us on WhatsApp</a>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
