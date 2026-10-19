import axios from 'axios'
import { sessionStorage } from '../auth/storage'
import { toAppError } from './errors'

export const apiClient = axios.create({ baseURL: import.meta.env.VITE_API_URL, headers: { 'Content-Type': 'application/json' }, timeout: 15000 })
apiClient.interceptors.request.use((config) => { const token = sessionStorage.get()?.token; if (token) config.headers.Authorization = `Bearer ${token}`; return config })
apiClient.interceptors.response.use((response) => response, (error: unknown) => { const appError = toAppError(error); if (appError.status === 401) { sessionStorage.clear(); window.dispatchEvent(new Event('stockflow:unauthorized')) } return Promise.reject(appError) })
