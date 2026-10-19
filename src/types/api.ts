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
