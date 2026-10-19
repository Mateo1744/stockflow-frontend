import type { ReactNode } from 'react'
import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'
import { TableSkeleton } from './TableSkeleton'
export interface Column<T> { key: string; header: string; cell: (row: T) => ReactNode; className?: string }
export function DataTable<T>({ columns, rows, rowKey, loading, error, onRetry, emptyTitle = 'Sin registros' }: { columns: Column<T>[]; rows: T[]; rowKey: (row: T) => string | number; loading?: boolean; error?: boolean; onRetry?: () => void; emptyTitle?: string }) {
  if (loading) return <TableSkeleton columns={columns.length} />
  if (error) return <ErrorState onRetry={onRetry} />
  if (!rows.length) return <EmptyState title={emptyTitle} description="Prueba ajustando los filtros o crea un nuevo registro." />
  return <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><table className="w-full min-w-[720px] text-left text-sm"><thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-900/80"><tr>{columns.map((column) => <th key={column.key} scope="col" className={`px-4 py-3 font-semibold ${column.className ?? ''}`}>{column.header}</th>)}</tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{rows.map((row) => <tr key={rowKey(row)} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30">{columns.map((column) => <td key={column.key} className={`px-4 py-3 ${column.className ?? ''}`}>{column.cell(row)}</td>)}</tr>)}</tbody></table></div>
}
