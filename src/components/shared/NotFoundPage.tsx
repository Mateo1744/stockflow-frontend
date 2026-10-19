import { MapPinOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
export default function NotFoundPage() { return <div className="grid min-h-[65vh] place-items-center text-center"><div><MapPinOff className="mx-auto mb-5 text-brand-500" size={56} /><p className="text-sm font-bold tracking-widest text-brand-600">404</p><h1 className="mt-2 text-3xl font-bold">Página no encontrada</h1><p className="mt-3 max-w-md text-slate-500">La dirección solicitada no existe dentro de StockFlow.</p><Button asChild className="mt-6"><Link to="/dashboard">Volver al dashboard</Link></Button></div></div> }
