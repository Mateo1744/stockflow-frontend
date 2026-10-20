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
export type MovementType = 'ENTRY' | 'EXIT' | 'ADJUSTMENT'
export interface InventoryResponse { id: number; productId: number; productSku: string; productName: string; currentStock: number; minimumStock: number; updatedAt: string }
export interface InventoryMovementResponse { id: number; inventoryId: number; productId: number; productSku: string; productName: string; type: MovementType; quantity: number; previousStock: number; resultingStock: number; performedById: number; performedByFirstName: string; performedByLastName: string; performedByEmail: string; notes: string | null; createdAt: string }
export interface MovementFilters extends PageFilters { productId?: number; type?: MovementType; performedById?: number }
export type StockEntryStatus = 'DRAFT' | 'CONFIRMED' | 'CANCELLED'
export interface StockEntryItemRequest { productId: number; quantity: number; unitCost: number }
export interface StockEntryRequest { supplierId: number; referenceNumber: string; notes: string; items: StockEntryItemRequest[] }
export interface StockEntryItemResponse extends StockEntryItemRequest { id: number; productSku: string; productName: string; subtotal: number }
export interface StockEntryResponse { id: number; referenceNumber: string | null; status: StockEntryStatus; supplierId: number; supplierName: string; receivedById: number; receivedByFirstName: string; receivedByLastName: string; receivedByEmail: string; totalCost: number; notes: string | null; items: StockEntryItemResponse[]; createdAt: string; updatedAt: string; confirmedAt: string | null }
export interface StockEntryFilters extends PageFilters { status?: StockEntryStatus; supplierId?: number; referenceNumber?: string }
export type StockExitStatus = 'DRAFT' | 'CONFIRMED' | 'CANCELLED'
export type StockExitReason = 'DAMAGED' | 'LOSS' | 'INTERNAL_USE' | 'ADJUSTMENT' | 'OTHER'
export interface StockExitItemRequest { productId: number; quantity: number }
export interface StockExitRequest { reason: StockExitReason; notes: string; items: StockExitItemRequest[] }
export interface StockExitItemResponse extends StockExitItemRequest { id: number; productSku: string; productName: string }
export interface StockExitResponse { id: number; exitNumber: string; reason: StockExitReason; status: StockExitStatus; performedById: number; performedByFirstName: string; performedByLastName: string; performedByEmail: string; notes: string | null; items: StockExitItemResponse[]; createdAt: string; updatedAt: string; confirmedAt: string | null }
export interface StockExitFilters extends PageFilters { status?: StockExitStatus; reason?: StockExitReason }
export type SaleStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED'
export interface SaleItemRequest { productId: number; quantity: number }
export interface SaleRequest { customerId?: number; items: SaleItemRequest[] }
export interface SaleItemResponse extends SaleItemRequest { id: number; productSku: string; productName: string; unitPrice: number; subtotal: number }
export interface SaleResponse { id: number; saleNumber: string; status: SaleStatus; customerId: number | null; customerDocumentNumber: string | null; customerFirstName: string | null; customerLastName: string | null; customerEmail: string | null; sellerId: number; sellerFirstName: string; sellerLastName: string; sellerEmail: string; totalAmount: number; items: SaleItemResponse[]; createdAt: string; updatedAt: string }
export interface SaleFilters extends PageFilters { saleNumber?: string; status?: SaleStatus; customerId?: number; sellerId?: number; from?: string; to?: string }
