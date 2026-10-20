import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderPage } from '../../test/render'
import SalesPage from './SalesPage'
import { saleApi } from './sale.api'
const auth = vi.hoisted(() => ({ write: true }))
vi.mock('../auth/AuthContext', () => ({ useAuth: () => ({ hasAnyRole: () => auth.write }) }))
vi.mock('./sale.api', async (original) => ({ ...(await original<typeof import('./sale.api')>()), saleApi: { list: vi.fn() } }))
const page = { content: [{ id: 1, saleNumber: 'V-1', status: 'PENDING' as const, customerId: null, customerDocumentNumber: null, customerFirstName: null, customerLastName: null, customerEmail: null, sellerId: 2, sellerFirstName: 'Sara', sellerLastName: 'Ventas', sellerEmail: 's@test.co', totalAmount: 20000, items: [], createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' }], page: 0, size: 10, totalElements: 1, totalPages: 1, first: true, last: true }
describe('SalesPage permisos', () => { it('SELLER ve creación', async () => { auth.write = true; vi.mocked(saleApi.list).mockResolvedValue(page); renderPage(<SalesPage />); await screen.findByText('V-1'); expect(screen.getByRole('link', { name: /nueva venta/i })).toBeInTheDocument() }); it('INVENTORY_MANAGER queda en solo lectura', async () => { auth.write = false; vi.mocked(saleApi.list).mockResolvedValue(page); renderPage(<SalesPage />); await screen.findByText('V-1'); expect(screen.queryByRole('link', { name: /nueva venta/i })).not.toBeInTheDocument() }) })
