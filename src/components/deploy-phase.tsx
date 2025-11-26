import React from 'react'
import { DeployMetrics } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metric-card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Rocket, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  TrendingUp,
  Activity,
  Server,
  Cloud,
  Clock,
  Download,
  Zap,
  Shield,
  GitBranch
} from 'lucide-react'
import { formatDate, calculatePercentage, getStatusColor } from '@/lib/utils'

interface DeployPhaseProps {
  data: DeployMetrics
}

export function DeployPhase({ data }: DeployPhaseProps) {
  const deploymentSuccessRate = calculatePercentage(data.deploymentsSuccessful, data.deploymentsTotal)
  const deploymentFailureRate = calculatePercentage(data.deploymentsFailed, data.deploymentsTotal)
  const errorRateStatus = data.errorRate < 1 ? 'excellent' : data.errorRate < 3 ? 'good' : 'needs-improvement'

  const recentDeployments = [
    { id: 1, version: 'v2.1.3', environment: 'production', status: 'success', duration: '4m 23s', triggeredBy: 'John Doe', timestamp: '2024-01-16 14:30' },
    { id: 2, version: 'v2.1.2', environment: 'staging', status: 'success', duration: '3m 45s', triggeredBy: 'Jane Smith', timestamp: '2024-01-16 12:15' },
    { id: 3, version: 'v2.1.1', environment: 'production', status: 'failed', duration: '2m 18s', triggeredBy: 'Bob Johnson', timestamp: '2024-01-16 10:45' },
    { id: 4, version: 'v2.1.0', environment: 'production', status: 'success', duration: '5m 12s', triggeredBy: 'Alice Brown', timestamp: '2024-01-15 16:30' },
    { id: 5, version: 'v2.0.9', environment: 'development', status: 'success', duration: '2m 55s', triggeredBy: 'Charlie Wilson', timestamp: '2024-01-15 14:00' },
  ]

  const environments = [
    { name: 'Production', status: 'healthy', uptime: 99.9, lastDeploy: '2024-01-16 14:30', version: 'v2.1.3', url: 'app.example.com' },
    { name: 'Staging', status: 'healthy', uptime: 98.5, lastDeploy: '2024-01-16 12:15', version: 'v2.1.2', url: 'staging.example.com' },
    { name: 'Development', status: 'warning', uptime: 95.2, lastDeploy: '2024-01-15 14:00', version: 'v2.0.9', url: 'dev.example.com' },
  ]

  const deploymentPipeline = [
    { stage: 'Build', status: 'completed', duration: '2m 15s', artifacts: 12 },
    { stage: 'Test', status: 'completed', duration: '5m 30s', tests: 342 },
    { stage: 'Security Scan', status: 'completed', duration: '1m 45s', vulnerabilities: 0 },
    { stage: 'Deploy to Staging', status: 'completed', duration: '3m 20s', rollback: false },
    { stage: 'Smoke Tests', status: 'in-progress', duration: '1m 10s', tests: 15 },
    { stage: 'Deploy to Production', status: 'pending', duration: '0m 0s', rollback: false },
  ]

  const infrastructureMetrics = [
    { name: 'CPU Usage', value: '45%', status: 'healthy', threshold: '80%' },
    { name: 'Memory Usage', value: '62%', status: 'healthy', threshold: '85%' },
    { name: 'Disk Usage', value: '38%', status: 'healthy', threshold: '90%' },
    { name: 'Network I/O', value: '125 MB/s', status: 'warning', threshold: '200 MB/s' },
    { name: 'Database Connections', value: '78/100', status: 'healthy', threshold: '90' },
    { name: 'Cache Hit Rate', value: '94%', status: 'excellent', threshold: '80%' },
  ]

  const getDeploymentStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'in-progress':
        return <Activity className="h-4 w-4 text-blue-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  const getEnvironmentStatusColor = (status: string) => {
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

  const getInfrastructureStatusColor = (status: string) => {
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

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Deployment Phase</h1>
          <p className="text-muted-foreground mt-2">
            Release management, deployment automation, and infrastructure monitoring
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Deploy Logs
          </Button>
          <Badge variant="outline" className="text-sm">
            Last updated: {formatDate(data.lastUpdated)}
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Deployment Success Rate"
          value={`${deploymentSuccessRate}%`}
          change={deploymentSuccessRate > 90 ? 4 : -6}
          changeLabel="from last week"
          icon={<Rocket className="h-5 w-5" />}
          description="Successful deployment percentage"
        />
        <MetricCard
          title="System Uptime"
          value={`${data.uptime}%`}
          change={data.uptime > 99 ? 1 : -2}
          changeLabel="uptime availability"
          icon={<Server className="h-5 w-5" />}
          description="System availability"
        />
        <MetricCard
          title="Response Time"
          value={`${data.responseTime}ms`}
          change={data.responseTime < 200 ? -15 : 8}
          changeLabel="response time"
          icon={<Zap className="h-5 w-5" />}
          description="Average response time"
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

      {/* Deployment Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Deployment Performance</CardTitle>
            <CardDescription>Deployment success and failure metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Success Rate</span>
                <span className="text-green-600">{deploymentSuccessRate}%</span>
              </div>
              <Progress value={deploymentSuccessRate} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Failure Rate</span>
                <span className="text-red-600">{deploymentFailureRate}%</span>
              </div>
              <Progress value={deploymentFailureRate} className="h-3" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{data.deploymentsSuccessful}</div>
                <div className="text-sm text-muted-foreground">Successful</div>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{data.deploymentsFailed}</div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Overall system performance and reliability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{data.uptime}%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{data.responseTime}ms</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{data.errorRate}%</div>
                <div className="text-sm text-muted-foreground">Error Rate</div>
              </div>
              <div className="text-center p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <div className="text-2xl font-bold text-cyan-600">{errorRateStatus}</div>
                <div className="text-sm text-muted-foreground">Status</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Deployments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Deployments</CardTitle>
              <CardDescription>Latest deployment activities and their status</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Rocket className="h-4 w-4 mr-2" />
              New Deployment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
            {recentDeployments.map((deployment) => (
              <div key={deployment.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  {getDeploymentStatusIcon(deployment.status)}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{deployment.version} • {deployment.environment}</p>
                    <p className="text-xs text-muted-foreground">
                      {deployment.triggeredBy} • {deployment.timestamp} • {deployment.duration}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(deployment.status)}>
                  {deployment.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environments & Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Environments</CardTitle>
            <CardDescription>Deployment environments and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
              {environments.map((env, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Cloud className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{env.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {env.version} • {env.url} • Uptime: {env.uptime}%
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getEnvironmentStatusColor(env.status)}>
                    {env.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deployment Pipeline</CardTitle>
            <CardDescription>Current deployment pipeline status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
              {deploymentPipeline.map((stage, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getDeploymentStatusIcon(stage.status)}
                    <div>
                      <p className="font-medium text-sm">{stage.stage}</p>
                      <p className="text-xs text-muted-foreground">
                        Duration: {stage.duration}
                        {stage.tests && ` • ${stage.tests} tests`}
                        {stage.artifacts && ` • ${stage.artifacts} artifacts`}
                        {stage.vulnerabilities !== undefined && ` • ${stage.vulnerabilities} vulns`}
                        {stage.rollback !== undefined && ` • Rollback: ${stage.rollback ? 'Yes' : 'No'}`}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(stage.status)}>
                    {stage.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Infrastructure Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Infrastructure Metrics</CardTitle>
          <CardDescription>System resource utilization and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {infrastructureMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{metric.name}</span>
                  <span className={`text-sm font-medium ${getInfrastructureStatusColor(metric.status)}`}>
                    {metric.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{metric.value}</span>
                  <span className="text-xs text-muted-foreground">Threshold: {metric.threshold}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deployment Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Deployment Resources</CardTitle>
          <CardDescription>Quick access to deployment tools and documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <GitBranch className="h-6 w-6 mb-2" />
              <span className="text-sm">Git Pipeline</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Cloud className="h-6 w-6 mb-2" />
              <span className="text-sm">Cloud Config</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="h-6 w-6 mb-2" />
              <span className="text-sm">Security Scan</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Activity className="h-6 w-6 mb-2" />
              <span className="text-sm">Monitoring</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}