import type { ReactNode } from 'react'
import { Card, CardContent } from '../ui/card'
export function DetailGrid({ children }: { children: ReactNode }) { return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{children}</div> }
export function DetailItem({ label, children }: { label: string; children: ReactNode }) { return <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p><div className="mt-1 text-sm font-medium">{children}</div></div> }
export function ItemsCard({ title = 'Productos', children }: { title?: string; children: ReactNode }) { return <Card><CardContent className="pt-5"><h2 className="mb-4 font-semibold">{title}</h2><div className="space-y-3">{children}</div></CardContent></Card> }
