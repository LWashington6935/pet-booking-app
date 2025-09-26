'use client'

import { useEffect } from 'react'

export function ToastContainer() {
  // Example: listen for custom events and log them
  useEffect(() => {
    const handler = (e: Event) => {
      // no-op; plug in your toast lib here
      // console.log('toast', e)
    }
    window.addEventListener('app:toast', handler as EventListener)
    return () => window.removeEventListener('app:toast', handler as EventListener)
  }, [])

  return null
}
