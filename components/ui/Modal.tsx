'use client'
import { ReactNode, useEffect } from 'react'

export function Modal({ open, onClose, title, children } : { open: boolean, onClose: () => void, title: string, children: ReactNode }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 max-w-md w-full rounded border bg-white dark:bg-slate-950 dark:border-slate-800 p-4 shadow-lg">
        <div className="font-semibold mb-2">{title}</div>
        {children}
        <div className="mt-3 text-right">
          <button className="px-3 py-1.5 border rounded" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
