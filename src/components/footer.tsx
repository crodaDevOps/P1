import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Palette, 
  Code, 
  Hammer, 
  CheckCircle, 
  Rocket, 
  Activity 
} from 'lucide-react'

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Design', href: '/design', icon: Palette },
  { name: 'Code', href: '/code', icon: Code },
  { name: 'Build', href: '/build', icon: Hammer },
  { name: 'QA', href: '/qa', icon: CheckCircle },
  { name: 'Deploy', href: '/deploy', icon: Rocket },
  { name: 'Monitor', href: '/monitor', icon: Activity },
]

export function Footer() {
  const location = useLocation()

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-1 sm:space-x-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                  aria-label={`Navigate to ${item.name}`}
                >
                  <Icon className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </footer>
  )
}