import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '../lib/api/client'
import { categoryApi } from './categories/category.api'
import { customerApi } from './customers/customer.api'
import { productApi } from './products/product.api'
import { supplierApi } from './suppliers/supplier.api'
import { userApi } from './users/user.api'
vi.mock('../lib/api/client', () => ({ apiClient: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() } }))
describe('contratos CRUD API', () => {
  beforeEach(() => { vi.mocked(apiClient.get).mockResolvedValue({ data: [] }); vi.mocked(apiClient.post).mockResolvedValue({ data: {} }); vi.mocked(apiClient.put).mockResolvedValue({ data: {} }); vi.mocked(apiClient.delete).mockResolvedValue({ data: undefined }) })
  it('products usa filtros reales, create, update y soft delete', async () => { const body = { sku: 'SKU', name: 'Producto', description: '', salePrice: 1, active: true, categoryId: 2 }; await productApi.list({ page: 0, size: 10, name: 'mouse', active: true }); expect(apiClient.get).toHaveBeenCalledWith('/api/products', { params: { page: 0, size: 10, name: 'mouse', active: true } }); await productApi.create(body); expect(apiClient.post).toHaveBeenCalledWith('/api/products', body); await productApi.update(7, body); expect(apiClient.put).toHaveBeenCalledWith('/api/products/7', body); await productApi.deactivate(7); expect(apiClient.delete).toHaveBeenCalledWith('/api/products/7') })
  it('categories respeta el contrato de lista simple', async () => { const body = { name: 'Categoría', description: '', active: true }; await categoryApi.list(); expect(apiClient.get).toHaveBeenCalledWith('/api/categories'); await categoryApi.create(body); expect(apiClient.post).toHaveBeenCalledWith('/api/categories', body); await categoryApi.update(3, body); expect(apiClient.put).toHaveBeenCalledWith('/api/categories/3', body) })
  it('suppliers y customers envían filtros paginados', async () => { await supplierApi.list({ page: 1, size: 20, taxId: '900', active: false }); expect(apiClient.get).toHaveBeenCalledWith('/api/suppliers', { params: { page: 1, size: 20, taxId: '900', active: false } }); await customerApi.list({ page: 0, size: 10, documentNumber: '123' }); expect(apiClient.get).toHaveBeenCalledWith('/api/customers', { params: { page: 0, size: 10, documentNumber: '123' } }) })
  it('user update no incluye password', async () => { const update = { firstName: 'Ada', lastName: 'Admin', email: 'ada@test.co', active: true, roleNames: ['ADMIN' as const] }; await userApi.update(4, update); expect(apiClient.put).toHaveBeenCalledWith('/api/users/4', update); expect(update).not.toHaveProperty('password') })
})
