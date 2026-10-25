import { apiClient } from '../../lib/api/client'
import type { LoginResponse } from '../../types/api'

export interface LoginCredentials {
  email: string
  password: string
}

export const authApi = {
  async login(credentials: LoginCredentials) {
    const { data } = await apiClient.post<LoginResponse>(
      '/api/auth/login',
      credentials,
      { timeout: 90000 }
    )

    return data
  },
}