import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderPage } from '../../test/render'
import CategoriesPage from './CategoriesPage'
import { categoryApi } from './category.api'
const auth = vi.hoisted(() => ({ write: true }))
vi.mock('../auth/AuthContext', () => ({ useAuth: () => ({ hasAnyRole: () => auth.write }) }))
vi.mock('./category.api', async (original) => ({ ...(await original<typeof import('./category.api')>()), categoryApi: { list: vi.fn(), create: vi.fn(), update: vi.fn(), deactivate: vi.fn() } }))
describe('CategoriesPage', () => { beforeEach(() => { auth.write = true; vi.mocked(categoryApi.list).mockResolvedValue([{ id: 1, name: 'Tecnología', description: 'Equipos', active: true, createdAt: '', updatedAt: '' }]) }); it('lista y abre create/edit', async () => { renderPage(<CategoriesPage />); const user = userEvent.setup(); await screen.findByText('Tecnología'); await user.click(screen.getByRole('button', { name: /nueva categoría/i })); expect(screen.getByRole('heading', { name: /nueva categoría/i })).toBeInTheDocument(); await user.click(screen.getByRole('button', { name: 'Cancelar' })); await user.click(screen.getByLabelText('Editar')); expect(screen.getByDisplayValue('Tecnología')).toBeInTheDocument() }); it('oculta escritura en solo lectura', async () => { auth.write = false; renderPage(<CategoriesPage />); await screen.findByText('Tecnología'); expect(screen.queryByLabelText('Editar')).not.toBeInTheDocument() }) })
