import { useEffect, useState } from 'react'
import { sendInquiry } from '../api.js'
import { brand, months } from '../content.js'

const empty = { name: '', email: '', phone: '', topic: '', month: '', travelers: '2', message: '', website: '' }

export default function Inquiry({ topic }) {
  const [form, setForm] = useState(empty)
  const [state, setState] = useState({ status: 'idle', errors: {}, message: '' })

  // When a journey button is clicked elsewhere, pre-fill the topic
  useEffect(() => { if (topic) setForm((f) => ({ ...f, topic })) }, [topic])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    setState({ status: 'sending', errors: {}, message: '' })
    const res = await sendInquiry(form)
    if (res.ok) {
      setState({ status: 'done', errors: {}, message: '' })
      setForm(empty)
    } else {
      setState({ status: 'error', errors: res.errors || {}, message: res.message || '' })
    }
  }

  if (state.status === 'done') {
    return (
      <section className="section section--tint" id="plan">
        <div className="wrap inquiry inquiry--done" role="status">
          <h2>Thank you. We have your request.</h2>
          <p>A planner will reply by email within one working day.</p>
          <button className="btn btn--forest" onClick={() => setState({ status: 'idle', errors: {}, message: '' })}>Send another request</button>
        </div>
      </section>
    )
  }

  const err = (k) => state.errors[k] && <span className="field__error">{state.errors[k]}</span>

  return (
    <section className="section section--tint" id="plan">
      <div className="wrap inquiry">
        <div className="inquiry__intro">
          <h2>Tell us about your trip</h2>
          <p>Share a rough idea. A planner will reply with a first outline and a price range, with no obligation.</p>
          <a className="link" href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">Prefer to chat? Message us on WhatsApp</a>
        </div>
        <form className="form" onSubmit={submit} noValidate>
          <label className="field">Full name
            <input value={form.name} onChange={set('name')} autoComplete="name" required />
            {err('name')}
          </label>
          <label className="field">Email
            <input type="email" value={form.email} onChange={set('email')} autoComplete="email" required />
            {err('email')}
          </label>
          <label className="field">Phone or WhatsApp (optional)
            <input value={form.phone} onChange={set('phone')} autoComplete="tel" />
          </label>
          <label className="field">What are you interested in?
            <input value={form.topic} onChange={set('topic')} placeholder="For example: a 7-day safari" />
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
          <label className="field field--wide">Your message
            <textarea rows="5" value={form.message} onChange={set('message')} required />
            {err('message')}
          </label>
          {/* Honeypot: hidden from people, tempting for bots */}
          <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" value={form.website} onChange={set('website')} />
          {state.message && <p className="form__error" role="alert">{state.message}</p>}
          <button className="btn btn--camellia" disabled={state.status === 'sending'}>
            {state.status === 'sending' ? 'Sending...' : 'Send my request'}
          </button>
        </form>
      </div>
    </section>
  )
}
