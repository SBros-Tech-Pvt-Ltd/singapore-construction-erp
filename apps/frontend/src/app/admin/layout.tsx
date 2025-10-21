// app/admin/layout.tsx
'use client'

import { useState, useEffect } from 'react'
import { AdminHeader } from '@/components/admin/header'
import { AdminSidebar } from '@/components/admin/sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Close sidebar on window resize (if switching from mobile → desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleMenuClick = () => setSidebarOpen(true)
  const handleCloseSidebar = () => setSidebarOpen(false)
  const handleToggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={handleCloseSidebar}
        onToggle={handleToggleSidebar}
        collapsed={sidebarCollapsed}
      />

      {/* Main Layout */}
      <div className={
        `flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-' : 'lg:ml-'
        }`
      }>
        {/* Header */}
        <AdminHeader />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}