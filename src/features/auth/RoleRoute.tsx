import { Navigate, Outlet } from 'react-router-dom'
import type { Role } from '../../types/api'
import { useAuth } from './AuthContext'
export function RoleRoute({ allowedRoles }: { allowedRoles: readonly Role[] }) { const { hasAnyRole } = useAuth(); return hasAnyRole(allowedRoles) ? <Outlet /> : <Navigate to="/dashboard" replace /> }
