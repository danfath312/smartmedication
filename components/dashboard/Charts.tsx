'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { Card } from '@/components/common/UIComponents'
import { mockWeeklyAdherence, mockMonthlyAdherence } from '@/data/mockData'
import { getDateShort } from '@/utils/helpers'

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    name: string
    color: string
  }>
  label?: string
}

const CustomTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    )
  }
  return null
}

interface BarTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    name: string
    color: string
  }>
  label?: string
}

const CustomBarTooltip = ({ active, payload, label }: BarTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {label}
        </p>
        <p className="text-sm text-primary-600">
          Kepatuhan: {payload[0].value}%
        </p>
      </div>
    )
  }
  return null
}

export function WeeklyAdherenceChart() {
  const data = mockWeeklyAdherence.map((item) => ({
    date: getDateShort(item.date),
    adherence: item.adherencePercentage,
  }))

  return (
    <Card>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
        Grafik Kepatuhan Mingguan
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="adherence"
            stroke="#0ea5e9"
            dot={{ fill: '#0ea5e9', r: 5 }}
            activeDot={{ r: 7 }}
            strokeWidth={2}
            name="Kepatuhan"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function MonthlyAdherenceChart() {
  const data = mockMonthlyAdherence.map((item) => ({
    date: item.date.getDate().toString(),
    adherence: item.adherencePercentage,
  }))

  return (
    <Card>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
        Grafik Kepatuhan Bulanan
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <Tooltip content={<CustomBarTooltip />} />
          <Bar dataKey="adherence" fill="#0ea5e9" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.adherence >= 80 ? '#22c55e' : '#f59e0b'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

interface MedicationStatusChartProps {
  taken: number
  late: number
  missed: number
}

export function MedicationStatusChart({
  taken,
  late,
  missed,
}: MedicationStatusChartProps) {
  const data = [
    { name: 'Sudah Diminum', value: taken },
    { name: 'Terlambat', value: late },
    { name: 'Belum Diminum', value: missed },
  ]

  const colors = ['#22c55e', '#f59e0b', '#ef4444']

  return (
    <Card>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
        Status Konsumsi Hari Ini
      </h3>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-3 gap-4 w-full">
          {data.map((item, index) => (
            <div key={item.name} className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-3">
                <div className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </span>
                </div>
              </div>
              <div
                className="w-3 h-3 rounded-full mx-auto mb-2"
                style={{ backgroundColor: colors[index] }}
              />
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
