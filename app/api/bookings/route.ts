import { NextResponse } from 'next/server'

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

// server-side walker rates (kept in sync with UI)
const RATES: Record<string, number> = {
  w1: 22, w2: 20, w3: 25, w4: 24, w5: 23, w6: 21
}

function calcPrice(walker: string, duration: '30' | '60') {
  const rate = RATES[walker] ?? 0
  const hours = duration === '60' ? 1 : 0.5
  const base = Math.round(rate * hours * 100) / 100
  const serviceFee = Math.max(1, Math.round(base * 0.10 * 100) / 100)
  const total = Math.round((base + serviceFee) * 100) / 100
  return { base, serviceFee, total }
}

// In-memory DB (demo)
const FAKE_DB: Booking[] = []

export async function GET(request: Request) {
  const url = new URL(request.url)
  const offset = Number(url.searchParams.get('offset') ?? '0')
  const limit = Math.max(1, Math.min(50, Number(url.searchParams.get('limit') ?? '10')))
  const total = FAKE_DB.length
  const data = FAKE_DB.slice(offset, offset + limit)
  return NextResponse.json({ data, total, offset, limit })
}

export async function POST(req: Request) {
  const body = await req.json() as Omit<Booking, 'id' | 'createdAt' | 'base' | 'serviceFee' | 'total'>
  if (!body.walker || !body.date || !body.time || !body.address || !body.duration) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  const { base, serviceFee, total } = calcPrice(body.walker, body.duration)
  const booking: Booking = {
    id: String(FAKE_DB.length + 1),
    createdAt: new Date().toISOString(),
    duration: body.duration,
    walker: body.walker,
    date: body.date,
    time: body.time,
    address: body.address,
    notes: (body as any).notes,
    base, serviceFee, total
  }
  FAKE_DB.unshift(booking) // newest first
  return NextResponse.json({ id: booking.id, data: booking }, { status: 201 })
}

export async function DELETE(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const idx = FAKE_DB.findIndex(b => b.id === id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const [deleted] = FAKE_DB.splice(idx, 1)
  return NextResponse.json({ ok: true, deleted })
}
