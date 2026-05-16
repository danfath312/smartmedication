'use client'

import Link from 'next/link'
import { ArrowRight, Zap, Shield, BarChart3, Smartphone } from 'lucide-react'

export function HeroSection() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-6 pt-20 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
            ✨ Solusi IoT untuk Kesehatan Lansia
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Smart Medication{' '}
          <span className="text-gradient">Adherence System</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Sistem monitoring konsumsi obat lansia berbasis IoT yang membantu
          keluarga memastikan kepatuhan minum obat secara real-time dengan
          teknologi terdepan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/dashboard"
            className="btn btn-primary btn-lg"
          >
            Masuk Dashboard <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <button className="btn btn-outline btn-lg">
            Pelajari Lebih Lanjut
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-3xl font-bold text-primary-600">100%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Real-time Monitoring
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-success-600">24/7</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Sistem Terintegrasi
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-600">IoT</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Berbasis ESP32
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-success-600">Smart</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Artificial Intelligence
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProblemSection() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Masalah Kepatuhan Minum Obat</h2>
          <p className="section-subtitle">
            Mengapa monitoring kepatuhan minum obat sangat penting bagi lansia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Tingkat Ketergantungan Tinggi',
              description:
                'Rata-rata lansia mengkonsumsi 4-5 jenis obat setiap harinya dengan jadwal yang kompleks.',
              stat: '75%',
            },
            {
              title: 'Risiko Kesalahan',
              description:
                'Lupa minum obat, double dose, atau kesalahan waktu dapat memperburuk kondisi kesehatan.',
              stat: '50%',
            },
            {
              title: 'Beban Keluarga',
              description:
                'Keluarga kesulitan memantau dan memastikan kepatuhan konsumsi obat setiap hari.',
              stat: '85%',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="card group hover:shadow-soft-lg"
            >
              <p className="text-4xl font-bold text-primary-600 mb-4">
                {item.stat}
              </p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SolutionSection() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Solusi Inovatif Kami</h2>
          <p className="section-subtitle">
            Teknologi IoT untuk monitoring otomatis dan real-time
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              {[
                {
                  icon: Zap,
                  title: 'Deteksi Otomatis',
                  description:
                    'Sensor pintar secara otomatis mendeteksi ketika obat diminum dari mesin dispenser.',
                },
                {
                  icon: BarChart3,
                  title: 'Monitoring Real-time',
                  description:
                    'Pantau kepatuhan minum obat lansia dalam waktu nyata melalui dashboard web dan mobile.',
                },
                {
                  icon: Smartphone,
                  title: 'Notifikasi Cerdas',
                  description:
                    'Sistem notifikasi otomatis untuk pengingat dan alert jika obat tidak diminum tepat waktu.',
                },
                {
                  icon: Shield,
                  title: 'Keamanan Data',
                  description:
                    'Enkripsi end-to-end dan cloud integration dengan Blynk untuk keamanan data maksimal.',
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-8 min-h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Sistem Terintegrasi
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                ESP32 + Sensor → Blynk Cloud → Web Dashboard → Mobile App
              </p>
              <div className="text-sm font-mono text-primary-600">
                &lt;/&gt; Open Architecture
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Fitur Unggulan</h2>
          <p className="section-subtitle">
            Lengkapi semua kebutuhan monitoring kepatuhan minum obat lansia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { emoji: '📊', title: 'Dashboard Analytics', desc: 'Visualisasi data kepatuhan yang comprehensive' },
            { emoji: '🔔', title: 'Smart Notifications', desc: 'Notifikasi real-time untuk setiap aktivitas' },
            { emoji: '👨‍👩‍👧', title: 'Family Monitoring', desc: 'Pantau dari berbagai anggota keluarga' },
            { emoji: '📈', title: 'Statistical Reports', desc: 'Laporan detail kepatuhan dan tren' },
            { emoji: '🌙', title: 'Dark Mode', desc: 'Tersedia mode gelap untuk kenyamanan mata' },
            { emoji: '📱', title: 'Responsive Design', desc: 'Optimal di desktop, tablet, dan mobile' },
          ].map((feature, idx) => (
            <div key={idx} className="card">
              <p className="text-4xl mb-3">{feature.emoji}</p>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TechStackSection() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Teknologi yang Kami Gunakan</h2>
          <p className="section-subtitle">Stack teknologi modern dan terpercaya</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: 'ESP32', desc: 'Microcontroller IoT berbasis WiFi' },
            { name: 'Blynk Cloud', desc: 'Platform IoT cloud integration' },
            { name: 'Next.js', desc: 'React framework untuk production' },
            { name: 'Tailwind CSS', desc: 'Utility-first CSS framework' },
            { name: 'Recharts', desc: 'Library untuk data visualization' },
            { name: 'TypeScript', desc: 'Type-safe JavaScript development' },
            { name: 'Sensors', desc: 'IR sensor untuk deteksi obat' },
            { name: 'REST API', desc: 'API integration dengan backend' },
          ].map((tech, idx) => (
            <div
              key={idx}
              className="card text-center hover:shadow-soft-lg"
            >
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                {tech.name}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
