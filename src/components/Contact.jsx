import { useState } from 'react'
import { siteConfig } from '../data/content'
import { scrollToSection } from '../hooks/useScroll'
import SectionHeading from './SectionHeading'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="section contact">
      <SectionHeading>Contact</SectionHeading>
      <p className="contact__intro">
        Have a question or want to work together? Leave your details and I&apos;ll get back to you
        as soon as possible.
      </p>
      <form className="contact__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <div className="contact__submit-wrap">
          {submitted && <p className="contact__success">Message sent! I&apos;ll be in touch soon.</p>}
          <button type="submit" className="contact__submit">
            SUBMIT
          </button>
        </div>
      </form>

      <footer className="footer">
        <button
          type="button"
          className="footer__scroll-top"
          onClick={() => scrollToSection('home')}
          aria-label="Scroll to top"
        >
          <span>«</span>
        </button>
        <div className="footer__social">
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a href={siteConfig.email} aria-label="Email">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
        </div>
        <p className="footer__copyright">{siteConfig.copyright}</p>
      </footer>
    </section>
  )
}
