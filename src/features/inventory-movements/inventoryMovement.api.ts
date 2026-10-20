import { apiClient } from '../../lib/api/client'
import { cleanParams } from '../../lib/api/params'
import type { InventoryMovementResponse, MovementFilters, PageResponse } from '../../types/api'
export const inventoryMovementApi = { async list(filters: MovementFilters) { return (await apiClient.get<PageResponse<InventoryMovementResponse>>('/api/inventory-movements', { params: cleanParams(filters) })).data } }
export const movementKeys = { all: ['inventory-movements'] as const, list: (filters: MovementFilters) => ['inventory-movements', 'list', filters] as const }
