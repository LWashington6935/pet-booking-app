'use client'
import { useEffect, useState } from 'react'

type ToastMsg = { id: number; text: string }

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMsg[]>([])

  useEffect(() => {
    function showFromStorage() {
      try {
        const raw = sessionStorage.getItem('toast')
        if (raw) {
          add(raw)
          sessionStorage.removeItem('toast')
        }
      } catch {}
    }
    showFromStorage()
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      if (typeof detail === 'string') add(detail)
    }
    window.addEventListener('app:toast', handler as any)
    return () => window.removeEventListener('app:toast', handler as any)
  }, [])

  function add(text: string) {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, text }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id != id))
    }, 3000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map(t => (
        <div key={t.id} className="rounded bg-black/80 text-white text-sm px-3 py-2 shadow-lg">
          {t.text}
        </div>
      ))}
    </div>
  )
}
