import { apiClient } from '../../lib/api/client'
import type { UserCreateRequest, UserResponse, UserUpdateRequest } from '../../types/api'
export const userApi = { async list() { return (await apiClient.get<UserResponse[]>('/api/users')).data }, async create(body: UserCreateRequest) { return (await apiClient.post<UserResponse>('/api/users', body)).data }, async update(id: number, body: UserUpdateRequest) { return (await apiClient.put<UserResponse>(`/api/users/${id}`, body)).data }, async deactivate(id: number) { await apiClient.delete(`/api/users/${id}`) } }
export const userKeys = { all: ['users'] as const, detail: (id: number) => ['users', id] as const }
