'use client'

import { useEffect, useState } from 'react'
import walkers from '../data/walkers.json'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'

type Booking = {
  walker: string; date: string; time: string; duration: '30' | '60'; address: string; notes?: string
}

export default function Dashboard() {
  const [last, setLast] = useState<Booking | null>(null)
  const [all, setAll] = useState<Booking[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('lastBooking')
      if (raw) setLast(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    fetch('/api/bookings').then(r => r.json()).then(json => setAll(json.data ?? [])).catch(() => {})
  }, [])

  const walker = (id?: string) => (walkers as any[]).find(x => x.id === id)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <Card>
        <CardHeader>Last Booking (local)</CardHeader>
        <CardContent>
          {last ? (
            <p className="text-sm opacity-80">
              {walker(last.walker)?.name} on {last.date} at {last.time} for {last.duration} minutes — Address: {last.address}
            </p>
          ) : <p className="opacity-80">No local bookings yet.</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>All Bookings (API)</CardHeader>
        <CardContent>
          {all.length ? (
            <ul className="space-y-2">
              {all.map((b, i) => (
                <li key={i} className="text-sm">
                  <span className="font-medium">{walker(b.walker)?.name}</span> — {b.date} {b.time} • {b.duration}m • {b.address}
                </li>
              ))}
            </ul>
          ) : <p className="opacity-80">No API bookings yet. Submit one from the Book page.</p>}
        </CardContent>
      </Card>
    </div>
  )
}
