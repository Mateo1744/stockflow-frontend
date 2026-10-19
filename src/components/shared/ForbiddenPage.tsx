import { ShieldX } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
export default function ForbiddenPage() { return <div className="grid min-h-[65vh] place-items-center text-center"><div><ShieldX className="mx-auto mb-5 text-amber-500" size={56} /><p className="text-sm font-bold tracking-widest text-amber-600">403</p><h1 className="mt-2 text-3xl font-bold">Acceso restringido</h1><p className="mt-3 max-w-md text-slate-500">Tu perfil no tiene permisos para acceder a este módulo.</p><Button asChild className="mt-6"><Link to="/dashboard">Volver al dashboard</Link></Button></div></div> }
