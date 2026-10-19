import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { cn } from '../../lib/utils/cn'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
export function AdminLayout() { const [collapsed, setCollapsed] = useState(false); const [mobileOpen, setMobileOpen] = useState(false); return <div className="min-h-screen"><Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onCollapse={() => setCollapsed((value) => !value)} onMobileClose={() => setMobileOpen(false)} /><div className={cn('min-h-screen transition-[margin] lg:ml-64', collapsed && 'lg:ml-20')}><Topbar onMenuOpen={() => setMobileOpen(true)} /><main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8"><Outlet /></main></div></div> }
