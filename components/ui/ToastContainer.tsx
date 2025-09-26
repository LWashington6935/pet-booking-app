'use client'

import { useState, useEffect } from 'react'

export function ToastContainer() {
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    // Check for toast message from sessionStorage
    const checkForToast = () => {
      try {
        const message = sessionStorage.getItem('toast')
        if (message) {
          setToast(message)
          sessionStorage.removeItem('toast')
          // Auto-hide after 3 seconds
          setTimeout(() => setToast(null), 3000)
        }
      } catch {
        // Ignore storage errors
      }
    }

    // Check immediately and then periodically
    checkForToast()
    const interval = setInterval(checkForToast, 100)

    return () => clearInterval(interval)
  }, [])

  if (!toast) return null

  return (
    <div className="fixed top-4 right-4 z-50 pointer-events-none">
      <div className="pointer-events-auto bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-64">
        <div className="flex-shrink-0">
          <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <span className="flex-1">{toast}</span>
        <button
          onClick={() => setToast(null)}
          className="flex-shrink-0 ml-2 hover:bg-blue-700 rounded-full p-1 transition-colors"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}