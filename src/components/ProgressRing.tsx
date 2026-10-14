export function ProgressRing({ value, size = 44, label }: { value: number; size?: number; label?: string }) {
  const r = (size - 6) / 2
  const c = 2 * Math.PI * r
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100)
  return (
    <div className="progress-ring" style={{ width: size, height: size }} role="img" aria-label={label ?? `${pct}% complete`}>
      <svg viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} className="ring-track" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="ring-fill"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="ring-text tabular">{pct}%</span>
    </div>
  )
}
