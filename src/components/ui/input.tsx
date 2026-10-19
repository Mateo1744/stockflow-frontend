import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils/cn'
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input className={cn('h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900', className)} {...props} /> }
