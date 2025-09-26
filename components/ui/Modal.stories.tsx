'use client'

import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
}
export default meta

type Story = StoryObj<typeof Modal>

function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: 8 }}
        onClick={() => setOpen(true)}
      >
        Open modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Hello">
        <p>Storybook modal content</p>
      </Modal>
    </>
  )
}

export const Basic: Story = {
  render: () => <Demo />,
}
