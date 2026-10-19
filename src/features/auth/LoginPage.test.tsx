import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { sessionFor } from '../../test/fixtures'
import { AuthContext, AuthProvider, type AuthValue } from './AuthContext'
import { LoginPage } from './LoginPage'
import { authApi } from './auth.api'
vi.mock('./auth.api', () => ({ authApi: { login: vi.fn() } }))
function renderLogin() { return render(<MemoryRouter initialEntries={['/login']}><AuthProvider><Routes><Route path="/login" element={<LoginPage />} /><Route path="/dashboard" element={<h1>Dashboard privado</h1>} /></Routes></AuthProvider></MemoryRouter>) }
function renderFailedLogin() { const value: AuthValue = { session: null, user: null, token: null, roles: [], isAuthenticated: false, login: vi.fn().mockRejectedValue({ isAxiosError: true, response: { status: 401 } }), logout: vi.fn(), hasRole: () => false, hasAnyRole: () => false }; return render(<MemoryRouter initialEntries={['/login']}><AuthContext.Provider value={value}><Routes><Route path="/login" element={<LoginPage />} /></Routes></AuthContext.Provider></MemoryRouter>) }
describe('LoginPage', () => {
  beforeEach(() => vi.mocked(authApi.login).mockReset())
  it('renderiza los campos accesibles', () => { renderLogin(); expect(screen.getByRole('heading', { name: /bienvenido/i })).toBeInTheDocument(); expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument(); expect(screen.getByLabelText('Contraseña')).toBeInTheDocument() })
  it('valida antes de llamar a la API', async () => { renderLogin(); fireEvent.submit(screen.getByRole('button', { name: /iniciar sesión/i }).closest('form')!); expect(await screen.findByText(/correo válido/i)).toBeInTheDocument(); expect(authApi.login).not.toHaveBeenCalled() })
  it('guarda sesión y navega tras un login exitoso', async () => { vi.mocked(authApi.login).mockResolvedValue(sessionFor('ADMIN')); renderLogin(); const user = userEvent.setup(); await user.type(screen.getByLabelText(/correo electrónico/i), 'admin@stockflow.co'); await user.type(screen.getByLabelText('Contraseña'), 'secret'); await user.click(screen.getByRole('button', { name: /iniciar sesión/i })); expect(await screen.findByText('Dashboard privado')).toBeInTheDocument(); expect(window.localStorage.getItem('stockflow.session')).toContain('jwt-test') })
  it('presenta un error amigable cuando falla el login', async () => { renderFailedLogin(); const user = userEvent.setup(); await user.type(screen.getByLabelText(/correo electrónico/i), 'admin@stockflow.co'); await user.type(screen.getByLabelText('Contraseña'), 'bad'); await user.click(screen.getByRole('button', { name: /iniciar sesión/i })); expect(await screen.findByRole('alert')).toHaveTextContent(/sesión expiró/i) })
})
