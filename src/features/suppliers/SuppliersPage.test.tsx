import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderPage } from '../../test/render'
import SuppliersPage from './SuppliersPage'
import { supplierApi } from './supplier.api'
vi.mock('./supplier.api', async (original) => ({ ...(await original<typeof import('./supplier.api')>()), supplierApi: { list: vi.fn(), create: vi.fn(), update: vi.fn(), deactivate: vi.fn() } }))
describe('SuppliersPage', () => { it('lista y permite iniciar creación', async () => { vi.mocked(supplierApi.list).mockResolvedValue({ content: [{ id: 1, name: 'Distribuciones SAS', taxId: '9001', contactName: 'Luis', email: '', phone: '', address: '', active: true, createdAt: '', updatedAt: '' }], page: 0, size: 10, totalElements: 1, totalPages: 1, first: true, last: true }); renderPage(<SuppliersPage />); const user = userEvent.setup(); expect(await screen.findByText('Distribuciones SAS')).toBeInTheDocument(); await user.click(screen.getByRole('button', { name: /nuevo proveedor/i })); expect(screen.getByRole('heading', { name: /nuevo proveedor/i })).toBeInTheDocument() }) })
