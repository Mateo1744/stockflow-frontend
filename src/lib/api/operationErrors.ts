import { toAppError } from './errors'
export function operationErrorMessage(error: unknown) { const appError = toAppError(error); if (appError.status === 409) return 'Stock insuficiente o la operación ya no está en un estado válido.'; if (appError.status === 503) return 'El inventario está siendo actualizado por otra operación. Intenta nuevamente.'; return appError.message }
