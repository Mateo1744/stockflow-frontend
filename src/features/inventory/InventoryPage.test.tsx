import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderPage } from '../../test/render'
import InventoryPage from './InventoryPage'
import { inventoryApi } from './inventory.api'
vi.mock('./inventory.api', async (original) => ({ ...(await original<typeof import('./inventory.api')>()), inventoryApi: { list: vi.fn() } }))
describe('InventoryPage', () => { it('muestra stock bajo sin acciones mutables', async () => { vi.mocked(inventoryApi.list).mockResolvedValue([{ id: 1, productId: 2, productSku: 'SKU-1', productName: 'Mouse', currentStock: 2, minimumStock: 5, updatedAt: '2026-01-01T00:00:00Z' }]); renderPage(<InventoryPage />); expect(await screen.findByText('Mouse')).toBeInTheDocument(); expect(screen.getByText('Stock bajo')).toBeInTheDocument(); expect(screen.queryByLabelText('Editar')).not.toBeInTheDocument() }) })
