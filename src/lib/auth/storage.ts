import type { LoginResponse } from '../../types/api'

const SESSION_KEY = 'stockflow.session'
export interface StoredSession extends LoginResponse {}

function isSession(value: unknown): value is StoredSession {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  return typeof record.token === 'string' && typeof record.user === 'object' && record.user !== null
}
export const sessionStorage = {
  get(): StoredSession | null { try { const raw = window.localStorage.getItem(SESSION_KEY); if (!raw) return null; const value: unknown = JSON.parse(raw); return isSession(value) ? value : null } catch { return null } },
  set(session: StoredSession) { window.localStorage.setItem(SESSION_KEY, JSON.stringify(session)) },
  clear() { window.localStorage.removeItem(SESSION_KEY) },
}
