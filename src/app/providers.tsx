import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { AppError } from '../lib/api/errors'
import { AuthProvider } from '../features/auth/AuthContext'

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, retry: (count, error) => !(error instanceof AppError && [401, 403].includes(error.status ?? 0)) && count < 2, refetchOnWindowFocus: false }, mutations: { retry: false } } })
export function AppProviders({ children }: { children: ReactNode }) { return <QueryClientProvider client={queryClient}><AuthProvider>{children}<Toaster richColors position="top-right" closeButton /></AuthProvider></QueryClientProvider> }
