import React from 'react'
import { BuildMetrics } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metric-card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Hammer, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Package,
  Shield,
  TrendingUp,
  Activity,
  GitBranch,
  Zap,
  Download
} from 'lucide-react'
import { formatDate, calculatePercentage, getStatusColor } from '@/lib/utils'

interface BuildPhaseProps {
  data: BuildMetrics
}

export function BuildPhase({ data }: BuildPhaseProps) {
  const successRate = calculatePercentage(data.buildsSuccessful, data.buildsTotal)
  const failureRate = calculatePercentage(data.buildsFailed, data.buildsTotal)

  const recentBuilds = [
    { id: 1, name: 'main-deployment', status: 'success', duration: '3m 24s', triggeredBy: 'John Doe', timestamp: '2024-01-16 14:30' },
    { id: 2, name: 'feature-auth', status: 'success', duration: '2m 45s', triggeredBy: 'Jane Smith', timestamp: '2024-01-16 13:15' },
    { id: 3, name: 'hotfix-security', status: 'failed', duration: '5m 12s', triggeredBy: 'Bob Johnson', timestamp: '2024-01-16 12:45' },
    { id: 4, name: 'develop-branch', status: 'success', duration: '4m 18s', triggeredBy: 'Alice Brown', timestamp: '2024-01-16 11:30' },
    { id: 5, name: 'release-v2.1', status: 'success', duration: '6m 33s', triggeredBy: 'Charlie Wilson', timestamp: '2024-01-16 10:15' },
  ]

  const dependencies = [
    { name: 'react', version: '18.2.0', type: 'production', vulnerabilities: 0 },
    { name: 'typescript', version: '5.0.2', type: 'development', vulnerabilities: 0 },
    { name: 'express', version: '4.18.2', type: 'production', vulnerabilities: 2 },
    { name: 'lodash', version: '4.17.21', type: 'production', vulnerabilities: 1 },
    { name: 'axios', version: '1.6.0', type: 'production', vulnerabilities: 0 },
  ]

  const vulnerabilities = [
    { id: 1, severity: 'high', package: 'express', description: 'Prototype pollution in merge function', cve: 'CVE-2023-4683' },
    { id: 2, severity: 'medium', package: 'lodash', description: 'Regular Expression Denial of Service', cve: 'CVE-2023-4240' },
    { id: 3, severity: 'low', package: 'express', description: 'Open redirect vulnerability', cve: 'CVE-2023-4586' },
  ]

  const getBuildStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'running':
        return <Activity className="h-4 w-4 text-blue-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 dark:text-red-400'
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'low':
        return 'text-blue-600 dark:text-blue-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Build Phase</h1>
          <p className="text-muted-foreground mt-2">
            Continuous integration, build automation, and dependency management
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Build Logs
          </Button>
          <Badge variant="outline" className="text-sm">
            Last updated: {formatDate(data.lastUpdated)}
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Build Success Rate"
          value={`${successRate}%`}
          change={successRate > 80 ? 5 : -8}
          changeLabel="from last week"
          icon={<CheckCircle className="h-5 w-5" />}
          description="Percentage of successful builds"
        />
        <MetricCard
          title="Total Builds"
          value={data.buildsTotal}
          change={15}
          changeLabel="builds this week"
          icon={<Hammer className="h-5 w-5" />}
          description="Total build executions"
        />
        <MetricCard
          title="Build Time"
          value={`${data.buildTime}m`}
          change={-12}
          changeLabel="faster than average"
          icon={<Clock className="h-5 w-5" />}
          description="Average build duration"
        />
        <MetricCard
          title="Dependencies"
          value={data.dependencies}
          change={3}
          changeLabel="new packages"
          icon={<Package className="h-5 w-5" />}
          description="Total project dependencies"
        />
      </div>

      {/* Build Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Build Performance</CardTitle>
            <CardDescription>Build success and failure rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Success Rate</span>
                <span className="text-green-600">{successRate}%</span>
              </div>
              <Progress value={successRate} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Failure Rate</span>
                <span className="text-red-600">{failureRate}%</span>
              </div>
              <Progress value={failureRate} className="h-3" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{data.buildsSuccessful}</div>
                <div className="text-sm text-muted-foreground">Successful</div>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{data.buildsFailed}</div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Overview</CardTitle>
            <CardDescription>Dependency security and vulnerabilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{data.securityVulnerabilities}</div>
                <div className="text-sm text-muted-foreground">Vulnerabilities</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{data.dependencies}</div>
                <div className="text-sm text-muted-foreground">Dependencies</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>High Severity</span>
                <span className="text-red-600 font-medium">1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Medium Severity</span>
                <span className="text-yellow-600 font-medium">1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Low Severity</span>
                <span className="text-blue-600 font-medium">1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Builds */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Builds</CardTitle>
              <CardDescription>Latest build executions and their status</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Activity className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
            {recentBuilds.map((build) => (
              <div key={build.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  {getBuildStatusIcon(build.status)}
                  <div>
                    <p className="font-medium text-sm">{build.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {build.triggeredBy} • {build.timestamp} • {build.duration}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(build.status)}>
                  {build.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dependencies & Vulnerabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dependencies</CardTitle>
            <CardDescription>Project dependencies and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
              {dependencies.map((dep, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{dep.name}</p>
                      <p className="text-xs text-muted-foreground">v{dep.version} • {dep.type}</p>
                    </div>
                  </div>
                  {dep.vulnerabilities > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {dep.vulnerabilities} vulns
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Vulnerabilities</CardTitle>
            <CardDescription>Known security issues in dependencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
              {vulnerabilities.map((vuln) => (
                <div key={vuln.id} className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{vuln.package}</span>
                      <Badge variant="outline" className={getSeverityColor(vuln.severity)}>
                        {vuln.severity}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{vuln.description}</p>
                  <p className="text-xs font-mono text-muted-foreground">{vuln.cve}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Build Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Build Configuration</CardTitle>
          <CardDescription>Build pipeline settings and optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">Build Cache</span>
              </div>
              <p className="text-2xl font-bold">87%</p>
              <p className="text-xs text-muted-foreground">Cache hit rate</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <GitBranch className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Parallel Jobs</span>
              </div>
              <p className="text-2xl font-bold">4</p>
              <p className="text-xs text-muted-foreground">Concurrent builds</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium">Optimization</span>
              </div>
              <p className="text-2xl font-bold">92%</p>
              <p className="text-xs text-muted-foreground">Build efficiency</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Frequency</span>
              </div>
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-muted-foreground">Builds per day</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}