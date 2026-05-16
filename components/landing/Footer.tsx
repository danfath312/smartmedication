'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                S
              </div>
              <h3 className="text-lg font-bold text-white">SmartMed</h3>
            </div>
            <p className="text-sm text-gray-400">
              Solusi IoT untuk monitoring kepatuhan minum obat lansia
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-white mb-4">Produk</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">Dashboard</Link></li>
              <li><Link href="/" className="hover:text-white transition">Monitor Keluarga</Link></li>
              <li><Link href="/" className="hover:text-white transition">Jadwal Obat</Link></li>
              <li><Link href="/" className="hover:text-white transition">Analitik</Link></li>
            </ul>
          </div>

          {/* Teknologi */}
          <div>
            <h4 className="font-bold text-white mb-4">Teknologi</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">ESP32 IoT</Link></li>
              <li><Link href="/" className="hover:text-white transition">Blynk Integration</Link></li>
              <li><Link href="/" className="hover:text-white transition">Cloud Platform</Link></li>
              <li><Link href="/" className="hover:text-white transition">API Documentation</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-bold text-white mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:orawedi@gmail.com" className="hover:text-white transition">
                  orawedi@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <a href="tel:+62812345678" className="hover:text-white transition">
                  +62 812 345 678
                </a>
              </li>
          <li className="flex items-center gap-2">
            <span>📍</span>
            <span>Semarang, Indonesia</span>
          </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; 2026 Smart Medication Adherence System. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            Made with <Heart className="w-4 h-4 text-danger-500" /> for elderly care
          </div>
        </div>
      </div>
    </footer>
  )
}

export function TeamSection() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="section-title">Tim Kami</h2>
          <p className="section-subtitle">
            Dedicated team untuk kesehatan lansia Indonesia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Irsyad Khoiri', emoji: '👨‍💻' },
            { name: 'Muhammad Ilham', emoji: '👨‍🔬' },
            { name: 'Zidane Fathir', emoji: '🧑‍💻' },
          ].map((member, idx) => (
            <div
              key={idx}
              className="card text-center rounded-lg shadow-sm hover:shadow-md p-6 flex flex-col items-center justify-center"
            >
              <p className="text-5xl mb-3">{member.emoji}</p>
              <h3 className="font-bold text-gray-900 dark:text-white">
                {member.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
