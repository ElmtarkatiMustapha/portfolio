import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import App from '../src/App'
import { profile } from '../src/content'

describe('portfolio visitor journeys', () => {
  it('switches every section to French and persists the language', () => {
    const { unmount } = render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'FR' }))
    expect(document.documentElement.lang).toBe('fr')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Du code réfléchi.')
    expect(screen.getByRole('heading', { name: 'Formateur JavaScript' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Découvrir mes projets' })).toHaveAttribute('href', '#work')
    expect(localStorage.getItem('portfolio-language')).toBe('fr')
    unmount(); render(<App />)
    expect(screen.getByRole('button', { name: 'FR' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('heading', { name: 'JavaScript Trainer' })).toBeInTheDocument()
  })
  it('filters the four projects without changing repository destinations', () => {
    render(<App />)
    const work = document.getElementById('work')!
    expect(within(work).getAllByRole('article')).toHaveLength(4)
    fireEvent.click(screen.getByRole('button', { name: 'Web3' }))
    expect(within(work).getAllByRole('article')).toHaveLength(1)
    expect(within(work).getByRole('link', { name: 'BabDigi', exact: true })).toHaveAttribute('href', `${profile.github}/babdigi`)
    fireEvent.click(screen.getByRole('button', { name: 'Web applications' }))
    expect(within(work).getAllByRole('article')).toHaveLength(3)
    fireEvent.click(screen.getByRole('button', { name: 'All projects' }))
    expect(within(work).getAllByRole('article')).toHaveLength(4)
  })
  it('provides actual contact links, complete education, and the supplied Simplon start date', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Send me an email' })).toHaveAttribute('href', `mailto:${profile.email}`)
    expect(screen.getByRole('link', { name: /CALL/ })).toHaveAttribute('href', 'tel:+212653707131')
    expect(screen.getByText(/14.09.2026/)).toBeInTheDocument()
    expect(screen.getByText('USMBA · FP Taza')).toBeInTheDocument()
  })
  it('closes mobile navigation when a destination is chosen or Escape is pressed', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: 'Toggle navigation' })
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(screen.getByRole('link', { name: 'About', exact: true }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(toggle); fireEvent.keyDown(window, { key: 'Escape' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
