
'use client'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.log(error)

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h2 className="display-4 fw-bold">
          {error.message}
        </h2>

        <p className="fs-3">
          <span className="text-danger">Oops!</span>{' '}
          Something went wrong!
        </p>

        <p className="lead">
          Sorry for the inconvenience
        </p>

        <button
          className="btn btn-primary"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  )
}

