/**
 * IoT Device Connection Status Indicator
 * Shows real-time status of ESP32, Blynk, Servo, and Sensor connections
 */

import { Zap } from 'lucide-react'
import { Badge } from '@/components/common/UIComponents'
import { cn } from '@/utils/helpers'

export interface ConnectionStatusItem {
  label: string
  status: 'connected' | 'disconnected' | 'waiting'
  icon: React.ComponentType<{ className?: string }>
  description: string
  lastUpdate?: string
}

interface IoTConnectionStatusProps {
  items: ConnectionStatusItem[]
  systemMode: 'simulation' | 'hardware'
}

export function IoTConnectionStatus({
  items,
  systemMode,
}: IoTConnectionStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-success-500'
      case 'disconnected':
        return 'bg-danger-500'
      case 'waiting':
        return 'bg-warning-500'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected'
      case 'disconnected':
        return 'Disconnected'
      case 'waiting':
        return 'Waiting'
      default:
        return 'Unknown'
    }
  }

  if (systemMode === 'simulation') {
    return (
      <div className="rounded-2xl border border-warning-200 dark:border-warning-800 bg-warning-50 dark:bg-warning-900/20 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-warning-100 dark:bg-warning-900/40 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-warning-600" />
          </div>
          <div>
            <h3 className="font-semibold text-warning-900 dark:text-warning-200">
              Simulation Mode Active
            </h3>
            <p className="text-sm text-warning-800 dark:text-warning-300 mt-1">
              Semua koneksi hardware adalah simulasi. Gunakan Hardware Mode untuk
              perangkat asli.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const connected = items.filter((i) => i.status === 'connected').length
  const allConnected = connected === items.length

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 transition-all hover:shadow-soft-lg"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      item.status === 'connected'
                        ? 'bg-success-100 dark:bg-success-900/20'
                        : item.status === 'waiting'
                          ? 'bg-warning-100 dark:bg-warning-900/20'
                          : 'bg-danger-100 dark:bg-danger-900/20'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-5 h-5',
                        item.status === 'connected'
                          ? 'text-success-600'
                          : item.status === 'waiting'
                            ? 'text-warning-600'
                            : 'text-danger-600'
                      )}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {item.label}
                    </p>
                    <Badge
                      variant={
                        item.status === 'connected'
                          ? 'success'
                          : item.status === 'waiting'
                            ? 'warning'
                            : 'danger'
                      }
                      className="text-xs"
                    >
                      {getStatusLabel(item.status)}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.description}
                  </p>

                  {item.lastUpdate && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      Last update: {item.lastUpdate}
                    </p>
                  )}
                </div>

                <div
                  className={cn(
                    'w-3 h-3 rounded-full mt-1 flex-shrink-0',
                    getStatusColor(item.status),
                    item.status === 'connected' && 'animate-pulse'
                  )}
                />
              </div>
            </div>
          )
        })}
      </div>

      {!allConnected && (
        <div className="rounded-2xl border border-danger-200 dark:border-danger-800 bg-danger-50 dark:bg-danger-900/20 p-4">
          <p className="text-sm text-danger-900 dark:text-danger-200">
            ⚠️ {items.filter((i) => i.status !== 'connected').length} device tidak
            terkoneksi. Cek konfigurasi ESP32 dan Blynk API Key.
          </p>
        </div>
      )}

      {allConnected && (
        <div className="rounded-2xl border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-900/20 p-4">
          <p className="text-sm text-success-900 dark:text-success-200">
            ✓ Semua device terkoneksi dan siap beroperasi
          </p>
        </div>
      )}
    </div>
  )
}
