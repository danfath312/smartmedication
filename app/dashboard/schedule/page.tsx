'use client'

import { Card, Badge, ProgressBar } from '@/components/common/UIComponents'
import { mockElderlyPerson, mockMedicationRecords } from '@/data/mockData'
import { getStatusLabel } from '@/utils/helpers'
import { Pill, Clock, AlertCircle } from 'lucide-react'

export default function SchedulePage() {
  const medications = mockElderlyPerson.medications
  const today = new Date(new Date().setHours(0, 0, 0, 0))

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Jadwal Obat
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Daftar lengkap jadwal minum obat {mockElderlyPerson.name}
        </p>
      </div>

      {/* Filter/Sort Options */}
      <div className="flex flex-wrap gap-2">
        <button className="badge badge-primary">Semua Jadwal</button>
        <button className="badge badge-secondary">Pagi</button>
        <button className="badge badge-secondary">Siang</button>
        <button className="badge badge-secondary">Sore</button>
        <button className="badge badge-secondary">Malam</button>
      </div>

      {/* Medication Cards by Time of Day */}
      {['morning', 'afternoon', 'evening', 'night'].map((timeOfDay) => {
        const medsForTime = medications.filter(
          (m) => m.timeOfDay === timeOfDay
        )

        if (medsForTime.length === 0) return null

        const timeLabelMap: Record<string, string> = {
          morning: 'Pagi (05:00 - 12:00)',
          afternoon: 'Siang (12:00 - 17:00)',
          evening: 'Sore (17:00 - 21:00)',
          night: 'Malam (21:00 - 05:00)',
        }

        const timeLabel = timeLabelMap[timeOfDay]

        return (
          <div key={timeOfDay}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {timeLabel}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {medsForTime.map((med) => {
                const record = mockMedicationRecords.find(
                  (r) =>
                    r.medicationId === med.id &&
                    r.date.getTime() === today.getTime()
                )

                return (
                  <Card key={med.id}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                          <Pill className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {med.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {med.dosage} {med.unit}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          record?.status === 'taken'
                            ? 'success'
                            : record?.status === 'late'
                              ? 'warning'
                              : 'danger'
                        }
                        size="sm"
                      >
                        {getStatusLabel(record?.status || 'missed')}
                      </Badge>
                    </div>

                    <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Jam: {med.time}
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <p className="font-medium">Indikasi:</p>
                          <p>{med.indication}</p>
                        </div>
                      </div>

                      {med.sideEffects && (
                        <div className="flex items-start gap-2 bg-warning-50 dark:bg-warning-900/20 p-2 rounded">
                          <AlertCircle className="w-4 h-4 text-warning-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-warning-700 dark:text-warning-200">
                            <p className="font-medium">Efek Samping:</p>
                            <p>{med.sideEffects}</p>
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                          Frekuensi
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {med.frequency}
                        </p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Statistics */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          Statistik Penggunaan
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Total Obat Aktif
            </p>
            <p className="text-3xl font-bold text-primary-600">
              {medications.length}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              Jenis obat yang sedang dikonsumsi
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Jadwal Per Hari
            </p>
            <p className="text-3xl font-bold text-success-600">
              {mockMedicationRecords.filter(
                (r) => r.date.getTime() === today.getTime()
              ).length}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              Total jadwal harian
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Kepatuhan Terukur
            </p>
            <div className="space-y-2">
              <ProgressBar value={80} color="success" showPercentage={false} />
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Rata-rata minggu ini: 80%
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
