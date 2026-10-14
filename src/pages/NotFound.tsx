import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="page">
      <h1>Page not found</h1>
      <p>
        That lesson does not exist yet. <Link to="/">Go back to the units</Link>.
      </p>
    </div>
  )
}
