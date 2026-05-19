import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Smart Automated Medication Drawer - IoT Monitoring',
  description:
    'Smart Automated Medication Drawer berbasis IoT dengan smart drawer management, monitoring realtime, dan kontrol obat dari website dashboard.',
  keywords: [
    'medication adherence',
    'smart drawer',
    'IoT',
    'elderly care',
    'health monitoring',
    'Blynk',
    'ESP32',
  ],
  authors: [{ name: 'Smart Medication Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Smart Automated Medication Drawer',
    description:
      'Prototype healthcare IoT startup dashboard for automated medication drawers and realtime monitoring.',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
