import walkers from '../../data/walkers.json'
import Link from 'next/link'

export default function WalkerProfile({ params }: { params: { id: string } }) {
  const w = (walkers as any[]).find(x => x.id === params.id)
  if (!w) return <div>Walker not found.</div>
  return (
    <article className="max-w-2xl">
      <Link href="/" className="text-blue-600 hover:underline">&larr; Back</Link>
      <h1 className="text-2xl font-semibold mt-2">{w.name}</h1>
      <p className="opacity-80">{w.city}</p>
      <p className="mt-4">{w.bio}</p>
      <p className="mt-2">Rate: <strong>${"{w.rate}"}/hr</strong> • ⭐ {w.rating.toFixed(1)}</p>
      <Link className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        href={`/book?walker=${w.id}`}
      >
        Book {w.name}
      </Link>
    </article>
  )
}
