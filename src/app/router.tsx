import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AdminLayout } from '../components/layout/AdminLayout'
import { routePermissions } from '../components/layout/navigation'
import { PlaceholderPage } from '../components/shared/PlaceholderPage'
import { LoginPage } from '../features/auth/LoginPage'
import { ProtectedRoute } from '../features/auth/ProtectedRoute'
import { RoleRoute } from '../features/auth/RoleRoute'
import { DashboardPage } from '../features/dashboard/DashboardPage'

const placeholders = [
  ['/products', 'Productos', 'Catálogo y disponibilidad de productos.'], ['/categories', 'Categorías', 'Organización del catálogo de StockFlow.'], ['/suppliers', 'Proveedores', 'Relaciones y abastecimiento de inventario.'], ['/customers', 'Clientes', 'Información comercial de clientes.'], ['/inventory', 'Inventario', 'Existencias y estado general del stock.'], ['/inventory/movements', 'Movimientos', 'Trazabilidad de entradas y salidas.'], ['/stock-entries', 'Entradas', 'Recepción y registro de mercancía.'], ['/stock-exits', 'Salidas', 'Despachos y ajustes de inventario.'], ['/sales', 'Ventas', 'Gestión operativa de ventas.'], ['/reports', 'Reportes', 'Análisis disponible según tu perfil.'], ['/users', 'Usuarios', 'Administración de accesos y roles.'],
] as const

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { element: <ProtectedRoute />, children: [{ element: <AdminLayout />, children: [
    { index: true, element: <Navigate to="/dashboard" replace /> },
    { path: '/dashboard', element: <DashboardPage /> },
    ...placeholders.map(([path, title, description]) => ({ element: <RoleRoute allowedRoles={routePermissions[path]} />, children: [{ path, element: <PlaceholderPage title={title} description={description} /> }] })),
  ] }] },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
])
