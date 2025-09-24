import './globals.css'
import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import Link from 'next/link'
import { ToastContainer } from '../components/ui/Toast'
import { ThemeProvider } from './ThemeProvider'
import { ThemeToggle } from '../components/ui/ThemeToggle'

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
        <ThemeProvider>
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
                  {/* Client-side toggle */}
                  <ThemeToggle />
                </div>
              </nav>
            </header>

            <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8" role="main">
              {children}
            </main>

            <footer className="border-t border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm" role="contentinfo">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* … footer content unchanged … */}
              </div>
            </footer>
          </div>

          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  )
}
