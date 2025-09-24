import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardContent } from './Card'

const meta: Meta<typeof Card> = { title: 'UI/Card', component: Card }
export default meta
type Story = StoryObj<typeof Card>

export const Basic: Story = {
  render: () => (
    <Card>
      <CardHeader>Card Title</CardHeader>
      <CardContent>This is a simple card.</CardContent>
    </Card>
  )
}
