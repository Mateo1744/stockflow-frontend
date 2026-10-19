import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, Banknote, Boxes, Package, ReceiptText } from 'lucide-react'
import { EmptyState } from '../../components/shared/EmptyState'
import { ErrorState } from '../../components/shared/ErrorState'
import { MetricCard } from '../../components/shared/MetricCard'
import { PageHeader } from '../../components/shared/PageHeader'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'
import { useAuth } from '../auth/AuthContext'
import { reportApi } from '../reports/report.api'

const number = new Intl.NumberFormat('es-CO')
const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
export function DashboardPage() {
  const { hasAnyRole } = useAuth(); const canSales = hasAnyRole(['ADMIN', 'SELLER']); const canInventory = hasAnyRole(['ADMIN', 'INVENTORY_MANAGER'])
  const sales = useQuery({ queryKey: ['reports', 'sales-summary'], queryFn: reportApi.getSalesSummary, enabled: canSales })
  const inventory = useQuery({ queryKey: ['reports', 'inventory-summary'], queryFn: reportApi.getInventorySummary, enabled: canInventory })
  const lowStock = useQuery({ queryKey: ['reports', 'low-stock'], queryFn: reportApi.getLowStock, enabled: canInventory })
  const queries = [...(canSales ? [sales] : []), ...(canInventory ? [inventory, lowStock] : [])]; const hasError = queries.some((query) => query.isError)
  return <div className="space-y-7"><PageHeader title="Dashboard" description="Una vista clara del estado actual de tu operación, según tus permisos." />{hasError && <ErrorState message="Uno o más reportes no pudieron cargarse." onRetry={() => queries.forEach((query) => void query.refetch())} />}<section aria-label="Indicadores clave" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{sales.isLoading && <><Skeleton className="h-32" /><Skeleton className="h-32" /></>}{sales.data && <><MetricCard label="Ingresos por ventas" value={currency.format(sales.data.totalRevenue)} icon={Banknote} /><MetricCard label="Ventas" value={number.format(sales.data.totalSales)} icon={ReceiptText} detail={`${number.format(sales.data.completedSales)} completadas`} /></>}{inventory.isLoading && <><Skeleton className="h-32" /><Skeleton className="h-32" /></>}{inventory.data && <><MetricCard label="Productos" value={number.format(inventory.data.totalProducts)} icon={Package} /><MetricCard label="Unidades en inventario" value={number.format(inventory.data.totalUnitsInStock)} icon={Boxes} detail={`${number.format(inventory.data.lowStockProducts)} con stock bajo`} /></>}</section>{canInventory && <Card><CardHeader className="flex flex-row items-center justify-between"><div><h2 className="font-semibold">Productos con stock bajo</h2><p className="mt-1 text-sm text-slate-500">Artículos que requieren atención.</p></div><AlertTriangle className="text-amber-500" size={21} /></CardHeader><CardContent>{lowStock.isLoading ? <div className="space-y-3"><Skeleton className="h-12" /><Skeleton className="h-12" /><Skeleton className="h-12" /></div> : lowStock.data?.length ? <div className="divide-y divide-slate-100 dark:divide-slate-800">{lowStock.data.map((item) => <div key={item.productId} className="flex items-center justify-between gap-4 py-3"><div><p className="text-sm font-semibold">{item.productName}</p><p className="text-xs text-slate-500">SKU {item.sku}</p></div><div className="text-right"><p className="text-sm font-bold text-amber-600">{number.format(item.currentStock)} unidades</p><p className="text-xs text-slate-400">Mínimo: {number.format(item.minimumStock)}</p></div></div>)}</div> : <EmptyState title="Inventario al día" description="No hay productos con stock bajo." />}</CardContent></Card>}</div>
}
