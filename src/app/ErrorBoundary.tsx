import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Brand } from '../components/shared/Brand'
import { Button } from '../components/ui/button'
interface State { failed: boolean }
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false }
  static getDerivedStateFromError(): State { return { failed: true } }
  componentDidCatch(error: Error, info: ErrorInfo) { if (import.meta.env.DEV) console.error('Unexpected React error', error, info) }
  render() { if (!this.state.failed) return this.props.children; return <main className="grid min-h-screen place-items-center p-6"><div className="max-w-md text-center"><Brand className="mb-8 justify-center" /><h1 className="text-2xl font-bold">Algo no salió como esperábamos</h1><p className="mt-3 text-sm leading-6 text-slate-500">La aplicación encontró un problema inesperado. Puedes recargar para volver a intentarlo.</p><Button className="mt-6" onClick={() => window.location.reload()}>Recargar aplicación</Button></div></main> }
}
