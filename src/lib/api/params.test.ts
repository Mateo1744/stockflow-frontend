import { describe, expect, it } from 'vitest'
import { cleanParams } from './params'

describe('cleanParams', () => {
  it('omite filtros vacíos y conserva paginación y sort', () => {
    expect(cleanParams({
      page: 0,
      size: 10,
      sort: 'id,asc',
      active: '',
      categoryId: undefined,
      customerId: '',
      supplierId: undefined,
      productId: '',
      performedById: undefined,
      status: '',
      reason: undefined,
      from: '',
      to: undefined,
    })).toEqual({ page: 0, size: 10, sort: 'id,asc' })
  })
})
