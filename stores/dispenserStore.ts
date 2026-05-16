import { create } from 'zustand'
import type {
  DispenserFormState,
  DispenserTimelineEvent,
  MedicationDrawer,
  Notification,
} from '@/types'

export type DispenserActionSource = 'manual' | 'automatic'

interface DispenserState {
  drawers: MedicationDrawer[]
  notifications: Notification[]
  timeline: DispenserTimelineEvent[]
  deviceOnline: boolean
  blynkOnline: boolean
  servoActive: boolean
  buzzerActive: boolean
  voiceReminderEnabled: boolean
  setDeviceOnline: (online: boolean) => void
  toggleVoiceReminder: () => void
  saveSchedule: (payload: DispenserFormState) => void
  deleteSchedule: (drawerNumber: number) => void
  openDrawer: (drawerNumber: number, source?: DispenserActionSource) => void
  consumeDrawer: (drawerNumber: number, source?: DispenserActionSource) => void
  closeAllDrawers: () => void
  markMissedMedication: (drawerNumber: number) => void
  restockDrawer: (drawerNumber: number, quantity: number) => void
}

const INITIAL_TIMESTAMP = '2026-05-16T05:45:00.000Z'

const createDrawer = (
  drawerNumber: number,
  medicationName: string,
  dosage: string,
  schedule: string,
  notes: string,
  stock: number,
  stockStatus: MedicationDrawer['stockStatus']
): MedicationDrawer => ({
  id: `drawer-${drawerNumber}`,
  drawerNumber,
  medicationName,
  dosage,
  schedule,
  notes,
  stock,
  stockStatus,
  status: 'closed',
  consumptionState: 'pending',
  lastAction: 'Siap digunakan',
  updatedAt: INITIAL_TIMESTAMP,
})

const getStockStatus = (stock: number): MedicationDrawer['stockStatus'] => {
  if (stock <= 0) return 'empty'
  if (stock <= 3) return 'low'
  return 'available'
}

const updateDrawer = (
  drawers: MedicationDrawer[],
  drawerNumber: number,
  updater: (drawer: MedicationDrawer) => MedicationDrawer
) => drawers.map((drawer) => (drawer.drawerNumber === drawerNumber ? updater(drawer) : drawer))

const createTimelineEvent = (
  item: Omit<DispenserTimelineEvent, 'id' | 'timestamp'>
): DispenserTimelineEvent => ({
  id: `event-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
  timestamp: new Date().toISOString(),
  ...item,
})

const createNotification = (
  item: Omit<Notification, 'id' | 'timestamp' | 'read'>
): Notification => ({
  id: `notif-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
  timestamp: new Date(),
  read: false,
  ...item,
})

const pushTimeline = (
  timeline: DispenserTimelineEvent[],
  item: Omit<DispenserTimelineEvent, 'id' | 'timestamp'>
) => [createTimelineEvent(item), ...timeline].slice(0, 20)

const pushNotification = (
  notifications: Notification[],
  item: Omit<Notification, 'id' | 'timestamp' | 'read'>
) => [createNotification(item), ...notifications].slice(0, 8)

const initialDrawers: MedicationDrawer[] = [
  createDrawer(1, 'Amlodipine', '5 mg', '06:00', 'Hipertensi', 12, 'available'),
  createDrawer(2, 'Metformin', '500 mg', '06:30 / 18:00', 'Diabetes Tipe 2', 8, 'available'),
  createDrawer(3, 'Omeprazole', '20 mg', '07:00', 'Proteksi lambung', 10, 'available'),
  createDrawer(4, 'Vitamin D3', '1000 IU', '12:00', 'Dukungan tulang & imunitas', 3, 'low'),
  createDrawer(5, 'Simvastatin', '20 mg', '19:00', 'Kolesterol tinggi', 6, 'available'),
]

const timerRegistry: Record<number, ReturnType<typeof setTimeout>[]> = {}

const clearTimers = (drawerNumber: number) => {
  const timers = timerRegistry[drawerNumber] || []
  timers.forEach((timer) => clearTimeout(timer))
  timerRegistry[drawerNumber] = []
}

export const useDispenserStore = create<DispenserState>((set, get) => ({
  drawers: initialDrawers,
  notifications: [
    {
      id: 'notif-initial-1',
      type: 'info',
      title: 'Smart Drawer Siap',
      message: 'Semua laci obat telah tersinkronisasi dengan dashboard.',
      timestamp: new Date(INITIAL_TIMESTAMP),
      read: false,
    },
  ],
  timeline: [
    {
      id: 'event-initial-1',
      title: 'Sistem Aktif',
      description: 'Website Dashboard terhubung ke Blynk Cloud dan ESP32.',
      timestamp: INITIAL_TIMESTAMP,
      type: 'success',
    },
  ],
  deviceOnline: true,
  blynkOnline: true,
  servoActive: false,
  buzzerActive: false,
  voiceReminderEnabled: true,

  setDeviceOnline: (online) =>
    set((state) => ({
      deviceOnline: online,
      timeline: pushTimeline(state.timeline, {
        title: online ? 'Perangkat Online' : 'Perangkat Offline',
        description: online
          ? 'ESP32 dan servo motor terdeteksi aktif.'
          : 'Koneksi perangkat terputus sementara.',
        type: online ? 'success' : 'alert',
      }),
    })),

  toggleVoiceReminder: () =>
    set((state) => ({
      voiceReminderEnabled: !state.voiceReminderEnabled,
      notifications: pushNotification(state.notifications, {
        type: 'info',
        title: 'Voice Reminder',
        message: state.voiceReminderEnabled
          ? 'Pengingat suara dinonaktifkan.'
          : 'Pengingat suara diaktifkan.',
      }),
      timeline: pushTimeline(state.timeline, {
        title: 'Voice Reminder',
        description: state.voiceReminderEnabled
          ? 'Notifikasi suara dimatikan sementara.'
          : 'Notifikasi suara akan diaktifkan pada jadwal obat.',
        type: 'info',
      }),
    })),

  saveSchedule: (payload) =>
    set((state) => {
      const existingDrawer = state.drawers.find(
        (drawer) => drawer.drawerNumber === payload.drawerNumber
      )
      const nextStock = existingDrawer?.stock ?? 10

      const nextDrawer: MedicationDrawer = {
        id: existingDrawer?.id ?? `drawer-${payload.drawerNumber}`,
        drawerNumber: payload.drawerNumber,
        medicationName: payload.medicationName,
        dosage: payload.dosage,
        schedule: payload.schedule,
        notes: payload.notes,
        stock: nextStock,
        stockStatus: getStockStatus(nextStock),
        status: existingDrawer?.status ?? 'closed',
        consumptionState: existingDrawer?.consumptionState ?? 'pending',
        lastAction: 'Jadwal disimpan',
        updatedAt: new Date().toISOString(),
      }

      return {
        drawers: updateDrawer(state.drawers, payload.drawerNumber, () => nextDrawer),
        notifications: pushNotification(state.notifications, {
          type: 'success',
          title: 'Jadwal Tersimpan',
          message: `${payload.medicationName} dialokasikan ke laci ${payload.drawerNumber}.`,
        }),
        timeline: pushTimeline(state.timeline, {
          title: 'Jadwal Disimpan',
          description: `${payload.medicationName} dijadwalkan pada laci ${payload.drawerNumber}.`,
          type: 'success',
        }),
      }
    }),

  deleteSchedule: (drawerNumber) =>
    set((state) => ({
      drawers: updateDrawer(state.drawers, drawerNumber, (drawer) => ({
        ...drawer,
        medicationName: '',
        dosage: '',
        schedule: '',
        notes: '',
        stock: 0,
        stockStatus: 'empty',
        status: 'closed',
        consumptionState: 'pending',
        lastAction: 'Jadwal dihapus',
        updatedAt: new Date().toISOString(),
      })),
      notifications: pushNotification(state.notifications, {
        type: 'alert',
        title: 'Jadwal Dihapus',
        message: `Konfigurasi laci ${drawerNumber} telah direset.`,
      }),
      timeline: pushTimeline(state.timeline, {
        title: 'Jadwal Dihapus',
        description: `Laci ${drawerNumber} dikembalikan ke kondisi kosong.`,
        type: 'alert',
      }),
    })),

  consumeDrawer: (drawerNumber, source = 'manual') =>
    set((state) => {
      clearTimers(drawerNumber)
      const nextDrawers = updateDrawer(state.drawers, drawerNumber, (drawer) => {
        const nextStock = Math.max(drawer.stock - 1, 0)
        return {
          ...drawer,
          stock: nextStock,
          stockStatus: getStockStatus(nextStock),
          status: 'closed',
          consumptionState: 'taken',
          lastAction: source === 'automatic' ? 'Obat diambil otomatis' : 'Obat dikonfirmasi',
          updatedAt: new Date().toISOString(),
        }
      })

      const drawer = nextDrawers.find((item) => item.drawerNumber === drawerNumber)
      const isLowStock = (drawer?.stock ?? 0) > 0 && (drawer?.stock ?? 0) <= 3
      const nextNotifications = pushNotification(state.notifications, {
        type: 'success',
        title: 'Konsumsi Tercatat',
        message: drawer?.medicationName
          ? `${drawer.medicationName} dari laci ${drawerNumber} telah dikonsumsi.`
          : `Laci ${drawerNumber} berhasil diproses.`,
      })

      return {
        drawers: nextDrawers,
        servoActive: false,
        buzzerActive: false,
        notifications: isLowStock
          ? pushNotification(nextNotifications, {
              type: 'alert',
              title: 'Stok Menipis',
              message: `Sisa stok laci ${drawerNumber} hampir habis. Segera isi ulang.`,
            })
          : nextNotifications,
        timeline: pushTimeline(state.timeline, {
          title: 'Obat Terkonsumsi',
          description: drawer?.medicationName
            ? `${drawer.medicationName} pada laci ${drawerNumber} tercatat diminum.`
            : `Laci ${drawerNumber} berhasil diproses.`,
          type: 'success',
        }),
      }
    }),

  openDrawer: (drawerNumber, source = 'manual') =>
    set((state) => {
      clearTimers(drawerNumber)
      const drawer = state.drawers.find((item) => item.drawerNumber === drawerNumber)
      if (!drawer) return state

      const activeTimeline = pushTimeline(state.timeline, {
        title: source === 'automatic' ? 'Dispensing Otomatis' : 'Laci Dibuka Manual',
        description: source === 'automatic'
          ? `${drawer.medicationName || `Laci ${drawerNumber}`} diproses oleh ESP32 dan servo motor.`
          : `Dashboard mengirim perintah buka ke laci ${drawerNumber}.`,
        type: source === 'automatic' ? 'success' : 'info',
      })

      const activeNotifications = pushNotification(state.notifications, {
        type: source === 'automatic' ? 'reminder' : 'info',
        title: source === 'automatic' ? 'Waktu Minum Obat Tiba' : 'Perintah Buka Laci',
        message: source === 'automatic'
          ? `${drawer.medicationName || `Laci ${drawerNumber}`} siap diambil.`
          : `Laci ${drawerNumber} sedang dibuka dari dashboard.`,
      })

      const nextDrawers = updateDrawer(state.drawers, drawerNumber, (item) => ({
        ...item,
        status: 'active',
        lastAction: source === 'automatic' ? 'Dispensing otomatis' : 'Servo aktif dari dashboard',
        updatedAt: new Date().toISOString(),
      }))

      const openTimer = setTimeout(() => {
        set((current) => ({
          drawers: updateDrawer(current.drawers, drawerNumber, (item) => ({
            ...item,
            status: 'open',
            lastAction: source === 'automatic' ? 'Laci terbuka otomatis' : 'Laci terbuka',
            updatedAt: new Date().toISOString(),
          })),
          servoActive: true,
          buzzerActive: source === 'automatic',
          notifications:
            source === 'automatic'
              ? pushNotification(get().notifications, {
                  type: 'reminder',
                  title: 'Laci Terbuka',
                  message: `${drawer.medicationName || `Laci ${drawerNumber}`} terbuka dan siap digunakan.`,
                })
              : get().notifications,
        }))
      }, 800)

      const closeTimer = setTimeout(() => {
        if (source === 'automatic') {
          get().consumeDrawer(drawerNumber, 'automatic')
        } else {
          set((current) => ({
            drawers: updateDrawer(current.drawers, drawerNumber, (item) => ({
              ...item,
              status: 'closed',
              lastAction: 'Laci ditutup otomatis',
              updatedAt: new Date().toISOString(),
            })),
            servoActive: false,
            buzzerActive: false,
          }))
        }
      }, source === 'automatic' ? 3200 : 4200)

      timerRegistry[drawerNumber] = [openTimer, closeTimer]

      return {
        drawers: nextDrawers,
        servoActive: true,
        buzzerActive: source === 'automatic',
        notifications: activeNotifications,
        timeline: activeTimeline,
      }
    }),

  closeAllDrawers: () =>
    set((state) => {
      Object.keys(timerRegistry).forEach((key) => clearTimers(Number(key)))
      return {
        drawers: state.drawers.map((drawer) => ({
          ...drawer,
          status: 'closed',
          lastAction: 'Laci ditutup manual',
          updatedAt: new Date().toISOString(),
        })),
        servoActive: false,
        buzzerActive: false,
        notifications: pushNotification(state.notifications, {
          type: 'info',
          title: 'Semua Laci Tertutup',
          message: 'Perintah tutup semua laci berhasil dikirim ke servo motor.',
        }),
        timeline: pushTimeline(state.timeline, {
          title: 'Semua Laci Ditutup',
          description: 'Perangkat kembali ke kondisi aman melalui dashboard.',
          type: 'info',
        }),
      }
    }),

  markMissedMedication: (drawerNumber) =>
    set((state) => ({
      drawers: updateDrawer(state.drawers, drawerNumber, (drawer) => ({
        ...drawer,
        status: 'closed',
        consumptionState: 'missed',
        lastAction: 'Obat terlewat',
        updatedAt: new Date().toISOString(),
      })),
      notifications: pushNotification(state.notifications, {
        type: 'alert',
        title: 'Missed Medication Alert',
        message: `Obat pada laci ${drawerNumber} belum diminum sesuai jadwal.`,
      }),
      timeline: pushTimeline(state.timeline, {
        title: 'Obat Terlewat',
        description: `Sistem mendeteksi jadwal laci ${drawerNumber} terlewat.`,
        type: 'alert',
      }),
    })),

  restockDrawer: (drawerNumber, quantity) =>
    set((state) => ({
      drawers: updateDrawer(state.drawers, drawerNumber, (drawer) => {
        const nextStock = drawer.stock + quantity
        return {
          ...drawer,
          stock: nextStock,
          stockStatus: getStockStatus(nextStock),
          lastAction: `Stok ditambah ${quantity}`,
          updatedAt: new Date().toISOString(),
        }
      }),
      notifications: pushNotification(state.notifications, {
        type: 'success',
        title: 'Stok Diperbarui',
        message: `Laci ${drawerNumber} berhasil diisi ulang sebanyak ${quantity} item.`,
      }),
      timeline: pushTimeline(state.timeline, {
        title: 'Stok Diperbarui',
        description: `Laci ${drawerNumber} menerima stok tambahan sebanyak ${quantity}.`,
        type: 'success',
      }),
    })),
}))
