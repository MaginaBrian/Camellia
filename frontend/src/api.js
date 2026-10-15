// The site works without the backend (journeys fall back to the bundled JSON),
// but the inquiry form needs Flask running.
import fallbackJourneys from '../../backend/journeys.json'

export async function getJourneys() {
  try {
    const res = await fetch('/api/journeys')
    if (!res.ok) throw new Error('bad response')
    return await res.json()
  } catch {
    return fallbackJourneys
  }
}

export async function sendInquiry(payload) {
  let res
  try {
    res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    return { ok: false, message: 'We could not reach the server. Check your connection or message us on WhatsApp.' }
  }
  const body = await res.json().catch(() => ({}))
  if (res.ok) return { ok: true }
  return { ok: false, errors: body.errors, message: body.error || 'Something went wrong. Please try again.' }
}
