export type MedicationStatus = 'taken' | 'late' | 'missed'
export type DeviceStatus = 'online' | 'offline'
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'
export type SystemMode = 'simulation' | 'hardware'

export interface NotificationSettings {
  enableNotifications: boolean
  enableVoiceReminder: boolean
  enableSimulation: boolean
  enableAutoDrawer: boolean
  buzzerVolume: number // 0-100
  reminderDelaySeconds: number
  enableEmailNotification: boolean
  enableWhatsAppNotification: boolean
}

export interface Medication {
  id: string
  name: string
  dosage: string
  unit: string
  timeOfDay: TimeOfDay
  time: string
  frequency: string
  indication: string
  sideEffects?: string
}

export interface MedicationRecord {
  id: string
  medicationId: string
  date: Date
  status: MedicationStatus
  timestamp: Date
  notes?: string
}

export interface AdherenceData {
  date: Date
  adherencePercentage: number
  taken: number
  missed: number
  late: number
}

export interface ElderlyPerson {
  id: string
  name: string
  age: number
  gender: 'male' | 'female'
  bloodType: string
  medicalHistory: string[]
  emergencyContact: string
  emergencyPhone: string
  medications: Medication[]
}

export interface FamilyMember {
  id: string
  name: string
  relationship: string
  phone: string
  email: string
}

export interface IoTDevice {
  id: string
  name: string
  type: 'ESP32' | 'Sensor'
  status: DeviceStatus
  batteryLevel: number
  lastSync: Date
  location: string
}

export interface Notification {
  id: string
  type: 'reminder' | 'alert' | 'success' | 'info'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

export type DrawerStatus = 'closed' | 'open' | 'active'
export type DrawerStockStatus = 'available' | 'low' | 'empty'

export interface MedicationDrawer {
  id: string
  drawerNumber: number
  medicationName: string
  dosage: string
  schedule: string
  notes: string
  stock: number
  stockStatus: DrawerStockStatus
  status: DrawerStatus
  consumptionState: 'pending' | 'taken' | 'missed'
  lastAction: string
  updatedAt: string
}

export interface DispenserTimelineEvent {
  id: string
  title: string
  description: string
  timestamp: string
  type: 'info' | 'success' | 'warning' | 'alert'
}

export interface DispenserFormState {
  medicationName: string
  dosage: string
  schedule: string
  drawerNumber: number
  notes: string
}

export interface SystemStatus {
  iotConnected: boolean
  blynkConnected: boolean
  dataLastUpdated: Date
  alertCount: number
}
