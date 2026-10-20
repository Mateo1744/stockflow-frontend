import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { customerApi, customerKeys } from '../../features/customers/customer.api'
import { inventoryApi, inventoryKeys } from '../../features/inventory/inventory.api'
import { productApi, productKeys } from '../../features/products/product.api'
import { supplierApi, supplierKeys } from '../../features/suppliers/supplier.api'
import { formatCurrency } from '../../lib/utils/formatters'
import type { ProductResponse } from '../../types/api'

const controlClass = 'h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:cursor-wait disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900'
function QueryHint({ loading, empty, error }: { loading: boolean; empty: boolean; error: boolean }) { if (loading) return <p role="status" className="text-xs text-slate-500">Buscando…</p>; if (error) return <p role="alert" className="text-xs text-red-600">No fue posible cargar las opciones.</p>; if (empty) return <p className="text-xs text-slate-500">No hay coincidencias.</p>; return null }

export function ProductPicker({ value, onChange, showPrice, showStock, exclude = [] }: { value: number; onChange: (id: number, product?: ProductResponse) => void; showPrice?: boolean; showStock?: boolean; exclude?: number[] }) {
  const [search, setSearch] = useState('')
  const products = useQuery({ queryKey: productKeys.list({ page: 0, size: 20, name: search, active: true }), queryFn: () => productApi.list({ page: 0, size: 20, name: search || undefined, active: true }) })
  const inventory = useQuery({ queryKey: inventoryKeys.product(value), queryFn: () => inventoryApi.byProduct(value), enabled: showStock && value > 0 })
  const options = products.data?.content.filter((product) => !exclude.includes(product.id) || product.id === value) ?? []
  return <div className="space-y-1.5"><input aria-label="Buscar producto" className={controlClass} placeholder="SKU o nombre…" value={search} onChange={(event) => setSearch(event.target.value)} /><select aria-label="Producto" aria-busy={products.isLoading} disabled={products.isLoading} className={controlClass} value={value || ''} onChange={(event) => { const id = Number(event.target.value); onChange(id, options.find((product) => product.id === id)) }}><option value="">Selecciona un producto</option>{options.map((product) => <option key={product.id} value={product.id}>{product.sku} · {product.name}{showPrice ? ` · ${formatCurrency(product.salePrice)}` : ''}</option>)}</select><QueryHint loading={products.isLoading} error={products.isError} empty={!products.isLoading && options.length === 0} />{showStock && inventory.isLoading && <p role="status" className="text-xs text-slate-500">Consultando existencias…</p>}{showStock && inventory.data && <p className="text-xs text-slate-500">Stock disponible: {inventory.data.currentStock}</p>}</div>
}

export function SupplierPicker({ value, onChange }: { value: number; onChange: (id: number) => void }) {
  const [search, setSearch] = useState('')
  const query = useQuery({ queryKey: supplierKeys.list({ page: 0, size: 20, name: search, active: true }), queryFn: () => supplierApi.list({ page: 0, size: 20, name: search || undefined, active: true }) })
  const options = query.data?.content ?? []
  return <div className="space-y-1.5"><input aria-label="Buscar proveedor" className={controlClass} placeholder="Tax ID o nombre…" value={search} onChange={(event) => setSearch(event.target.value)} /><select aria-label="Proveedor" aria-busy={query.isLoading} disabled={query.isLoading} className={controlClass} value={value || ''} onChange={(event) => onChange(Number(event.target.value))}><option value="">Selecciona un proveedor</option>{options.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.taxId} · {supplier.name}</option>)}</select><QueryHint loading={query.isLoading} error={query.isError} empty={!query.isLoading && options.length === 0} /></div>
}

export function CustomerPicker({ value, onChange }: { value?: number; onChange: (id?: number) => void }) {
  const [search, setSearch] = useState('')
  const query = useQuery({ queryKey: customerKeys.list({ page: 0, size: 20, name: search, active: true }), queryFn: () => customerApi.list({ page: 0, size: 20, name: search || undefined, active: true }) })
  const options = query.data?.content ?? []
  return <div className="space-y-1.5"><input aria-label="Buscar cliente" className={controlClass} placeholder="Documento o nombre…" value={search} onChange={(event) => setSearch(event.target.value)} /><select aria-label="Cliente" aria-busy={query.isLoading} disabled={query.isLoading} className={controlClass} value={value ?? ''} onChange={(event) => onChange(event.target.value ? Number(event.target.value) : undefined)}><option value="">Venta sin cliente</option>{options.map((customer) => <option key={customer.id} value={customer.id}>{customer.documentNumber} · {customer.firstName} {customer.lastName}</option>)}</select><QueryHint loading={query.isLoading} error={query.isError} empty={!query.isLoading && options.length === 0} /></div>
}
