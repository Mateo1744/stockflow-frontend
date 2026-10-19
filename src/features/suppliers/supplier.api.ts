import { apiClient } from '../../lib/api/client'
import { cleanParams } from '../../lib/api/params'
import type { PageResponse, SupplierFilters, SupplierRequest, SupplierResponse } from '../../types/api'
export const supplierApi = { async list(filters: SupplierFilters) { return (await apiClient.get<PageResponse<SupplierResponse>>('/api/suppliers', { params: cleanParams(filters) })).data }, async create(body: SupplierRequest) { return (await apiClient.post<SupplierResponse>('/api/suppliers', body)).data }, async update(id: number, body: SupplierRequest) { return (await apiClient.put<SupplierResponse>(`/api/suppliers/${id}`, body)).data }, async deactivate(id: number) { await apiClient.delete(`/api/suppliers/${id}`) } }
export const supplierKeys = { all: ['suppliers'] as const, list: (filters: SupplierFilters) => ['suppliers', 'list', filters] as const, detail: (id: number) => ['suppliers', id] as const }
