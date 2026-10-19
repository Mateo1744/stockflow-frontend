import { cn } from '../../lib/utils/cn'
export function Skeleton({ className }: { className?: string }) { return <div aria-hidden="true" className={cn('animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800', className)} /> }
