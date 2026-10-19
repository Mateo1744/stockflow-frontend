import { Outlet } from 'react-router-dom'
import ForbiddenPage from '../../components/shared/ForbiddenPage'
import type { Role } from '../../types/api'
import { useAuth } from './AuthContext'
export function RoleRoute({ allowedRoles }: { allowedRoles: readonly Role[] }) { const { hasAnyRole } = useAuth(); return hasAnyRole(allowedRoles) ? <Outlet /> : <ForbiddenPage /> }
