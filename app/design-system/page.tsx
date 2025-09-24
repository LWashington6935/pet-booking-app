import { Button } from '../../components/ui/Button'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'
import { Modal } from '../../components/ui/Modal'

export const metadata = { title: 'Design System' }

export default function DSPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Design System</h1>
      <p className="opacity-80">Lightweight UI primitives used across the app. Built for a11y, theming, and reuse.</p>

      <section>
        <h2 className="text-lg font-semibold mb-2">Buttons</h2>
        <div className="flex gap-3 flex-wrap">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="lg">Large</Button>
          <Button size="sm">Small</Button>
        </div>
        <pre className="mt-3 bg-gray-50 dark:bg-slate-900 p-3 rounded text-xs overflow-auto">{`import { Button } from '@/components/ui/Button'\n<Button variant="secondary">Click</Button>`}</pre>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Cards</h2>
        <Card>
          <CardHeader>Card Title</CardHeader>
          <CardContent>Cards group content with a border and padding.</CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Modal</h2>
        <p className="opacity-80 mb-2">Modal is client-side only with Escape-to-close and click outside support.</p>
        <Modal open={true} onClose={() => {}} title="Demo Modal">
          This modal is for documentation preview.
        </Modal>
      </section>
    </div>
  )
}
