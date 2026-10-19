import { Boxes } from 'lucide-react'
import { cn } from '../../lib/utils/cn'
export function Brand({ compact = false, className }: { compact?: boolean; className?: string }) { return <div className={cn('flex items-center gap-3', className)}><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-lg shadow-indigo-500/20"><Boxes size={21} aria-hidden="true" /></span>{!compact && <span className="text-lg font-bold tracking-tight">StockFlow</span>}</div> }
