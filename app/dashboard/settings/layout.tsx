import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pengaturan Sistem | Smart Drawer',
  description: 'Konfigurasi notifikasi, simulasi, dan preferensi sistem Smart Drawer',
}

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return children
}
