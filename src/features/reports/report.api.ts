import { apiClient } from '../../lib/api/client'
import type { InventorySummaryResponse, LowStockResponse, SalesSummaryResponse } from '../../types/api'

export const reportApi = {
  async getLowStock() { const { data } = await apiClient.get<LowStockResponse>('/api/reports/low-stock'); return data },
  async getSalesSummary() { const { data } = await apiClient.get<SalesSummaryResponse>('/api/reports/sales-summary'); return data },
  async getInventorySummary() { const { data } = await apiClient.get<InventorySummaryResponse>('/api/reports/inventory-summary'); return data },
}
