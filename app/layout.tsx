import './globals.css'
import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: {
    default: 'Pet Booking - Professional Pet Care Services',
    template: '%s | Pet Booking',
  },
  description:
    'Book trusted pet walkers and sitters in your area. Professional pet care services with real-time booking, GPS tracking, and 24/7 support.',
  keywords: ['pet walking', 'dog walking', 'pet sitting', 'pet care', 'booking'],
  authors: [{ name: 'Pet Booking Team' }],
  creator: 'Pet Booking',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://petbooking.com',
    siteName: 'Pet Booking',
    title: 'Pet Booking - Professional Pet Care Services',
    description:
      'Book trusted pet walkers and sitters in your area with real-time tracking and 24/7 support.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Pet Booking - Professional Pet Care Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Booking - Professional Pet Care Services',
    description: 'Book trusted pet walkers and sitters in your area.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-white to-slate-50 text-gray-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100 antialiased">
        <div className="flex min-h-screen flex-col">
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
          >
            Skip to main content
          </a>

          <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-1"
                aria-label="Pet Booking - Go to homepage"
              >
                <span className="text-2xl" role="img" aria-label="Dog">
                  🐶
                </span>
                <span className="hidden sm:inline">Pet Booking</span>
              </Link>

              <div className="flex gap-4 items-center">
                <Link href="/book" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
                  Book a Walk
                </Link>
                <Link href="/dashboard" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
                  Dashboard
                </Link>
                <Link href="/bookings" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
                  Bookings
                </Link>
                <Link href="/design-system" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
                  Design System
                </Link>
                
                {/* Inline theme toggle */}
                <button
                  aria-label="Toggle dark mode"
                  className="relative inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                  onClick={() => {
                    const cl = document.documentElement.classList
                    cl.toggle('dark')
                    localStorage.setItem('theme', cl.contains('dark') ? 'dark' : 'light')
                  }}
                >
                  <svg className="w-5 h-5 dark:hidden" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                  </svg>
                  <svg className="w-5 h-5 hidden dark:block" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </nav>
          </header>

          <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8" role="main">
            {children}
          </main>

          <footer className="border-t border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm" role="contentinfo">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🐶</span>
                    <span className="font-bold text-lg">Pet Booking</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-slate-400">
                    Professional pet care services you can trust.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Services</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/services/walking" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dog Walking</a></li>
                    <li><a href="/services/sitting" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pet Sitting</a></li>
                    <li><a href="/services/boarding" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pet Boarding</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Company</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/about" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</a></li>
                    <li><a href="/contact" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a></li>
                    <li><a href="/careers" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Support</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/help" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Help Center</a></li>
                    <li><a href="/privacy" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                    <li><a href="/terms" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-slate-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  © 2025 Pet Booking. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <a href="/status" className="text-sm text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    System Status
                  </a>
                  <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    All systems operational
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme')
                const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                const theme = t || systemPreference
                if (theme === 'dark') document.documentElement.classList.add('dark')
              } catch {}
            `,
          }}
        />
      </body>
    </html>
  )
}