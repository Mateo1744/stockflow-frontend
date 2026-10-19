import axios from 'axios'

const messages: Record<number, string> = { 401: 'Tu sesión expiró. Inicia sesión nuevamente.', 403: 'No tienes permisos para realizar esta acción.', 404: 'No encontramos el recurso solicitado.', 409: 'La operación entra en conflicto con información existente.', 500: 'Ocurrió un problema en el servidor.', 503: 'El servicio no está disponible temporalmente.' }
export class AppError extends Error { readonly status?: number; constructor(message: string, status?: number) { super(message); this.name = 'AppError'; this.status = status } }
export function toAppError(error: unknown) {
  if (error instanceof AppError) return error
  if (axios.isAxiosError(error)) { const status = error.response?.status; const data = error.response?.data as { message?: unknown } | undefined; const backendMessage = typeof data?.message === 'string' ? data.message : undefined; return new AppError(messages[status ?? 0] ?? backendMessage ?? 'No fue posible completar la solicitud.', status) }
  return new AppError('Ocurrió un error inesperado.')
}
