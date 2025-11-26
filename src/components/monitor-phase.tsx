import React from 'react'
import { MonitorMetrics } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metric-card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Activity, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Download,
  Zap,
  Shield,
  Clock,
  Eye
} from 'lucide-react'
import { formatDate, calculatePercentage, getStatusColor } from '@/lib/utils'

interface MonitorPhaseProps {
  data: MonitorMetrics
}

export function MonitorPhase({ data }: MonitorPhaseProps) {
  const systemHealthStatus = data.systemHealth > 95 ? 'excellent' : data.systemHealth > 85 ? 'good' : data.systemHealth > 70 ? 'warning' : 'critical'
  const errorRateStatus = data.errorRate < 1 ? 'excellent' : data.errorRate < 3 ? 'good' : data.errorRate < 5 ? 'warning' : 'critical'
  const cpuStatus = data.cpuUsage < 70 ? 'healthy' : data.cpuUsage < 85 ? 'warning' : 'critical'
  const memoryStatus = data.memoryUsage < 70 ? 'healthy' : data.memoryUsage < 85 ? 'warning' : 'critical'

  const activeAlerts = [
    { id: 1, type: 'error', message: 'Database connection pool exhausted', severity: 'high', timestamp: '2024-01-16 14:30', service: 'user-service' },
    { id: 2, type: 'warning', message: 'High memory usage detected', severity: 'medium', timestamp: '2024-01-16 14:15', service: 'api-gateway' },
    { id: 3, type: 'info', message: 'New deployment completed successfully', severity: 'low', timestamp: '2024-01-16 14:00', service: 'deployment-service' },
    { id: 4, type: 'error', message: 'Payment processing timeout', severity: 'high', timestamp: '2024-01-16 13:45', service: 'payment-service' },
    { id: 5, type: 'warning', message: 'SSL certificate expiring soon', severity: 'medium', timestamp: '2024-01-16 13:30', service: 'web-server' },
  ]

  const services = [
    { name: 'API Gateway', status: 'healthy', uptime: 99.9, responseTime: 45, requests: 1250, errors: 2 },
    { name: 'User Service', status: 'warning', uptime: 98.5, responseTime: 120, requests: 890, errors: 15 },
    { name: 'Payment Service', status: 'critical', uptime: 95.2, responseTime: 250, requests: 450, errors: 28 },
    { name: 'Notification Service', status: 'healthy', uptime: 99.7, responseTime: 35, requests: 670, errors: 1 },
    { name: 'Analytics Service', status: 'healthy', uptime: 99.8, responseTime: 55, requests: 340, errors: 0 },
    { name: 'Database Service', status: 'warning', uptime: 97.8, responseTime: 180, requests: 2100, errors: 12 },
  ]

  const performanceMetrics = [
    { name: 'Response Time (p50)', value: '45ms', trend: 'down', change: '-12%' },
    { name: 'Response Time (p95)', value: '180ms', trend: 'up', change: '+8%' },
    { name: 'Throughput', value: '2,450 req/min', trend: 'up', change: '+15%' },
    { name: 'Error Rate', value: '1.2%', trend: 'down', change: '-0.5%' },
    { name: 'Availability', value: '99.8%', trend: 'stable', change: '0%' },
    { name: 'CPU Usage', value: '68%', trend: 'up', change: '+5%' },
  ]

  const systemResources = [
    { name: 'CPU Usage', value: data.cpuUsage, max: 100, unit: '%', status: cpuStatus },
    { name: 'Memory Usage', value: data.memoryUsage, max: 100, unit: '%', status: memoryStatus },
    { name: 'Disk Usage', value: 45, max: 100, unit: '%', status: 'healthy' },
    { name: 'Network I/O', value: 78, max: 100, unit: '%', status: 'healthy' },
    { name: 'Database Connections', value: 65, max: 100, unit: '%', status: 'warning' },
    { name: 'Cache Hit Rate', value: 94, max: 100, unit: '%', status: 'excellent' },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
      case 'low':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  const getServiceStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 dark:text-green-400'
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'critical':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getSystemResourceStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 dark:text-green-400'
      case 'healthy':
        return 'text-blue-600 dark:text-blue-400'
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'critical':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
      case 'stable':
        return <Activity className="h-4 w-4 text-gray-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Monitoring Phase</h1>
          <p className="text-muted-foreground mt-2">
            Real-time system monitoring, performance tracking, and alert management
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Badge variant="outline" className="text-sm">
            Last updated: {formatDate(data.lastUpdated)}
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="System Health"
          value={`${data.systemHealth}%`}
          change={data.systemHealth > 90 ? 2 : -3}
          changeLabel="from last hour"
          icon={<Activity className="h-5 w-5" />}
          description="Overall system health score"
        />
        <MetricCard
          title="Active Users"
          value={data.activeUsers.toLocaleString()}
          change={12}
          changeLabel="users online"
          icon={<Users className="h-5 w-5" />}
          description="Currently active users"
        />
        <MetricCard
          title="Request Rate"
          value={`${data.requestsPerMinute}/min`}
          change={8}
          changeLabel="requests per minute"
          icon={<TrendingUp className="h-5 w-5" />}
          description="Current request volume"
        />
        <MetricCard
          title="Error Rate"
          value={`${data.errorRate}%`}
          change={data.errorRate < 1 ? -0.5 : 1.2}
          changeLabel="error rate"
          icon={<AlertTriangle className="h-5 w-5" />}
          description="System error percentage"
        />
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Overall system performance and health indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">System Health Score</span>
                <span className={getSystemResourceStatusColor(systemHealthStatus)}>{data.systemHealth}%</span>
              </div>
              <Progress value={data.systemHealth} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Error Rate</span>
                <span className={getSystemResourceStatusColor(errorRateStatus)}>{data.errorRate}%</span>
              </div>
              <Progress value={data.errorRate * 10} className="h-3" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{data.activeUsers}</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{data.requestsPerMinute}</div>
                <div className="text-sm text-muted-foreground">Req/min</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization</CardTitle>
            <CardDescription>System resource usage and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{data.cpuUsage}%</div>
                <div className="text-sm text-muted-foreground">CPU Usage</div>
              </div>
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{data.memoryUsage}%</div>
                <div className="text-sm text-muted-foreground">Memory Usage</div>
              </div>
              <div className="text-center p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <div className="text-2xl font-bold text-cyan-600">{data.alerts}</div>
                <div className="text-sm text-muted-foreground">Active Alerts</div>
              </div>
              <div className="text-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoring</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Alerts</CardTitle>
              <CardDescription>System alerts and notifications</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {alert.service} • {alert.timestamp}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services Status */}
      <Card>
        <CardHeader>
          <CardTitle>Services Status</CardTitle>
          <CardDescription>Individual service health and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{service.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Uptime: {service.uptime}% • {service.responseTime}ms • {service.requests} req • {service.errors} errors
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={getServiceStatusColor(service.status)}>
                  {service.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{metric.name}</span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-xs font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="text-lg font-bold">{metric.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Resources */}
      <Card>
        <CardHeader>
          <CardTitle>System Resources</CardTitle>
          <CardDescription>Detailed system resource utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systemResources.map((resource, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{resource.name}</span>
                  <span className={getSystemResourceStatusColor(resource.status)}>
                    {resource.value}{resource.unit}
                  </span>
                </div>
                <Progress value={(resource.value / resource.max) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Monitoring Resources</CardTitle>
          <CardDescription>Quick access to monitoring tools and dashboards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Activity className="h-6 w-6 mb-2" />
              <span className="text-sm">Live Dashboard</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Cpu className="h-6 w-6 mb-2" />
              <span className="text-sm">System Metrics</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="h-6 w-6 mb-2" />
              <span className="text-sm">Security Monitor</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <HardDrive className="h-6 w-6 mb-2" />
              <span className="text-sm">Resource Usage</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}