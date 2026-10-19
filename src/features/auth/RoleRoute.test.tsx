import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import NotFoundPage from '../../components/shared/NotFoundPage'
import { RoleRoute } from './RoleRoute'
vi.mock('./AuthContext', () => ({ useAuth: () => ({ hasAnyRole: () => false }) }))
describe('páginas de navegación', () => { it('muestra 403 cuando el rol no está permitido', () => { render(<MemoryRouter initialEntries={['/users']}><Routes><Route element={<RoleRoute allowedRoles={['ADMIN']} />}><Route path="/users" element={<p>Usuarios</p>} /></Route></Routes></MemoryRouter>); expect(screen.getByText('403')).toBeInTheDocument(); expect(screen.getByText(/acceso restringido/i)).toBeInTheDocument() }); it('muestra 404 para una ruta inexistente', () => { render(<MemoryRouter><NotFoundPage /></MemoryRouter>); expect(screen.getByText('404')).toBeInTheDocument(); expect(screen.getByText(/página no encontrada/i)).toBeInTheDocument() }) })
