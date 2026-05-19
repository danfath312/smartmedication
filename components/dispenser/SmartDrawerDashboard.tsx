'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Bell,
  CheckCircle2,
  Cloud,
  Cpu,
  DoorOpen,
  FlaskConical,
  Mic2,
  Plus,
  RotateCcw,
  ShieldCheck,
  Siren,
  Sparkles,
  Edit3,
  Trash2,
  Wifi,
} from 'lucide-react'
import { Card, Badge, ProgressBar, Alert } from '@/components/common/UIComponents'
import { useDispenserStore } from '../../stores/dispenserStore'
import type {
  DispenserTimelineEvent,
  MedicationDrawer,
  Notification,
} from '@/types'
import {
  cn,
  formatDate,
  formatTimeShort,
  getDrawerStatusColor,
  getDrawerStatusLabel,
  getStockStatusColor,
  getStockStatusLabel,
} from '@/utils/helpers'
import {
  isDueWindow,
  isMissedWindow,
} from '@/utils/simulationService'

const flowSteps = [
  'Website Dashboard',
  'Blynk Cloud',
  'ESP32',
  'Servo Motor + Sensor',
  '5 Smart Medication Drawers',
]

const statusColors = ['#22c55e', '#0ea5e9', '#f59e0b']
const processedAutomationWindows = new Set<string>()

export function SmartDrawerDashboard() {
  const {
    drawers,
    notifications,
    timeline,
    deviceOnline,
    blynkOnline,
    servoActive,
    buzzerActive,
    voiceReminderEnabled,
    systemMode,
    notificationSettings,
    setDeviceOnline,
    toggleVoiceReminder,
    saveSchedule,
    deleteSchedule,
    openDrawer,
    consumeDrawer,
    closeAllDrawers,
    markMissedMedication,
    restockDrawer,
    setSystemMode,
  } = useDispenserStore()

  const [simulatedTime, setSimulatedTime] = useState(
    () => new Date('2026-05-16T05:30:00')
  )
  const [selectedDrawer, setSelectedDrawer] = useState(1)
  const [form, setForm] = useState({
    medicationName: 'Amlodipine',
    dosage: '5 mg',
    schedule: '06:00',
    drawerNumber: 1,
    notes: 'Hipertensi',
  })

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSimulatedTime((current) => new Date(current.getTime() + 30 * 60000))
    }, 2500)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (systemMode !== 'simulation' || !notificationSettings.enableSimulation) return

    drawers.forEach((drawer: MedicationDrawer) => {
      if (!drawer.medicationName || drawer.consumptionState !== 'pending') return

      const automationKey = `${drawer.drawerNumber}:${drawer.schedule}:${simulatedTime.toDateString()}`
      if (processedAutomationWindows.has(automationKey)) return

      if (isDueWindow(simulatedTime, drawer.schedule)) {
        processedAutomationWindows.add(automationKey)
        openDrawer(drawer.drawerNumber, 'automatic')
        return
      }

      if (isMissedWindow(simulatedTime, drawer.schedule)) {
        processedAutomationWindows.add(automationKey)
        markMissedMedication(drawer.drawerNumber)
      }
    })
  }, [drawers, simulatedTime, markMissedMedication, openDrawer, systemMode, notificationSettings.enableSimulation])

  const activeDrawers: MedicationDrawer[] = drawers.filter((drawer: MedicationDrawer) => drawer.medicationName)
  const takenCount = activeDrawers.filter((drawer: MedicationDrawer) => drawer.consumptionState === 'taken').length
  const missedCount = activeDrawers.filter((drawer: MedicationDrawer) => drawer.consumptionState === 'missed').length
  const pendingCount = Math.max(activeDrawers.length - takenCount - missedCount, 0)
  const adherence = activeDrawers.length
    ? Math.round((takenCount / activeDrawers.length) * 100)
    : 0
  const lowStockCount = activeDrawers.filter((drawer: MedicationDrawer) => drawer.stockStatus === 'low').length
  const emptyCount = activeDrawers.filter((drawer: MedicationDrawer) => drawer.stockStatus === 'empty').length
  const openDrawerState = drawers.find((drawer: MedicationDrawer) => drawer.status !== 'closed')

  const chartData = useMemo(
    () => [
      { name: 'Diminum', value: takenCount },
      { name: 'Menunggu', value: pendingCount },
      { name: 'Terlewat', value: missedCount },
    ],
    [missedCount, pendingCount, takenCount]
  )

  const drawerSummary = useMemo(
    () => [
      { label: 'Total Laci', value: drawers.length, helper: '5 slot aktif' },
      { label: 'Perlu Perhatian', value: lowStockCount + emptyCount, helper: 'stok rendah / kosong' },
      { label: 'Konsumsi Hari Ini', value: `${adherence}%`, helper: `${takenCount} dari ${activeDrawers.length} diminum` },
      { label: 'Device Status', value: deviceOnline ? 'Online' : 'Offline', helper: 'ESP32 & Blynk' },
    ],
    [activeDrawers.length, adherence, deviceOnline, drawers.length, emptyCount, lowStockCount, takenCount]
  )

  const submitSchedule = () => {
    saveSchedule(form)
    setSelectedDrawer(form.drawerNumber)
  }

  const loadDrawerToForm = (drawerNumber: number) => {
    const drawer = drawers.find((item: MedicationDrawer) => item.drawerNumber === drawerNumber)
    if (!drawer) return
    setForm({
      drawerNumber: drawer.drawerNumber,
      medicationName: drawer.medicationName || '',
      dosage: drawer.dosage || '',
      schedule: drawer.schedule || '',
      notes: drawer.notes || '',
    })
    setSelectedDrawer(drawerNumber)
  }

  const triggerMissedAlert = () => {
    markMissedMedication(4)
  }

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <AnimatePresence>
        {notifications.slice(0, 3).map((notification: Notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            className="fixed top-24 right-4 md:right-6 z-50 w-[92vw] max-w-sm"
          >
            <Alert
              variant={
                notification.type === 'success'
                  ? 'success'
                  : notification.type === 'alert'
                    ? 'error'
                    : 'info'
              }
              title={notification.title}
              icon={<Bell className="w-5 h-5" />}
              className="shadow-soft-lg backdrop-blur-sm"
            >
              <div className="text-sm">
                {notification.message}
                <div className="mt-2 text-xs opacity-80">
                  {formatTimeShort(notification.timestamp)}
                </div>
              </div>
            </Alert>
          </motion.div>
        ))}
      </AnimatePresence>

      <section className="relative overflow-hidden rounded-3xl border border-primary-100 dark:border-primary-900/40 bg-gradient-to-br from-white via-primary-50/40 to-success-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-primary-900/20 shadow-soft-lg">
        <div className="absolute inset-0 bg-grid-slate-100/[0.04] dark:bg-grid-slate-900/[0.04]" />
        <div className="relative p-6 md:p-8 lg:p-10">
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8">
            <div className="max-w-3xl space-y-5">
              <Badge variant="success" className="inline-flex gap-2 items-center">
                <Sparkles className="w-3.5 h-3.5" />
                Smart Automated Medication Dispenser
              </Badge>
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  Website Dashboard → Blynk → ESP32 → Servo Motor → Smart Drawer
                </h1>
                <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                  Kontrol laci obat otomatis, jadwalkan dosis, pantau konsumsi, dan kirim notifikasi realtime untuk keluarga lansia.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Badge variant={deviceOnline ? 'success' : 'danger'}>Device {deviceOnline ? 'Online' : 'Offline'}</Badge>
                <Badge variant={servoActive ? 'primary' : 'secondary'}>Servo {servoActive ? 'Active' : 'Idle'}</Badge>
                <Badge variant={buzzerActive ? 'warning' : 'secondary'}>Buzzer {buzzerActive ? 'On' : 'Off'}</Badge>
                <Badge variant="primary">Medication Ready</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:w-[28rem]">
              {drawerSummary.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -3 }}
                  className="rounded-2xl border border-white/70 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 p-4 shadow-card"
                >
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{item.label}</p>
                  <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{item.value}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.helper}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {lowStockCount > 0 && (
        <Alert
          variant="warning"
          title="Low Stock Warning"
          icon={<AlertTriangle className="w-5 h-5" />}
        >
          {lowStockCount} laci mendekati batas stok aman. Isi ulang sebelum jadwal berikutnya.
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">System Mode</p>
          <div className="flex gap-2">
            <button
              onClick={() => setSystemMode('simulation')}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full',
                systemMode === 'simulation'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              )}
            >
              Simulasi
            </button>
            <button
              onClick={() => setSystemMode('hardware')}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full',
                systemMode === 'hardware'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              )}
            >
              Hardware
            </button>
          </div>
        </div>

        {systemMode === 'simulation' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-sky-200 dark:border-sky-900/40 bg-sky-50 dark:bg-sky-900/20 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <p className="text-sm font-semibold text-sky-900 dark:text-sky-300">Simulation Active</p>
            </div>
            <p className="text-xs text-sky-800 dark:text-sky-400">
              Automation enabled: {notificationSettings.enableSimulation ? 'Yes' : 'No'}
            </p>
          </motion.div>
        )}

        {systemMode === 'hardware' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-900/20 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">Waiting for ESP32</p>
            </div>
            <p className="text-xs text-emerald-800 dark:text-emerald-400">
              No automation running. Connect ESP32 device.
            </p>
          </motion.div>
        )}
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Smart Drawer Status</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                5 laci utama dengan status independen, realtime, dan otomatis.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDeviceOnline(!deviceOnline)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-all',
                  deviceOnline
                    ? 'bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-200'
                    : 'bg-danger-100 text-danger-700 dark:bg-danger-900/20 dark:text-danger-200'
                )}
              >
                {deviceOnline ? 'Device Online' : 'Device Offline'}
              </button>
              <button
                onClick={toggleVoiceReminder}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2',
                  voiceReminderEnabled
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-200'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                )}
              >
                {voiceReminderEnabled ? <Mic2 className="w-4 h-4" /> : <Mic2 className="w-4 h-4" />}
                Voice Reminder {voiceReminderEnabled ? 'On' : 'Off'}
              </button>
              <button
                onClick={closeAllDrawers}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-danger-100 text-danger-700 dark:bg-danger-900/20 dark:text-danger-200 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Tutup Semua Laci
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
            {drawers.map((drawer: MedicationDrawer) => {
              const isSelected = selectedDrawer === drawer.drawerNumber
              const isActive = drawer.status !== 'closed'
              return (
                <motion.div
                  key={drawer.id}
                  whileHover={{ y: -4 }}
                  className={cn(
                    'rounded-2xl border p-4 transition-all duration-300',
                    isActive
                      ? 'border-primary-300 dark:border-primary-700 shadow-soft-lg bg-primary-50/70 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
                    isSelected && 'ring-2 ring-primary-400'
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
                        Laci {drawer.drawerNumber}
                      </p>
                      <h3 className="font-bold text-gray-900 dark:text-white mt-1">
                        {drawer.medicationName || 'Belum diatur'}
                      </h3>
                    </div>
                    <div
                      className={cn(
                        'w-3 h-3 rounded-full shadow-[0_0_0_6px_rgba(14,165,233,0.08)] animate-pulse',
                        isActive ? 'bg-success-500' : 'bg-gray-400'
                      )}
                    />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500 dark:text-gray-400">Dosis</span>
                      <span className="font-medium text-gray-900 dark:text-white">{drawer.dosage || '-'}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500 dark:text-gray-400">Jadwal</span>
                      <span className="font-medium text-gray-900 dark:text-white text-right">{drawer.schedule || '-'}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500 dark:text-gray-400">Stok</span>
                      <span className={cn('font-semibold', getStockStatusColor(drawer.stockStatus))}>
                        {drawer.stock}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500 dark:text-gray-400">Status</span>
                      <span className={cn('font-semibold', getDrawerStatusColor(drawer.status))}>
                        {getDrawerStatusLabel(drawer.status)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <ProgressBar
                      value={drawer.stock}
                      max={12}
                      color={drawer.stockStatus === 'empty' ? 'danger' : drawer.stockStatus === 'low' ? 'warning' : 'success'}
                      showPercentage={false}
                    />
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{getStockStatusLabel(drawer.stockStatus)}</span>
                      <span>{drawer.notes || 'Belum ada catatan'}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      disabled={!deviceOnline || !drawer.medicationName}
                      onClick={() => openDrawer(drawer.drawerNumber, 'manual')}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary-700 disabled:opacity-40"
                    >
                      <DoorOpen className="w-3.5 h-3.5" />
                      Buka
                    </button>
                    <button
                      onClick={() => consumeDrawer(drawer.drawerNumber, 'manual')}
                      className="inline-flex items-center gap-2 rounded-lg bg-success-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-success-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Konfirmasi
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
            {drawers.map((drawer: MedicationDrawer) => (
              <button
                key={`open-${drawer.drawerNumber}`}
                onClick={() => openDrawer(drawer.drawerNumber, 'manual')}
                className={cn(
                  'rounded-xl border px-4 py-3 text-sm font-semibold transition-all text-left',
                  drawer.drawerNumber === openDrawerState?.drawerNumber
                    ? 'bg-primary-600 text-white border-primary-600 shadow-soft-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span>Buka Laci {drawer.drawerNumber}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">IoT Device Monitoring</h2>
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Website → Blynk</span>
                <Badge variant={blynkOnline ? 'success' : 'danger'}>{blynkOnline ? 'Connected' : 'Offline'}</Badge>
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Cloud className="w-4 h-4 text-primary-500" />
                Blynk Cloud sinkron realtime
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">ESP32 & Servo</span>
                <Badge variant={deviceOnline ? 'success' : 'danger'}>{deviceOnline ? 'Online' : 'Offline'}</Badge>
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Cpu className="w-4 h-4 text-primary-500" />
                Motor servo membuka laci obat otomatis
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Medication Ready</span>
                <Badge variant={openDrawerState ? 'warning' : 'success'}>
                  {openDrawerState ? 'Ready' : 'Standby'}
                </Badge>
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <ShieldCheck className="w-4 h-4 text-success-500" />
                Status laci dan sensor dipantau realtime
              </div>
            </div>

            <div className="rounded-2xl border border-primary-100 dark:border-primary-900/30 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-900 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Simulated Clock</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatTimeShort(simulatedTime)}</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary-600 animate-pulse" />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{formatDate(simulatedTime)}</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Medication Input From Website</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Simpan jadwal, edit, dan hapus langsung ke mock database/state management.</p>
            </div>
            <Badge variant="primary" className="animate-pulse">Realtime Sync</Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <label className="space-y-2 text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">Nama Obat</span>
              <input
                value={form.medicationName}
                onChange={(event) => setForm({ ...form, medicationName: event.target.value })}
                className="input"
                placeholder="Contoh: Amlodipine"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">Dosis</span>
              <input
                value={form.dosage}
                onChange={(event) => setForm({ ...form, dosage: event.target.value })}
                className="input"
                placeholder="Contoh: 5 mg"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">Jadwal Minum</span>
              <input
                value={form.schedule}
                onChange={(event) => setForm({ ...form, schedule: event.target.value })}
                className="input"
                placeholder="Contoh: 06:00 / 18:00"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">Pilih Laci</span>
              <select
                value={form.drawerNumber}
                onChange={(event) => setForm({ ...form, drawerNumber: Number(event.target.value) })}
                className="input"
              >
                {[1, 2, 3, 4, 5].map((drawerNumber) => (
                  <option key={drawerNumber} value={drawerNumber}>Laci {drawerNumber}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">Catatan</span>
              <textarea
                value={form.notes}
                onChange={(event) => setForm({ ...form, notes: event.target.value })}
                className="input min-h-[120px]"
                placeholder="Contoh: minum sesudah makan"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={submitSchedule}
              className="btn btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Simpan Jadwal
            </button>
            <button
              onClick={() => loadDrawerToForm(form.drawerNumber)}
              className="btn btn-outline"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              onClick={() => deleteSchedule(form.drawerNumber)}
              className="btn btn-outline border-danger-300 text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Hapus
            </button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Monitoring Konsumsi</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Adherence, progress circle, dan riwayat konsumsi realtime.</p>
            </div>
          </div>

          <div className="relative mx-auto w-56 h-56">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(#22c55e ${adherence * 3.6}deg, #e5e7eb 0deg)`,
              }}
            />
            <div className="absolute inset-4 rounded-full bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-center shadow-inner">
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{adherence}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Adherence Percentage</p>
              <p className="text-xs text-success-600 mt-2 font-medium">{takenCount} diminum</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {chartData.map((entry, index) => (
              <div key={entry.name} className="rounded-2xl border border-gray-200 dark:border-gray-700 p-3 text-center bg-gray-50 dark:bg-gray-900/30">
                <div className="mx-auto mb-2 w-3 h-3 rounded-full" style={{ backgroundColor: statusColors[index] }} />
                <p className="text-lg font-bold text-gray-900 dark:text-white">{entry.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{entry.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {drawers.map((drawer: MedicationDrawer) => (
              <div key={`timeline-${drawer.id}`} className="flex items-start gap-3 rounded-2xl border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800">
                <div className={cn('mt-1 w-3 h-3 rounded-full shadow-[0_0_0_6px_rgba(14,165,233,0.08)]', drawer.consumptionState === 'taken' ? 'bg-success-500' : drawer.consumptionState === 'missed' ? 'bg-danger-500' : 'bg-primary-500')} />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-gray-900 dark:text-white">{drawer.medicationName || `Laci ${drawer.drawerNumber}`}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{drawer.schedule || 'Belum dijadwalkan'}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {drawer.consumptionState === 'taken'
                      ? 'Status obat diminum'
                      : drawer.consumptionState === 'missed'
                        ? 'Status obat belum diminum / missed'
                        : 'Menunggu waktu konsumsi berikutnya'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Realtime Notification</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Popup otomatis, low stock warning, emergency alert, dan voice reminder simulation.</p>
            </div>
            <Badge variant="warning" className="animate-pulse">Live</Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={triggerMissedAlert}
              className="rounded-2xl border border-danger-200 dark:border-danger-800 bg-danger-50 dark:bg-danger-900/20 p-4 text-left transition hover:shadow-soft-lg"
            >
              <div className="flex items-center gap-3">
                <Siren className="w-5 h-5 text-danger-600" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Emergency Alert</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Simulasikan missed medication alert</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => restockDrawer(4, 2)}
              className="rounded-2xl border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-900/20 p-4 text-left transition hover:shadow-soft-lg"
            >
              <div className="flex items-center gap-3">
                <FlaskConical className="w-5 h-5 text-success-600" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Low Stock Recovery</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Isi ulang laci 4 sebanyak 2 item</p>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {timeline.slice(0, 5).map((event: DispenserTimelineEvent) => (
              <div key={event.id} className="flex items-start gap-3 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                <div className={cn('w-3 h-3 rounded-full mt-1.5', event.type === 'success' ? 'bg-success-500' : event.type === 'warning' ? 'bg-warning-500' : event.type === 'alert' ? 'bg-danger-500' : 'bg-primary-500')} />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-gray-900 dark:text-white">{event.title}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{formatTimeShort(new Date(event.timestamp))}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">IoT System Visualization</h2>
          <div className="space-y-4">
            {flowSteps.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <div className={cn('w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-soft-lg', index === 0 ? 'bg-primary-600' : index === 1 ? 'bg-success-600' : index === 2 ? 'bg-warning-600' : index === 3 ? 'bg-danger-600' : 'bg-primary-500')}>
                  {index + 1}
                </div>
                <div className="flex-1 rounded-2xl border border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900/30">
                  <p className="font-semibold text-gray-900 dark:text-white">{step}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{index === 0 ? 'Input data obat dari website dashboard' : index === 1 ? 'Blynk meneruskan command realtime' : index === 2 ? 'ESP32 menerima command API' : index === 3 ? 'Servo motor membuka laci otomatis' : '5 laci obat dengan status independen'}</p>
                </div>
                {index < flowSteps.length - 1 && <ArrowDown className="w-5 h-5 text-primary-400 animate-bounce md:hidden" />}
                {index < flowSteps.length - 1 && <ArrowRight className="hidden md:block w-5 h-5 text-primary-400 animate-pulse" />}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-primary-100 dark:border-primary-900/30 bg-primary-50/70 dark:bg-primary-900/20 p-4">
            <div className="flex items-center gap-3">
              <Wifi className="w-5 h-5 text-primary-600" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Mock ESP32 Response</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Device connected • servo idle • sensor ready • drawer monitor active</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
