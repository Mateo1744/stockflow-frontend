import { BarChart3, Boxes, Contact, FolderTree, Gauge, Package, PackageMinus, PackagePlus, Repeat2, ShoppingCart, Truck, UserRound, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Role } from '../../types/api'
export interface NavItem { label: string; path: string; icon: LucideIcon; roles: readonly Role[] }
const all: Role[] = ['ADMIN', 'INVENTORY_MANAGER', 'SELLER']
const stock: Role[] = ['ADMIN', 'INVENTORY_MANAGER']
const sales: Role[] = ['ADMIN', 'INVENTORY_MANAGER', 'SELLER']
export const navigation: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: Gauge, roles: all },
  { label: 'Productos', path: '/products', icon: Package, roles: all },
  { label: 'Categorías', path: '/categories', icon: FolderTree, roles: all },
  { label: 'Clientes', path: '/customers', icon: Contact, roles: all },
  { label: 'Proveedores', path: '/suppliers', icon: Truck, roles: stock },
  { label: 'Inventario', path: '/inventory', icon: Boxes, roles: stock },
  { label: 'Movimientos', path: '/inventory/movements', icon: Repeat2, roles: stock },
  { label: 'Entradas', path: '/stock-entries', icon: PackagePlus, roles: stock },
  { label: 'Salidas', path: '/stock-exits', icon: PackageMinus, roles: stock },
  { label: 'Ventas', path: '/sales', icon: ShoppingCart, roles: sales },
  { label: 'Reportes', path: '/reports', icon: BarChart3, roles: all },
  { label: 'Usuarios', path: '/users', icon: Users, roles: ['ADMIN'] },
  { label: 'Mi perfil', path: '/profile', icon: UserRound, roles: all },
]
export const routePermissions: Record<string, readonly Role[]> = Object.fromEntries(navigation.map((item) => [item.path, item.roles]))
export const routeTitles: Record<string, string> = Object.fromEntries(navigation.map((item) => [item.path, item.label]))
