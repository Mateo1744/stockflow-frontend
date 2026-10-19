import type { ReactNode } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
export function FormDialog({ open, onOpenChange, title, description, children }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; description: string; children: ReactNode }) { return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent title={title} description={description}>{children}</DialogContent></Dialog> }
