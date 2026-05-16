import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Smart Medication Adherence System - IoT Monitoring',
  description:
    'Sistem monitoring konsumsi obat lansia berbasis IoT dengan ESP32, sensor pendeteksi obat, dan platform Blynk untuk membantu keluarga memantau kepatuhan minum obat secara real-time.',
  keywords: [
    'medication adherence',
    'IoT',
    'elderly care',
    'health monitoring',
    'Blynk',
    'ESP32',
  ],
  authors: [{ name: 'Smart Medication Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          {children}
        </div>
      </body>
    </html>
  )
}
