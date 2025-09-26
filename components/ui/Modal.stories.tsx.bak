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

// Move the Demo component outside and make it a proper React component
function ModalDemo() {
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

// Use the component directly, not as a render function
export const Basic: Story = {
  render: () => <ModalDemo />,
}

// Alternative approach using Storybook's built-in state management
export const WithControls: Story = {
  args: {
    open: false,
    title: "Sample Modal",
    children: <p>This is modal content that you can control via Storybook controls.</p>
  },
}

// Another approach using decorators for interactive state
export const Interactive: Story = {
  decorators: [
    (Story) => {
      const [open, setOpen] = useState(false)
      
      return (
        <>
          <button
            style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: 8 }}
            onClick={() => setOpen(true)}
          >
            Open Interactive Modal
          </button>
          <Modal open={open} onClose={() => setOpen(false)} title="Interactive Modal">
            <div>
              <p>This modal uses a decorator pattern for state management.</p>
              <button 
                onClick={() => setOpen(false)}
                style={{ marginTop: '12px', padding: '4px 8px' }}
              >
                Close from inside
              </button>
            </div>
          </Modal>
        </>
      )
    }
  ],
  render: () => <div />, // Empty render since decorator handles everything
}