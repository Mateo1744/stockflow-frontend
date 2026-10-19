import type { Role, RoleResponse } from '../../types/api'

export const ROLES = ['ADMIN', 'INVENTORY_MANAGER', 'SELLER'] as const satisfies readonly Role[]
export function normalizeRoles(roles: Array<Role | RoleResponse> = []): Role[] { return roles.map((role) => typeof role === 'string' ? role : role.name).filter((role): role is Role => ROLES.includes(role as Role)) }
export function hasRole(roles: readonly Role[], role: Role) { return roles.includes(role) }
export function hasAnyRole(roles: readonly Role[], allowed: readonly Role[]) { return allowed.some((role) => roles.includes(role)) }
export const roleLabels: Record<Role, string> = { ADMIN: 'Administrador', INVENTORY_MANAGER: 'Gestor de inventario', SELLER: 'Vendedor' }
