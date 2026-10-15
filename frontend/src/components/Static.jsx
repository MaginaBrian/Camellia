import { about, brand, destinations, proof, why, whyIntro, tradePoints, wildlife, philanthropy, socials } from '../content.js'

const socialIcons = {
  Facebook: { viewBox: '0 0 512 512', d: 'M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z' },
  X: { viewBox: '0 0 512 512', d: 'M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z' },
  YouTube: { viewBox: '0 0 576 512', d: 'M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z' },
  Threads: { viewBox: '0 0 448 512', d: 'M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8c29.2 14.1 50.6 35.2 61.8 61.4c15.7 36.5 17.2 95.8-30.3 143.2c-36.2 36.2-80.3 52.5-142.6 53h-.3c-70.2-.5-124.1-24.1-160.4-70.2c-32.3-41-48.9-98.1-49.5-169.6V256v-.2C17 184.3 33.6 127.2 65.9 86.2C102.2 40.1 156.2 16.5 226.4 16h.3c70.3 .5 124.9 24 162.3 69.9c18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4c-29.2-35.8-73-54.2-130.5-54.6c-57 .5-100.1 18.8-128.2 54.4C72.1 146.1 58.5 194.3 58 256c.5 61.7 14.1 109.9 40.3 143.3c28 35.6 71.2 53.9 128.2 54.4c51.4-.4 85.4-12.6 113.7-40.9c32.3-32.2 31.7-71.8 21.4-95.9c-6.1-14.2-17.1-26-31.9-34.9c-3.7 26.9-11.8 48.3-24.7 64.8c-17.1 21.8-41.4 33.6-72.7 35.3c-23.6 1.3-46.3-4.4-63.9-16c-20.8-13.8-33-34.8-34.3-59.3c-2.5-48.3 35.7-83 95.2-86.4c21.1-1.2 40.9-.3 59.2 2.8c-2.4-14.8-7.3-26.6-14.6-35.2c-10-11.7-25.6-17.7-46.2-17.8H227c-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1h.8c62.6 .4 99.9 39.5 103.7 107.7l-.2 .2zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3c25.6-1.4 54.6-11.4 59.5-73.2c-13.2-2.9-27.8-4.4-43.4-4.4c-4.8 0-9.6 .1-14.4 .4c-42.9 2.4-57.2 23.2-56.2 41.8l-.1 .1z' },
  LinkedIn: { viewBox: '0 0 448 512', d: 'M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z' },
}

function SocialMark({ name }) {
  const icon = socialIcons[name]
  return (
    <svg viewBox={icon.viewBox} aria-hidden="true">
      <path d={icon.d} />
    </svg>
  )
}
export function Wild() {
  return (
    <section className="wild" aria-label="Wildlife photographs">
      <div className="wrap wild__head">
        <p className="kicker">In the field</p>
        <h2>The animals these journeys are built around.</h2>
        <p>Photographs from the Mara, Tarangire, Ngorongoro and the open country, published by their photographers.</p>
      </div>
      <ul className="wild__grid">
        {wildlife.map((animal) => (
          <li key={animal.src}>
            <figure>
              <img src={animal.src} alt={`${animal.name}, ${animal.place}`} style={{ objectPosition: animal.position }} />
              <figcaption>
                {animal.name}
                <span>{animal.place}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <p className="wild__credit wrap">
        Zebra, Diego Delso. Giraffe, Hans Hillewaert. Buffalo, The Erica Chang. Wikimedia Commons.
      </p>
    </section>
  )
}

export function Proof() {
  return (
    <section className="proof" aria-label="At a glance">
      <ul className="wrap proof__list">
        {proof.map((p) => (
          <li key={p.label}>
            <strong>{p.value}</strong>
            <span>{p.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function About() {
  return (
    <section className="section section--tint" id="about">
      <div className="wrap">
        <div className="section__head">
          <p className="kicker">About</p>
          <h2>{about.title}</h2>
        </div>
        <div className="about">
          {about.parts.map((part) => (
            <div key={part.title}>
              <h3>{part.title}</h3>
              <p>{part.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Places({ onPick }) {
  return (
    <section className="places" aria-label="Destinations">
      <div className="wrap">
        <div className="section__head places__head">
          <p className="kicker">Destinations</p>
          <h2>Kenya, Tanzania and the coast.</h2>
        </div>
        <ul className="places__grid">
          {destinations.map((place) => (
            <li key={place.id}>
              <button type="button" onClick={() => onPick({ destination: place.id, place: '', category: '' })}>
                <img src={place.image} alt={place.alt} />
                <span className="places__copy">
                  <strong>{place.name}</strong>
                  <em>{place.places.join(' · ')}</em>
                  <small>{place.credit}</small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Why({ onAsk }) {
  return (
    <section className="section section--tint why-band" id="why">
      <div className="wrap">
        <div className="section__head why-band__head">
          <h2>Why travel with {brand.name}</h2>
          <p>{whyIntro}</p>
        </div>
        <ul className="why-grid">
          {why.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
        <button className="btn btn--camellia why-band__cta" type="button" onClick={() => onAsk({})}>Speak to a planner</button>
      </div>
    </section>
  )
}

export function Philanthropy({ onAsk }) {
  return (
    <section className="philanthropy philanthropy--page" id="philanthropy">
      <div className="philanthropy__banner">
        <img src="/images/journeys/migration.jpg" alt="Wildebeest and zebra crossing a river in the Mara" />
        <div className="wrap philanthropy__banner-copy">
          <p className="kicker kicker--light">Philanthropy</p>
          <h2>
            {philanthropy.title.map((line) => <span key={line}>{line}</span>)}
          </h2>
        </div>
      </div>
      <div className="wrap philanthropy__body">
        <div className="philanthropy__lede">
          {philanthropy.lede.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="give">
          {philanthropy.sections.map((section) => (
            <article key={section.title}>
              {section.kicker ? <p className="kicker">{section.kicker}</p> : null}
              <h3>{section.title}</h3>
              {section.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.close ? <p className="give__close">{section.close}</p> : null}
            </article>
          ))}
        </div>
        <ul className="pillars">
          {philanthropy.pillars.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
        <button className="btn btn--camellia" type="button" onClick={() => onAsk({ topic: 'How my trip can give back', message: 'I would like to know how this trip can give back to communities in Kenya, including children with special needs and children with Down syndrome.' })}>Ask how a trip gives back</button>
        <p className="fineprint">River crossing photograph: Charles J. Sharp, CC BY-SA 4.0, via Wikimedia Commons.</p>
      </div>
    </section>
  )
}

export function Agents({ onAsk }) {
  return (
    <section className="agents" id="agents">
      <div className="wrap agents__inner">
        <div>
          <p className="kicker">For travel advisors</p>
          <h2>Your ground team in East Africa.</h2>
          <p>You keep the client. We arrange the vehicles, guides and camps, and the trip can run under your name.</p>
          <ul>
            {tradePoints.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>
        <div className="agents__card">
          <h3>Talk to the Nairobi desk</h3>
          <p className="agents__where">{brand.address.join(', ')}</p>
          <a href={brand.phoneHref}>{brand.phone}</a>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={brand.map} target="_blank" rel="noreferrer">View on map</a>
          <button
            className="btn btn--camellia"
            type="button"
            onClick={() => onAsk({ advisor: 'yes', topic: 'Travel agent partnership', message: 'I am a travel advisor and would like to work with you on a trip.' })}
          >
            Plan a trip with us
          </button>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <img className="footer__photo" src="/images/footer.jpg?v=grass" alt="Golden grassland on an open savanna" />
      <div className="wrap footer__inner">
        <div className="brand brand--footer">
          <img className="brand__mark" src="/images/logo-mark.png" alt="" />
          <span>{brand.name}</span>
        </div>
        <address>
          <p className="footer__label">Address</p>
          {brand.address.map((line) => <p key={line}>{line}</p>)}
          <a href={brand.map} target="_blank" rel="noreferrer">View on map</a>
        </address>
        <div>
          <p className="footer__label">Contacts</p>
          <a href={brand.phoneHref}>{brand.phone}</a>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
        <div>
          <p className="footer__label">Social</p>
          <ul className="socials">
            {socials.map((item) => (
              <li key={item.name}>
                {item.href ? (
                  <a className="socials__item" href={item.href} target="_blank" rel="noreferrer" aria-label={item.name}>
                    <SocialMark name={item.name} />
                  </a>
                ) : (
                  <span className="socials__item" role="img" aria-label={item.name}>
                    <SocialMark name={item.name} />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <p className="footer__legal">&copy; {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
