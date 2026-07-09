import { navLinks } from '../data/content'
import { scrollToSection } from '../hooks/useScroll'

export default function Navbar({ activeSection, visible }) {
  return (
    <nav className={`navbar${visible ? ' navbar--visible' : ''}`}>
      <ul className="navbar__list">
        {navLinks.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              className={`navbar__link${activeSection === id ? ' navbar__link--active' : ''}`}
              onClick={() => scrollToSection(id)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
