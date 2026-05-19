'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell,
  Volume2,
  Clock,
  Mail,
  MessageCircle,
  Zap,
  Settings,
  Save,
  RotateCcw,
} from 'lucide-react'
import { Card, Badge, Alert } from '@/components/common/UIComponents'
import { useDispenserStore } from '@/stores/dispenserStore'
import type { NotificationSettings } from '@/types'
import { cn } from '@/utils/helpers'

export default function SettingsPage() {
  const { notificationSettings, updateNotificationSettings } = useDispenserStore()
  const [settings, setSettings] = useState<NotificationSettings>(notificationSettings)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSettings(notificationSettings)
  }, [notificationSettings])

  const handleSave = () => {
    updateNotificationSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    setSettings(notificationSettings)
  }

  const ToggleSwitch = ({
    label,
    description,
    value,
    onChange,
    icon: Icon,
  }: {
    label: string
    description?: string
    value: boolean
    onChange: (value: boolean) => void
    icon?: React.ComponentType<{ className?: string }>
  }) => (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 transition-all hover:shadow-soft-lg"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          {Icon && <Icon className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />}
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
            )}
          </div>
        </div>
        <button
          onClick={() => onChange(!value)}
          className={cn(
            'relative inline-flex h-8 w-14 items-center rounded-full transition-colors',
            value
              ? 'bg-success-600'
              : 'bg-gray-300 dark:bg-gray-600'
          )}
        >
          <span
            className={cn(
              'inline-block h-6 w-6 transform rounded-full bg-white transition-transform',
              value ? 'translate-x-7' : 'translate-x-1'
            )}
          />
        </button>
      </div>
    </motion.div>
  )

  const SliderInput = ({
    label,
    description,
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    suffix = '',
    icon: Icon,
  }: {
    label: string
    description?: string
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    step?: number
    suffix?: string
    icon?: React.ComponentType<{ className?: string }>
  }) => (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 transition-all hover:shadow-soft-lg"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3 flex-1">
          {Icon && <Icon className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />}
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
            )}
          </div>
        </div>
        <p className="text-lg font-bold text-primary-600">
          {value}{suffix}
        </p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
      />
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </motion.div>
  )

  const NumberInput = ({
    label,
    description,
    value,
    onChange,
    min = 0,
    icon: Icon,
  }: {
    label: string
    description?: string
    value: number
    onChange: (value: number) => void
    min?: number
    icon?: React.ComponentType<{ className?: string }>
  }) => (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 transition-all hover:shadow-soft-lg"
    >
      <div className="flex items-start gap-3 mb-3">
        {Icon && <Icon className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />}
        <div className="flex-1">
          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
      </div>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Math.max(min, Number(e.target.value)))}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </motion.div>
  )

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Pengaturan Sistem</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Konfigurasi notifikasi, simulasi, dan preferensi sistem Smart Drawer
        </p>
      </div>

      {saved && (
        <Alert variant="success" title="Berhasil" icon={<Save className="w-5 h-5" />}>
          Pengaturan telah disimpan dengan berhasil.
        </Alert>
      )}

      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan Notifikasi</h2>
          </div>

          <div className="space-y-4">
            <ToggleSwitch
              icon={Bell}
              label="Aktifkan Notifikasi"
              description="Terima notifikasi untuk pengingat obat, peringatan, dan alert"
              value={settings.enableNotifications}
              onChange={(value) =>
                setSettings({ ...settings, enableNotifications: value })
              }
            />

            {settings.enableNotifications && (
              <>
                <ToggleSwitch
                  icon={Mail}
                  label="Notifikasi Email"
                  description="Kirim notifikasi melalui email kepada keluarga"
                  value={settings.enableEmailNotification}
                  onChange={(value) =>
                    setSettings({ ...settings, enableEmailNotification: value })
                  }
                />

                <ToggleSwitch
                  icon={MessageCircle}
                  label="Notifikasi WhatsApp"
                  description="Kirim notifikasi melalui WhatsApp untuk alert penting"
                  value={settings.enableWhatsAppNotification}
                  onChange={(value) =>
                    setSettings({ ...settings, enableWhatsAppNotification: value })
                  }
                />
              </>
            )}
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        <div>
          <div className="flex items-center gap-3 mb-6">
            <Volume2 className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan Suara & Pengingat</h2>
          </div>

          <div className="space-y-4">
            <ToggleSwitch
              icon={Volume2}
              label="Pengingat Suara"
              description="Aktifkan buzzer dan pengingat suara saat waktu minum obat tiba"
              value={settings.enableVoiceReminder}
              onChange={(value) =>
                setSettings({ ...settings, enableVoiceReminder: value })
              }
            />

            {settings.enableVoiceReminder && (
              <SliderInput
                icon={Volume2}
                label="Volume Buzzer"
                description="Atur tingkat volume bunyi pengingat (0-100%)"
                value={settings.buzzerVolume}
                onChange={(value) =>
                  setSettings({ ...settings, buzzerVolume: value })
                }
                min={0}
                max={100}
                suffix="%"
              />
            )}

            <NumberInput
              icon={Clock}
              label="Tunda Pengingat"
              description="Berapa lama (dalam detik) sebelum memberikan pengingat"
              value={settings.reminderDelaySeconds}
              onChange={(value) =>
                setSettings({ ...settings, reminderDelaySeconds: value })
              }
              min={60}
            />
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        <div>
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan Simulasi & Otomasi</h2>
          </div>

          <div className="space-y-4">
            <ToggleSwitch
              icon={Zap}
              label="Mode Simulasi"
              description="Aktifkan simulasi otomatis untuk demo dan testing"
              value={settings.enableSimulation}
              onChange={(value) =>
                setSettings({ ...settings, enableSimulation: value })
              }
            />

            {settings.enableSimulation && (
              <ToggleSwitch
                icon={Settings}
                label="Buka Laci Otomatis"
                description="Laci obat terbuka otomatis saat jadwal tiba (hanya dalam mode simulasi)"
                value={settings.enableAutoDrawer}
                onChange={(value) =>
                  setSettings({ ...settings, enableAutoDrawer: value })
                }
              />
            )}

            {settings.enableSimulation && (
              <Card className="bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800">
                <Badge variant="warning" className="mb-3 inline-block">
                  Demo Mode Aktif
                </Badge>
                <h3 className="font-semibold text-warning-900 dark:text-warning-200 mb-2">Catatan Mode Simulasi</h3>
                <ul className="text-sm text-warning-800 dark:text-warning-300 space-y-1 list-disc list-inside">
                  <li>Data yang ditampilkan adalah simulasi untuk demo</li>
                  <li>Laci tidak akan benar-benar terbuka tanpa hardware ESP32</li>
                  <li>Gunakan mode Hardware untuk koneksi perangkat asli</li>
                  <li>Sempurna untuk presentasi dan testing sebelum deployment</li>
                </ul>
              </Card>
            )}
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Simpan Pengaturan
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </motion.button>
        </div>
      </section>
    </div>
  )
}
