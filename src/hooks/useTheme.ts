import { useEffect, useState } from 'react'
type Theme = 'light' | 'dark'
const KEY = 'stockflow.theme'
function initialTheme(): Theme { const saved = window.localStorage.getItem(KEY); if (saved === 'light' || saved === 'dark') return saved; return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' }
export function useTheme() { const [theme, setTheme] = useState<Theme>(initialTheme); useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); window.localStorage.setItem(KEY, theme) }, [theme]); return { theme, toggleTheme: () => setTheme((value) => value === 'dark' ? 'light' : 'dark') } }
