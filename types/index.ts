export type MedicationStatus = 'taken' | 'late' | 'missed'
export type DeviceStatus = 'online' | 'offline'
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

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

export interface SystemStatus {
  iotConnected: boolean
  blynkConnected: boolean
  dataLastUpdated: Date
  alertCount: number
}
