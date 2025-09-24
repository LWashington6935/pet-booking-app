'use client'

import { useEffect, useState } from 'react'
import walkers from '../data/walkers.json'
import { Button } from '../../components/ui/Button'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'

type Booking = {
  id: string
  walker: string
  date: string
  time: string
  duration: '30' | '60'
  address: string
  notes?: string
  createdAt: string
  base: number
  serviceFee: number
  total: number
}

const PAGE_SIZE = 5

function wName(id: string | undefined) {
  const w = (walkers as any[]).find(x => x.id === id)
  return w ? `${w.name} ($${w.rate}/hr)` : 'Unknown walker'
}

export default function BookingsPage() {
  const [items, setItems] = useState<Booking[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const [undo, setUndo] = useState<{ booking: Booking } | null>(null)
  const [undoTimer, setUndoTimer] = useState<any>(null)

  // form state (simple, no lib)
  const [f, setF] = useState({ walker: 'w1', date: '', time: '', duration: '30', address: '', notes: '' })
  const [saving, setSaving] = useState(false)

  async function load(p = 0) {
    setLoading(true); setErr(null)
    try {
      const offset = p * PAGE_SIZE
      const res = await fetch(`/api/bookings?offset=${offset}&limit=${PAGE_SIZE}`, { cache: 'no-store' })
      const json = await res.json()
      setItems(json.data ?? [])
      setTotal(json.total ?? 0)
    } catch (e: any) {
      setErr(e?.message ?? 'Failed to load')
    } finally { setLoading(false) }
  }

  useEffect(() => { load(page) }, [page])

  const maxPage = Math.max(0, Math.ceil(total / PAGE_SIZE) - 1)

  async function createDemo() {
    const now = new Date()
    const temp: Booking = {
      id: `temp-${now.getTime()}`,
      walker: 'w1',
      date: now.toISOString().slice(0,10),
      time: now.toTimeString().slice(0,5),
      duration: '30',
      address: '123 Main St, Columbus OH',
      createdAt: now.toISOString(),
      base: 11, serviceFee: 1.1, total: 12.1
    }
    setItems(prev => [temp, ...prev])
    setTotal(t => t + 1)

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify({
          walker: temp.walker,
          date: temp.date,
          time: temp.time,
          duration: temp.duration,
          address: temp.address
        })
      })
      if (!res.ok) throw new Error('Failed to save')
      const json = await res.json()
      // refetch current page to reconcile price fields
      await load(page)
      window.dispatchEvent(new CustomEvent('app:toast', { detail: 'Booking created' } as any))
    } catch (e) {
      setItems(prev => prev.filter(b => b.id !== temp.id))
      setTotal(t => Math.max(0, t - 1))
      window.dispatchEvent(new CustomEvent('app:toast', { detail: 'Create failed' } as any))
    }
  }

  async function createFromForm() {
    // basic validation
    if (!f.date || !f.time || !f.address) {
      window.dispatchEvent(new CustomEvent('app:toast', { detail: 'Please fill date, time, and address' } as any))
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify({
          walker: f.walker,
          date: f.date,
          time: f.time,
          duration: f.duration as '30' | '60',
          address: f.address,
          notes: f.notes
        })
      })
      if (!res.ok) throw new Error('Failed to create')
      await load(0)
      setPage(0)
      setF({ walker: 'w1', date: '', time: '', duration: '30', address: '', notes: '' })
      window.dispatchEvent(new CustomEvent('app:toast', { detail: 'Created booking' } as any))
    } catch (e) {
      window.dispatchEvent(new CustomEvent('app:toast', { detail: 'Create failed' } as any))
    } finally {
      setSaving(false)
    }
  }

  async function onDelete(id: string) {
    const target = items.find(b => b.id === id)
    if (!target) return
    // optimistic remove
    setItems(prev => prev.filter(b => b.id !== id))
    setTotal(t => Math.max(0, t - 1))
    setUndo({ booking: target })
    if (undoTimer) clearTimeout(undoTimer)
    const t = setTimeout(() => setUndo(null), 5000)
    setUndoTimer(t)
    window.dispatchEvent(new CustomEvent('app:toast', { detail: 'Deleted booking' } as any))

    try {
      const res = await fetch(`/api/bookings?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
    } catch (e) {
      // rollback if server failed
      setItems(prev => [target, ...prev])
      setTotal(t => t + 1)
      setUndo(null)
      window.dispatchEvent(new CustomEvent('app:toast', { detail: 'Delete failed, restored' } as any))
    }
  }

  async function onUndo() {
    if (!undo?.booking) return
    const b = undo.booking
    setUndo(null)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify({
          walker: b.walker,
          date: b.date,
          time: b.time,
          duration: b.duration,
          address: b.address,
          notes: b.notes
        })
      })
      if (res.ok) {
        await load(page)
        window.dispatchEvent(new CustomEvent('app:toast', { detail: 'Restored booking' } as any))
      }
    } catch {}
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Bookings</h1>
        <div className="flex gap-2">
          <Button onClick={() => load(page)} variant="secondary">Refresh</Button>
          <Button onClick={createDemo}>+ Add demo booking</Button>
        </div>
      </div>

      {/* Inline create form */}
      <Card>
        <CardHeader>Create Booking</CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            <label className="text-sm">Walker
              <select className="block w-full border rounded p-2 mt-1 dark:bg-slate-900 dark:border-slate-700"
                value={f.walker} onChange={e => setF({ ...f, walker: e.target.value })}>
                {(walkers as any[]).map(w => <option key={w.id} value={w.id}>{w.name} (${w.rate}/hr)</option>)}
              </select>
            </label>
            <label className="text-sm">Date
              <input type="date" className="block w-full border rounded p-2 mt-1 dark:bg-slate-900 dark:border-slate-700"
                value={f.date} onChange={e => setF({ ...f, date: e.target.value })} />
            </label>
            <label className="text-sm">Time
              <input type="time" className="block w-full border rounded p-2 mt-1 dark:bg-slate-900 dark:border-slate-700"
                value={f.time} onChange={e => setF({ ...f, time: e.target.value })} />
            </label>
            <label className="text-sm">Duration
              <select className="block w-full border rounded p-2 mt-1 dark:bg-slate-900 dark:border-slate-700"
                value={f.duration} onChange={e => setF({ ...f, duration: e.target.value })}>
                <option value="30">30 min</option>
                <option value="60">60 min</option>
              </select>
            </label>
            <label className="text-sm md:col-span-2">Address
              <input placeholder="123 Main St, Columbus OH" className="block w-full border rounded p-2 mt-1 dark:bg-slate-900 dark:border-slate-700"
                value={f.address} onChange={e => setF({ ...f, address: e.target.value })} />
            </label>
            <label className="text-sm md:col-span-3">Notes
              <input className="block w-full border rounded p-2 mt-1 dark:bg-slate-900 dark:border-slate-700"
                value={f.notes} onChange={e => setF({ ...f, notes: e.target.value })} />
            </label>
          </div>
          <div className="mt-3 text-right">
            <Button onClick={createFromForm} disabled={saving}>{saving ? 'Saving…' : 'Create'}</Button>
          </div>
        </CardContent>
      </Card>

      {undo && (
        <div className="flex items-center justify-between rounded border p-3 bg-yellow-50 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-200">
          <span className="text-sm">Booking deleted.</span>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={onUndo}>Undo</Button>
          </div>
        </div>
      )}

      {err && <p className="text-red-600 text-sm">{err}</p>}
      {loading && <p className="opacity-70 text-sm">Loading…</p>}

      {items.length === 0 && !loading ? (
        <p className="opacity-80">No bookings yet. Create one above or use the demo button.</p>
      ) : (
        <ul className="space-y-2">
          {items.map(b => (
            <li key={b.id}>
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <span className="font-medium">{wName(b.walker)}</span>
                  <div className="flex items-center gap-3 text-xs opacity-70">
                    <span>{new Date(b.createdAt).toLocaleString()}</span>
                    <Button size="sm" variant="ghost" onClick={() => onDelete(b.id)}>Delete</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm flex flex-col gap-1">
                    <div>{b.date} {b.time} • {b.duration}m • {b.address}</div>
                    <div className="flex flex-wrap gap-4 text-xs">
                      <span>Base: ${b.base.toFixed(2)}</span>
                      <span>Fee: ${b.serviceFee.toFixed(2)}</span>
                      <span className="font-semibold">Total: ${b.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between pt-2">
        <span className="text-sm opacity-70">Total: {total}</span>
        <div className="flex gap-2">
          <Button variant="secondary" disabled={page <= 0} onClick={() => setPage(p => Math.max(0, p-1))}>Prev</Button>
          <Button variant="secondary" disabled={page >= maxPage} onClick={() => setPage(p => Math.min(maxPage, p+1))}>Next</Button>
        </div>
      </div>
    </div>
  )
}
