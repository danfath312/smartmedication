import type {
  ElderlyPerson,
  MedicationRecord,
  AdherenceData,
  FamilyMember,
  IoTDevice,
  Notification,
} from '@/types'

// Mock Elderly Person Data
export const mockElderlyPerson: ElderlyPerson = {
  id: '1',
  name: 'Bapak Sutrisno',
  age: 72,
  gender: 'male',
  bloodType: 'O+',
  medicalHistory: ['Hipertensi', 'Diabetes Tipe 2', 'Kolesterol Tinggi'],
  emergencyContact: 'Ibu Siti Rahayu',
  emergencyPhone: '+62-812-3456-7890',
  medications: [
    {
      id: 'm1',
      name: 'Amlodipine',
      dosage: '5',
      unit: 'mg',
      timeOfDay: 'morning',
      time: '06:00',
      frequency: 'Setiap hari',
      indication: 'Hipertensi',
      sideEffects: 'Pusing ringan, sakit kepala',
    },
    {
      id: 'm2',
      name: 'Metformin',
      dosage: '500',
      unit: 'mg',
      timeOfDay: 'morning',
      time: '06:30',
      frequency: 'Dua kali sehari',
      indication: 'Diabetes Tipe 2',
      sideEffects: 'Mual, diare',
    },
    {
      id: 'm3',
      name: 'Metformin',
      dosage: '500',
      unit: 'mg',
      timeOfDay: 'evening',
      time: '18:00',
      frequency: 'Dua kali sehari',
      indication: 'Diabetes Tipe 2',
      sideEffects: 'Mual, diare',
    },
    {
      id: 'm4',
      name: 'Simvastatin',
      dosage: '20',
      unit: 'mg',
      timeOfDay: 'evening',
      time: '19:00',
      frequency: 'Setiap hari',
      indication: 'Kolesterol Tinggi',
      sideEffects: 'Nyeri otot, gangguan tidur',
    },
    {
      id: 'm5',
      name: 'Omeprazole',
      dosage: '20',
      unit: 'mg',
      timeOfDay: 'morning',
      time: '07:00',
      frequency: 'Setiap hari',
      indication: 'Proteksi Lambung',
      sideEffects: 'Sakit kepala ringan',
    },
  ],
}

// Mock Medication Records (Today and Recent Days)
export const mockMedicationRecords: MedicationRecord[] = [
  // Today's records
  {
    id: 'r1',
    medicationId: 'm1',
    date: new Date(new Date().setHours(0, 0, 0, 0)),
    status: 'taken',
    timestamp: new Date(new Date().setHours(6, 15, 0, 0)),
    notes: 'Diminum dengan air',
  },
  {
    id: 'r2',
    medicationId: 'm2',
    date: new Date(new Date().setHours(0, 0, 0, 0)),
    status: 'taken',
    timestamp: new Date(new Date().setHours(6, 45, 0, 0)),
  },
  {
    id: 'r3',
    medicationId: 'm5',
    date: new Date(new Date().setHours(0, 0, 0, 0)),
    status: 'taken',
    timestamp: new Date(new Date().setHours(7, 10, 0, 0)),
  },
  {
    id: 'r4',
    medicationId: 'm3',
    date: new Date(new Date().setHours(0, 0, 0, 0)),
    status: 'missed',
    timestamp: new Date(new Date().setHours(20, 0, 0, 0)),
  },
  {
    id: 'r5',
    medicationId: 'm4',
    date: new Date(new Date().setHours(0, 0, 0, 0)),
    status: 'late',
    timestamp: new Date(new Date().setHours(20, 30, 0, 0)),
  },
]

// Mock Weekly Adherence Data
export const mockWeeklyAdherence: AdherenceData[] = [
  {
    date: new Date(new Date().setDate(new Date().getDate() - 6)),
    adherencePercentage: 85,
    taken: 17,
    missed: 2,
    late: 1,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    adherencePercentage: 90,
    taken: 18,
    missed: 1,
    late: 1,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 4)),
    adherencePercentage: 95,
    taken: 19,
    missed: 1,
    late: 0,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
    adherencePercentage: 80,
    taken: 16,
    missed: 2,
    late: 2,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    adherencePercentage: 100,
    taken: 20,
    missed: 0,
    late: 0,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    adherencePercentage: 88,
    taken: 17,
    missed: 2,
    late: 1,
  },
  {
    date: new Date(new Date().setHours(0, 0, 0, 0)),
    adherencePercentage: 80,
    taken: 4,
    missed: 1,
    late: 0,
  },
]

// Mock Monthly Adherence Data
const monthlyAdherenceValues = [85, 88, 82, 90, 87, 91, 84, 89, 86, 92, 85, 88, 90, 87, 84, 91, 89, 85, 92, 88, 86, 90, 87, 84, 91, 85, 89, 88, 86, 90]

export const mockMonthlyAdherence: AdherenceData[] = Array.from(
  { length: 30 },
  (_, i) => {
    const date = new Date(new Date().setDate(new Date().getDate() - 29 + i))
    const adherencePercentage = monthlyAdherenceValues[i]
    return {
      date,
      adherencePercentage,
      taken: Math.floor((adherencePercentage * 20) / 100),
      missed: Math.floor(((100 - adherencePercentage) * 20) / 100),
      late: i % 3 === 0 ? 1 : 0,
    }
  }
)

// Mock Family Members
export const mockFamilyMembers: FamilyMember[] = [
  {
    id: 'f1',
    name: 'Ibu Siti Rahayu',
    relationship: 'Istri',
    phone: '+62-812-3456-7890',
    email: 'siti.rahayu@email.com',
  },
  {
    id: 'f2',
    name: 'Andi Sutrisno',
    relationship: 'Anak Laki-laki',
    phone: '+62-813-2345-6789',
    email: 'andi.sutrisno@email.com',
  },
  {
    id: 'f3',
    name: 'Dewi Rahayu',
    relationship: 'Anak Perempuan',
    phone: '+62-814-1234-5678',
    email: 'dewi.rahayu@email.com',
  },
]

// Mock IoT Devices
export const mockIoTDevices: IoTDevice[] = [
  {
    id: 'iot1',
    name: 'Medication Dispenser ESP32',
    type: 'ESP32',
    status: 'online',
    batteryLevel: 87,
    lastSync: new Date(new Date().getTime() - 5 * 60000),
    location: 'Kamar Mandi',
  },
  {
    id: 'iot2',
    name: 'Motion Sensor',
    type: 'Sensor',
    status: 'online',
    batteryLevel: 92,
    lastSync: new Date(new Date().getTime() - 2 * 60000),
    location: 'Ruang Tamu',
  },
  {
    id: 'iot3',
    name: 'Door Contact Sensor',
    type: 'Sensor',
    status: 'online',
    batteryLevel: 78,
    lastSync: new Date(new Date().getTime() - 10 * 60000),
    location: 'Pintu Kamar',
  },
]

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'success',
    title: 'Obat Diminum',
    message: 'Amlodipine diminum pada pukul 06:15',
    timestamp: new Date(new Date().setHours(6, 15, 0, 0)),
    read: true,
  },
  {
    id: 'n2',
    type: 'alert',
    title: 'Pengingat Minum Obat',
    message: 'Metformin (Sore) akan diminum dalam 30 menit',
    timestamp: new Date(new Date().getTime() - 1 * 60000),
    read: false,
  },
  {
    id: 'n3',
    type: 'alert',
    title: 'Obat Terlambat',
    message: 'Simvastatin diminum terlambat 30 menit',
    timestamp: new Date(new Date().setHours(19, 30, 0, 0)),
    read: true,
  },
  {
    id: 'n4',
    type: 'reminder',
    title: 'Obat Tidak Diminum',
    message: 'Metformin (Pagi) tidak diminum hari ini',
    timestamp: new Date(new Date().setHours(12, 0, 0, 0)),
    read: true,
  },
  {
    id: 'n5',
    type: 'info',
    title: 'Sinkronisasi Sukses',
    message: 'Data berhasil disinkronkan dengan Blynk Cloud',
    timestamp: new Date(new Date().getTime() - 30 * 60000),
    read: true,
  },
]

// Generate today's schedule
export const getTodaySchedule = () => {
  const today = new Date(new Date().setHours(0, 0, 0, 0))
  return mockElderlyPerson.medications.map((med) => {
    const record = mockMedicationRecords.find(
      (r) =>
        r.medicationId === med.id &&
        r.date.getTime() === today.getTime()
    )
    return {
      medication: med,
      status: record?.status || 'missed',
      timestamp: record?.timestamp,
    }
  })
}

// Get current adherence percentage (Today)
export const getTodayAdherence = () => {
  const todayRecord = mockWeeklyAdherence[mockWeeklyAdherence.length - 1]
  return todayRecord.adherencePercentage
}

// Get current average adherence (Weekly)
export const getWeeklyAverageAdherence = () => {
  const total = mockWeeklyAdherence.reduce(
    (sum, data) => sum + data.adherencePercentage,
    0
  )
  return Math.round(total / mockWeeklyAdherence.length)
}

// Get month average adherence
export const getMonthlyAverageAdherence = () => {
  const total = mockMonthlyAdherence.reduce(
    (sum, data) => sum + data.adherencePercentage,
    0
  )
  return Math.round(total / mockMonthlyAdherence.length)
}
