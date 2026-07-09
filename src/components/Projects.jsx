import SectionHeading from './SectionHeading'

function ProjectCard({ project }) {
  const { title, description, image, liveUrl, learnMoreUrl, accentColor, reverse } = project

  return (
    <article className={`project${reverse ? ' project--reverse' : ''}`}>
      <div className="project__visual" style={{ backgroundColor: accentColor }}>
        {image ? (
          <img src={image} alt={title} className="project__image" />
        ) : (
          <div className="project__placeholder">
            <span>Project Preview</span>
          </div>
        )}
      </div>
      <div className="project__info">
        <h3 className="project__title">{title}</h3>
        <p className="project__description">{description}</p>
        <div className="project__links">
          <a href={liveUrl} className="project__link" target="_blank" rel="noopener noreferrer">
            LIVE APP
          </a>
          <a href={learnMoreUrl} className="project__link" target="_blank" rel="noopener noreferrer">
            LEARN MORE
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Projects({ projects }) {
  return (
    <section id="projects" className="section projects">
      <SectionHeading>Projects</SectionHeading>
      <div className="projects__list">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
