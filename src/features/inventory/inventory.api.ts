import { apiClient } from '../../lib/api/client'
import type { InventoryResponse } from '../../types/api'
export const inventoryApi = { async list() { return (await apiClient.get<InventoryResponse[]>('/api/inventory')).data }, async detail(id: number) { return (await apiClient.get<InventoryResponse>(`/api/inventory/${id}`)).data }, async byProduct(productId: number) { return (await apiClient.get<InventoryResponse>(`/api/inventory/product/${productId}`)).data } }
export const inventoryKeys = { all: ['inventory'] as const, detail: (id: number) => ['inventory', id] as const, product: (id: number) => ['inventory', 'product', id] as const }
