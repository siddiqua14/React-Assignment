import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Custom404() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/')
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-gray-900">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700">Page Not Found</h2>
          <p className="text-gray-500">
            Oops! The page you're looking for seems to have gone on vacation.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Redirecting to home in {countdown} seconds...
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ← Go Back
            </button>

            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              🏠 Home Page
            </button>
          </div>
        </div>

        <div className="pt-6">
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all duration-1000"
              style={{ width: `${(countdown / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}