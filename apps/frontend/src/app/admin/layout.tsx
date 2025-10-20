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

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

      {/* Main Layout */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader
          onMenuClick={handleMenuClick}
          companyName="ABC Constructions"
          userName="John Doe"
          userRole="Admin"
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-6 transition-all duration-300">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
