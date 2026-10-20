import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import ReportsPage from './ReportsPage'
import { reportApi } from './report.api'

let role = 'SELLER'
vi.mock('../auth/AuthContext', () => ({ useAuth: () => ({ hasAnyRole: (roles: string[]) => roles.includes(role) }) }))
vi.mock('./report.api', () => ({ reportApi: { getSalesSummary: vi.fn(), getInventorySummary: vi.fn(), getLowStock: vi.fn() } }))
vi.mock('recharts', () => ({ ResponsiveContainer: ({ children }: { children: ReactNode }) => <div>{children}</div>, PieChart: ({ children }: { children: ReactNode }) => <div>{children}</div>, Pie: ({ children }: { children: ReactNode }) => <div>{children}</div>, Cell: () => null, Tooltip: () => null }))

function renderReports() { const client = new QueryClient({ defaultOptions: { queries: { retry: false } } }); return render(<QueryClientProvider client={client}><ReportsPage /></QueryClientProvider>) }

describe('ReportsPage', () => {
  beforeEach(() => { role = 'SELLER'; vi.clearAllMocks(); vi.mocked(reportApi.getSalesSummary).mockResolvedValue({ totalSales: 4, totalRevenue: 90000, completedSales: 3, pendingSales: 1, cancelledSales: 0 }); vi.mocked(reportApi.getInventorySummary).mockResolvedValue({ totalProducts: 2, totalUnitsInStock: 8, lowStockProducts: 1 }); vi.mocked(reportApi.getLowStock).mockResolvedValue([]) })
  it('limita a SELLER al resumen de ventas', async () => { renderReports(); expect(await screen.findByText('Ingresos')).toBeInTheDocument(); expect(screen.getByText('4')).toBeInTheDocument(); expect(reportApi.getInventorySummary).not.toHaveBeenCalled(); expect(screen.queryByText('Productos con stock bajo')).not.toBeInTheDocument() })
  it('muestra inventario y stock bajo a INVENTORY_MANAGER sin consultar ventas', async () => { role = 'INVENTORY_MANAGER'; renderReports(); expect(await screen.findByText('Productos con stock bajo')).toBeInTheDocument(); expect(reportApi.getSalesSummary).not.toHaveBeenCalled(); expect(reportApi.getInventorySummary).toHaveBeenCalledOnce() })
})
