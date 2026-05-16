'use client'

import { Card, ProgressBar, Badge } from '@/components/common/UIComponents'
import 'lucide-react'
import { getTodaySchedule, getTodayAdherence } from '@/data/mockData'
import { getStatusLabel, getStatusBgColor } from '@/utils/helpers'

export function TodayStatusCard() {
  const todaySchedule = getTodaySchedule()
  const adherence = getTodayAdherence()
  const taken = todaySchedule.filter((s) => s.status === 'taken').length
  const missed = todaySchedule.filter((s) => s.status === 'missed').length
  const late = todaySchedule.filter((s) => s.status === 'late').length

  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Status Hari Ini
        </h3>
      </div>

      <div className="space-y-4">
        {/* Main Progress */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Kepatuhan Konsumsi Obat
            </p>
            <span className="text-2xl font-bold text-primary-600">
              {adherence}%
            </span>
          </div>
          <ProgressBar
            value={adherence}
            max={100}
            color={adherence >= 80 ? 'success' : 'warning'}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4">
          <div className="text-center p-3 bg-success-50 dark:bg-success-900/20 rounded-lg">
            <p className="text-2xl font-bold text-success-600">{taken}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Sudah Diminum
            </p>
          </div>
          <div className="text-center p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
            <p className="text-2xl font-bold text-warning-600">{late}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Terlambat
            </p>
          </div>
          <div className="text-center p-3 bg-danger-50 dark:bg-danger-900/20 rounded-lg">
            <p className="text-2xl font-bold text-danger-600">{missed}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Belum Diminum
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export function MedicationScheduleWidget() {
  const todaySchedule = getTodaySchedule()

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Jadwal Hari Ini
        </h3>
      </div>

      <div className="space-y-3">
        {todaySchedule.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tidak ada jadwal untuk hari ini
          </p>
        ) : (
          todaySchedule.map((item) => (
            <div
              key={item.medication.id}
              className={`p-3 rounded-lg border-l-4 ${getStatusBgColor(
                item.status
              )} border-current`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {item.medication.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {item.medication.dosage} {item.medication.unit} •{' '}
                    {item.medication.time}
                  </p>
                </div>
                <Badge
                  variant={
                    item.status === 'taken'
                      ? 'success'
                      : item.status === 'late'
                        ? 'warning'
                        : 'danger'
                  }
                  size="sm"
                >
                  {getStatusLabel(item.status)}
                </Badge>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}

interface DeviceStatusProps {
  device: {
    name: string
    status: 'online' | 'offline'
    battery: number
    lastSync: string
  }
}

export function DeviceStatusWidget({ device }: DeviceStatusProps) {
  const isOnline = device.status === 'online'

  return (
    <Card className="border-l-4 border-primary-500">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {device.name}
          </h4>
          <div className="flex items-center gap-2 mt-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                isOnline ? 'bg-success-500' : 'bg-gray-400'
              } animate-pulse`}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1" suppressHydrationWarning>
            Terakhir sinkronisasi: {device.lastSync}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600">{device.battery}%</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Baterai</p>
        </div>
      </div>
    </Card>
  )
}

export function MedicationTimelineCard() {
  const todaySchedule = getTodaySchedule()

  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Timeline Konsumsi Obat
        </h3>
      </div>

      <div className="space-y-4">
        {todaySchedule.map((item, idx) => (
          <div key={item.medication.id} className="flex gap-4">
            {/* Timeline Line */}
            <div className="flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  item.status === 'taken'
                    ? 'bg-success-500 border-success-500'
                    : item.status === 'late'
                      ? 'bg-warning-500 border-warning-500'
                      : 'bg-gray-300 border-gray-300'
                }`}
              />
              {idx !== todaySchedule.length - 1 && (
                <div className="w-0.5 h-12 bg-gray-200 dark:bg-gray-700 my-2" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.medication.time}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.medication.name} {item.medication.dosage}{' '}
                    {item.medication.unit}
                  </p>
                </div>
                <Badge
                  variant={
                    item.status === 'taken'
                      ? 'success'
                      : item.status === 'late'
                        ? 'warning'
                        : 'secondary'
                  }
                  size="sm"
                >
                  {getStatusLabel(item.status)}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
