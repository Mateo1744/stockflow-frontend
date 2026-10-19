import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderPage } from '../../test/render'
import CustomersPage from './CustomersPage'
import { customerApi } from './customer.api'
const auth = vi.hoisted(() => ({ role: 'SELLER' }))
vi.mock('../auth/AuthContext', () => ({ useAuth: () => ({ hasAnyRole: () => ['ADMIN', 'SELLER'].includes(auth.role), hasRole: (role: string) => auth.role === role }) }))
vi.mock('./customer.api', async (original) => ({ ...(await original<typeof import('./customer.api')>()), customerApi: { list: vi.fn(), create: vi.fn(), update: vi.fn(), deactivate: vi.fn() } }))
const page = { content: [{ id: 1, documentNumber: '123', firstName: 'Ana', lastName: 'Pérez', email: 'ana@test.co', phone: '', address: '', active: true, createdAt: '', updatedAt: '' }], page: 0, size: 10, totalElements: 1, totalPages: 1, first: true, last: true }
describe('CustomersPage permisos', () => { beforeEach(() => vi.mocked(customerApi.list).mockResolvedValue(page)); it('SELLER crea y edita pero no desactiva', async () => { auth.role = 'SELLER'; renderPage(<CustomersPage />); await screen.findByText('Ana Pérez'); expect(screen.getByRole('button', { name: /nuevo cliente/i })).toBeInTheDocument(); expect(screen.getByLabelText('Editar')).toBeInTheDocument(); expect(screen.queryByLabelText('Desactivar')).not.toBeInTheDocument() }); it('ADMIN puede desactivar', async () => { auth.role = 'ADMIN'; renderPage(<CustomersPage />); await screen.findByText('Ana Pérez'); expect(screen.getByLabelText('Desactivar')).toBeInTheDocument() }) })
