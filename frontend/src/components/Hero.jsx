import { useEffect, useRef } from 'react'
import { aboutLines, brand } from '../content.js'

export default function Hero({ onPlan }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.pause()
    return undefined
  }, [])

  return (
    <>
    <section className="hero" id="top">
      <video
        ref={videoRef}
        className="hero__photo"
        src="/images/hero.mp4"
        poster="/images/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="hero__shade" />
      <div className="wrap hero__inner">
        <p className="kicker kicker--light">{brand.name}</p>
        <h1 className="hero__title">Africa, arranged around you.</h1>
        <p className="hero__lede">
          Private safaris, mountain treks and island stays, planned by a small team and guided by people who know the ground.
        </p>
        <div className="hero__actions">
          <button className="btn btn--camellia" type="button" onClick={() => onPlan({})}>Plan my journey</button>
          <a className="btn btn--ghost" href="#journeys">See journeys</a>
        </div>
      </div>
      <p className="hero__corner">Beyond the wild.<br />Beyond luxury.</p>
    </section>
    <section className="intro" aria-label="About">
      <div className="wrap intro__inner">
        {aboutLines.map((line) => <p key={line}>{line}</p>)}
      </div>
    </section>
    </>
  )
}
