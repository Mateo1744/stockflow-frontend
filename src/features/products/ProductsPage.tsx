import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { ActiveFilter, FilterBar, SearchInput } from '../../components/shared/Filters'
import { ConfirmDialog } from '../../components/shared/ConfirmDialog'
import { DataTable, type Column } from '../../components/shared/DataTable'
import { FormDialog } from '../../components/shared/FormDialog'
import { PageHeader } from '../../components/shared/PageHeader'
import { PaginationControls } from '../../components/shared/PaginationControls'
import { RowActions } from '../../components/shared/RowActions'
import { StatusBadge } from '../../components/shared/Badges'
import { Button } from '../../components/ui/button'
import { useListParams } from '../../hooks/useListParams'
import { toAppError } from '../../lib/api/errors'
import { formatCurrency } from '../../lib/utils/formatters'
import type { ProductFilters, ProductRequest, ProductResponse } from '../../types/api'
import { useAuth } from '../auth/AuthContext'
import { categoryApi, categoryKeys } from '../categories/category.api'
import { ProductForm } from './ProductForm'
import { productApi, productKeys } from './product.api'
export default function ProductsPage() {
  const { hasAnyRole } = useAuth(); const canWrite = hasAnyRole(['ADMIN', 'INVENTORY_MANAGER']); const list = useListParams(); const [editing, setEditing] = useState<ProductResponse | null | undefined>(); const [deactivating, setDeactivating] = useState<ProductResponse | null>(null); const [formError, setFormError] = useState(''); const client = useQueryClient()
  const active = list.get('active'); const categoryId = list.get('categoryId'); const filters: ProductFilters = { page: list.page, size: list.size, sort: list.get('sort') || 'id,asc', sku: list.get('sku') || undefined, name: list.get('name') || undefined, active: active ? active === 'true' : undefined, categoryId: categoryId ? Number(categoryId) : undefined }
  const query = useQuery({ queryKey: productKeys.list(filters), queryFn: () => productApi.list(filters) }); const categories = useQuery({ queryKey: categoryKeys.all, queryFn: categoryApi.list })
  const save = useMutation({ mutationFn: (body: ProductRequest) => editing ? productApi.update(editing.id, body) : productApi.create(body), onSuccess: () => { toast.success(editing ? 'Producto actualizado' : 'Producto creado'); setEditing(undefined); void client.invalidateQueries({ queryKey: productKeys.all }) }, onError: (error) => setFormError(toAppError(error).status === 409 ? 'Ya existe un producto con ese SKU.' : toAppError(error).message) })
  const deactivate = useMutation({ mutationFn: productApi.deactivate, onSuccess: () => { toast.success('Producto desactivado'); setDeactivating(null); void client.invalidateQueries({ queryKey: productKeys.all }) }, onError: (error) => toast.error(toAppError(error).message) })
  const columns: Column<ProductResponse>[] = [{ key: 'sku', header: 'SKU', cell: (row) => <span className="font-mono text-xs">{row.sku}</span> }, { key: 'name', header: 'Producto', cell: (row) => <span className="font-semibold">{row.name}</span> }, { key: 'category', header: 'Categoría', cell: (row) => row.categoryName }, { key: 'price', header: 'Precio', cell: (row) => formatCurrency(row.salePrice) }, { key: 'active', header: 'Estado', cell: (row) => <StatusBadge status={row.active ? 'Activo' : 'Inactivo'} /> }, { key: 'actions', header: 'Acciones', className: 'text-right', cell: (row) => <RowActions onEdit={canWrite ? () => { setFormError(''); setEditing(row) } : undefined} onDeactivate={canWrite && row.active ? () => setDeactivating(row) : undefined} /> }]
  return <div className="space-y-6"><PageHeader title="Productos" description="Catálogo comercial y configuración de productos." actions={canWrite ? <Button onClick={() => { setFormError(''); setEditing(null) }}><Plus size={17} />Nuevo producto</Button> : undefined} /><FilterBar><SearchInput label="SKU" value={list.get('sku')} onChange={(value) => list.set('sku', value)} /><SearchInput label="Producto" value={list.get('name')} onChange={(value) => list.set('name', value)} /><ActiveFilter value={active} onChange={(value) => list.set('active', value)} /><label className="text-sm font-medium"><span className="mb-2 block">Categoría</span><select className="h-11 rounded-lg border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-900" value={categoryId} onChange={(event) => list.set('categoryId', event.target.value)}><option value="">Todas</option>{categories.data?.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label></FilterBar><DataTable columns={columns} rows={query.data?.content ?? []} rowKey={(row) => row.id} loading={query.isLoading} error={query.isError} onRetry={() => void query.refetch()} emptyTitle="No hay productos" />{query.data && <PaginationControls page={query.data.page} totalPages={query.data.totalPages} totalElements={query.data.totalElements} onPageChange={(page) => list.set('page', page)} />}<FormDialog open={editing !== undefined} onOpenChange={(open) => !open && setEditing(undefined)} title={editing ? 'Editar producto' : 'Nuevo producto'} description="Completa los datos comerciales del producto."><ProductForm product={editing ?? undefined} categories={categories.data ?? []} onSubmit={(body) => save.mutate(body)} onCancel={() => setEditing(undefined)} loading={save.isPending} serverError={formError} /></FormDialog><ConfirmDialog open={Boolean(deactivating)} onOpenChange={(open) => !open && setDeactivating(null)} title="Desactivar producto" description="El producto se desactivará, pero conservará su historial." loading={deactivate.isPending} onConfirm={() => deactivating && deactivate.mutate(deactivating.id)} /></div>
}
