import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { ReactElement } from 'react'
export function renderPage(element: ReactElement, path = '/') { const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } }); return render(<QueryClientProvider client={client}><MemoryRouter initialEntries={[path]}>{element}</MemoryRouter></QueryClientProvider>) }
