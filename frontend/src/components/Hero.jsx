import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { brand } from '../content.js'

export default function Hero({ onPlan }) {
  const { t } = useTranslation()
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
        <h1 className="hero__title">
          {t('hero.line1')}<br />
          {t('hero.line2')}<br />
          {t('hero.line3')}
        </h1>
        <p className="hero__lede">{t('hero.lede')}</p>
        <div className="hero__actions">
          <button className="btn btn--camellia" type="button" onClick={() => onPlan({})}>{t('hero.plan')}</button>
          <a className="btn btn--ghost" href="#journeys">{t('hero.see')}</a>
        </div>
      </div>
      <p className="hero__corner">{t('hero.corner1')}<br />{t('hero.corner2')}</p>
    </section>
    <section className="intro" aria-label={t('hero.aboutLabel')}>
      <div className="wrap intro__inner">
        {t('aboutLines', { returnObjects: true }).map((line) => <p key={line}>{line}</p>)}
      </div>
    </section>
    </>
  )
}
