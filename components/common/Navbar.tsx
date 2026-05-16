'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Menu,
  Moon,
  Sun,
  Bell,
} from 'lucide-react'
 

interface NavbarProps {
  showSidebar?: boolean
  onToggleSidebar?: () => void
}

export default function Navbar({ showSidebar = true, onToggleSidebar }: NavbarProps) {
  const [isDark, setIsDark] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-soft">
      <div className="px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {showSidebar && (
              <button
                onClick={onToggleSidebar}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors md:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                S
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  SmartMed
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Medication Adherence
                </p>
              </div>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full animate-pulse" />
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-soft-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Notifikasi
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Pengingat Minum Obat
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Metformin (Sore) akan diminum dalam 30 menit
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        1 menit lalu
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
