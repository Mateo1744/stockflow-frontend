import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DashboardPage } from './DashboardPage'
import { reportApi } from '../reports/report.api'
vi.mock('../auth/AuthContext', () => ({ useAuth: () => ({ hasAnyRole: (roles: string[]) => roles.includes('ADMIN') }) }))
vi.mock('../reports/report.api', () => ({ reportApi: { getSalesSummary: vi.fn(), getInventorySummary: vi.fn(), getLowStock: vi.fn() } }))
function renderDashboard() { const client = new QueryClient({ defaultOptions: { queries: { retry: false } } }); return render(<QueryClientProvider client={client}><DashboardPage /></QueryClientProvider>) }
describe('DashboardPage', () => {
  beforeEach(() => { vi.mocked(reportApi.getSalesSummary).mockReset(); vi.mocked(reportApi.getInventorySummary).mockReset(); vi.mocked(reportApi.getLowStock).mockReset() })
  it('muestra skeletons mientras carga', () => { vi.mocked(reportApi.getSalesSummary).mockReturnValue(new Promise(() => undefined)); vi.mocked(reportApi.getInventorySummary).mockReturnValue(new Promise(() => undefined)); vi.mocked(reportApi.getLowStock).mockReturnValue(new Promise(() => undefined)); const { container } = renderDashboard(); expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0) })
  it('muestra la respuesta real', async () => { vi.mocked(reportApi.getSalesSummary).mockResolvedValue({ totalSales: 12, totalRevenue: 500000, completedSales: 10, cancelledSales: 1, pendingSales: 1 }); vi.mocked(reportApi.getInventorySummary).mockResolvedValue({ totalProducts: 33, totalUnitsInStock: 420, lowStockProducts: 1 }); vi.mocked(reportApi.getLowStock).mockResolvedValue([{ productId: 8, productName: 'Café', sku: 'CAF-1', currentStock: 2, minimumStock: 5 }]); renderDashboard(); expect(await screen.findByText('Café')).toBeInTheDocument(); expect(screen.getByText('12')).toBeInTheDocument(); expect(screen.getByText('420')).toBeInTheDocument() })
  it('muestra estado de error', async () => { vi.mocked(reportApi.getSalesSummary).mockRejectedValue(new Error('fail')); vi.mocked(reportApi.getInventorySummary).mockRejectedValue(new Error('fail')); vi.mocked(reportApi.getLowStock).mockRejectedValue(new Error('fail')); renderDashboard(); expect(await screen.findByText(/uno o más reportes/i)).toBeInTheDocument() })
})
