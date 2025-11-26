import React from 'react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  className?: string
  description?: string
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  className,
  description
}: MetricCardProps) {
  const changeColor = change && change > 0 ? 'text-green-600 dark:text-green-400' : 
                     change && change < 0 ? 'text-red-600 dark:text-red-400' : 
                     'text-gray-600 dark:text-gray-400'

  return (
    <div className={cn('p-4 bg-card rounded-lg border', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <span className={cn('text-sm font-medium', changeColor)}>
                {change > 0 ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className="text-xs text-muted-foreground ml-2">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4 text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}