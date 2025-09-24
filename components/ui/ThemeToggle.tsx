'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  const apply = (t: Theme) => {
    document.documentElement.classList.toggle('dark', t === 'dark')
    try {
      const meta = document.querySelector('meta[name="theme-color"]')
      if (meta) meta.setAttribute('content', t === 'dark' ? '#0f172a' : '#ffffff')
    } catch {}
  }

  useEffect(() => {
    setMounted(true)
    const stored = (localStorage.getItem('theme') as Theme | null)
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored ?? (systemDark ? 'dark' : 'light')
    setTheme(initial)
    apply(initial)
  }, [])

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (!localStorage.getItem('theme')) {
        const next: Theme = mql.matches ? 'dark' : 'light'
        setTheme(next)
        apply(next)
      }
    }

    try {
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    } catch {
      // Safari fallback
      // @ts-ignore
      mql.addListener(onChange)
      return () => {
        // @ts-ignore
        mql.removeListener(onChange)
      }
    }
  }, [])

  const toggleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    apply(next)
    localStorage.setItem('theme', next)
  }

  if (!mounted) {
    return <div className="w-10 h-10 rounded-md border border-gray-300 dark:border-slate-600 animate-pulse" />
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-md
                 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800
                 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none
                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun */}
      <svg
        className={`w-5 h-5 absolute transition-all ${theme === 'dark' ? 'scale-0 rotate-90 opacity-0' : 'scale-100 opacity-100'}`}
        viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12z" />
      </svg>
      {/* Moon */}
      <svg
        className={`w-5 h-5 absolute transition-all ${theme === 'light' ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 opacity-100'}`}
        viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
      </svg>
      <span className="sr-only">Current theme: {theme}</span>
    </button>
  )
}
