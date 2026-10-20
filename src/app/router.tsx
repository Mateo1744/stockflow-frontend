/* oxlint-disable react/only-export-components -- route-level lazy components belong with the router */
import { lazy, Suspense, type ReactNode } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import NotFoundPage from '../components/shared/NotFoundPage'
import { LoadingState } from '../components/shared/LoadingState'
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
const InventoryPage = lazy(() => import('../features/inventory/InventoryPage'))
const InventoryMovementsPage = lazy(() => import('../features/inventory-movements/InventoryMovementsPage'))
const StockEntriesPage = lazy(() => import('../features/stock-entries/StockEntriesPage'))
const NewStockEntryPage = lazy(() => import('../features/stock-entries/NewStockEntryPage'))
const StockEntryDetailPage = lazy(() => import('../features/stock-entries/StockEntryDetailPage'))
const StockExitsPage = lazy(() => import('../features/stock-exits/StockExitsPage'))
const NewStockExitPage = lazy(() => import('../features/stock-exits/NewStockExitPage'))
const StockExitDetailPage = lazy(() => import('../features/stock-exits/StockExitDetailPage'))
const SalesPage = lazy(() => import('../features/sales/SalesPage'))
const NewSalePage = lazy(() => import('../features/sales/NewSalePage'))
const SaleDetailPage = lazy(() => import('../features/sales/SaleDetailPage'))
const ProfilePage = lazy(() => import('../features/profile/ProfilePage'))
const ReportsPage = lazy(() => import('../features/reports/ReportsPage'))
const loading = (node: ReactNode) => <Suspense fallback={<LoadingState label="Cargando módulo…" />}>{node}</Suspense>
const roleRoute = (path: string, roles: Role[], element: ReactNode) => ({ element: <RoleRoute allowedRoles={roles} />, children: [{ path, element: loading(element) }] })
export const router = createBrowserRouter([
  { path: '/login', element: loading(<LoginPage />) },
  { element: <ProtectedRoute />, children: [{ element: loading(<AdminLayout />), children: [
    { index: true, element: <Navigate to="/dashboard" replace /> },
    { path: '/dashboard', element: loading(<DashboardPage />) },
    { path: '/profile', element: loading(<ProfilePage />) },
    roleRoute('/products', ['ADMIN', 'INVENTORY_MANAGER', 'SELLER'], <ProductsPage />),
    roleRoute('/categories', ['ADMIN', 'INVENTORY_MANAGER', 'SELLER'], <CategoriesPage />),
    roleRoute('/customers', ['ADMIN', 'INVENTORY_MANAGER', 'SELLER'], <CustomersPage />),
    roleRoute('/suppliers', ['ADMIN', 'INVENTORY_MANAGER'], <SuppliersPage />),
    roleRoute('/users', ['ADMIN'], <UsersPage />),
    roleRoute('/inventory', ['ADMIN', 'INVENTORY_MANAGER'], <InventoryPage />),
    roleRoute('/inventory/movements', ['ADMIN', 'INVENTORY_MANAGER'], <InventoryMovementsPage />),
    roleRoute('/stock-entries', ['ADMIN', 'INVENTORY_MANAGER'], <StockEntriesPage />),
    roleRoute('/stock-entries/new', ['ADMIN', 'INVENTORY_MANAGER'], <NewStockEntryPage />),
    roleRoute('/stock-entries/:id', ['ADMIN', 'INVENTORY_MANAGER'], <StockEntryDetailPage />),
    roleRoute('/stock-exits', ['ADMIN', 'INVENTORY_MANAGER'], <StockExitsPage />),
    roleRoute('/stock-exits/new', ['ADMIN', 'INVENTORY_MANAGER'], <NewStockExitPage />),
    roleRoute('/stock-exits/:id', ['ADMIN', 'INVENTORY_MANAGER'], <StockExitDetailPage />),
    roleRoute('/sales', ['ADMIN', 'INVENTORY_MANAGER', 'SELLER'], <SalesPage />),
    roleRoute('/sales/new', ['ADMIN', 'SELLER'], <NewSalePage />),
    roleRoute('/sales/:id', ['ADMIN', 'INVENTORY_MANAGER', 'SELLER'], <SaleDetailPage />),
    roleRoute('/reports', ['ADMIN', 'INVENTORY_MANAGER', 'SELLER'], <ReportsPage />),
    { path: '*', element: <NotFoundPage /> },
  ] }] },
  { path: '*', element: <NotFoundPage /> },
])
