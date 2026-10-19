import { RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from './ErrorBoundary'
import { AppProviders } from './providers'
import { router } from './router'
export function App() { return <ErrorBoundary><AppProviders><RouterProvider router={router} /></AppProviders></ErrorBoundary> }
