'use client'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from './Button'

const meta: Meta<typeof Modal> = { title: 'UI/Modal', component: Modal }
export default meta
type Story = StoryObj<typeof Modal>

export const Demo: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Hello">
          Modal content goes here.
        </Modal>
      </div>
    )
  }
}
