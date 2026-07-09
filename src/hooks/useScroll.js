import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id)
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
      )

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [sectionIds])

  return activeSection
}

export function scrollToSection(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
