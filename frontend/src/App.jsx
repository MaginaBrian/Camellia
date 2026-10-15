import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Journeys from './components/Journeys.jsx'
import Seasons from './components/Seasons.jsx'
import Enquire from './components/Enquire.jsx'
import { Agents, Footer, Philanthropy, PhilanthropyTeaser, Places, Why } from './components/Static.jsx'

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

const HOME_TITLE = 'Camellia Horizons | Private journeys across East Africa'

function pageFromHash() {
  return window.location.hash === '#philanthropy' ? 'philanthropy' : 'home'
}

export default function App() {
  const [plan, setPlan] = useState(null)
  const [pick, setPick] = useState({ destination: '', place: '', category: '' })
  const [view, setView] = useState(pageFromHash)
  const pendingScroll = useRef(null)

  const openPlan = (partial) => setPlan({ id: Date.now(), advisor: 'no', topic: '', destination: '', place: '', message: '', ...partial })

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash
      if (hash === '#philanthropy') {
        pendingScroll.current = null
        setView('philanthropy')
      } else {
        pendingScroll.current = hash
        setView('home')
      }
    }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useLayoutEffect(() => {
    if (view === 'philanthropy') {
      document.title = 'Philanthropy | Camellia Horizons'
      window.scrollTo({ top: 0, behavior: 'instant' })
      return undefined
    }
    document.title = HOME_TITLE
    const hash = pendingScroll.current
    if (hash == null) return undefined
    const id = !hash || hash === '#top' ? '' : hash.slice(1)
    const scroll = () => {
      if (!id) {
        window.scrollTo({ top: 0, behavior: 'instant' })
        return
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
    scroll()
    const frame = requestAnimationFrame(scroll)
    pendingScroll.current = null
    return () => cancelAnimationFrame(frame)
  }, [view])

  const applyPick = (next) => {
    setPick({ destination: '', place: '', category: '', ...next })
    if (view === 'philanthropy') {
      window.location.hash = '#journeys'
      return
    }
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
      <Header view={view} onPlan={openPlan} onPick={applyPick} onAskJourney={askJourney} />
      <main>
        {view === 'philanthropy' ? (
          <Philanthropy onAsk={openPlan} />
        ) : (
          <>
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
            <PhilanthropyTeaser onAsk={openPlan} />
            <Seasons />
          </>
        )}
      </main>
      <Footer />
      {!plan && <Speak onPlan={openPlan} />}
      {plan && <Enquire key={plan.id} request={plan} onClose={() => setPlan(null)} />}
    </>
  )
}
