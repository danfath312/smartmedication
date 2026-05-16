'use client'

import { Card, Alert } from '@/components/common/UIComponents'
import { mockElderlyPerson, mockFamilyMembers, mockNotifications } from '@/data/mockData'
import { AlertCircle, Check, Users, Phone, Mail, Clock } from 'lucide-react'
import { relativeTime } from '@/utils/helpers'

export default function FamilyMonitoringPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Monitoring Keluarga
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Pantau kepatuhan minum obat dan aktivitas {mockElderlyPerson.name}
        </p>
      </div>

      {/* Alert Section */}
      {mockNotifications.some((n) => n.type === 'alert' && !n.read) && (
        <Alert
          variant="warning"
          title="Ada Aktivitas Memerlukan Perhatian"
          icon={<AlertCircle className="w-5 h-5" />}
          onClose={() => {}}
        >
          Metformin (Sore) akan diminum dalam 30 menit
        </Alert>
      )}

      {/* Patient Status */}
      <Card>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Status Pasien
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {mockElderlyPerson.name}, {mockElderlyPerson.age} tahun
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-success-600">
              Aktif
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Kepatuhan Hari Ini
            </p>
            <p className="text-2xl font-bold text-primary-600 mt-1">80%</p>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              ✓ 4 diminum | ⏱️ 1 terlambat | ✗ 1 belum diminum
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Aktivitas Terakhir
            </p>
            <p className="text-base font-semibold text-gray-900 dark:text-white mt-1">
              Amlodipine
            </p>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              20 menit lalu
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Kontak Darurat
            </p>
            <p className="text-base font-semibold text-gray-900 dark:text-white mt-1">
              {mockElderlyPerson.emergencyContact}
            </p>
            <a
              href={`tel:${mockElderlyPerson.emergencyPhone}`}
              className="text-xs text-primary-600 hover:text-primary-700 mt-1 inline-block"
            >
              {mockElderlyPerson.emergencyPhone}
            </a>
          </div>
        </div>
      </Card>

      {/* Family Members */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Users className="w-6 h-6" />
          Anggota Keluarga
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {mockFamilyMembers.map((member) => (
            <Card key={member.id}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {member.relationship}
                  </p>
                </div>
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
              </div>

              <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 transition"
                >
                  <Phone className="w-4 h-4" />
                  {member.phone}
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 transition"
                >
                  <Mail className="w-4 h-4" />
                  {member.email}
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/30 transition text-sm font-medium">
                  Hubungi
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          Aktivitas Terakhir
        </h3>

        <div className="space-y-4">
          {mockNotifications.slice(0, 5).map((notif) => (
            <div
              key={notif.id}
              className="flex items-start gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  (notif.type as string) === 'success'
                    ? 'bg-success-100 dark:bg-success-900/20'
                    : (notif.type as string) === 'alert'
                      ? 'bg-danger-100 dark:bg-danger-900/20'
                      : (notif.type as string) === 'warning'
                        ? 'bg-warning-100 dark:bg-warning-900/20'
                        : 'bg-primary-100 dark:bg-primary-900/20'
                }`}
              >
                {notif.type === 'success' ? (
                  <Check className="w-5 h-5 text-success-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-danger-600" />
                )}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {notif.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {notif.message}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500 mt-2">
                  <Clock className="w-3 h-3" />
                  {relativeTime(notif.timestamp)}
                </div>
              </div>

              {!notif.read && (
                <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Emergency Protocol */}
      <Card className="border-l-4 border-danger-500 bg-danger-50/50 dark:bg-danger-900/20">
        <h3 className="text-lg font-bold text-danger-600 dark:text-danger-400 mb-4">
          Protokol Darurat
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Hubungi kontak darurat jika terjadi situasi gawat seperti:
        </p>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-danger-600 font-bold">•</span>
            Reaksi alergi atau efek samping obat yang parah
          </li>
          <li className="flex items-start gap-2">
            <span className="text-danger-600 font-bold">•</span>
            Kesulitan bernapas atau nyeri dada
          </li>
          <li className="flex items-start gap-2">
            <span className="text-danger-600 font-bold">•</span>
            Keseimbangan terganggu atau jatuh
          </li>
          <li className="flex items-start gap-2">
            <span className="text-danger-600 font-bold">•</span>
            Perubahan kesadaran atau kebingungan
          </li>
        </ul>
      </Card>
    </div>
  )
}
