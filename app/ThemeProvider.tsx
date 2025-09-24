'use client'

import { ReactNode, useEffect } from 'react'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // Initialize theme on client side
    const initializeTheme = () => {
      try {
        const storedTheme = localStorage.getItem('theme')
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        const theme = storedTheme || systemPreference
        
        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        
        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]')
        if (metaThemeColor) {
          metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff')
        }
      } catch (error) {
        console.warn('Failed to initialize theme:', error)
      }
    }

    initializeTheme()

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only apply system preference if user hasn't set a manual preference
      if (!localStorage.getItem('theme')) {
        const theme = e.matches ? 'dark' : 'light'
        document.documentElement.classList.toggle('dark', theme === 'dark')
      }
    }

    mediaQuery.addListener(handleSystemThemeChange)
    
    return () => {
      mediaQuery.removeListener(handleSystemThemeChange)
    }
  }, [])

  return <>{children}</>
}