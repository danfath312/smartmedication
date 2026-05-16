'use client'

import React from 'react'
import { cn } from '@/utils/helpers'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-xl shadow-card p-6',
        hover && 'hover:shadow-soft-lg transition-shadow duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}

interface StatCardProps {
  label: string
  value: string | number
  subtext?: string
  icon?: React.ReactNode
  color?: 'primary' | 'success' | 'warning' | 'danger'
  trend?: { value: number; direction: 'up' | 'down' }
}

export function StatCard({
  label,
  value,
  subtext,
  icon,
  color = 'primary',
  trend,
}: StatCardProps) {
  const colorClasses = {
    primary: 'bg-primary-50 dark:bg-primary-900/20 text-primary-600',
    success: 'bg-success-50 dark:bg-success-900/20 text-success-600',
    warning: 'bg-warning-50 dark:bg-warning-900/20 text-warning-600',
    danger: 'bg-danger-50 dark:bg-danger-900/20 text-danger-600',
  }

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {label}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {value}
          </p>
          {subtext && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {subtext}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  'text-xs font-semibold',
                  trend.direction === 'up'
                    ? 'text-success-600'
                    : 'text-danger-600'
                )}
              >
                {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                dari kemarin
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              'w-12 h-12 rounded-lg flex items-center justify-center',
              colorClasses[color]
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className,
}: BadgeProps) {
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200',
    success: 'bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-200',
    warning: 'bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-200',
    danger: 'bg-danger-100 text-danger-700 dark:bg-danger-900 dark:text-danger-200',
    secondary: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  )
}

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  color?: 'primary' | 'success' | 'warning' | 'danger'
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressBar({
  value,
  max = 100,
  label,
  color = 'primary',
  showPercentage = true,
  size = 'md',
}: ProgressBarProps) {
  const percentage = (value / max) * 100
  const colorClasses = {
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
  }

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  }

  return (
    <div>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
          {showPercentage && (
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={cn(
            'transition-all duration-500 rounded-full',
            colorClasses[color],
            heightClasses[size]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

interface AlertProps {
  children: React.ReactNode
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  onClose?: () => void
  icon?: React.ReactNode
  className?: string
}

export function Alert({
  children,
  variant = 'info',
  title,
  onClose,
  icon,
  className,
}: AlertProps) {
  const variantClasses = {
    info: 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-primary-800 dark:text-primary-200',
    success:
      'bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 text-success-800 dark:text-success-200',
    warning:
      'bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 text-warning-800 dark:text-warning-200',
    error:
      'bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 text-danger-800 dark:text-danger-200',
  }

  return (
    <div
      className={cn(
        'rounded-lg p-4 flex gap-3',
        variantClasses[variant],
        className
      )}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  )
}

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export function Loading({ size = 'md', text }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={cn('animate-spin', sizeClasses[size])}>
        <div className="w-full h-full border-4 border-gray-200 dark:border-gray-700 border-t-primary-500 rounded-full" />
      </div>
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
      )}
    </div>
  )
}

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4 text-gray-400">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="btn btn-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
