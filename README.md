# Smart Medication Adherence System - IoT Dashboard

Sistem monitoring konsumsi obat lansia berbasis Internet of Things (IoT) dengan ESP32, sensor pendeteksi obat, dan platform Blynk sebagai realtime monitoring system.

## 🎯 Tentang Project

Smart Medication Adherence System adalah solusi inovatif untuk membantu keluarga memantau kepatuhan minum obat pada lansia secara real-time. Sistem ini mengintegrasikan:

- **Hardware**: ESP32 microcontroller dengan IR sensor
- **Cloud Platform**: Blynk untuk data synchronization
- **Web Dashboard**: Next.js dengan Tailwind CSS untuk monitoring interface
- **Real-time Analytics**: Visualisasi data kepatuhan minum obat

## ✨ Fitur Utama

### Dashboard Monitoring
- Status konsumsi obat harian (sudah diminum, terlambat, belum diminum)
- Grafik kepatuhan mingguan dan bulanan
- Timeline konsumsi obat real-time
- Statistik kepatuhan detail

### Jadwal Obat
- Daftar lengkap jadwal minum obat
- Informasi dosis, waktu, dan indikasi medis
- Efek samping potensial
- Filter berdasarkan waktu (pagi, siang, sore, malam)

### Monitoring Keluarga
- Pantau aktivitas pasien secara real-time
- Daftar anggota keluarga dan kontak darurat
- Riwayat notifikasi dan alert
- Protokol darurat

### Tentang Sistem
- Penjelasan arsitektur IoT
- Spesifikasi teknis hardware
- Alur data sistem
- Roadmap pengembangan masa depan

### Dark Mode
- Interface yang nyaman untuk mata
- Toggle theme tersedia di navbar

## 🛠️ Teknologi yang Digunakan

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS
- **Recharts** - Data visualization
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon library
- **Zustand** - State management

### Backend & Cloud
- **Blynk Cloud API** - IoT cloud platform
- **REST API** - Data integration
- **ESP32 Integration** - IoT microcontroller

## 📦 Project Structure

```
smartmedication/
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx (main dashboard)
│   │   ├── schedule/
│   │   │   └── page.tsx (medication schedule)
│   │   ├── family/
│   │   │   └── page.tsx (family monitoring)
│   │   └── about/
│   │       └── page.tsx (system information)
│   ├── layout.tsx (root layout)
│   └── page.tsx (landing page)
├── components/
│   ├── common/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── UIComponents.tsx
│   ├── dashboard/
│   │   ├── DashboardCards.tsx
│   │   └── Charts.tsx
│   └── landing/
│       ├── LandingComponents.tsx
│       └── Footer.tsx
├── data/
│   └── mockData.ts (mock data untuk development)
├── utils/
│   └── helpers.ts (utility functions)
├── types/
│   └── index.ts (TypeScript types)
├── styles/
│   └── globals.css (global styling)
├── public/
│   └── (static assets)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js 18+ dan npm/yarn/pnpm
- Git

### Instalasi

1. **Clone repository**
```bash
cd smartmedication
```

2. **Install dependencies**
```bash
npm install
# atau
yarn install
# atau
pnpm install
```

3. **Jalankan development server**
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

4. **Buka browser**
```
http://localhost:3000
```

### Build untuk Production

```bash
npm run build
npm run start
```

## 📊 Halaman yang Tersedia

### Landing Page (`/`)
- Hero section dengan CTA buttons
- Problem statement tentang kepatuhan minum obat lansia
- Solusi inovatif yang ditawarkan
- Fitur-fitur unggulan
- Tech stack yang digunakan
- Tim development
- Footer dengan informasi kontak

### Dashboard (`/dashboard`)
- Overview status pasien
- Statistik kepatuhan (hari ini, mingguan, bulanan)
- Grafik adherence
- Status jadwal obat hari ini
- Timeline konsumsi obat
- Status perangkat IoT
- Informasi pasien

### Jadwal Obat (`/dashboard/schedule`)
- Daftar lengkap obat yang sedang dikonsumsi
- Grouped by waktu minum (pagi, siang, sore, malam)
- Detail: dosis, waktu, indikasi, efek samping
- Status konsumsi per obat
- Statistik penggunaan

### Monitoring Keluarga (`/dashboard/family`)
- Status real-time pasien
- Daftar anggota keluarga dengan kontak
- Aktivitas terakhir pasien
- Riwayat notifikasi
- Protokol darurat

### Tentang Sistem (`/dashboard/about`)
- Arsitektur sistem IoT
- Alur data dari hardware ke web
- Komponen dan sensor yang digunakan
- Spesifikasi teknis
- Roadmap pengembangan masa depan

## 🎨 Design System

### Color Palette
- **Primary**: Sky Blue (#0ea5e9)
- **Success**: Green (#22c55e)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)

### Components
- Cards dengan soft shadow
- Badges untuk status
- Progress bars untuk adherence
- Charts untuk visualisasi
- Responsive layout
- Dark mode support

## 📱 Responsive Design

- **Mobile**: Full-width dengan single column
- **Tablet**: Multi-column with sidebar on desktop
- **Desktop**: Optimized layout dengan sidebar tetap visible

## 🔄 Mock Data

Project ini menggunakan mock data di `data/mockData.ts` untuk development:

- Informasi pasien (elderly person)
- Jadwal obat harian
- Riwayat konsumsi obat
- Data kepatuhan mingguan dan bulanan
- Daftar anggota keluarga
- Status perangkat IoT
- Notifikasi dan alerts

## 🔌 Integrasi Blynk API

Untuk menghubungkan dengan real Blynk data:

1. **Dapatkan Blynk Auth Token** dari aplikasi Blynk
2. **Update data fetching** di `/utils/api.ts` (perlu dibuat)
3. **Replace mock data** dengan real API calls

### Example Blynk Integration
```typescript
// utils/api.ts
export async function fetchBlynkData(token: string) {
  const response = await fetch(
    `https://blynk.cloud/external/api/get?token=${token}&V0`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  return response.json();
}
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t smartmed .
docker run -p 3000:3000 smartmed
```

### Self-hosted
```bash
npm run build
npm run start
```

## 📝 Environment Variables

Create `.env.local` untuk production:

```env
NEXT_PUBLIC_BLYNK_API_URL=https://blynk.cloud/external/api
NEXT_PUBLIC_BLYNK_AUTH_TOKEN=your_token_here
```

## 🤝 Kontribusi

Silakan berkontribusi dengan membuat Pull Request atau membuka Issue untuk suggestions dan bug reports.

## 📜 Lisensi

MIT License - Bebas untuk digunakan dalam project personal maupun komersial

## 📧 Kontak

- Email: info@smartmed.id
- Phone: +62 812 345 678
- Location: Jakarta, Indonesia

## 🎓 LKTI Project

Project ini dirancang khusus untuk:
- **Lomba Karya Tulis Ilmiah (LKTI)**
- **Kategori**: Kesehatan & Teknologi
- **Target**: Meningkatkan kualitas hidup lansia melalui teknologi IoT

---

**Created with ❤️ for elderly care in Indonesia**
