import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AuthProvider } from '../../features/auth/AuthContext'
import { sessionStorage } from '../../lib/auth/storage'
import { sessionFor } from '../../test/fixtures'
import type { Role } from '../../types/api'
import { Sidebar } from './Sidebar'
function renderFor(role: Role) { sessionStorage.set(sessionFor(role)); return render(<MemoryRouter><AuthProvider><Sidebar collapsed={false} mobileOpen onCollapse={() => undefined} onMobileClose={() => undefined} /></AuthProvider></MemoryRouter>) }
describe('Sidebar por rol', () => { it('muestra administración completa a ADMIN', () => { renderFor('ADMIN'); expect(screen.getByText('Usuarios')).toBeInTheDocument(); expect(screen.getByText('Proveedores')).toBeInTheDocument(); expect(screen.getByText('Ventas')).toBeInTheDocument() }); it('limita módulos para SELLER', () => { renderFor('SELLER'); expect(screen.getByText('Ventas')).toBeInTheDocument(); expect(screen.getByText('Clientes')).toBeInTheDocument(); expect(screen.queryByText('Usuarios')).not.toBeInTheDocument(); expect(screen.queryByText('Entradas')).not.toBeInTheDocument() }); it('permite lectura de ventas al gestor según la API', () => { renderFor('INVENTORY_MANAGER'); expect(screen.getByText('Entradas')).toBeInTheDocument(); expect(screen.getByText('Ventas')).toBeInTheDocument(); expect(screen.queryByText('Clientes')).not.toBeInTheDocument() }) })
