'use client'

import { Card, Alert } from '@/components/common/UIComponents'
import { AlertCircle, Cloud, Cpu, Wifi } from 'lucide-react'

export default function AboutSystemPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Tentang Sistem
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Penjelasan teknologi dan cara kerja Smart Medication Adherence System
        </p>
      </div>

      {/* Overview */}
      <Alert
        variant="info"
        title="Gambaran Umum Sistem"
        icon={<AlertCircle className="w-5 h-5" />}
      >
        Smart Medication Adherence System adalah solusi IoT terintegrasi yang menggabungkan
        hardware (ESP32 + Sensor), platform cloud (Blynk), dan aplikasi web untuk monitoring
        real-time kepatuhan minum obat lansia.
      </Alert>

      {/* System Architecture */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          Arsitektur Sistem
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Cpu className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">
                Layer 1: Hardware (Edge)
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                ESP32 Microcontroller dengan IR Sensor untuk deteksi pengambilan obat
              </p>
              <ul className="text-xs text-gray-600 dark:text-gray-400 mt-2 space-y-1 ml-4">
                <li>• ESP32-WROOM dengan WiFi connectivity</li>
                <li>• IR Sensor untuk deteksi obat</li>
                <li>• Real-time Time Clock untuk timestamp akurat</li>
                <li>• Battery backup untuk kontinuitas data</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-success-100 dark:bg-success-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Wifi className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">
                Layer 2: Cloud Platform (Blynk)
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Platform IoT cloud untuk sinkronisasi data real-time
              </p>
              <ul className="text-xs text-gray-600 dark:text-gray-400 mt-2 space-y-1 ml-4">
                <li>• Blynk Cloud API untuk data transmission</li>
                <li>• Virtual pins untuk monitoring status</li>
                <li>• Historical data storage</li>
                <li>• Multi-user access dengan role management</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Cloud className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">
                Layer 3: Web Application (Frontend)
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Dashboard interaktif untuk monitoring dan analisis
              </p>
              <ul className="text-xs text-gray-600 dark:text-gray-400 mt-2 space-y-1 ml-4">
                <li>• Next.js 14 dengan React components</li>
                <li>• Real-time data visualization dengan Recharts</li>
                <li>• Responsive design untuk semua devices</li>
                <li>• Dark mode support untuk user experience optimal</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Data Flow */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          Alur Data Sistem
        </h3>

        <div className="relative">
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Deteksi Pengambilan Obat',
                desc: 'IR Sensor pada mesin dispenser mendeteksi obat yang diambil',
              },
              {
                step: 2,
                title: 'Capture Timestamp',
                desc: 'ESP32 mencatat waktu pengambilan dengan presisi tinggi',
              },
              {
                step: 3,
                title: 'Transmisi ke Blynk',
                desc: 'Data dikirim ke Blynk Cloud melalui WiFi connection',
              },
              {
                step: 4,
                title: 'Sinkronisasi Web Dashboard',
                desc: 'Dashboard mengambil data dari Blynk API secara real-time',
              },
              {
                step: 5,
                title: 'Visualisasi & Notifikasi',
                desc: 'Data ditampilkan dalam dashboard dan notifikasi dikirim ke keluarga',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  {item.step < 5 && (
                    <div className="w-0.5 h-12 bg-primary-200 dark:bg-primary-800 mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Sensors & Components */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          Komponen & Sensor yang Digunakan
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: 'ESP32 Microcontroller',
              specs: [
                'Dual-core processor 240 MHz',
                'WiFi & Bluetooth connectivity',
                '520 KB internal SRAM',
                'GPIO pins untuk sensor connection',
              ],
            },
            {
              name: 'IR (Infrared) Sensor',
              specs: [
                'Deteksi obat yang diambil',
                'Range: 2-30 cm',
                'Digital output untuk precision',
                'Low power consumption',
              ],
            },
            {
              name: 'RTC (Real-time Clock)',
              specs: [
                'Precision timestamp',
                'Battery-backed untuk data integrity',
                'Akurasi ±1 menit per bulan',
                'I2C interface dengan ESP32',
              ],
            },
            {
              name: 'Power Management',
              specs: [
                'Li-ion battery 2000mAh',
                'Solar charging capability',
                'Voltage regulator 3.3V',
                'Over-current protection',
              ],
            },
          ].map((component, idx) => (
            <div key={idx} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                {component.name}
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {component.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary-600 font-bold">•</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Technical Specifications */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          Spesifikasi Teknis
        </h3>

        <div className="space-y-4">
          {[
            { label: 'Operating Voltage', value: '3.3V - 5V' },
            { label: 'Power Consumption', value: '30mA (active), 5mA (idle), 0.5mA (sleep)' },
            { label: 'WiFi Standard', value: '802.11 b/g/n' },
            { label: 'Data Transmission', value: 'MQTT over WiFi' },
            { label: 'Accuracy', value: '±2% untuk sensor reading' },
            { label: 'Response Time', value: '< 1 detik dari event hingga cloud' },
            { label: 'Cloud Latency', value: '< 5 detik dari cloud ke web dashboard' },
            { label: 'Data Storage', value: 'Local: 10 hari, Cloud: 1 tahun unlimited' },
          ].map((spec, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <p className="font-medium text-gray-700 dark:text-gray-300">
                {spec.label}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{spec.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Future Enhancements */}
      <Card className="border-l-4 border-success-500 bg-success-50/50 dark:bg-success-900/20">
        <h3 className="text-lg font-bold text-success-600 dark:text-success-400 mb-4">
          Pengembangan Masa Depan
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-success-600 font-bold">✓</span>
            Machine learning untuk predictive adherence analysis
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success-600 font-bold">✓</span>
            Mobile app untuk iOS dan Android
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success-600 font-bold">✓</span>
            Voice reminder integration dengan smart speakers
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success-600 font-bold">✓</span>
            Telemedicine integration untuk konsultasi dokter
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success-600 font-bold">✓</span>
            AI-powered health insights dan recommendations
          </li>
        </ul>
      </Card>
    </div>
  )
}
