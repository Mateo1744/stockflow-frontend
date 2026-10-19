/* oxlint-disable react/only-export-components -- route-level lazy components belong with the router */
import { lazy, Suspense, type ReactNode } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import NotFoundPage from '../components/shared/NotFoundPage'
import { LoadingState } from '../components/shared/LoadingState'
import { PlaceholderPage } from '../components/shared/PlaceholderPage'
import { ProtectedRoute } from '../features/auth/ProtectedRoute'
import { RoleRoute } from '../features/auth/RoleRoute'
import type { Role } from '../types/api'
const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage'))
const LoginPage = lazy(() => import('../features/auth/LoginPage').then((module) => ({ default: module.LoginPage })))
const AdminLayout = lazy(() => import('../components/layout/AdminLayout').then((module) => ({ default: module.AdminLayout })))
const ProductsPage = lazy(() => import('../features/products/ProductsPage'))
const CategoriesPage = lazy(() => import('../features/categories/CategoriesPage'))
const SuppliersPage = lazy(() => import('../features/suppliers/SuppliersPage'))
const CustomersPage = lazy(() => import('../features/customers/CustomersPage'))
const UsersPage = lazy(() => import('../features/users/UsersPage'))
const loading = (node: ReactNode) => <Suspense fallback={<LoadingState label="Cargando módulo…" />}>{node}</Suspense>
const roleRoute = (path: string, roles: Role[], element: ReactNode) => ({ element: <RoleRoute allowedRoles={roles} />, children: [{ path, element: loading(element) }] })
export const router = createBrowserRouter([
  { path: '/login', element: loading(<LoginPage />) },
  { element: <ProtectedRoute />, children: [{ element: loading(<AdminLayout />), children: [
    { index: true, element: <Navigate to="/dashboard" replace /> },
    { path: '/dashboard', element: loading(<DashboardPage />) },
    roleRoute('/products', ['ADMIN', 'INVENTORY_MANAGER', 'SELLER'], <ProductsPage />),
    roleRoute('/categories', ['ADMIN', 'INVENTORY_MANAGER', 'SELLER'], <CategoriesPage />),
    roleRoute('/customers', ['ADMIN', 'INVENTORY_MANAGER', 'SELLER'], <CustomersPage />),
    roleRoute('/suppliers', ['ADMIN', 'INVENTORY_MANAGER'], <SuppliersPage />),
    roleRoute('/users', ['ADMIN'], <UsersPage />),
    roleRoute('/inventory', ['ADMIN', 'INVENTORY_MANAGER'], <PlaceholderPage title="Inventario" description="Existencias y estado general del stock." />),
    roleRoute('/inventory/movements', ['ADMIN', 'INVENTORY_MANAGER'], <PlaceholderPage title="Movimientos" description="Trazabilidad de entradas y salidas." />),
    roleRoute('/stock-entries', ['ADMIN', 'INVENTORY_MANAGER'], <PlaceholderPage title="Entradas" description="Recepción y registro de mercancía." />),
    roleRoute('/stock-exits', ['ADMIN', 'INVENTORY_MANAGER'], <PlaceholderPage title="Salidas" description="Despachos y ajustes de inventario." />),
    roleRoute('/sales', ['ADMIN', 'INVENTORY_MANAGER', 'SELLER'], <PlaceholderPage title="Ventas" description="Gestión operativa de ventas." />),
    roleRoute('/reports', ['ADMIN', 'INVENTORY_MANAGER', 'SELLER'], <PlaceholderPage title="Reportes" description="Análisis disponible según tu perfil." />),
    { path: '*', element: <NotFoundPage /> },
  ] }] },
  { path: '*', element: <NotFoundPage /> },
])
