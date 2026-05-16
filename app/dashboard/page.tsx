'use client'

import { Card, StatCard } from '@/components/common/UIComponents'
import {
  TodayStatusCard,
  MedicationScheduleWidget,
  DeviceStatusWidget,
  MedicationTimelineCard,
} from '@/components/dashboard/DashboardCards'
import {
  WeeklyAdherenceChart,
  MonthlyAdherenceChart,
  MedicationStatusChart,
} from '@/components/dashboard/Charts'
import { getGreeting } from '@/utils/helpers'
import {
  Activity,
  Heart,
  Pill,
  TrendingUp,
} from 'lucide-react'
import { mockElderlyPerson, getTodaySchedule, mockIoTDevices, getTodayAdherence, getWeeklyAverageAdherence, getMonthlyAverageAdherence } from '@/data/mockData'

export default function DashboardPage() {
  const greeting = getGreeting()
  const todayAdherence = getTodayAdherence()
  const weeklyAdherence = getWeeklyAverageAdherence()
  const monthlyAdherence = getMonthlyAverageAdherence()
  const todaySchedule = getTodaySchedule()
  const totalMeds = mockElderlyPerson.medications.length
  const takenToday = todaySchedule.filter((s) => s.status === 'taken').length
  const missedToday = todaySchedule.filter((s) => s.status === 'missed').length
  const lateToday = todaySchedule.filter((s) => s.status === 'late').length

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {greeting}, Keluarga
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Monitoring kesehatan {mockElderlyPerson.name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Kepatuhan Hari Ini"
          value={`${todayAdherence}%`}
          icon={<Activity className="w-6 h-6" />}
          color="primary"
          trend={{ value: 5, direction: 'up' }}
          subtext="vs kemarin"
        />
        <StatCard
          label="Rata-rata Mingguan"
          value={`${weeklyAdherence}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          color="success"
          subtext="7 hari terakhir"
        />
        <StatCard
          label="Rata-rata Bulanan"
          value={`${monthlyAdherence}%`}
          icon={<Heart className="w-6 h-6" />}
          color="primary"
          subtext="30 hari terakhir"
        />
        <StatCard
          label="Total Jadwal Obat"
          value={totalMeds}
          icon={<Pill className="w-6 h-6" />}
          color="warning"
          subtext="Aktif hari ini"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <TodayStatusCard />
          <WeeklyAdherenceChart />
          <MonthlyAdherenceChart />
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <MedicationScheduleWidget />
          <MedicationStatusChart
            taken={takenToday}
            late={lateToday}
            missed={missedToday}
          />
          <Card>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Informasi Pasien
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Nama</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {mockElderlyPerson.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Usia</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {mockElderlyPerson.age} tahun
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Golongan Darah
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {mockElderlyPerson.bloodType}
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Riwayat Medis
                </p>
                <div className="space-y-1">
                  {mockElderlyPerson.medicalHistory.map((history, idx) => (
                    <p
                      key={idx}
                      className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded w-fit"
                    >
                      {history}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* IoT Devices Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Status Perangkat IoT
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {mockIoTDevices.map((device) => (
            <DeviceStatusWidget
              key={device.id}
              device={{
                name: device.name,
                status: device.status,
                battery: device.batteryLevel,
                lastSync: new Date(device.lastSync).toLocaleTimeString('id-ID'),
              }}
            />
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <MedicationTimelineCard />
    </div>
  )
}
