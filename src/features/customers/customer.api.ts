import { apiClient } from '../../lib/api/client'
import { cleanParams } from '../../lib/api/params'
import type { CustomerFilters, CustomerRequest, CustomerResponse, PageResponse } from '../../types/api'
export const customerApi = { async list(filters: CustomerFilters) { return (await apiClient.get<PageResponse<CustomerResponse>>('/api/customers', { params: cleanParams(filters) })).data }, async create(body: CustomerRequest) { return (await apiClient.post<CustomerResponse>('/api/customers', body)).data }, async update(id: number, body: CustomerRequest) { return (await apiClient.put<CustomerResponse>(`/api/customers/${id}`, body)).data }, async deactivate(id: number) { await apiClient.delete(`/api/customers/${id}`) } }
export const customerKeys = { all: ['customers'] as const, list: (filters: CustomerFilters) => ['customers', 'list', filters] as const, detail: (id: number) => ['customers', id] as const }
