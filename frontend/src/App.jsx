import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Journeys from './components/Journeys.jsx'
import Seasons from './components/Seasons.jsx'
import Enquire from './components/Enquire.jsx'
import { Agents, Footer, Philanthropy, Places, Why } from './components/Static.jsx'

function Speak({ onPlan }) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const footer = document.querySelector('.footer')
    if (!footer) return undefined
    const watcher = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0 })
    watcher.observe(footer)
    return () => watcher.disconnect()
  }, [])

  if (hidden) return null
  return (
    <button className="speak" type="button" onClick={() => onPlan({})}>Speak to a planner</button>
  )
}

export default function App() {
  const [plan, setPlan] = useState(null)
  const [pick, setPick] = useState({ destination: '', place: '', category: '' })

  const openPlan = (partial) => setPlan({ id: Date.now(), advisor: 'no', topic: '', destination: '', place: '', message: '', ...partial })

  const applyPick = (next) => {
    setPick({ destination: '', place: '', category: '', ...next })
    document.getElementById('journeys')?.scrollIntoView({ behavior: 'smooth' })
  }

  const askJourney = (journey) => openPlan({
    topic: journey.title,
    destination: journey.destinations?.length === 1 ? journey.destinations[0] : '',
    place: journey.places?.length === 1 ? journey.places[0] : '',
    message: `I would like to plan ${journey.title}.`,
  })

  return (
    <>
      <Header onPlan={openPlan} onPick={applyPick} onAskJourney={askJourney} />
      <main>
        <Hero onPlan={openPlan} />
        <Places onPick={applyPick} />
        <Journeys
          destination={pick.destination}
          place={pick.place}
          category={pick.category}
          onClear={() => setPick({ destination: '', place: '', category: '' })}
          onAsk={askJourney}
        />
        <Why onAsk={openPlan} />
        <Agents onAsk={openPlan} />
        <Philanthropy onAsk={openPlan} />
        <Seasons />
      </main>
      <Footer />
      {!plan && <Speak onPlan={openPlan} />}
      {plan && <Enquire key={plan.id} request={plan} onClose={() => setPlan(null)} />}
    </>
  )
}
