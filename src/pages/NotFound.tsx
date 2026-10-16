import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="container not-found">
      <div className="nf-404" aria-hidden="true">
        4
        <span className="nf-theta">
          <span>θ</span>
        </span>
        4
      </div>
      <p className="hand-note nf-note">we measured the angle, but this page isn't there</p>
      <h1>Page not found</h1>
      <p>That lesson does not exist yet.</p>
      <Link className="btn-primary" to="/">
        Back to all units →
      </Link>
    </div>
  )
}
