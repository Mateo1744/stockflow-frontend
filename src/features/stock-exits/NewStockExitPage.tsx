/* oxlint-disable react/incompatible-library -- React Hook Form watch drives dynamic line validation */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Trash2 } from 'lucide-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { ProductPicker } from '../../components/shared/Pickers'
import { PageHeader } from '../../components/shared/PageHeader'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { toAppError } from '../../lib/api/errors'
import { reasonLabels } from '../../lib/utils/domain'
import type { StockExitReason, StockExitRequest } from '../../types/api'
import { stockExitApi, stockExitKeys } from './stockExit.api'
const reasons = Object.keys(reasonLabels) as [StockExitReason, ...StockExitReason[]]
const schema = z.object({ reason: z.enum(reasons), notes: z.string(), items: z.array(z.object({ productId: z.number().positive(), quantity: z.number().int().positive('Debe ser mayor que 0') })).min(1) })
export default function NewStockExitPage() { const navigate = useNavigate(); const client = useQueryClient(); const { control, register, handleSubmit, watch, formState: { errors } } = useForm<StockExitRequest>({ resolver: zodResolver(schema), defaultValues: { reason: 'OTHER', notes: '', items: [{ productId: 0, quantity: 1 }] } }); const { fields, append, remove } = useFieldArray({ control, name: 'items' }); const items = watch('items'); const mutation = useMutation({ mutationFn: stockExitApi.create, onSuccess: (data) => { toast.success('Salida creada como borrador'); void client.invalidateQueries({ queryKey: stockExitKeys.all }); navigate(`/stock-exits/${data.id}`) }, onError: (e) => toast.error(toAppError(e).message) }); return <div className="space-y-6"><PageHeader title="Nueva salida" description="Prepara una salida; el stock cambiará únicamente al confirmarla." /><Card><CardContent className="pt-5"><form className="space-y-5" onSubmit={handleSubmit((v) => mutation.mutate(v))}><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">Motivo<select className="mt-1.5 h-11 w-full rounded-lg border px-3 dark:bg-slate-900" {...register('reason')}>{reasons.map((r) => <option key={r} value={r}>{reasonLabels[r]}</option>)}</select></label><label className="text-sm font-medium">Notas<textarea className="mt-1.5 min-h-20 w-full rounded-lg border p-3 dark:bg-slate-900" {...register('notes')} /></label></div><fieldset className="space-y-3"><legend className="font-semibold">Productos</legend>{fields.map((field, index) => <div key={field.id} className="grid gap-3 rounded-xl border p-3 md:grid-cols-[1fr_140px_auto]"><Controller control={control} name={`items.${index}.productId`} render={({ field: f }) => <ProductPicker value={f.value} onChange={f.onChange} showStock exclude={items.map((x) => x.productId).filter((id) => id !== f.value)} />} /><label className="text-xs">Cantidad<Input type="number" min="1" {...register(`items.${index}.quantity`, { valueAsNumber: true })} /></label><Button type="button" variant="ghost" size="icon" aria-label="Eliminar línea" disabled={fields.length === 1} onClick={() => remove(index)}><Trash2 size={17} /></Button></div>)}{errors.items && <p className="text-sm text-red-600">Agrega productos y cantidades válidas.</p>}<Button type="button" variant="outline" onClick={() => append({ productId: 0, quantity: 1 })}><Plus size={16} />Agregar línea</Button></fieldset><div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => navigate('/stock-exits')}>Cancelar</Button><Button disabled={mutation.isPending}>{mutation.isPending ? 'Creando…' : 'Crear borrador'}</Button></div></form></CardContent></Card></div> }
