'use client'

import { useState } from 'react'
import Navbar from '@/components/common/Navbar'
import Sidebar from '@/components/common/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navbar
        showSidebar={true}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 md:px-6 py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
