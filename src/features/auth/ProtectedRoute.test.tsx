import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { sessionFor } from '../../test/fixtures'
import { sessionStorage } from '../../lib/auth/storage'
import { AuthProvider } from './AuthContext'
import { ProtectedRoute } from './ProtectedRoute'
function renderRoute() { return render(<MemoryRouter initialEntries={['/dashboard']}><AuthProvider><Routes><Route path="/login" element={<h1>Acceso</h1>} /><Route element={<ProtectedRoute />}><Route path="/dashboard" element={<h1>Dashboard</h1>} /></Route></Routes></AuthProvider></MemoryRouter>) }
describe('ProtectedRoute', () => { it('redirige a login sin sesión', () => { renderRoute(); expect(screen.getByText('Acceso')).toBeInTheDocument() }); it('permite acceder con sesión', () => { sessionStorage.set(sessionFor('SELLER')); renderRoute(); expect(screen.getByText('Dashboard')).toBeInTheDocument() }) })
