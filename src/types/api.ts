export interface ApiErrorResponse { timestamp: string; status: number; error: string; message: string; path: string; fieldErrors: Record<string, string> }
export interface PageResponse<T> { content: T[]; page: number; size: number; totalElements: number; totalPages: number; first: boolean; last: boolean }
export type Role = 'ADMIN' | 'INVENTORY_MANAGER' | 'SELLER'
export interface RoleResponse { id: number; name: Role; description: string }
export interface UserResponse { id: number; firstName: string; lastName: string; email: string; active: boolean; roles: RoleResponse[]; createdAt: string; updatedAt: string }
export interface LoginResponse { token: string; tokenType: string; expiresIn: number; user: UserResponse }
export interface LowStockItem { productId: number; sku: string; productName: string; currentStock: number; minimumStock: number }
export type LowStockResponse = LowStockItem[]
export interface SalesSummaryResponse { totalSales: number; totalRevenue: number; completedSales: number; cancelledSales: number; pendingSales: number }
export interface InventorySummaryResponse { totalProducts: number; totalUnitsInStock: number; lowStockProducts: number }
export interface PageFilters { page: number; size: number; sort?: string }
export interface CategoryRequest { name: string; description: string; active: boolean }
export interface CategoryResponse extends CategoryRequest { id: number; createdAt: string; updatedAt: string }
export interface SupplierRequest { name: string; taxId: string; contactName: string; email: string; phone: string; address: string; active: boolean }
export interface SupplierResponse extends SupplierRequest { id: number; createdAt: string; updatedAt: string }
export interface CustomerRequest { documentNumber: string; firstName: string; lastName: string; email: string; phone: string; address: string; active: boolean }
export interface CustomerResponse extends CustomerRequest { id: number; createdAt: string; updatedAt: string }
export interface ProductRequest { sku: string; name: string; description: string; salePrice: number; active: boolean; categoryId: number }
export interface ProductResponse extends ProductRequest { id: number; categoryName: string; createdAt: string; updatedAt: string }
export interface UserCreateRequest { firstName: string; lastName: string; email: string; password: string; active: boolean; roleNames: Role[] }
export interface UserUpdateRequest { firstName: string; lastName: string; email: string; active: boolean; roleNames: Role[] }
export interface ProductFilters extends PageFilters { sku?: string; name?: string; active?: boolean; categoryId?: number }
export interface SupplierFilters extends PageFilters { taxId?: string; name?: string; active?: boolean }
export interface CustomerFilters extends PageFilters { documentNumber?: string; name?: string; active?: boolean }
