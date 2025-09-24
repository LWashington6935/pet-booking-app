import { render, screen } from '@testing-library/react'
import Home from '../page'

it('renders CTA buttons', () => {
  render(<Home /> as any)
  expect(screen.getByText(/Book a Walk/)).toBeInTheDocument()
  expect(screen.getByText(/View Dashboard/)).toBeInTheDocument()
})
