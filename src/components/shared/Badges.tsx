import type { Role } from '../../types/api'
import { roleLabels } from '../../lib/auth/roles'
import { cn } from '../../lib/utils/cn'
export function StatusBadge({ status }: { status: string }) { const active = ['ACTIVE', 'ACTIVO', 'COMPLETED'].includes(status.toUpperCase()); return <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-semibold', active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300')}>{status}</span> }
export function RoleBadge({ role }: { role: Role }) { return <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-indigo-950 dark:text-indigo-300">{roleLabels[role]}</span> }
