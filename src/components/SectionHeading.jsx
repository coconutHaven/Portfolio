export default function SectionHeading({ children }) {
  return (
    <div className="section-heading">
      <h2 className="section-heading__title">{children}</h2>
      <span className="section-heading__underline" aria-hidden="true" />
    </div>
  )
}
