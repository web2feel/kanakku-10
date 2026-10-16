/** Progress bar: white track, ink outline, mint fill. */
export function Meter({
  value,
  label,
  text,
  className = '',
}: {
  value: number
  label?: string
  /** text beside the bar; defaults to "N% done". Pass null to hide it. */
  text?: string | null
  className?: string
}) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100)
  return (
    <div className={`meter-row ${className}`}>
      <div
        className="meter"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label={label ?? 'Progress'}
      >
        <span style={{ width: `${pct}%` }} />
      </div>
      {text !== null && <span className="meter-label tabular">{text ?? `${pct}% done`}</span>}
    </div>
  )
}
