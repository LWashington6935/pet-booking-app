'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useMemo, FormEvent } from 'react'
import walkers from '../data/walkers.json'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

interface Booking {
  walker: string
  date: string
  time: string
  duration: '30' | '60'
  address: string
  notes?: string
}

function getRate(id: string | null) {
  if (!id) return 0
  const w = (walkers as any[]).find(x => x.id === id)
  return w ? Number(w.rate) : 0
}

export default function BookPage() {
  const router = useRouter()
  const sp = useSearchParams()
  const [submitted, setSubmitted] = useState<Booking | null>(null)
  const [formData, setFormData] = useState<Booking>({
    walker: sp.get('walker') ?? '',
    date: '',
    time: '',
    duration: '30',
    address: '',
    notes: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const hourly = useMemo(() => getRate(formData.walker), [formData.walker])
  const estimate = useMemo(() => {
    const hours = formData.duration === '60' ? 1 : 0.5
    return Math.round(hourly * hours * 100) / 100
  }, [hourly, formData.duration])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.walker) newErrors.walker = 'Please select a walker'
    if (!formData.date) newErrors.date = 'Please select a date'
    if (!formData.time) newErrors.time = 'Please select a time'
    if (!formData.address || formData.address.length < 5) {
      newErrors.address = 'Please enter a valid address (minimum 5 characters)'
    }
    if (formData.notes && formData.notes.length > 200) {
      newErrors.notes = 'Notes must be 200 characters or less'
    }

    // Check if date is in the past
    if (formData.date) {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof Booking, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try { 
      sessionStorage.setItem('toast', 'Submitting booking…') 
    } catch {}
    
    setSubmitted(formData)
    localStorage.setItem('lastBooking', JSON.stringify(formData))
    
    try {
      const res = await fetch('/api/bookings', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) 
      })
      if (res.ok) {
        const json = await res.json()
        console.log('Saved booking id', json.id)
        router.push('/bookings')
      } else {
        console.error('Failed to submit booking')
      }
    } catch (error) {
      console.error('Failed to submit booking:', error)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Book a Walk</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Schedule a professional dog walk for your furry friend
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Walker
              </label>
              <select 
                value={formData.walker}
                onChange={(e) => handleInputChange('walker', e.target.value)}
                className={`w-full border rounded-lg p-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.walker ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-slate-600'
                }`}
              >
                <option value="">Choose a walker...</option>
                {(walkers as any[]).map(w => (
                  <option key={w.id} value={w.id}>
                    {w.name} - ${w.rate}/hr ⭐ {w.rating}
                  </option>
                ))}
              </select>
              {errors.walker && <p className="text-red-500 text-sm mt-1">{errors.walker}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Date
                </label>
                <input 
                  type="date" 
                  value={formData.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className={`w-full border rounded-lg p-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.date ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-slate-600'
                  }`}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Time
                </label>
                <input 
                  type="time" 
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className={`w-full border rounded-lg p-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.time ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-slate-600'
                  }`}
                />
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>
            </div>

            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-3">
                Duration
              </legend>
              <div className="flex gap-6" role="radiogroup" aria-label="Duration">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="duration"
                    value="30" 
                    checked={formData.duration === '30'}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500" 
                  /> 
                  <span>30 minutes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="duration"
                    value="60" 
                    checked={formData.duration === '60'}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500" 
                  /> 
                  <span>60 minutes</span>
                </label>
              </div>
            </fieldset>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Pickup Address
              </label>
              <input 
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Main St, Columbus, OH 43215" 
                className={`w-full border rounded-lg p-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.address ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-slate-600'
                }`}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Special Instructions (optional)
              </label>
              <textarea 
                rows={4} 
                value={formData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any special instructions for your pet's walk..."
                className={`w-full border rounded-lg p-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                  errors.notes ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-slate-600'
                }`}
              />
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-500 dark:text-slate-400">Maximum 200 characters</span>
                <span className={`${(formData.notes?.length || 0) > 180 ? 'text-orange-500' : 'text-gray-500 dark:text-slate-400'}`}>
                  {formData.notes?.length || 0}/200
                </span>
              </div>
              {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes}</p>}
            </div>
          </div>

          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                Price Estimate
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${estimate.toFixed(2)}
              </div>
            </div>
            
            <div className="text-sm text-blue-700 dark:text-blue-300 mb-4">
              Based on {formData.duration === '60' ? '60' : '30'} minutes at ${hourly}/hr
            </div>
          
            <div className="space-y-2 text-sm border-t border-blue-200 dark:border-blue-700 pt-3">
              <div className="flex justify-between text-blue-800 dark:text-blue-200">
                <span>Base rate</span>
                <span>${estimate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-blue-700 dark:text-blue-300">
                <span>Service fee (10%, $1 min)</span>
                <span>${Math.max(1, estimate * 0.10).toFixed(2)}</span>
              </div>
              <div className="border-t border-blue-200 dark:border-blue-700 pt-2 font-semibold flex justify-between text-blue-900 dark:text-blue-100">
                <span>Total</span>
                <span>${(estimate + Math.max(1, estimate * 0.10)).toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <Button 
            type="submit" 
            className="w-full py-3 text-lg font-semibold"
            disabled={!hourly || estimate === 0}
          >
            Book Your Walk - ${(estimate + Math.max(1, estimate * 0.10)).toFixed(2)}
          </Button>
        </form>
      </div>

      <aside className="lg:sticky lg:top-8 h-fit">
        <Card className="bg-gray-50 dark:bg-slate-800/50">
          <h2 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
            Booking Preview
          </h2>
          {submitted ? (
            <div className="space-y-3">
              <div className="text-sm">
                <span className="font-medium">Status:</span>
                <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs">
                  Submitted
                </span>
              </div>
              <pre className="text-xs bg-white dark:bg-slate-900 p-3 rounded border overflow-auto max-h-96">
                {JSON.stringify(submitted, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🐕</div>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Fill out the form to see your booking details
              </p>
            </div>
          )}
        </Card>
      </aside>
    </div>
  )
}