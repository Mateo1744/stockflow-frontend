/* oxlint-disable react/only-export-components -- context, provider and hook are one authentication boundary */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { sessionStorage, type StoredSession } from '../../lib/auth/storage'
import { normalizeRoles } from '../../lib/auth/roles'
import type { Role } from '../../types/api'
import { authApi, type LoginCredentials } from './auth.api'

export interface AuthValue { session: StoredSession | null; user: StoredSession['user'] | null; token: string | null; roles: Role[]; isAuthenticated: boolean; login: (credentials: LoginCredentials) => Promise<void>; logout: (notify?: boolean) => void; hasRole: (role: Role) => boolean; hasAnyRole: (roles: readonly Role[]) => boolean }
export const AuthContext = createContext<AuthValue | null>(null)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<StoredSession | null>(() => sessionStorage.get())
  const roles = useMemo(() => normalizeRoles(session?.user.roles), [session])
  const logout = useCallback((notify = true) => { sessionStorage.clear(); setSession(null); if (notify) toast.success('Sesión cerrada') }, [])
  useEffect(() => { const onUnauthorized = () => logout(false); window.addEventListener('stockflow:unauthorized', onUnauthorized); return () => window.removeEventListener('stockflow:unauthorized', onUnauthorized) }, [logout])
  const login = useCallback(async (credentials: LoginCredentials) => { const result = await authApi.login(credentials); sessionStorage.set(result); setSession(result); toast.success('Bienvenido a StockFlow') }, [])
  const value = useMemo<AuthValue>(() => ({ session, user: session?.user ?? null, token: session?.token ?? null, roles, isAuthenticated: Boolean(session?.token), login, logout, hasRole: (role) => roles.includes(role), hasAnyRole: (allowed) => allowed.some((role) => roles.includes(role)) }), [session, roles, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider'); return context }
