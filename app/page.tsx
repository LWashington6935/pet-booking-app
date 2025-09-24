import Link from 'next/link'
import walkers from './data/walkers.json'

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border p-6 bg-gray-50 dark:bg-slate-900 dark:border-slate-800">
        <h1 className="text-2xl font-semibold mb-2">Book trusted dog walkers—fast.</h1>
        <p className="text-sm opacity-80">
          This is a demo app to showcase React + TypeScript + Tailwind, with forms, a11y, and tests.
        </p>
        <div className="mt-4 flex gap-3">
          <Link className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" href="/book">
            Book a Walk
          </Link>
          <Link className="px-4 py-2 border rounded" href="/dashboard">
            View Dashboard
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Top Walkers</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {walkers.slice(0, 6).map((w) => (
            <li key={w.id} className="border rounded p-4 dark:border-slate-800">
              <h3 className="font-medium">{w.name}</h3>
              <p className="text-sm opacity-75">
                {w.city} • ⭐ {w.rating.toFixed(1)}
              </p>
              <Link
                className="inline-block mt-2 text-blue-600 hover:underline"
                href={`/walkers/${w.id}`}
              >
                View profile
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
