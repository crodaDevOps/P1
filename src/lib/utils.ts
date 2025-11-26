import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'completed': 'text-green-600 dark:text-green-400',
    'in-progress': 'text-blue-600 dark:text-blue-400',
    'pending': 'text-yellow-600 dark:text-yellow-400',
    'failed': 'text-red-600 dark:text-red-400',
    'warning': 'text-orange-600 dark:text-orange-400'
  }
  return colors[status] || 'text-gray-600 dark:text-gray-400'
}

export function getHealthScore(issues: number, total: number): number {
  if (total === 0) return 100
  return Math.max(0, 100 - Math.round((issues / total) * 100))
}