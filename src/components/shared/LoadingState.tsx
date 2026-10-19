import { LoaderCircle } from 'lucide-react'
export function LoadingSpinner({ label = 'Cargando' }: { label?: string }) { return <div className="inline-flex items-center gap-2 text-sm text-slate-500" role="status"><LoaderCircle className="animate-spin" size={18} aria-hidden="true" /><span>{label}</span></div> }
export function LoadingState({ label = 'Cargando información…' }: { label?: string }) { return <div className="grid min-h-48 place-items-center rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><LoadingSpinner label={label} /></div> }
