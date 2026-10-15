import { aboutLines, brand } from '../content.js'

export default function Hero({ onPlan }) {
  return (
    <>
    <section className="hero" id="top">
      <img
        className="hero__photo"
        src="/images/hero.jpg"
        alt="A male lion resting in the grass of the Serengeti"
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
        <p className="hero__credit">Lion, Serengeti. Photo: Giles Laurent, CC BY-SA 4.0</p>
      </div>
    </section>
    <section className="intro" aria-label="About">
      <div className="wrap intro__inner">
        {aboutLines.map((line) => <p key={line}>{line}</p>)}
      </div>
    </section>
    </>
  )
}
