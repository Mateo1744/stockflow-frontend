import type { MovementType, SaleStatus, StockEntryStatus, StockExitReason, StockExitStatus } from '../../types/api'
export const statusLabels: Record<SaleStatus | StockEntryStatus | StockExitStatus, string> = { DRAFT: 'Borrador', PENDING: 'Pendiente', CONFIRMED: 'Confirmada', COMPLETED: 'Completada', CANCELLED: 'Cancelada' }
export const reasonLabels: Record<StockExitReason, string> = { DAMAGED: 'Dañado', LOSS: 'Pérdida', INTERNAL_USE: 'Uso interno', ADJUSTMENT: 'Ajuste', OTHER: 'Otro' }
export const movementLabels: Record<MovementType, string> = { ENTRY: 'Entrada', EXIT: 'Salida', ADJUSTMENT: 'Ajuste' }
