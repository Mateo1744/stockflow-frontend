import { LogOut, Menu, Moon, Sun } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../features/auth/AuthContext'
import { useTheme } from '../../hooks/useTheme'
import { RoleBadge } from '../shared/Badges'
import { Button } from '../ui/button'
import { routeTitles } from './navigation'

export function Topbar({ onMenuOpen }: { onMenuOpen: () => void }) {
  const { pathname } = useLocation(); const { user, roles, logout } = useAuth(); const { theme, toggleTheme } = useTheme()
  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : ''; const name = fullName || user?.email || 'Usuario'; const initials = name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()
  return <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85 sm:px-6"><div className="flex items-center gap-3"><Button className="lg:hidden" variant="ghost" size="icon" aria-label="Abrir menú" onClick={onMenuOpen}><Menu size={20} /></Button><div><p className="text-xs text-slate-500">Panel administrativo</p><p className="font-semibold">{routeTitles[pathname] ?? 'StockFlow'}</p></div></div><div className="flex items-center gap-2 sm:gap-3"><Button variant="ghost" size="icon" aria-label={theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'} onClick={toggleTheme}>{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</Button><div className="hidden text-right md:block"><p className="max-w-44 truncate text-sm font-semibold">{name}</p><div className="mt-1 flex justify-end gap-1">{roles.slice(0, 1).map((role) => <RoleBadge key={role} role={role} />)}</div></div><div className="grid size-10 place-items-center rounded-full bg-slate-900 text-sm font-bold text-white dark:bg-brand-600" aria-label={`Avatar de ${name}`}>{initials}</div><Button variant="ghost" size="icon" aria-label="Cerrar sesión" onClick={() => logout()}><LogOut size={19} /></Button></div></header>
}
