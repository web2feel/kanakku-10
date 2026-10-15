/** The brand gradient as atmosphere: a blurred radial mesh behind a headline. Decorative only. */
export function Atmosphere({ soft = false }: { soft?: boolean }) {
  return (
    <div className={`atmo ${soft ? 'atmo-soft' : ''}`} aria-hidden="true">
      <div className="atmo-mesh" />
      <div className="atmo-fade" />
    </div>
  )
}
