import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderPage } from '../../test/render'
import UsersPage from './UsersPage'
import { userApi } from './user.api'
vi.mock('./user.api', async (original) => ({ ...(await original<typeof import('./user.api')>()), userApi: { list: vi.fn(), create: vi.fn(), update: vi.fn(), deactivate: vi.fn() } }))
const userResponse = { id: 1, firstName: 'Ada', lastName: 'Admin', email: 'ada@test.co', active: true, roles: [{ id: 1, name: 'ADMIN' as const, description: 'Admin' }], createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' }
describe('UsersPage', () => { it('lista y creación incluye password', async () => { vi.mocked(userApi.list).mockResolvedValue([userResponse]); renderPage(<UsersPage />); const user = userEvent.setup(); expect(await screen.findByText('Ada Admin')).toBeInTheDocument(); await user.click(screen.getByRole('button', { name: /nuevo usuario/i })); expect(screen.getByLabelText('Contraseña')).toBeInTheDocument() }); it('edición no expone ni envía campo password', async () => { vi.mocked(userApi.list).mockResolvedValue([userResponse]); renderPage(<UsersPage />); const user = userEvent.setup(); await screen.findByText('Ada Admin'); await user.click(screen.getByLabelText('Editar')); expect(screen.queryByLabelText('Contraseña')).not.toBeInTheDocument(); expect(screen.getByText(/contraseña actual no se muestra/i)).toBeInTheDocument() }) })
