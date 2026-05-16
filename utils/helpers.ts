export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ')
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}

export const formatTimeShort = (date: Date): string => {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 21) return 'evening'
  return 'night'
}

export const getGreeting = (): string => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'Selamat Pagi'
  if (hour >= 12 && hour < 17) return 'Selamat Siang'
  if (hour >= 17 && hour < 21) return 'Selamat Sore'
  return 'Selamat Malam'
}

export const getDayName = (date: Date): string => {
  const days = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
  ]
  return days[date.getDay()]
}

export const getDateShort = (date: Date): string => {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: '2-digit',
  }).format(date)
}

export const getMonthName = (date: Date): string => {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]
  return months[date.getMonth()]
}

export const calculateAge = (birthDate: Date): number => {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }
  return age
}

export const getProgressColor = (percentage: number): string => {
  if (percentage >= 90) return 'bg-success-500'
  if (percentage >= 75) return 'bg-primary-500'
  if (percentage >= 60) return 'bg-warning-500'
  return 'bg-danger-500'
}

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'taken':
      return 'text-success-600'
    case 'late':
      return 'text-warning-600'
    case 'missed':
      return 'text-danger-600'
    default:
      return 'text-gray-600'
  }
}

export const getStatusBgColor = (status: string): string => {
  switch (status) {
    case 'taken':
      return 'bg-success-100'
    case 'late':
      return 'bg-warning-100'
    case 'missed':
      return 'bg-danger-100'
    default:
      return 'bg-gray-100'
  }
}

export const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'taken':
      return 'Sudah Diminum'
    case 'late':
      return 'Terlambat'
    case 'missed':
      return 'Belum Diminum'
    default:
      return 'Tidak Diketahui'
  }
}

export const getDeviceStatusColor = (status: string): string => {
  return status === 'online'
    ? 'bg-success-500'
    : 'bg-gray-400'
}

export const getDeviceStatusLabel = (status: string): string => {
  return status === 'online' ? 'Online' : 'Offline'
}

export const getDrawerStatusLabel = (status: string): string => {
  switch (status) {
    case 'open':
      return 'Terbuka'
    case 'active':
      return 'Sedang Digunakan'
    case 'closed':
    default:
      return 'Tertutup'
  }
}

export const getDrawerStatusColor = (status: string): string => {
  switch (status) {
    case 'open':
      return 'text-warning-600'
    case 'active':
      return 'text-success-600'
    case 'closed':
    default:
      return 'text-gray-500'
  }
}

export const getStockStatusLabel = (status: string): string => {
  switch (status) {
    case 'low':
      return 'Stok Menipis'
    case 'empty':
      return 'Habis'
    case 'available':
    default:
      return 'Tersedia'
  }
}

export const getStockStatusColor = (status: string): string => {
  switch (status) {
    case 'low':
      return 'text-warning-600'
    case 'empty':
      return 'text-danger-600'
    case 'available':
    default:
      return 'text-success-600'
  }
}

export const formatBatteryLevel = (level: number): string => {
  return `${level}%`
}

export const isTimeWithin30Minutes = (timeStr: string): boolean => {
  const [hours, minutes] = timeStr.split(':').map(Number)
  const now = new Date()
  const scheduledTime = new Date(now)
  scheduledTime.setHours(hours, minutes, 0, 0)

  const diff = scheduledTime.getTime() - now.getTime()
  return diff > 0 && diff <= 30 * 60 * 1000
}

export const isTimePassed = (timeStr: string): boolean => {
  const [hours, minutes] = timeStr.split(':').map(Number)
  const now = new Date()
  const scheduledTime = new Date(now)
  scheduledTime.setHours(hours, minutes, 0, 0)

  return now.getTime() > scheduledTime.getTime()
}

export const relativeTime = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Baru saja'
  if (diffMins < 60) return `${diffMins} menit lalu`
  if (diffHours < 24) return `${diffHours} jam lalu`
  if (diffDays < 7) return `${diffDays} hari lalu`

  return formatDate(date)
}
