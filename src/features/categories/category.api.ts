import { apiClient } from '../../lib/api/client'
import type { CategoryRequest, CategoryResponse } from '../../types/api'
export const categoryApi = { async list() { return (await apiClient.get<CategoryResponse[]>('/api/categories')).data }, async create(body: CategoryRequest) { return (await apiClient.post<CategoryResponse>('/api/categories', body)).data }, async update(id: number, body: CategoryRequest) { return (await apiClient.put<CategoryResponse>(`/api/categories/${id}`, body)).data }, async deactivate(id: number) { await apiClient.delete(`/api/categories/${id}`) } }
export const categoryKeys = { all: ['categories'] as const, detail: (id: number) => ['categories', id] as const }
