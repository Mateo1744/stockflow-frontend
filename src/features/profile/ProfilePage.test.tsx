import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ProfilePage from './ProfilePage'

vi.mock('../auth/AuthContext', () => ({ useAuth: () => ({
  user: { id: 7, firstName: 'Ana', lastName: 'Ruiz', email: 'ana@stockflow.test', active: true, roles: [{ id: 1, name: 'SELLER' }], createdAt: '', updatedAt: '' },
  roles: ['SELLER'],
}) }))

describe('ProfilePage', () => {
  it('muestra datos seguros de la sesión sin exponer credenciales', () => {
    render(<ProfilePage />)
    expect(screen.getByText('Ana Ruiz')).toBeInTheDocument()
    expect(screen.getByText('ana@stockflow.test')).toBeInTheDocument()
    expect(screen.getByText('Vendedor')).toBeInTheDocument()
    expect(screen.queryByText(/bearer/i)).not.toBeInTheDocument()
  })
})
