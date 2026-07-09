import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { projects } from './data/content'
import { useActiveSection } from './hooks/useScroll'

const SECTION_IDS = ['home', 'about', 'projects', 'contact']

export default function App() {
  const activeSection = useActiveSection(SECTION_IDS)
  const [navVisible, setNavVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(window.scrollY > window.innerHeight * 0.5)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Navbar activeSection={activeSection} visible={navVisible || activeSection !== 'home'} />
      <main>
        <Hero />
        <About />
        <Projects projects={projects} />
        <Contact />
      </main>
    </>
  )
}
