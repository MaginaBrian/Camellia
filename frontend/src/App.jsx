import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Journeys from './components/Journeys.jsx'
import Seasons from './components/Seasons.jsx'
import Enquire from './components/Enquire.jsx'
import { Footer } from './components/Static.jsx'
import { philanthropyLine } from './content.js'

export default function App() {
  const [plan, setPlan] = useState(null)
  const [pick, setPick] = useState({ destination: '', place: '' })

  const openPlan = (partial) => setPlan({ id: Date.now(), advisor: 'no', topic: '', destination: '', place: '', message: '', ...partial })

  const askJourney = (journey) => openPlan({
    topic: journey.title,
    destination: journey.destinations?.length === 1 ? journey.destinations[0] : '',
    place: journey.places?.length === 1 ? journey.places[0] : '',
    message: `I would like to plan ${journey.title}.`,
  })

  return (
    <>
      <Header onPlan={openPlan} onPick={setPick} />
      <main>
        <Hero onPlan={openPlan} />
        <Journeys
          destination={pick.destination}
          place={pick.place}
          onClear={() => setPick({ destination: '', place: '' })}
          onAsk={askJourney}
        />
        <section className="giveback">
          <div className="wrap">
            <p>{philanthropyLine}</p>
            <button className="link" type="button" onClick={() => openPlan({ topic: 'How my trip can give back', message: 'I would like to know how this trip can support the places we visit.' })}>
              Ask how a trip gives back
            </button>
          </div>
        </section>
        <Seasons />
      </main>
      <Footer />
      {plan && <Enquire key={plan.id} request={plan} onClose={() => setPlan(null)} />}
    </>
  )
}
