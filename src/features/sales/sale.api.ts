import { apiClient } from '../../lib/api/client'
import { cleanParams } from '../../lib/api/params'
import type { PageResponse, SaleFilters, SaleRequest, SaleResponse } from '../../types/api'
export const saleApi = { async list(filters: SaleFilters) { return (await apiClient.get<PageResponse<SaleResponse>>('/api/sales', { params: cleanParams(filters) })).data }, async detail(id: number) { return (await apiClient.get<SaleResponse>(`/api/sales/${id}`)).data }, async create(body: SaleRequest) { return (await apiClient.post<SaleResponse>('/api/sales', body)).data }, async complete(id: number) { return (await apiClient.post<SaleResponse>(`/api/sales/${id}/complete`)).data }, async cancel(id: number) { return (await apiClient.post<SaleResponse>(`/api/sales/${id}/cancel`)).data } }
export const saleKeys = { all: ['sales'] as const, list: (filters: SaleFilters) => ['sales', 'list', filters] as const, detail: (id: number) => ['sales', id] as const }
