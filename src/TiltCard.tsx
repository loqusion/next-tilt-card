import './TiltCard.css'

export default function TiltCard({
  href,
  children,
}: {
  href?: string
  children: React.ReactNode
}) {
  return (
    <a className="tilt-card-root" href={href}>
      {children}
    </a>
  )
}
