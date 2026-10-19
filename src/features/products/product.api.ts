import { apiClient } from '../../lib/api/client'
import { cleanParams } from '../../lib/api/params'
import type { PageResponse, ProductFilters, ProductRequest, ProductResponse } from '../../types/api'
export const productApi = { async list(filters: ProductFilters) { return (await apiClient.get<PageResponse<ProductResponse>>('/api/products', { params: cleanParams(filters) })).data }, async create(body: ProductRequest) { return (await apiClient.post<ProductResponse>('/api/products', body)).data }, async update(id: number, body: ProductRequest) { return (await apiClient.put<ProductResponse>(`/api/products/${id}`, body)).data }, async deactivate(id: number) { await apiClient.delete(`/api/products/${id}`) } }
export const productKeys = { all: ['products'] as const, list: (filters: ProductFilters) => ['products', 'list', filters] as const, detail: (id: number) => ['products', id] as const }
