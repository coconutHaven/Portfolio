import { aboutText, skills } from '../data/content'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" className="section about">
      <SectionHeading>About</SectionHeading>
      <div className="about__grid">
        <div className="about__bio">
          <div className="about__icon" aria-hidden="true">
            <svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="20" r="14" stroke="url(#gradient)" strokeWidth="2" />
              <path
                d="M10 72c0-12 10-22 22-22s22 10 22 22"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="32" y1="0" x2="32" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4fc3f7" />
                  <stop offset="1" stopColor="#e31b6d" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="about__text">{aboutText}</p>
        </div>
        <div className="skills">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <img src={skill.icon} alt="" className="skill-card__icon" />
              <span className="skill-card__name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
