import { siteConfig } from '../data/content'
import { scrollToSection } from '../hooks/useScroll'
import ParticleBackground from './ParticleBackground'

export default function Hero() {
  return (
    <section id="home" className="section hero">
      <ParticleBackground />
      <div className="hero__content">
        <h1 className="hero__title">
          Hello, I&apos;m <span className="accent">{siteConfig.name}.</span>
        </h1>
        <p className="hero__subtitle">I&apos;m a {siteConfig.title}.</p>
        <button
          type="button"
          className="hero__cta"
          onClick={() => scrollToSection('about')}
        >
          View my work <span className="hero__cta-arrow">↓</span>
        </button>
      </div>
    </section>
  )
}
