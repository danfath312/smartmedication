'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Pill,
  Users,
  Info,
  X,
} from 'lucide-react'
import { cn } from '@/utils/helpers'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Jadwal Obat', href: '/dashboard/schedule', icon: Pill },
  { label: 'Monitoring Keluarga', href: '/dashboard/family', icon: Users },
  { label: 'Tentang Sistem', href: '/dashboard/about', icon: Info },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard' && pathname === '/dashboard') return true
    if (href !== '/dashboard' && pathname.includes(href)) return true
    return false
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed md:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 z-40',
          'md:translate-x-0 pt-20 md:pt-6',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation Items */}
        <nav className="px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  active
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Divider */}
        <div className="px-4 py-4">
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Footer Info */}
        <div className="px-4 py-6">
          <div className="card-sm bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Status Sistem
            </p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  IoT: Online
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Blynk: Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
